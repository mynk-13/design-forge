import { type NextRequest, NextResponse } from "next/server";
import { corsHeaders, handlePreflight } from "../../../lib/cors";

// Node.js runtime — ESLint requires Node APIs (fs, path) (ADR, LLD §17.3)
export const runtime = "nodejs";

const MAX_VALIDATE_BODY_BYTES = 100_000; // 100 KB — code payloads can be larger than prompts

interface ValidateRequest {
  code: string;
}

interface LintMessage {
  line: number;
  column: number;
  severity: "error" | "warning";
  message: string;
  ruleId: string | null;
}

interface ValidateResponse {
  errors: LintMessage[];
  warnings: LintMessage[];
  summary: string;
}

export function OPTIONS(req: NextRequest) {
  return handlePreflight(req, "POST, OPTIONS") ?? new Response(null, { status: 204 });
}

export async function POST(req: NextRequest): Promise<NextResponse<ValidateResponse>> {
  const cors = corsHeaders("POST, OPTIONS");

  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (contentLength > MAX_VALIDATE_BODY_BYTES) {
    return NextResponse.json(
      { errors: [], warnings: [], summary: "Request body exceeds 100 KB limit." },
      { status: 413, headers: cors },
    );
  }

  let body: ValidateRequest;
  try {
    body = (await req.json()) as ValidateRequest;
  } catch {
    return NextResponse.json(
      { errors: [], warnings: [], summary: "Invalid request body." },
      { status: 400, headers: cors },
    );
  }

  const code = body.code?.trim();
  if (!code) {
    return NextResponse.json(
      { errors: [], warnings: [], summary: "No code provided." },
      { status: 400, headers: cors },
    );
  }

  try {
    // Dynamically import ESLint (Node.js-only — can't be imported at module level on Edge)
    const { ESLint } = await import("eslint");

    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.{ts,tsx}"],
          rules: {
            // Core quality rules for generated components
            "no-unused-vars": "warn",
            "no-undef": "error",
            "no-console": "warn",
            "prefer-const": "warn",
            // React rules
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            // Accessibility
            "jsx-a11y/alt-text": "error",
            "jsx-a11y/aria-role": "error",
            "jsx-a11y/no-autofocus": "warn",
          },
        },
      ],
    });

    // Lint the code string directly (no file on disk)
    const results = await eslint.lintText(code, { filePath: "generated.tsx" });

    const errors: LintMessage[] = [];
    const warnings: LintMessage[] = [];

    for (const result of results) {
      for (const msg of result.messages) {
        const entry: LintMessage = {
          line: msg.line ?? 0,
          column: msg.column ?? 0,
          severity: msg.severity === 2 ? "error" : "warning",
          message: msg.message,
          ruleId: msg.ruleId ?? null,
        };
        if (msg.severity === 2) {
          errors.push(entry);
        } else {
          warnings.push(entry);
        }
      }
    }

    const summary =
      errors.length === 0 && warnings.length === 0
        ? "No ESLint issues found."
        : `${errors.length} error(s), ${warnings.length} warning(s).`;

    return NextResponse.json({ errors, warnings, summary }, { headers: cors });
  } catch (err) {
    const message = err instanceof Error ? err.message : "ESLint validation failed.";
    return NextResponse.json(
      { errors: [], warnings: [], summary: `Validation error: ${message}` },
      { status: 500, headers: cors },
    );
  }
}
