// @ts-check
import docgen from 'react-docgen-typescript';
import { fileURLToPath } from 'url';
import { fs, globby, path } from 'zx';

console.log('📑 Generating props table...');

const parser = docgen.withCustomConfig('./tsconfig.json', {
  shouldRemoveUndefinedFromOptional: true,
  shouldExtractLiteralValuesFromEnum: false,
  shouldExtractValuesFromUnion: false,
  skipChildrenPropWithoutDoc: false,
  propFilter: {
    skipPropsWithName: ['variant', 'size', 'key'],
  },
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

const systemDir = path.resolve(__dirname, '../../packages/system/src');
const componentsDir = path.resolve(__dirname, '../../packages/components/src');
const outputFilePath = path.resolve(__dirname, '../.registry/props.json');

fs.ensureDirSync(path.dirname(outputFilePath));

const generatePropsTables = async () => {
  // Getting all component files using globby
  const componentFiles = await globby([
    `${componentsDir}/**/*.tsx`,
    `${systemDir}/**/*.tsx`,

    // excluded files
    `!${componentsDir}/**/*.stories.tsx`,
    `!${componentsDir}/**/*.test.tsx`,
    `!${componentsDir}/**/*.ts`,
    `!${systemDir}/**/*.stories.tsx`,
    `!${systemDir}/**/*.test.tsx`,
    `!${systemDir}/**/*.ts`,
  ]);

  // Reduce to gather all docs
  const allDocs = componentFiles.reduce((acc, filePath) => {
    const docs = parser.parse(filePath);
    const props = docs[0]?.props;

    if (docs.length > 0) {
      const fileName = path.basename(filePath);
      const filteredProps = Object.keys(props).reduce((obj, key) => {
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
