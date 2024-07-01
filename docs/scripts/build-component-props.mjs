import reactDocgenTypescript from 'react-docgen-typescript';
import { fileURLToPath } from 'url';
import { fs, globby, path } from 'zx';

console.log('📑 Generating props table...');

const parser = reactDocgenTypescript.withCustomConfig('./tsconfig.json', {
  shouldRemoveUndefinedFromOptional: true,
  shouldExtractLiteralValuesFromEnum: false,
  shouldExtractValuesFromUnion: false,
  customComponentTypes: [
    'AutocompleteComponent',
    'SelectComponent',
    'ComboBoxComponent',
    'RadioComponent',
    'SelectListComponent',
  ],
});

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.resolve(__dirname, '../../packages/components/src');
const outputFilePath = path.resolve(
  __dirname,
  '../.component-props/index.json'
);

fs.ensureDirSync(path.dirname(outputFilePath));

const generatePropsTables = async () => {
  // Getting all component files using globby
  const componentFiles = await globby([
    `${componentsDir}/**/*.tsx`,

    // excluded files
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

      // Filter out 'variant' and 'className' properties;
      const excludedProps = ['variant', 'size'];
      const filteredProps = Object.keys(props)
        .filter(key => !excludedProps.includes(key))
        .reduce((obj, key) => {
          obj[key] = props[key];
          return obj;
        }, {});

      acc[fileName] = filteredProps;
    }

    return acc;
  }, {});

  fs.writeJsonSync(outputFilePath, allDocs, { spaces: 2 });
  console.log(`✅ Successfully generated props table!`);
};

generatePropsTables();
