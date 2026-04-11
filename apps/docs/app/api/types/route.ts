import { type NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { corsHeaders, handlePreflight } from "../../../lib/cors";

export function OPTIONS(req: NextRequest) {
  return handlePreflight(req, "GET, OPTIONS") ?? new Response(null, { status: 204 });
}

export async function GET() {
  try {
    const typesPath = path.join(process.cwd(), "node_modules", "@designforge", "ui", "dist", "index.d.ts");
    const typesText = await readFile(typesPath, "utf-8");

    return new NextResponse(typesText, {
      headers: {
        ...corsHeaders("GET, OPTIONS"),
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("Failed to load types:", err);
    return new NextResponse("// types unavailable", {
      status: 200,
      headers: corsHeaders("GET, OPTIONS"),
    });
  }
}
