import { render, screen } from '@testing-library/react';

import { Columns } from '@marigold/components';

// eslint-disable-next-line testing-library/no-node-access
const getColumnWrappers = (el: HTMLElement) => el.children!;

test('supports default space prop', () => {
  render(
    <Columns columns={[6, 6]} data-testid="columns">
      <div>column</div>
      <div>column</div>
    </Columns>
  );
  const column = screen.getByTestId(/columns/);
  expect(column).toMatchInlineSnapshot(`
<div
  class="flex flex-wrap items-stretch gap-0"
  data-testid="columns"
>
  <div
    class="flex-[--columnSize] basis-[calc((var(--collapseAt)_-_100%)_*_999)]"
    style="--columnSize: 6;"
  >
    <div>
      column
    </div>
  </div>
  <div
    class="flex-[--columnSize] basis-[calc((var(--collapseAt)_-_100%)_*_999)]"
    style="--columnSize: 6;"
  >
    <div>
      column
    </div>
  </div>
</div>
`);
});

test('supports custom space prop', () => {
  render(
    <Columns columns={[6, 6]} space={5} data-testid="columns">
      <div>column</div>
      <div>column</div>
    </Columns>
  );
  const column = screen.getByTestId(/columns/);
  expect(column).toHaveClass(`gap-5`);
});

test('supports default collapseAt prop', () => {
  render(
    <Columns columns={[12]} data-testid="columns">
      <div>columnOne</div>
    </Columns>
  );
  const [columnOne] = getColumnWrappers(screen.getByTestId(/columns/));
  expect(columnOne).toHaveStyle(`flexBasis : calc(( 0em - 100%) * 999)`);
});

test('supports custom collapseAt prop', () => {
  render(
    <Columns columns={[12]} collapseAt="50em" data-testid="columns">
      <div>columnOne</div>
    </Columns>
  );
  const [columnOne] = getColumnWrappers(screen.getByTestId(/columns/));
  expect(columnOne).toHaveStyle(`flexBasis : calc(( 50em - 100%) * 999)`);
});

test('supports columns with two values', () => {
  render(
    <Columns columns={[2, 10]} data-testid="columns">
      <div>columnOne</div>
      <div>columnTwo</div>
    </Columns>
  );
  const [columnOne, columnTwo] = getColumnWrappers(
    screen.getByTestId(/columns/)
  );
  expect(columnOne).toMatchInlineSnapshot(`
<div
  class="flex-[--columnSize] basis-[calc((var(--collapseAt)_-_100%)_*_999)]"
  style="--columnSize: 2;"
>
  <div>
    columnOne
  </div>
</div>
`);
  expect(columnTwo).toMatchInlineSnapshot(`
<div
  class="flex-[--columnSize] basis-[calc((var(--collapseAt)_-_100%)_*_999)]"
  style="--columnSize: 10;"
>
  <div>
    columnTwo
  </div>
</div>
`);
});

test('supports columns with three values', () => {
  render(
    <Columns columns={[2, 4, 6]} data-testid="columns">
      <div>columnOne</div>
      <div>columnTwo</div>
      <div>columnThree</div>
    </Columns>
  );
  const [columnOne, columnTwo, columnThree] = getColumnWrappers(
    screen.getByTestId(/columns/)
  );
  expect(columnOne).toMatchInlineSnapshot(`
<div
  class="flex-[--columnSize] basis-[calc((var(--collapseAt)_-_100%)_*_999)]"
  style="--columnSize: 2;"
>
  <div>
    columnOne
  </div>
</div>
`);
  expect(columnTwo).toMatchInlineSnapshot(`
<div
  class="flex-[--columnSize] basis-[calc((var(--collapseAt)_-_100%)_*_999)]"
  style="--columnSize: 4;"
>
  <div>
    columnTwo
  </div>
</div>
`);
  expect(columnThree).toMatchInlineSnapshot(`
<div
  class="flex-[--columnSize] basis-[calc((var(--collapseAt)_-_100%)_*_999)]"
  style="--columnSize: 6;"
>
  <div>
    columnThree
  </div>
</div>
`);
});

test('supports different types of children', () => {
  render(
    <Columns columns={[1, 1, 2]} data-testid="columns">
      <main>columnOne</main>
      <div>columnTwo</div>
      <aside>columnThree</aside>
    </Columns>
  );
  const [columnOne, columnTwo, columnThree] = getColumnWrappers(
    screen.getByTestId(/columns/)
  );
  expect(columnOne).toMatchInlineSnapshot(`
<div
  class="flex-[--columnSize] basis-[calc((var(--collapseAt)_-_100%)_*_999)]"
  style="--columnSize: 1;"
>
  <main>
    columnOne
  </main>
</div>
`);
  expect(columnTwo).toMatchInlineSnapshot(`
<div
  class="flex-[--columnSize] basis-[calc((var(--collapseAt)_-_100%)_*_999)]"
  style="--columnSize: 1;"
>
  <div>
    columnTwo
  </div>
</div>
`);
  expect(columnThree).toMatchInlineSnapshot(`
<div
  class="flex-[--columnSize] basis-[calc((var(--collapseAt)_-_100%)_*_999)]"
  style="--columnSize: 2;"
>
  <aside>
    columnThree
  </aside>
</div>
`);
});

test('throws error if columns length and children length are different', () => {
  // avoid that the error will be thrown in console during test run
  const spy = jest.spyOn(console, 'error');
  spy.mockImplementation(() => {});

  expect(() =>
    render(
      <Columns columns={[12]}>
        <div>columnOne</div>
        <div>columnTwo</div>
        <div>columnThree</div>
      </Columns>
    )
  ).toThrow('Columns: expected 1 children, got 3');
  spy.mockRestore();
});

test('supports stretching to full height', () => {
  render(
    <Columns columns={[1, 1, 2]} stretch data-testid="columns">
      <main>columnOne</main>
      <div>columnTwo</div>
      <aside>columnThree</aside>
    </Columns>
  );
  const container = screen.getByTestId(/columns/);
  expect(container).toMatchInlineSnapshot(`
<div
  class="flex flex-wrap items-stretch h-full gap-0"
  data-testid="columns"
>
  <div
    class="flex-[--columnSize] basis-[calc((var(--collapseAt)_-_100%)_*_999)]"
    style="--columnSize: 1;"
  >
    <main>
      columnOne
    </main>
  </div>
  <div
    class="flex-[--columnSize] basis-[calc((var(--collapseAt)_-_100%)_*_999)]"
    style="--columnSize: 1;"
  >
    <div>
      columnTwo
    </div>
  </div>
  <div
    class="flex-[--columnSize] basis-[calc((var(--collapseAt)_-_100%)_*_999)]"
    style="--columnSize: 2;"
  >
    <aside>
      columnThree
    </aside>
  </div>
</div>
`);
});

test('does work with non react elements', () => {
  render(
    <Columns columns={[1]} data-testid="columns">
      hello
    </Columns>
  );
  const container = screen.getByTestId(/columns/);
  expect(container).toHaveTextContent('hello');
});

test('support column fit', () => {
  render(
    <Columns columns={[12, 'fit']} data-testid="columns">
      <div>hello</div>
      <div data-testid="world">world</div>
    </Columns>
  );
  const container = screen.getByTestId(/columns/);
  expect(container).toHaveTextContent('hello');

  // eslint-disable-next-line testing-library/no-node-access
  const fitChild = container.lastChild as HTMLElement;
  expect(fitChild.className).toMatchInlineSnapshot(
    `"flex h-fit w-fit basis-[calc((var(--collapseAt)_-_100%)_*_999)]"`
  );
});
