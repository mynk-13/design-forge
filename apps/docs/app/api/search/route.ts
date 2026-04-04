import { getAllDocs } from "../../../lib/docs";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  const docs = getAllDocs();
  const index = docs.map((doc) => ({
    slug: doc.slug,
    title: doc.meta.title,
    description: doc.meta.description,
    href: doc.slug === "index" ? "/docs" : `/docs/${doc.slug}`,
  }));
  return NextResponse.json(index);
}
