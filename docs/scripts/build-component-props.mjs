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

//TODO: remove
const file = [
  '/Users/marcelkoehler/WebstormProjects/marigold/packages/components/src/Card/Card.tsx',
];
const output = {};

async function transformDefaultValue(val) {
  let x = val.defaultValue.value;
  x = /^[a-zA-Z]/.test(x) ? `"${x}"` : x;

  return await codeToHtml(`${x}`, {
    lang: 'ts',
    theme: 'min-light',
  });
}

function formatText(text, pattern, replacementText) {
  if (pattern.test(text)) {
    return text.replace(pattern, replacementText);
  }

  return text;
}

const applyFormatSteps = text => {
  text = formatText(text, /\=>\s+void/g, '=> xxx');
  text = formatText(text, /<\.\.\.>/g, '<xxx>');

  return text;
};

const revertFormatSteps = text => {
  text = formatText(text, /\=>\s+xxx/g, '=> void');
  text = formatText(text, /<xxx>/g, '<...>');

  return text;
};

function replacePropName(val) {
  let spaceTypeName = 'GapSpaceProp';

  if (
    val.name === 'space' &&
    val.declarations !== undefined &&
    val.declarations.some(declaration =>
      ['Inset.tsx'].some(fileName => declaration.fileName.includes(fileName))
    )
  ) {
    spaceTypeName = 'PaddingSpaceProp';
  }

  //TODO: maybe move description to the right prop?
  const transformations = {
    width: {
      typeName: 'WidthProp',
      description:
        'Sets the width of the field. You can see allowed tokens [here](https://tailwindcss.com/docs/width).',
    },
    space: {
      typeName: spaceTypeName,
      description: `${val.description} You can see allowed tokens [here](../../introduction/design-tokens?theme=core#spacing).`,
    },
    height: {
      typeName: 'HeightProp',
      description: `${val.description} You can see allowed tokens [here](https://tailwindcss.com/docs/height).`,
    },
    p: {
      typeName: 'PaddingSpaceProp',
      description: `${val.description} You can see allowed tokens [here](../../introduction/design-tokens?theme=core#spacing).`,
    },
    pb: {
      typeName: 'PaddingBottomProp',
      description: `${val.description} You can see allowed tokens [here](../../introduction/design-tokens?theme=core#spacing).`,
    },
    pt: {
      typeName: 'PaddingTopProp',
      description: `${val.description} You can see allowed tokens [here](../../introduction/design-tokens?theme=core#spacing).`,
    },
    pl: {
      typeName: 'PaddingLeftProp',
      description: `${val.description} You can see allowed tokens [here](../../introduction/design-tokens?theme=core#spacing).`,
    },
    pr: {
      typeName: 'PaddingRightProp',
      description: `${val.description} You can see allowed tokens [here](../../introduction/design-tokens?theme=core#spacing).`,
    },
    py: {
      typeName: 'PaddingSpacePropY',
      description: `${val.description} You can see allowed tokens [here](../../introduction/design-tokens?theme=core#spacing).`,
    },
    px: {
      typeName: 'PaddingSpacePropX',
      description: `${val.description} You can see allowed tokens [here](../../introduction/design-tokens?theme=core#spacing).`,
    },
    spaceY: {
      typeName: 'PaddingSpacePropY',
      description: `${val.description} You can see allowed tokens [here](../../introduction/design-tokens?theme=core#spacing).`,
    },
    spaceX: {
      typeName: 'PaddingSpacePropX',
      description: `${val.description} You can see allowed tokens [here](../../introduction/design-tokens?theme=core#spacing).`,
    },
    position: {
      typeName: 'ObjectFitProp',
      description: `${val.description} You can see allowed tokens [here](https://tailwindcss.com/docs/object-position).`,
    },
    fontSize: {
      typeName: 'FontSizeProp',
      description: `${val.description} You can see allowed tokens [here](../../introduction/design-tokens?theme=core#typography).`,
    },
    weight: {
      typeName: 'FontWeightProp',
      description: `${val.description} You can see allowed tokens [here](../../introduction/design-tokens?theme=core#typography).`,
    },
    cursor: {
      typeName: 'CursorProp',
      description: `${val.description} You can see allowed tokens [here](https://tailwindcss.com/docs/cursor).`,
    },
    orientation: {
      typeName: 'AlignmentProp',
      description: `${val.description}`,
    },
  };

  const transformation = transformations[val.name];
  if (transformation) {
    val.type.name = transformation.typeName;
    val.description = transformation.description;
  }
}

async function transformTypeValue(val) {
  //List of types prettier can't handle see https://prettier.io/playground
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
  let text = val.type.name;

  if (!ignorePrettier.includes(text)) {
    text = applyFormatSteps(text);

    text = await prettier
      .format(text, {
        printWidth: 85,
        parser: 'typescript',
      })
      .then(text => revertFormatSteps(text));
  }

  return codeToHtml(text.replace(/^\((.*)\)$/, '$1'), {
    lang: 'ts',
    theme: 'min-light',
  });
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
    const { parent, ...val } = props[key];

    replacePropName(val);

    val.type.value = await transformTypeValue(val);

    if (val.defaultValue) {
      val.defaultValue.value = await transformDefaultValue(val);
    }

    output[name][key] = val;
  }
}

await fs.writeJson(outputFilePath, output);
console.log(`✅ Successfully generated props table!`);
