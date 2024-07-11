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

// Getting all component files using globby
const files = await globby([
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

const output = {};

files.forEach(file => {
  const docs = parser.parse(file);

  if (docs.length === 0) {
    return;
  }

  const { name } = path.parse(file);
  const props = docs[0].props;

  output[name] = {};

  for (const key in props) {
    // Remove properties we do not need.
    const { parent, declarations, ...val } = props[key];
    output[name][key] = val;
  }
});

await fs.writeJson(outputFilePath, output);
console.log(`✅ Successfully generated props table!`);
