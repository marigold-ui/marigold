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
  expect(headline.tagName).toEqual('H1');
  expect(headline).toHaveClass(
    theme.components.Headline!.variants!.size['level-1'] as string
  );
});

test('headline accepts a variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Headline data-testid="headline" variant="one" />
    </ThemeProvider>
  );
  const headline = screen.getByTestId('headline');
  expect(headline).toHaveClass('font-small');
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

test('headline accepts other level', () => {
  render(
    <ThemeProvider theme={theme}>
      <Headline data-testid="headline" level={5} />
    </ThemeProvider>
  );
  const headline = screen.getByTestId('headline');
  expect(headline.tagName).toEqual('H5');
  expect(headline).toHaveClass(
    theme.components.Headline!.variants!.size['level-5'] as string
  );
});

test('get theme color', () => {
  render(
    <ThemeProvider theme={theme}>
      <Headline data-testid="headline" color="emerald" />
    </ThemeProvider>
  );

  const headline = screen.getByTestId('headline');
  expect(headline.style.getPropertyValue('--color')).toEqual(
    theme.colors!.emerald
  );
});

test('support string as level', () => {
  render(
    <ThemeProvider theme={theme}>
      <Headline data-testid="headline" level="2" />
    </ThemeProvider>
  );

  const headline = screen.getByTestId('headline');
  expect(headline.tagName).toEqual('H2');
  expect(headline).toHaveClass(
    theme.components.Headline!.variants!.size['level-2'] as string
  );
});
