import type { MetadataRoute } from "next";
import { getAllDocs } from "../lib/docs";

const siteUrl = "https://designforge-docs.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = getAllDocs();

  const docRoutes = docs.map((doc) => ({
    url: doc.slug === "index" ? `${siteUrl}/docs` : `${siteUrl}/docs/${doc.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: doc.slug === "index" ? 1 : 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/generator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/playground`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...docRoutes,
  ];
}
