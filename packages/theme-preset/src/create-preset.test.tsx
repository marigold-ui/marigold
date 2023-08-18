import path from 'node:path';

import { defaultTheme } from '@marigold/system';

import { createPreset } from './create-preset';

test('create preset and merge it with defaultTheme', () => {
  const preset = createPreset('test', {
    content: ['my-path.ts'],
    theme: {
      extends: {
        colors: {
          primary: '#8080df',
          secondary: '#808080',
        },
      },
    },
  });

  expect(preset.important).toBe('[data-theme="test"]');
  expect(preset.theme?.extends.defaultTheme).toEqual(defaultTheme);
  expect(preset.theme).toMatchInlineSnapshot(`
    {
      "extends": {
        "colors": {
          "primary": "#8080df",
          "secondary": "#808080",
        },
        "defaultTheme": {
          "components": {},
          "name": "default",
          "screens": {
            "2xl": "1536px",
            "lg": "1024px",
            "md": "768px",
            "sm": "640px",
            "xl": "1280px",
          },
        },
      },
    }
  `);
});

test('content path is found in preset', () => {
  const root = path.resolve(__dirname, '..');
  const preset = createPreset('test', {
    content: [],
  });
  const contentPath = preset.content[0].replace(root, '');
  expect(preset.content.toString()).toMatch(contentPath.toString());
});
