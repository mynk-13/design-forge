/* eslint-disable */
import fs from 'fs';
import path from 'path';

const COMPONENTS = [
  "Accordion", "Alert", "AlertDialog", "AspectRatio", "Avatar", "Badge", 
  "Banner", "Box", "Button", "Card", "Checkbox", "Container", 
  "ContextMenu", "DataTable", "Dialog", "DropdownMenu", "Flex", "Grid", 
  "HoverCard", "Input", "Label", "Popover", "Progress", "RadioGroup", 
  "Select", "Separator", "Skeleton", "Slider", "Stack", "Switch", 
  "Tabs", "Textarea", "Toast", "Tooltip"
];

const docsDir = path.join(process.cwd(), "content", "docs");

if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

COMPONENTS.forEach((comp) => {
  const slug = comp.toLowerCase();
  const filePath = path.join(docsDir, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    const template = `---
title: "${comp}"
description: "Documentation for the ${comp} component."
---

The \`${comp}\` component represents a fundamental UI building block within the DesignForge token system.

## Installation

\`\`\`bash
npm install @designforge/ui
\`\`\`

## Usage

\`\`\`tsx
import { ${comp} } from "@designforge/ui";

export default function App() {
  return (
    <${comp}>Example Content</${comp}>
  );
}
\`\`\`

### Attributes

| Prop      | Type      | Default       | Description                                                 |
| :-------- | :-------- | :------------ | :---------------------------------------------------------- |
| \`className\` | \`string\`  | \`undefined\`   | Merges all optional utility styles directly. |
`;
    // Note: because the script runs in node, \`\`\`bash naturally expands to strings.
    fs.writeFileSync(filePath, template, "utf-8");
    console.log(`Generated stub for ${comp}`);
  }
});
