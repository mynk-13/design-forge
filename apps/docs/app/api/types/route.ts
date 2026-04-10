import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const typesPath = path.join(process.cwd(), "node_modules", "@designforge", "ui", "dist", "index.d.ts");
    const typesText = await readFile(typesPath, "utf-8");

    return new NextResponse(typesText, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("Failed to load types:", err);
    return new NextResponse("// types unavailable", { status: 200 });
  }
}
