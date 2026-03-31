import fs from 'fs';
import path from 'path';

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
      `  src="http://localhost:6006/iframe.html?id=${storyId}&viewMode=story" \n` +
      `  className="w-full h-[300px] border rounded-md my-4 bg-background" \n` +
      `  title="Storybook Preview" \n` +
      `/>\n\n` +
      `> [!TIP]\n` +
      `> [Open Component in Storybook ↗](http://localhost:6006/?path=/story/${storyId})\n`;

    content += appendage;
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Appended Storybook View to ${file}`);
  }
});
