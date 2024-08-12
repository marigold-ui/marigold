import { render, screen } from '@testing-library/react';
import { Grid } from './Grid';

test('default space is "0"', () => {
  render(
    <Grid
      data-testid="layout"
      areas={['header']}
      columns={['auto']}
      rows={['auto']}
    >
      <Grid.Area name="header" />
    </Grid>
  );

  const layout = screen.getByTestId('layout');
  expect(layout).toHaveClass(`gap-0`);
});

test('allows to set spacing', () => {
  render(
    <Grid
      data-testid="layout"
      areas={['header']}
      columns={['auto']}
      rows={['auto']}
      space={1}
    >
      <Grid.Area name="header" />
    </Grid>
  );

  const layout = screen.getByTestId('layout');
  expect(layout).toHaveClass(`gap-1`);
});

test('default height is "auto"', () => {
  render(
    <Grid
      data-testid="layout"
      areas={['header']}
      columns={['auto']}
      rows={['auto']}
    >
      <Grid.Area name="header" />
    </Grid>
  );

  const layout = screen.getByTestId('layout');
  expect(layout).toHaveClass(`h-auto`);
});

test('allows to set height', () => {
  render(
    <Grid
      data-testid="layout"
      areas={['header']}
      columns={['auto']}
      rows={['auto']}
      height={96}
    >
      <Grid.Area name="header" />
    </Grid>
  );

  const layout = screen.getByTestId('layout');
  expect(layout).toHaveClass(`h-96`);
});

test('allows to define a grid', () => {
  render(
    <Grid
      data-testid="layout"
      areas={['header', 'content', 'footer']}
      columns={['500px']}
      rows={['100px', 'auto', '100px']}
      height={96}
    >
      <Grid.Area name="header" />
    </Grid>
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
    <Grid
      data-testid="layout"
      areas={['header', 'content', 'footer']}
      columns={[1]}
      rows={[1, 2, 1]}
      height={96}
    >
      <Grid.Area name="header" />
    </Grid>
  );

  const layout = screen.getByTestId('layout');
  expect(layout).toHaveStyle({
    'grid-template-areas': '"header"\n"content"\n"footer"',
    'grid-template-columns': '1fr',
    'grid-template-rows': '1fr 2fr 1fr',
  });
});
