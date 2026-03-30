import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { createRequire } from "module";
import path from "path";

const runtimeRequire = createRequire(import.meta.url);

export async function GET() {
  try {
    const pkgPath = runtimeRequire.resolve("@designforge/ui/package.json");
    const distDir = path.join(path.dirname(pkgPath), "dist");
    
    // Serve the generated d.ts file text
    const typesText = await readFile(path.join(distDir, "index.d.ts"), "utf-8");
    
    return new NextResponse(typesText, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600"
      }
    });
  } catch (err) {
    return new NextResponse("Failed to load types", { status: 500 });
  }
}
