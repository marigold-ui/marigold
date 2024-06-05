import fs from 'fs-extra';
import globby from 'globby';
import path from 'path';
import { dirname } from 'path';
import reactDocgenTypescript from 'react-docgen-typescript';
import { fileURLToPath } from 'url';

console.log('📑 Generating props table...');

const parser = reactDocgenTypescript.withCustomConfig('./tsconfig.json', {
  shouldRemoveUndefinedFromOptional: true,
  shouldExtractLiteralValuesFromEnum: false,
  shouldExtractValuesFromUnion: false,
  customComponentTypes: ['AutocompleteComponent', 'SelectComponent'],
});

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const componentsDir = path.resolve(__dirname, '../../packages/components/src');
const outputFilePath = path.resolve(__dirname, '../.table-props/index.json');

fs.ensureDirSync(path.dirname(outputFilePath));

const generatePropsTables = async () => {
  // Getting all component files using globby
  const componentFiles = await globby([
    `${componentsDir}/**/*.tsx`,

    // exluded files
    `!${componentsDir}/**/*.stories.tsx`,
    `!${componentsDir}/**/*.test.tsx`,
    `!${componentsDir}/**/*.ts`,
  ]);

  // Reduce to gather all docs
  const allDocs = componentFiles.reduce((acc, filePath) => {
    const docs = parser.parse(filePath);
    const props = docs[0]?.props;

    if (docs.length > 0) {
      const fileName = filePath.split('/').at(-1);
      acc[fileName] = props;
    }

    return acc;
  }, {});

  fs.writeJsonSync(outputFilePath, allDocs, { spaces: 2 });
  console.log(`✅ Successfully generated props table!`);
};

generatePropsTables();
