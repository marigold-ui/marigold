import { render, screen } from '@testing-library/react';
import { HeadingContext, Provider } from 'react-aria-components';
import { Basic } from './Title.stories';

test('renders as h2 by default', () => {
  render(<Basic.Component data-testid="title">Panel title</Basic.Component>);
  const el = screen.getByTestId('title');
  expect(el.tagName).toBe('H2');
  expect(el).toHaveTextContent('Panel title');
});

test('respects an explicit "level" prop', () => {
  render(
    <Basic.Component level={3} data-testid="title">
      Hi
    </Basic.Component>
  );
  expect(screen.getByTestId('title').tagName).toBe('H3');
});

test('applies the default Headline level-3 theme classes', () => {
  render(<Basic.Component data-testid="title">Hi</Basic.Component>);
  const el = screen.getByTestId('title');
  expect(el).toHaveClass('text-xl');
  expect(el).toHaveClass('font-semibold');
});

test('honours an explicit "size" prop from the Headline scale', () => {
  render(
    <Basic.Component size="level-1" data-testid="title">
      Hi
    </Basic.Component>
  );
  const el = screen.getByTestId('title');
  expect(el).toHaveClass('text-3xl');
  expect(el).toHaveClass('font-extrabold');
});

test('honours a "size" override injected via HeadingContext slot', () => {
  render(
    <Provider
      values={[
        [HeadingContext, { slots: { title: { size: 'level-2' } } } as never],
      ]}
    >
      <Basic.Component data-testid="title">Hi</Basic.Component>
    </Provider>
  );
  const el = screen.getByTestId('title');
  expect(el).toHaveClass('text-2xl');
  expect(el).toHaveClass('font-bold');
});

test('receives "level" from a HeadingContext slot', () => {
  render(
    <Provider values={[[HeadingContext, { slots: { title: { level: 4 } } }]]}>
      <Basic.Component data-testid="title">Hi</Basic.Component>
    </Provider>
  );
  expect(screen.getByTestId('title').tagName).toBe('H4');
});

test('concatenates a className from a HeadingContext slot (e.g. grid-area)', () => {
  render(
    <Provider
      values={[
        [
          HeadingContext,
          { slots: { title: { className: '[grid-area:title]' } } },
        ],
      ]}
    >
      <Basic.Component data-testid="title">Hi</Basic.Component>
    </Provider>
  );
  const el = screen.getByTestId('title');
  expect(el).toHaveClass('[grid-area:title]');
  expect(el).toHaveClass('text-xl');
});

test('participates in HeadingContext via the default "title" slot', () => {
  render(
    <Provider
      values={[
        [HeadingContext, { slots: { title: { className: 'context-class' } } }],
      ]}
    >
      <Basic.Component data-testid="title">Hi</Basic.Component>
    </Provider>
  );
  expect(screen.getByTestId('title')).toHaveClass('context-class');
});

test('forwards a ref to the underlying heading element', () => {
  const ref = { current: null as HTMLHeadingElement | null };
  render(
    <Basic.Component ref={ref} data-testid="title">
      Hi
    </Basic.Component>
  );
  expect(ref.current).not.toBeNull();
  expect(ref.current?.tagName).toBe('H2');
});

test('sets a CSS color variable from the color prop', () => {
  render(
    <Basic.Component color="emerald" data-testid="title">
      Hi
    </Basic.Component>
  );
  expect(screen.getByTestId('title').getAttribute('style')).toContain(
    'var(--color-emerald, emerald)'
  );
});
