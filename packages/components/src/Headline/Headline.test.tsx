import { render, screen } from '@testing-library/react';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { Headline } from './Headline';

const theme: Theme = {
  name: 'test',
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

    // @ts-expect-error TS18048
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
<h1
  class="m-0 font-black text-[2rem] max-w-(--maxHeadlineWidth) text-left"
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
  expect(headline).toMatchInlineSnapshot(`
<h5
  class="m-0 font-black text-base max-w-(--maxHeadlineWidth) text-left"
  data-testid="headline"
/>
`);
});

test('get theme color', () => {
  render(
    <ThemeProvider theme={theme}>
      <Headline data-testid="headline" color="emerald" />
    </ThemeProvider>
  );

  const headline = screen.getByTestId('headline');
  expect(headline).toMatchInlineSnapshot(`
    <h1
      class="m-0 font-black text-[2rem] max-w-(--maxHeadlineWidth) text-left"
      data-testid="headline"
    />
  `);
});

test('support string as level', () => {
  render(
    <ThemeProvider theme={theme}>
      <Headline data-testid="headline" level="2" />
    </ThemeProvider>
  );

  const headline = screen.getByTestId('headline');
  expect(headline).toMatchInlineSnapshot(`
<h2
  class="m-0 font-black mb-6 text-2xl max-w-(--maxHeadlineWidth) text-left"
  data-testid="headline"
/>
`);
});

test.each([
  { prop: 'none', className: 'leading-none' },
  { prop: 'tight', className: 'leading-tight' },
  { prop: 'snug', className: 'leading-snug' },
  { prop: 'normal', className: 'leading-normal' },
  { prop: 'relaxed', className: 'leading-relaxed' },
  { prop: 'loose', className: 'leading-loose' },
] as const)('supports lineHeight prop: %s', ({ prop, className }) => {
  render(
    <ThemeProvider theme={theme}>
      <Headline data-testid="headline" lineHeight={prop} />
    </ThemeProvider>
  );
  const headline = screen.getByTestId('headline');
  expect(headline).toHaveClass(className);
});
