import { render, screen } from '@testing-library/react';
import { Center } from './Center';

test('supports classnames per default and maxWidth prop', () => {
  render(
    <Center maxWidth="50ch" data-testid="center">
      <div>content</div>
    </Center>
  );
  const center = screen.getByTestId(/center/);
  expect(center).toMatchInlineSnapshot(`
<div
  class="ms-[auto] me-[auto] box-content flex flex-col items-center justify-center gap-0 max-w-(--maxWidth)"
  data-testid="center"
  style="--maxWidth: 50ch;"
>
  <div>
    content
  </div>
</div>
`);
});

test('supports maxWidth from theme sizes', () => {
  render(
    <Center maxWidth="300px" data-testid="center">
      <div>content</div>
    </Center>
  );
  const center = screen.getByTestId(/center/);
  expect(center).toMatchInlineSnapshot(`
<div
  class="ms-[auto] me-[auto] box-content flex flex-col items-center justify-center gap-0 max-w-(--maxWidth)"
  data-testid="center"
  style="--maxWidth: 300px;"
>
  <div>
    content
  </div>
</div>
`);
});

test('supports space prop', () => {
  render(
    <Center space={3} data-testid="center">
      <div>content</div>
      <div>content2</div>
    </Center>
  );
  const center = screen.getByTestId(/center/);
  expect(center).toHaveClass(`gap-3`);
});
