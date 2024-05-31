import fs from 'fs-extra';
import path from 'path';
import { dirname } from 'path';
import reactDocgenTypescript from 'react-docgen-typescript';
import { fileURLToPath } from 'url';

console.log('📑 Generating props table...');

const parser = reactDocgenTypescript.withCustomConfig('./tsconfig.json');

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const componentsDir = path.resolve(__dirname, '../../packages/components/src');
const outputFilePath = path.resolve(__dirname, '../.table-props/index.json');

fs.ensureDirSync(path.dirname(outputFilePath));

const generatePropsTables = () => {
  // Getting all directories
  const componentDirs = fs
    .readdirSync(componentsDir)
    .filter(dir => fs.lstatSync(path.join(componentsDir, dir)).isDirectory());

  // Initialize props value
  const allDocs = {};

  componentDirs.forEach(dir => {
    const componentFiles = fs
      .readdirSync(path.join(componentsDir, dir))
      .filter(file => {
        // Exclude .stories.tsx, .test.tsx, and .ts files
        return (
          (file.endsWith('.tsx') &&
            !file.endsWith('.stories.tsx') &&
            !file.endsWith('.test.tsx') &&
            !file.endsWith('.ts')) ||
          file.endsWith('.d.ts')
        );
      });

    componentFiles.forEach(file => {
      const filePath = path.join(componentsDir, dir, file);
      const docs = parser.parse(filePath);
      if (docs.length > 0) {
        allDocs[dir] = docs;
      }
    });
  });

  fs.writeJsonSync(outputFilePath, allDocs, { spaces: 2 });
  console.log(`✅ Successfully generated props table!`);
};

generatePropsTables();
