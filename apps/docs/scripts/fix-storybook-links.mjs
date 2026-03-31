import fs from 'fs';
import path from 'path';

function toKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, '-').toLowerCase();
}

const docsDir = path.join(process.cwd(), "content", "docs");
const uiDir = path.join(process.cwd(), "../../packages/ui/src/components");

const files = fs.readdirSync(docsDir).filter(f => f.endsWith(".mdx"));

files.forEach((file) => {
  const filePath = path.join(docsDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  if (content.includes("components-")) {
    const componentName = file.replace(".mdx", "");
    
    // Find the actual component folder (case-insensitive search)
    const uiFolders = fs.readdirSync(uiDir);
    const compFolder = uiFolders.find(f => f.toLowerCase() === componentName.toLowerCase());
    
    if (compFolder) {
      const storyFile = path.join(uiDir, compFolder, `${compFolder}.stories.tsx`);
      if (fs.existsSync(storyFile)) {
        const storyContent = fs.readFileSync(storyFile, "utf8");
        
        let titleMatch = storyContent.match(/title:\s*["']([^"']+)["']/);
        let firstExportMatch = storyContent.match(/export const ([a-zA-Z0-9_]+)\s*(:|=)/);
        
        if (titleMatch && firstExportMatch) {
          const title = titleMatch[1].replace(/[\/\s]+/g, "-").toLowerCase();
          const exportName = toKebab(firstExportMatch[1]);
          const trueStoryId = `${title}--${exportName}`;
          
          // Use regex to replace the bad ID globally
          let newContent = content.replace(
            new RegExp(`id=components-${componentName.toLowerCase()}--default&`, 'gi'), 
            `id=${trueStoryId}&`
          );
          
          newContent = newContent.replace(
            new RegExp(`path=/story/components-${componentName.toLowerCase()}--default\\)`, 'gi'), 
            `path=/story/${trueStoryId})`
          );
          
          // Re-write
          fs.writeFileSync(filePath, newContent, "utf8");
          console.log(`Fixed ${componentName} -> ${trueStoryId}`);
        }
      }
    }
  }
});
