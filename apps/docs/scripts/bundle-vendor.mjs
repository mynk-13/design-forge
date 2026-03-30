import { readFile, writeFile, mkdir } from "fs/promises";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(__filename);
const OUT = path.join(__dirname, "..", "public", "vendor");

await mkdir(OUT, { recursive: true });

const wrapCJS = (code, name, req = "") =>
  `(function(){var process={env:{NODE_ENV:"development"}};var module={exports:{}};var exports=module.exports;${req}${code};window[${JSON.stringify(name)}]=module.exports;})();`;

// React
const reactDir = path.dirname(require.resolve("react"));
await writeFile(path.join(OUT, "react.js"), wrapCJS(await readFile(path.join(reactDir, "cjs/react.development.js"), "utf-8"), "React"));
console.log("✓ vendor/react.js");

// Scheduler + ReactDOM
const reactDomDir = path.dirname(require.resolve("react-dom"));
const coLocated = path.dirname(reactDomDir);
let sched;
try { sched = await readFile(path.join(coLocated, "scheduler/cjs/scheduler.development.js"), "utf-8"); }
catch { sched = `exports.scheduleCallback=function(p,cb){setTimeout(cb,0);return{};};exports.cancelCallback=function(){};exports.shouldYield=function(){return false;};exports.now=Date.now;exports.getCurrentPriorityLevel=function(){return 3;};exports.ImmediatePriority=1;exports.UserBlockingPriority=2;exports.NormalPriority=3;exports.LowPriority=4;exports.IdlePriority=5;[\"scheduleCallback\",\"cancelCallback\",\"shouldYield\",\"now\",\"getCurrentPriorityLevel\",\"ImmediatePriority\",\"UserBlockingPriority\",\"NormalPriority\",\"LowPriority\",\"IdlePriority\"].forEach(function(k){exports[\"unstable_\"+k]=exports[k];});`; }

const reqFn = `var require=function(m){if(m==="react")return window.React;if(m==="scheduler")return window.__DF_Scheduler;if(m==="react-dom")return window.ReactDOM;return{};};`;
const rdCode = await readFile(path.join(reactDomDir, "cjs/react-dom.development.js"), "utf-8");
const rdcCode = await readFile(path.join(reactDomDir, "cjs/react-dom-client.development.js"), "utf-8");

const bundle = [
  wrapCJS(sched, "__DF_Scheduler"),
  `(function(){var process={env:{NODE_ENV:"development"}};var module={exports:{}};var exports=module.exports;\n${reqFn}\n${rdCode}\nwindow["ReactDOM"]=module.exports;})();`,
  `(function(){var process={env:{NODE_ENV:"development"}};var module={exports:{}};var exports=module.exports;\n${reqFn}\n${rdcCode}\nwindow["ReactDOMClient"]=module.exports;})();`
].join("\n");

await writeFile(path.join(OUT, "react-dom.js"), bundle);
console.log("✓ vendor/react-dom.js");

// Babel
await writeFile(path.join(OUT, "babel.js"), await readFile(require.resolve("@babel/standalone"), "utf-8"));
console.log("✓ vendor/babel.js");

// Axe-core
await writeFile(path.join(OUT, "axe.js"), await readFile(require.resolve("axe-core/axe.min.js"), "utf-8"));
console.log("✓ vendor/axe.js");

// DesignForge Themes CSS
const fsProm = await import("fs/promises");
const themesDistPath = path.dirname(require.resolve("@designforge/themes"));
await fsProm.copyFile(path.join(themesDistPath, "styles.css"), path.join(OUT, "themes.css"));
console.log("✓ vendor/themes.css");

