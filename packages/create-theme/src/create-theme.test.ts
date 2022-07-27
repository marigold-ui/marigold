import { createTheme } from './create-theme';

test.each([
  ['breakpoints'],
  ['fontWeights'],
  ['lineHeights'],
  ['letterSpacings'],
  ['borderWidths'],
  ['radii'],
  ['zIndices'],
  ['opacities'],
])('created theme comes with defaults for "%s"', args => {
  const theme = createTheme({});
  expect(theme).toHaveProperty(args);
  // @ts-ignore
  expect(theme[args]).toMatchSnapshot();
});

test('allows to pick colors', () => {
  expect(createTheme({ colors: [] }).colors).toMatchInlineSnapshot(`{}`);
  expect(createTheme({ colors: ['brand'] }).colors).toMatchInlineSnapshot(`
    {
      "brand": {
        "primary": "#fa8005",
      },
    }
  `);
  expect(createTheme({ colors: ['red', 'blue', 'violet'] }).colors)
    .toMatchInlineSnapshot(`
    {
      "blue": {
        "00": "#e7f5ff",
        "10": "#d0ebff",
        "20": "#a5d8ff",
        "30": "#74c0fc",
        "40": "#4dabf7",
        "50": "#339af0",
        "60": "#228be6",
        "70": "#1c7ed6",
        "80": "#1971c2",
        "90": "#1864ab",
      },
      "red": {
        "00": "#fff5f5",
        "10": "#ffe3e3",
        "20": "#ffc9c9",
        "30": "#ffa8a8",
        "40": "#ff8787",
        "50": "#ff6b6b",
        "60": "#fa5252",
        "70": "#f03e3e",
        "80": "#e03131",
        "90": "#c92a2a",
      },
      "violet": {
        "00": "#f3f0ff",
        "10": "#e5dbff",
        "20": "#d0bfff",
        "30": "#b197fc",
        "40": "#9775fa",
        "50": "#845ef7",
        "60": "#7950f2",
        "70": "#7048e8",
        "80": "#6741d9",
        "90": "#5f3dc4",
      },
    }
  `);
});

test('allows to add custom colors', () => {
  expect(
    createTheme({
      colors: [
        'violet',
        { name: 'red', value: '#ff0000' },
        { name: 'blue', value: '#0000ff' },
        {
          name: 'unicorn',
          value: {
            one: '#fffafa',
            two: '#fff7b7',
            three: '#ffc6fb',
            four: '#d6b9ff',
            five: '#c188d7',
          },
        },
      ],
    }).colors
  ).toMatchInlineSnapshot(`
    {
      "blue": "#0000ff",
      "red": "#ff0000",
      "unicorn": {
        "five": "#c188d7",
        "four": "#d6b9ff",
        "one": "#fffafa",
        "three": "#ffc6fb",
        "two": "#fff7b7",
      },
      "violet": {
        "00": "#f3f0ff",
        "10": "#e5dbff",
        "20": "#d0bfff",
        "30": "#b197fc",
        "40": "#9775fa",
        "50": "#845ef7",
        "60": "#7950f2",
        "70": "#7048e8",
        "80": "#6741d9",
        "90": "#5f3dc4",
      },
    }
  `);
});

test('allows to set fonts', () => {
  expect(
    createTheme({
      fonts: { body: 'Arial', heading: 'Gothic' },
    }).fonts
  ).toMatchInlineSnapshot(`
    {
      "body": "Arial",
      "heading": "Gothic",
    }
  `);
});

test('uses fallback fonts if none provided', () => {
  expect(createTheme({}).fonts).toMatchInlineSnapshot(`
    {
      "mono": "Dank Mono,Operator Mono,Inconsolata,Fira Mono,ui-monospace,SF Mono,Monaco,Droid Sans Mono,Source Code Pro,monospace",
      "sans": "system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif",
      "serif": "ui-serif,serif",
    }
  `);
});

