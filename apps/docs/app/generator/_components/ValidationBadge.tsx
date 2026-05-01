"use client";

import { ValidationPipeline } from "@designforge/ai";
import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon } from "@designforge/icons";
import { useEffect, useState } from "react";

interface Props {
  code: string | null;
}

type BadgeState = "idle" | "checking" | "pass" | "fail";

export function ValidationBadge({ code }: Props) {
  const [state, setState] = useState<BadgeState>("idle");
  const [summary, setSummary] = useState<string>("");

  useEffect(() => {
    if (!code) {
      setState("idle");
      setSummary("");
      return;
    }

    setState("checking");
    setSummary("");

    const pipeline = new ValidationPipeline();

    // Step 2 — ESLint via /api/validate
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);

    fetch("/api/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
      signal: controller.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error(`Validation service error (${r.status})`);
        return r.json() as Promise<{ errors: { message: string }[]; warnings: { message: string }[]; summary: string }>;
      })
      .then((data) => {
        clearTimeout(timer);
        const eslintResult = pipeline.eslintResult(
          data.errors.map((e) => e.message),
          data.warnings.map((w) => w.message),
        );
        const result = pipeline.aggregate([eslintResult]);
        setState(result.passed ? "pass" : "fail");
        setSummary(result.summary);
      })
      .catch(() => {
        clearTimeout(timer);
        setState("idle");
        setSummary("");
      });

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [code]);

  if (state === "idle") return null;

  const label = {
    checking: "Validating…",
    pass: "Checks passed",
    fail: "Issues found",
  }[state];

  const styles = {
    checking: "bg-zinc-800 text-zinc-400",
    pass: "bg-green-950/60 text-green-400",
    fail: "bg-red-950/50 text-red-400",
  }[state];

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={summary || label}
      title={summary}
      className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition ${styles}`}
    >
      {state === "checking" && <Loader2Icon size={12} className="animate-spin" />}
      {state === "pass" && <CheckCircle2Icon size={12} />}
      {state === "fail" && <AlertCircleIcon size={12} />}
      {label}
    </div>
  );
}
