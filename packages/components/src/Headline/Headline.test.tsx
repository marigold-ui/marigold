import { render, screen } from '@testing-library/react';
import { Basic } from './Headline.stories';

test('renders as a "section" element', () => {
  render(<Basic.Component data-testid="headline" />);

  const headline = screen.getByTestId('headline');
  expect(headline instanceof HTMLHeadingElement).toBeTruthy();
});

test.each([
  { level: '1', textClass: 'text-3xl' },
  { level: '2', textClass: 'text-2xl' },
  { level: '3', textClass: 'text-xl' },
  { level: '4', textClass: 'text-lg' },
  { level: '5', textClass: 'text-base' },
  { level: '6', textClass: 'text-base' },
])(
  'uses styles based on given level from theme sizes (%s)',
  ({ level, textClass }) => {
    render(<Basic.Component data-testid="headline" level={level as any} />);
    const headline = screen.getByTestId('headline');
    expect(headline).toHaveClass(textClass);
  }
);

test('uses "level-1" by default', () => {
  render(<Basic.Component data-testid="headline" />);
  const headline = screen.getByTestId('headline');
  expect(headline).toMatchInlineSnapshot(`
    <h1
      class="text-3xl font-extrabold max-w-(--maxHeadlineWidth) text-left"
      data-testid="headline"
    >
      This is a Headline!!
    </h1>
  `);
});

test('headline accepts a variant', () => {
  render(<Basic.Component data-testid="headline" variant="one" />);
  const headline = screen.getByTestId('headline');
  expect(headline).toMatchInlineSnapshot(`
    <h1
      class="text-3xl font-extrabold max-w-(--maxHeadlineWidth) text-left"
      data-testid="headline"
    >
      This is a Headline!!
    </h1>
  `);
});

test('renders with custom children', () => {
  render(
    <Basic.Component data-testid="headline">
      Custom Headline Text
    </Basic.Component>
  );
  const headline = screen.getByTestId('headline');
  expect(headline).toHaveTextContent('Custom Headline Text');
});

test('supports multiple props combined', () => {
  render(
    <Basic.Component
      data-testid="headline"
      level="3"
      align="right"
      lineHeight="loose"
    />
  );
  const headline = screen.getByTestId('headline');
  expect(headline).toHaveClass('text-right');
  expect(headline).toHaveClass('leading-loose');
  expect(headline instanceof HTMLHeadingElement).toBeTruthy();
  expect(headline.tagName).toBe('H3');
});

test('supports align with different values', () => {
  const alignments = ['left', 'center', 'right'] as const;
  alignments.forEach(align => {
    const { unmount } = render(
      <Basic.Component data-testid="headline" align={align} />
    );
    const headline = screen.getByTestId('headline');
    expect(headline).toHaveClass(`text-${align}`);
    unmount();
  });
});

test('renders correct heading level element', () => {
  const levels = ['1', '2', '3', '4', '5', '6'] as const;
  levels.forEach(level => {
    const { unmount } = render(
      <Basic.Component data-testid="headline" level={level} />
    );
    const headline = screen.getByTestId('headline');
    expect(headline.tagName).toBe(`H${level}`);
    unmount();
  });
});

test('headline accepts other level', () => {
  render(<Basic.Component data-testid="headline" level={5} />);
  const headline = screen.getByTestId('headline');
  expect(headline).toMatchInlineSnapshot(`
    <h5
      class="text-base font-medium max-w-(--maxHeadlineWidth) text-left"
      data-testid="headline"
    >
      This is a Headline!!
    </h5>
  `);
});

test('get theme color', () => {
  render(<Basic.Component data-testid="headline" color="emerald" />);
  const headline = screen.getByTestId('headline');
  expect(headline).toMatchInlineSnapshot(`
    <h1
      class="text-3xl font-extrabold max-w-(--maxHeadlineWidth) text-left"
      data-testid="headline"
      style="color: var(--color-emerald, emerald);"
    >
      This is a Headline!!
    </h1>
  `);
});

test('support string as level', () => {
  render(<Basic.Component data-testid="headline" level="2" />);
  const headline = screen.getByTestId('headline');
  expect(headline).toMatchInlineSnapshot(`
    <h2
      class="text-2xl font-bold max-w-(--maxHeadlineWidth) text-left"
      data-testid="headline"
    >
      This is a Headline!!
    </h2>
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
  render(<Basic.Component data-testid="headline" lineHeight={prop} />);
  const headline = screen.getByTestId('headline');
  expect(headline).toHaveClass(className);
});
