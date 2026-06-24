import { render, screen } from '@testing-library/react';
import { HeadingContext } from 'react-aria-components/Heading';
import { Provider } from 'react-aria-components/slots';
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

test('accepts the string form of "level"', () => {
  render(
    <Basic.Component level="3" data-testid="title">
      Hi
    </Basic.Component>
  );

  expect(screen.getByTestId('title').tagName).toBe('H3');
});

test('receives "level" from a HeadingContext slot', () => {
  render(
    <Provider values={[[HeadingContext, { slots: { title: { level: 4 } } }]]}>
      <Basic.Component data-testid="title">Hi</Basic.Component>
    </Provider>
  );

  expect(screen.getByTestId('title').tagName).toBe('H4');
});

test('local "level" prop wins over a HeadingContext slot', () => {
  render(
    <Provider values={[[HeadingContext, { slots: { title: { level: 4 } } }]]}>
      <Basic.Component level={3} data-testid="title">
        Hi
      </Basic.Component>
    </Provider>
  );

  expect(screen.getByTestId('title').tagName).toBe('H3');
});

test('receives className from a HeadingContext slot', () => {
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

  expect(screen.getByTestId('title')).toHaveClass('[grid-area:title]');
});

test('receives `as` from a HeadingContext slot', () => {
  const ctx = { slots: { title: { as: 'span' } } } as never;

  render(
    <Provider values={[[HeadingContext, ctx]]}>
      <Basic.Component data-testid="title">Hi</Basic.Component>
    </Provider>
  );

  expect(screen.getByTestId('title').tagName).toBe('SPAN');
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
