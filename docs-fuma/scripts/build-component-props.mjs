// @ts-check
import * as prettier from 'prettier';
import docgen from 'react-docgen-typescript';
import { codeToHtml } from 'shiki';
import { fileURLToPath } from 'url';
import { fs, globby, path } from 'zx';

/* eslint-disable no-useless-escape */

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
      'UNSAFE_selectionState',
      'UNSTABLE_portalContainer',
    ],
  },
  customComponentTypes: [
    'AutocompleteComponent',
    'CheckboxComponent',
    'ComboBoxComponent',
    'DialogComponent',
    'RadioComponent',
    'SelectListComponent',
    'BreadcrumbsComponent',
  ],
});

const transformDefaultValue = async val => {
  let x = val.defaultValue.value;
  x = /^[a-zA-Z]/.test(x) ? `"${x}"` : x;

  return await codeToHtml(`${x}`, {
    lang: 'ts',
    theme: 'min-light',
  });
};

const formatText = (text, pattern, replacementText) => {
  if (pattern.test(text)) {
    return text.replace(pattern, replacementText);
  }

  return text;
};

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

const replacePropName = property => {
  let spaceTypeName = 'GapSpaceProp';

  if (
    property.name === 'space' &&
    property.declarations !== undefined &&
    property.declarations.some(declaration =>
      ['Inset.tsx'].some(fileName => declaration.fileName.includes(fileName))
    )
  ) {
    spaceTypeName = 'PaddingSpaceProp';
  }

  const transformations = {
    width: {
      typeName: 'WidthProp',
    },
    space: {
      typeName: spaceTypeName,
    },
    height: {
      typeName: 'HeightProp',
    },
    p: {
      typeName: 'PaddingSpaceProp',
    },
    pb: {
      typeName: 'PaddingBottomProp',
    },
    pt: {
      typeName: 'PaddingTopProp',
    },
    pl: {
      typeName: 'PaddingLeftProp',
    },
    pr: {
      typeName: 'PaddingRightProp',
    },
    py: {
      typeName: 'PaddingSpacePropY',
    },
    px: {
      typeName: 'PaddingSpacePropX',
    },
    spaceY: {
      typeName: 'PaddingSpacePropY',
    },
    spaceX: {
      typeName: 'PaddingSpacePropX',
    },
    position: {
      typeName: 'ObjectFitProp',
    },
    fontSize: {
      typeName: 'FontSizeProp',
    },
    weight: {
      typeName: 'FontWeightProp',
    },
    cursor: {
      typeName: 'CursorProp',
    },
    orientation: {
      typeName: 'AlignmentProp',
    },
  };

  const transformation = transformations[property.name];
  if (transformation) {
    property.type.name = transformation.typeName;
  }
};

const transformTypeValue = async val => {
  //List of types prettier can't handle see https://prettier.io/playground
  const ignorePrettier = [
    'readonly any[]',
    'readonly string[]',
    'string | number | readonly string[]',
    'any[]',
    'string | number | readonly string[]',
    'string[]',
    '(number | "fit")[]',
    'TemplateValue[]',
    'Key | Key[] | null',
    '0 | "auto" | "full" | "fit" | "min" | "max" | "screen" | "svh" | "lvh" | "dvh" | "px" | "0.5" | 1 | "1.5" | 2 | "2.5" | 3 | "3.5" | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24 | 28 | ... 38 more ...',
    '{ vertical?: { alignY?: "none" | "center" | "top" | "bottom"; alignX?: "none" | "left" | "center" | "right"; } | undefined; horizontal?: { alignX?: "none" | "left" | "center" | "right" | undefined; alignY?: "none" | ... 3 more ... | undefined; } | undefined; } | undefined',
    '{ input?: string; action?: string; } | undefined',
    '(path: string, routerOptions: undefined) => void',
    'ReactNode[]',
    'number | number[]',
    'CellElement | CellElement[] | CellRenderer',
    '"none" | "auto" | "default" | "pointer" | "wait" | "text" | "move" | "help" | "notAllowed" | "progress" | "cell" | "crosshair" | "vertical" | "alias" | "copy" | "noDrop" | "grap" | ... 8 more ...',
    '"Accordion" | "Badge" | "Breadcrumbs" | "Button" | "Card" | "CloseButton" | "Collapsible" | "ContextualHelp" | "DateField" | "Dialog" | "Divider" | "Drawer" | "Field" | "Headline" | ... 32 more ... | "FileField"',
    'string | { [slot in keyof ThemeComponent<C>]?: string; }',
    'keyof NumberFormatOptionsCurrencyDisplayRegistry',
    'boolean | keyof NumberFormatOptionsUseGroupingRegistry | "true" | "false"',
    'keyof NumberFormatOptionsSignDisplayRegistry',
    'T[]',
    'ReactNode | ReactNode[]',
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
};

const sortPropsByNameAsc = props => {
  return Object.keys(props)
    .sort()
    .reduce((acc, currValue) => {
      acc[currValue] = props[currValue];
      return acc;
    }, {});
};

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const systemDir = path.resolve(__dirname, '../../packages/system/src');
const componentsDir = path.resolve(__dirname, '../../packages/components/src');
const outputFilePath = path.resolve(__dirname, '../lib/.registry/props.json');

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

for await (const file of files) {
  const docs = parser.parse(file);
  if (docs.length === 0) {
    continue;
  }

  const { name } = path.parse(file);
  const props = sortPropsByNameAsc(docs[0].props);

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
