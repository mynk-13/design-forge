import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import { createRequire } from "module";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// createRequire bypasses Turbopack/webpack's static require() analysis.
// Without this, `require.resolve(variable)` causes "Can't resolve <dynamic>".
// __filename is always available in Next.js Node.js API routes.
const runtimeRequire = createRequire(__filename);

// Resolve all package directories once at module load time (static strings → no bundler issues)
const REACT_DIR = path.dirname(runtimeRequire.resolve("react"));
const REACT_DOM_DIR = path.dirname(runtimeRequire.resolve("react-dom"));
const BABEL_PATH = runtimeRequire.resolve("@babel/standalone");
// In pnpm, react-dom's co-located node_modules houses scheduler (via symlink)
const PNPM_CO_LOCATED = path.dirname(REACT_DOM_DIR);
const SCHEDULER_CJS = path.join(
  PNPM_CO_LOCATED,
  "scheduler",
  "cjs",
  "scheduler.development.js",
);

// In-memory cache (rebuilt once per server start)
const cache = new Map<string, string>();

// Minimal scheduler shim — covers all APIs React 19 calls.
// Used as a fallback if the real scheduler CJS file isn't accessible.
const SCHEDULER_SHIM = `
exports.scheduleCallback = function(p, cb, opts) {
  var id = setTimeout(cb, opts && opts.delay || 0);
  return { id: id, startTime: Date.now() };
};
exports.cancelCallback = function(t) { if(t) clearTimeout(t.id); };
exports.shouldYield = function() { return false; };
exports.now = typeof performance!=="undefined" ? function(){return performance.now();} : Date.now;
exports.getCurrentPriorityLevel = function() { return 3; };
exports.requestPaint = function() {};
exports.forceFrameRate = function() {};
exports.ImmediatePriority = 1;
exports.UserBlockingPriority = 2;
exports.NormalPriority = 3;
exports.LowPriority = 4;
exports.IdlePriority = 5;
exports.unstable_scheduleCallback = exports.scheduleCallback;
exports.unstable_cancelCallback = exports.cancelCallback;
exports.unstable_shouldYield = exports.shouldYield;
exports.unstable_now = exports.now;
exports.unstable_getCurrentPriorityLevel = exports.getCurrentPriorityLevel;
exports.unstable_requestPaint = exports.requestPaint;
exports.unstable_ImmediatePriority = 1;
exports.unstable_UserBlockingPriority = 2;
exports.unstable_NormalPriority = 3;
exports.unstable_LowPriority = 4;
exports.unstable_IdlePriority = 5;
exports.unstable_runWithPriority = function(p, cb) { return cb(); };
exports.unstable_wrapCallback = function(cb) { return cb; };
exports.unstable_next = function(cb) { return cb(); };
exports.unstable_continueExecution = function() {};
exports.unstable_pauseExecution = function() {};
exports.unstable_getFirstCallbackNode = function() { return null; };
`;

function wrapCJS(code: string, globalName: string, requireFn = "") {
  return `(function(){
var process={env:{NODE_ENV:"development"}};
var module={exports:{}};
var exports=module.exports;
${requireFn}
${code}
window[${JSON.stringify(globalName)}]=module.exports;
})();`;
}

async function buildBundle(name: string): Promise<string> {
  // ── Tailwind ────────────────────────────────────────────────────────────────
  if (name === "tailwind") {
    const res = await fetch("https://cdn.tailwindcss.com");
    if (!res.ok) throw new Error(`Tailwind CDN returned ${res.status}`);
    return res.text();
  }

  // ── Babel standalone ────────────────────────────────────────────────────────
  if (name === "babel") {
    return readFile(BABEL_PATH, "utf-8");
  }

  // ── React (CJS wrapped as IIFE → window.React) ─────────────────────────────
  if (name === "react") {
    const cjs = await readFile(
      path.join(REACT_DIR, "cjs", "react.development.js"),
      "utf-8",
    );
    return wrapCJS(cjs, "React");
  }

  // ── ReactDOM (scheduler + react-dom CJS wrapped as IIFE) ───────────────────
  if (name === "react-dom") {
    // 1. Scheduler
    let schedulerCode = SCHEDULER_SHIM;
    try {
      schedulerCode = await readFile(SCHEDULER_CJS, "utf-8");
    } catch {
      console.warn(
        "[vendor/react-dom] Scheduler not found at co-located path, using shim.",
        "\n  Tried:", SCHEDULER_CJS,
      );
    }
    const schedulerBundle = wrapCJS(schedulerCode, "__DF_Scheduler");

    // 2. ReactDOM CJS
    const reactDomCJS = await readFile(
      path.join(REACT_DOM_DIR, "cjs", "react-dom.development.js"),
      "utf-8",
    );
    const reactDomBundle = `(function(){
var process={env:{NODE_ENV:"development"}};
var module={exports:{}};
var exports=module.exports;
var require=function(mod){
  if(mod==="react") return window.React;
  if(mod==="scheduler") return window.__DF_Scheduler;
  if(mod==="react-dom") return window.ReactDOM||module.exports;
  if(mod==="react-dom/server-rendering-stub") return {};
  console.warn("[preview] unresolved require:",mod);
  return {};
};
${reactDomCJS}
window["ReactDOM"]=module.exports;
})();`;

    return schedulerBundle + "\n" + reactDomBundle;
  }

  throw new Error(`Unknown vendor: "${name}"`);
}

function okResponse(code: string) {
  return new Response(code, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  if (!["tailwind", "babel", "react", "react-dom"].includes(name)) {
    return new Response(`Unknown vendor "${name}"`, { status: 404 });
  }

  const cached = cache.get(name);
  if (cached) return okResponse(cached);

  try {
    const code = await buildBundle(name);
    cache.set(name, code);
    return okResponse(code);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[vendor/${name}] ERROR:`, msg);
    return new Response(
      `/* vendor/${name} failed: ${msg.replace(/\*\//g, "*\\/")} */\n` +
        `console.error("[preview] Failed to load ${name}:", ${JSON.stringify(msg)});`,
      { status: 500, headers: { "Content-Type": "application/javascript" } },
    );
  }
}
