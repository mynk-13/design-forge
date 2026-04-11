import { getAllDocs } from "../../../lib/docs";
import { type NextRequest, NextResponse } from "next/server";
import { corsHeaders, handlePreflight } from "../../../lib/cors";

export const dynamic = "force-static";

export function OPTIONS(req: NextRequest) {
  return handlePreflight(req, "GET, OPTIONS") ?? new Response(null, { status: 204 });
}

export function GET() {
  const docs = getAllDocs();
  const index = docs.map((doc) => ({
    slug: doc.slug,
    title: doc.meta.title,
    description: doc.meta.description,
    href: doc.slug === "index" ? "/docs" : `/docs/${doc.slug}`,
  }));
  return NextResponse.json(index, { headers: corsHeaders("GET, OPTIONS") });
}