test('uses fixed values for typography by default', () => {
  expect(createTheme({}).fontSizes).toMatchInlineSnapshot(`
    {
      "large-1": "2.5rem",
      "large-2": "3rem",
      "large-3": "3.5rem",
      "medium-1": "1.1rem",
      "medium-2": "1.25rem",
      "medium-3": "1.5rem",
      "medium-4": "2rem",
      "small-1": ".5rem",
      "small-2": ".75rem",
      "small-3": "1rem",
    }
  `);

  expect(createTheme({}).fontSizes).toEqual(
    createTheme({ typography: 'fixed' }).fontSizes
  );
});

test('allow to use fluid typography', () => {
  expect(createTheme({ typography: 'fluid' }).fontSizes).toMatchInlineSnapshot(`
    {
      "large-1": "clamp(2rem, 9vw, 3.5rem)",
      "large-2": "clamp(3.5rem, 12vw, 5rem)",
      "medium-1": "clamp(1rem, 4vw, 1.5rem)",
      "medium-2": "clamp(1.5rem, 6vw, 2.5rem)",
      "small-1": "clamp(.75rem, 2vw, 1rem)",
    }
  `);
});

test('uses fixed values for dimensaions by default', () => {
  expect(createTheme({}).space).toMatchInlineSnapshot(`
    {
      "large-1": "2rem",
      "large-2": "3rem",
      "large-3": "4rem",
      "large-4": "5rem",
      "medium-1": "1.25rem",
      "medium-2": "1.5rem",
      "medium-3": "1.75rem",
      "none": 0,
      "small-1": ".25rem",
      "small-2": ".5rem",
      "small-3": "1rem",
    }
  `);
  expect(createTheme({}).space).toMatchInlineSnapshot(`
    {
      "large-1": "2rem",
      "large-2": "3rem",
      "large-3": "4rem",
      "large-4": "5rem",
      "medium-1": "1.25rem",
      "medium-2": "1.5rem",
      "medium-3": "1.75rem",
      "none": 0,
      "small-1": ".25rem",
      "small-2": ".5rem",
      "small-3": "1rem",
    }
  `);

  expect(createTheme({}).space).toEqual(
    createTheme({ dimensions: 'fixed' }).space
  );
  expect(createTheme({}).sizes).toEqual(
    createTheme({ dimensions: 'fixed' }).sizes
  );
});

test('allows to use fluid dimensions', () => {
  expect(createTheme({ dimensions: 'fluid' }).space).toMatchInlineSnapshot(`
    {
      "large-1": "clamp(2rem, 4vw, 3rem)",
      "large-2": "clamp(4rem, 5vw, 5rem)",
      "large-3": "clamp(5rem, 7vw, 7.5rem)",
      "medium-1": "clamp(1rem, 2vw, 1.5rem)",
      "medium-2": "clamp(1.5rem, 3vw, 2rem)",
      "none": 0,
      "small-1": "clamp(.5rem, 1vw, 1rem)",
    }
  `);
  expect(createTheme({ dimensions: 'fluid' }).sizes).toMatchInlineSnapshot(`
    {
      "large-1": "clamp(10rem, 20vw, 15rem)",
      "large-2": "clamp(15rem, 30vw, 20rem)",
      "large-3": "clamp(20rem, 40vw, 30rem)",
      "medium-1": "clamp(4rem, 5vw, 5rem)",
      "medium-2": "clamp(5rem, 7vw, 7.5rem)",
      "medium-3": "clamp(7.5rem, 10vw, 10rem)",
      "none": 0,
      "small-1": "clamp(1rem, 2vw, 1.5rem)",
      "small-2": "clamp(1.5rem, 3vw, 2rem)",
      "small-3": "clamp(2rem, 4vw, 3rem)",
    }
  `);
});

test('allows to add component styles', () => {
  const { components } = createTheme({
    colors: ['brand', 'red'],
    components: {
      Badge: {
        base: {
          color: 'brand.primary',
        },
      },
    },
  });

  expect({ components }).toMatchInlineSnapshot(`
    {
      "components": {
        "Badge": {
          "base": {
            "color": "brand.primary",
          },
        },
      },
    }
  `);
});
