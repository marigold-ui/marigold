import { render, screen } from '@testing-library/react';

import { Layout } from './Layout';

test('default space is "0"', () => {
  render(
    <Layout
      data-testid="layout"
      areas={['header']}
      columns={['auto']}
      rows={['auto']}
    >
      <Layout.Slot name="header" />
    </Layout>
  );

  const layout = screen.getByTestId('layout');
  expect(layout).toHaveClass(`gap-0`);
});

test('allows to set spacing', () => {
  render(
    <Layout
      data-testid="layout"
      areas={['header']}
      columns={['auto']}
      rows={['auto']}
      space={1}
    >
      <Layout.Slot name="header" />
    </Layout>
  );

  const layout = screen.getByTestId('layout');
  expect(layout).toHaveClass(`gap-1`);
});

test('default height is "auto"', () => {
  render(
    <Layout
      data-testid="layout"
      areas={['header']}
      columns={['auto']}
      rows={['auto']}
    >
      <Layout.Slot name="header" />
    </Layout>
  );

  const layout = screen.getByTestId('layout');
  expect(layout).toHaveClass(`h-auto`);
});

test('allows to set height', () => {
  render(
    <Layout
      data-testid="layout"
      areas={['header']}
      columns={['auto']}
      rows={['auto']}
      height={96}
    >
      <Layout.Slot name="header" />
    </Layout>
  );

  const layout = screen.getByTestId('layout');
  expect(layout).toHaveClass(`h-96`);
});

test('allows to define a grid', () => {
  render(
    <Layout
      data-testid="layout"
      areas={['header', 'content', 'footer']}
      columns={['500px']}
      rows={['100px', 'auto', '100px']}
      height={96}
    >
      <Layout.Slot name="header" />
    </Layout>
  );

  const layout = screen.getByTestId('layout');
  expect(layout).toHaveStyle({
    'grid-template-areas': '"header"\n"content"\n"footer"',
    'grid-template-columns': '500px',
    'grid-template-rows': '100px auto 100px',
  });
});

test('converts numbers to fractions in a grid', () => {
  render(
    <Layout
      data-testid="layout"
      areas={['header', 'content', 'footer']}
      columns={[1]}
      rows={[1, 2, 1]}
      height={96}
    >
      <Layout.Slot name="header" />
    </Layout>
  );

  const layout = screen.getByTestId('layout');
  expect(layout).toHaveStyle({
    'grid-template-areas': '"header"\n"content"\n"footer"',
    'grid-template-columns': '1fr',
    'grid-template-rows': '1fr 2fr 1fr',
  });
});
