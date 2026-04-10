/* eslint-disable */
import fs from 'fs';
import path from 'path';

// Use the deployed Storybook URL; falls back to the known production URL.
// When running locally with a live Storybook server, localhost is fine for the
// iframe (StorybookPreview rewrites it at runtime) but the "Open in Storybook"
// link should always point to the deployed instance so it works in production.
const STORYBOOK_BASE =
  process.env.NEXT_PUBLIC_STORYBOOK_URL?.replace(/\/$/, "") ??
  "https://designforge-storybook.vercel.app";

const SKIP_PAGES = ["installation.mdx", "index.mdx", "storybook.mdx", "generator.mdx", "playground.mdx"];

const docsDir = path.join(process.cwd(), "content", "docs");
const files = fs.readdirSync(docsDir).filter(f => f.endsWith(".mdx") && !SKIP_PAGES.includes(f));

files.forEach((file) => {
  const filePath = path.join(docsDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  // Only append if it hasn't been added yet
  if (!content.includes("## Live View")) {
    const slug = file.replace(".mdx", "");
    // Storybook standard ID schema lowercases the exact component structure title
    const storyId = `components-${slug}--default`;

    const appendage = `\n\n## Live View\n\n` +
      `Here is a live contextual rendering of the component directly from our isolated Storybook environment.\n\n` +
      `<iframe \n` +
      `  src="${STORYBOOK_BASE}/iframe.html?id=${storyId}&viewMode=story" \n` +
      `  className="w-full h-[300px] border rounded-md my-4 bg-background" \n` +
      `  title="Storybook Preview" \n` +
      `/>\n\n` +
      `> [!TIP]\n` +
      `> [Open Component in Storybook ↗](${STORYBOOK_BASE}/?path=/story/${storyId})\n`;

    content += appendage;
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Appended Storybook View to ${file}`);
  }
});
