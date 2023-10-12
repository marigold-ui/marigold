import { render, screen } from '@testing-library/react';

import { Theme, ThemeProvider, cva } from '@marigold/system';

import { Headline } from './Headline';

const theme: Theme = {
  name: 'test',
  colors: {
    emerald: 'rgb(5 150 105);',
  },
  components: {
    Headline: cva('m-0 font-black', {
      variants: {
        size: {
          'level-1': 'text-[2rem]',
          'level-2': 'mb-6 text-2xl',
          'level-3': 'text-xl',
          'level-4': 'text-lg',
          'level-5': 'text-base',
          'level-6': 'text-[13px] uppercase',
        },
        variant: {
          one: 'font-small',
        },
      },
    }),
  },
};

test('renders as a "section" element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Headline data-testid="headline" />
    </ThemeProvider>
  );

  const headline = screen.getByTestId('headline');
  expect(headline instanceof HTMLHeadingElement).toBeTruthy();
});

test.each(['1', '2', '3', '4', '5', '6'])(
  'uses styles based on given level from theme sizes (%s)',
  lvl => {
    render(
      <ThemeProvider theme={theme}>
        <Headline data-testid="headline" level={lvl as any} />
      </ThemeProvider>
    );

    // @ts-expect-error
    const token = theme.components.Headline({ size: `level-${lvl}` });
    expect(token).toMatchSnapshot();
  }
);

test('uses "level-1" by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Headline data-testid="headline" />
    </ThemeProvider>
  );

  const headline = screen.getByTestId('headline');

  expect(headline).toMatchInlineSnapshot(`
<h3
  class="m-0 font-black text-[2rem] text-[--color] text-left"
  data-testid="headline"
/>
`);
});

test('headline accepts a variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Headline data-testid="headline" variant="one" />
    </ThemeProvider>
  );
  const headline = screen.getByTestId('headline');
  expect(headline).toMatchInlineSnapshot(`
<h3
  class="m-0 font-black text-[2rem] font-small text-[--color] text-left"
  data-testid="headline"
/>
`);
});

test('headline accepts align property', () => {
  render(
    <ThemeProvider theme={theme}>
      <Headline data-testid="headline" align="center" />
    </ThemeProvider>
  );
  const headline = screen.getByTestId('headline');
  expect(headline).toHaveClass(`text-center`);
});

test('get theme color', () => {
  render(
    <ThemeProvider theme={theme}>
      <Headline data-testid="headline" color="emerald" />
    </ThemeProvider>
  );

  const headline = screen.getByTestId('headline');
  expect(headline).toMatchInlineSnapshot(`
<h3
  class="m-0 font-black text-[2rem] text-[--color] text-left"
  data-testid="headline"
  style="--color: rgb(5 150 105);;"
/>
`);
});
