import fs from 'fs-extra';
import path from 'path';
import { dirname } from 'path';
import reactDocgenTypescript from 'react-docgen-typescript';
import { fileURLToPath } from 'url';

console.log('📑 Generating props table...');

const parser = reactDocgenTypescript.withCustomConfig('./tsconfig.json', {
  shouldRemoveUndefinedFromOptional: true,
  shouldExtractLiteralValuesFromEnum: false,
  shouldExtractValuesFromUnion: false,

  // include asserted types for components eg. Autocomplete & Select
  customComponentTypes: ['AutocompleteComponent', 'SelectComponent'],
});

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

  // Reduce to gather all docs
  const allDocs = componentDirs.reduce((acc, dir) => {
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
      const props = docs[0]?.props;
      if (docs.length > 0) {
        acc[file] = props;
      }
    });

    return acc;
  }, {});

  fs.writeJsonSync(outputFilePath, allDocs, { spaces: 2 });
  console.log(`✅ Successfully generated props table!`);
};

generatePropsTables();
