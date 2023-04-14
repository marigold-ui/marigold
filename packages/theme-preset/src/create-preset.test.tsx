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

  expect(preset.theme?.extends.defaultTheme).toEqual(defaultTheme);

  expect(preset).toMatchInlineSnapshot(`
    {
      "content": [
        "/Users/sarahgosmann/projects/marigold/packages/theme-preset/node_modules/@marigold/components/**/**/*.tsx",
        "my-path.ts",
      ],
      "important": "[data-theme="test"]",
      "theme": {
        "extends": {
          "colors": {
            "primary": "#8080df",
            "secondary": "#808080",
          },
          "defaultTheme": {
            "screens": {
              "2xl": "1536px",
              "lg": "1024px",
              "md": "768px",
              "sm": "640px",
              "xl": "1280px",
            },
          },
        },
      },
    }
  `);
});
