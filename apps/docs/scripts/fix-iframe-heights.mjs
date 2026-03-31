import fs from 'fs';
import path from 'path';

const docsDir = path.join(process.cwd(), 'content', 'docs');
const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.mdx'));

files.forEach(f => {
  const p = path.join(docsDir, f);
  let c = fs.readFileSync(p, 'utf8');

  // Replace any previous dynamic Tailwind height classes with a fixed 800px inline style constraint
  c = c.replace(
    /className=\"w-full min-h-\[500px\] lg:min-h-\[650px\] border rounded-md my-4 bg-background\"/g,
    'className="w-full border rounded-md my-4 bg-background" style={{ height: "800px", minHeight: "800px" }}'
  );

  c = c.replace(
    /className=\"w-full h-\[300px\] border rounded-md my-4 bg-background\"/g,
    'className="w-full border rounded-md my-4 bg-background" style={{ height: "800px", minHeight: "800px" }}'
  );

  fs.writeFileSync(p, c);
  console.log('Fixed iframe bounds for ' + f);
});
