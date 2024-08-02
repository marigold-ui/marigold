// @ts-check
import * as prettier from 'prettier';
import docgen from 'react-docgen-typescript';
import { codeToHtml } from 'shiki';
import { fileURLToPath } from 'url';
import { fs, globby, path } from 'zx';

console.log('📑 Generating props table...');

const parser = docgen.withCustomConfig('./tsconfig.json', {
  shouldRemoveUndefinedFromOptional: true,
  shouldExtractLiteralValuesFromEnum: false,
  shouldExtractValuesFromUnion: false,
  skipChildrenPropWithoutDoc: false,
  propFilter: {
    skipPropsWithName: [
      'variant',
      'size',
      'key',
      'style',
      'UNSTABLE_childItems',
    ],
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

async function transformDefaultValue(val) {
  let x = val.defaultValue.value;
  x = /^[a-zA-Z]/.test(x) ? `"${x}"` : x;

  return await codeToHtml(`${x}`, {
    lang: 'ts',
    theme: 'min-light',
  });
}

function formatVoidFunctions(text) {
  const antiPattern = /\=>\s+void/g;
  const pattern = /\=>\s+xxx/g;

  if (antiPattern.test(text)) {
    return text.replace(antiPattern, '=> xxx');
  }

  if (pattern.test(text)) {
    return text.replace(pattern, '=> void');
  }

  return text;
}

function formatLongTypes(text) {
  const antiPattern = /<\.\.\.>/g;
  const pattern = /<xxx>/g;

  if (antiPattern.test(text)) {
    return text.replace(antiPattern, '<xxx>');
  }

  if (pattern.test(text)) {
    return text.replace(pattern, '<...>');
  }

  return text;
}

async function transformTypeValue(val) {
  const ignorePrettier = [
    'any[]',
    'string | number | readonly string[]',
    'string[]',
    '(number | "fit")[]',
    'TemplateValue[]',
    '0 | "auto" | "full" | "fit" | "min" | "max" | "screen" | "svh" | "lvh" | "dvh" | "px" | "0.5" | 1 | "1.5" | 2 | "2.5" | 3 | "3.5" | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24 | 28 | ... 37 more ...',
    '{ vertical?: { alignY?: "none" | "center" | "top" | "bottom"; alignX?: "none" | "left" | "center" | "right"; } | undefined; horizontal?: { alignX?: "none" | "left" | "center" | "right" | undefined; alignY?: "none" | ... 3 more ... | undefined; } | undefined; } | undefined',
    '{ input?: string; action?: string; } | undefined',
    '(path: string, routerOptions: undefined) => void',
    'ReactNode[]',
    'number | number[]',
    'CellElement | CellElement[] | CellRenderer',
    '"none" | "auto" | "default" | "pointer" | "wait" | "text" | "move" | "help" | "notAllowed" | "progress" | "cell" | "crosshair" | "vertical" | "alias" | "copy" | "noDrop" | "grap" | ... 8 more ...',
    '"Accordion" | "Badge" | "Body" | "Button" | "Card" | "DateField" | "Dialog" | "Divider" | "Field" | "Footer" | "Header" | "Headline" | "Popover" | "HelpText" | "Image" | "Checkbox" | ... 21 more ... | "ComboBox"',
    'string | { [slot in keyof ThemeComponent<C>]?: string; }',
    'keyof NumberFormatOptionsCurrencyDisplayRegistry',
    'boolean | keyof NumberFormatOptionsUseGroupingRegistry | "true" | "false"',
    'keyof NumberFormatOptionsSignDisplayRegistry',
  ];

  if (!ignorePrettier.includes(val.type.name)) {
    let text = formatVoidFunctions(val.type.name);
    text = formatLongTypes(text);

    return await prettier
      .format(text, {
        printWidth: 85,
        parser: 'typescript',
      })
      .then(text => formatVoidFunctions(text))
      .then(text => formatLongTypes(text))
      .then(text =>
        codeToHtml(text.replace(/^\((.*)\)$/, '$1'), {
          lang: 'ts',
          theme: 'min-light',
        })
      );
  }
}

for await (const file of files) {
  const docs = parser.parse(file);

  if (docs.length === 0) {
    continue;
  }

  const { name } = path.parse(file);
  const props = docs[0].props;

  output[name] = {};

  for (const key in props) {
    // Remove properties we do not need.
    const { parent, declarations, ...val } = props[key];

    if (val.name === 'width') {
      val.type.name = 'WidthProp';
      val.description =
        'Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width';
    }

    val.type.value = await transformTypeValue(val);

    if (val.defaultValue) {
      val.defaultValue.value = await transformDefaultValue(val);
    }

    output[name][key] = val;
  }
}

await fs.writeJson(outputFilePath, output);
console.log(`✅ Successfully generated props table!`);
