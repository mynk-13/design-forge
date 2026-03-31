import fs from "fs";
import path from "path";
import matter from "gray-matter"; // We need gray-matter to parse frontmatter

const DOCS_DIR = path.join(process.cwd(), "content/docs");

export type DocMeta = {
  title: string;
  description: string;
  component?: string;
};

export type Doc = {
  slug: string;
  meta: DocMeta;
  content: string;
};

export function getAllDocs(): Pick<Doc, "slug" | "meta">[] {
  if (!fs.existsSync(DOCS_DIR)) return [];
  const files = fs.readdirSync(DOCS_DIR).filter((file) => file.endsWith(".mdx"));

  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const fullPath = path.join(DOCS_DIR, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      meta: data as DocMeta,
    };
  });
}

export function getDocBySlug(slug: string): Doc | undefined {
  try {
    const fullPath = path.join(DOCS_DIR, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      meta: data as DocMeta,
      content,
    };
  } catch (err) {
    return undefined;
  }
}
