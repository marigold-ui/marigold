/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { Aside } from './Aside';

test('default spacing is "none"', () => {
  render(
    <Aside>
      <div>aside</div>
      <div>content</div>
    </Aside>
  );

  const aside = screen.getByText(/aside/).parentElement?.parentElement;

  expect(aside).toHaveClass(`gap-0`);
});

test('accepts and uses spacing from theme', () => {
  render(
    <Aside space={5}>
      <div>aside</div>
      <div>content</div>
    </Aside>
  );
  const aside = screen.getByText(/aside/).parentElement?.parentElement;
  expect(aside).toHaveClass(`gap-5`);
});

test('aside is on the left by default', () => {
  render(
    <Aside>
      <div>aside</div>
      <div>content</div>
    </Aside>
  );

  const aside = screen.getByText(/aside/).parentElement;
  const content = screen.getByText(/content/).parentElement;
  expect(aside).toHaveClass('grow');
  expect(content).toHaveClass('grow-999');
});

test('allows to have aisde on the right', () => {
  render(
    <Aside side="right">
      <div>aside</div>
      <div>content</div>
    </Aside>
  );

  const aside = screen.getByText(/aside/).parentElement;
  const content = screen.getByText(/content/).parentElement;
  expect(aside).toHaveClass('grow-999');
  expect(content).toHaveClass('grow');
});

test('inherits asides children with by default', () => {
  render(
    <Aside>
      <div style={{ width: 50 }}>aside</div>
      <div>content</div>
    </Aside>
  );
  const aside = screen.getByText(/aside/);
  expect(aside).toHaveStyle(`width: 50px`);
  expect(aside).not.toHaveStyle(`flex-basis: 50px`);
});

test('allows to set a width for the aside element', () => {
  render(
    <Aside sideWidth="200px">
      <div>aside</div>
      <div>content</div>
    </Aside>
  );
  const aside = screen.getByText(/aside/).parentElement;
  expect(aside).toMatchInlineSnapshot(`
    <div
      class="grow basis-(--sideWidth)"
      style="--sideWidth: 200px;"
    >
      <div>
        aside
      </div>
    </div>
  `);
});

test('wraps at 50% by default', () => {
  render(
    <Aside>
      <div>aside</div>
      <div>content</div>
    </Aside>
  );
  const content = screen.getByText(/content/).parentElement;
  expect(content).toMatchInlineSnapshot(`
    <div
      class="basis-0 grow-999 [min-inline-size:var(--wrap)]"
      style="--wrap: 50%;"
    >
      <div>
        content
      </div>
    </div>
  `);
});

test('works with SSR', () => {
  // Fake emotions SSR rendering, where emotion inlines styles
  const SSRComponent = () => (
    <>
      <style data-testid="ssr-style">{`.ssr { background: 'hotpink' }`}</style>
      <span data-testid="actual-element">aside</span>
    </>
  );

  render(
    <Aside space={3} wrap="1%">
      <SSRComponent />
      <div>content</div>
    </Aside>
  );

  const style = screen.getByTestId('ssr-style');
  const aside = screen.getByTestId('actual-element').parentElement;

  // Yes, this tests implementation details, but I can not think of another way to test this
  expect(style).not.toHaveClass('grow');
  expect(aside).toHaveClass('grow');
});
