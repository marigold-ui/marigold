import { render, screen } from '@testing-library/react';
import React from 'react';
import { Container } from './Container';

test('supports default contentType content', () => {
  render(
    <Container data-testid="container">
      <p>Coding makes fun</p>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toMatchInlineSnapshot(`
    <div
      class="grid grid-cols-[minmax(0,_var(--maxWidth))_1fr_1fr] [&>*]:col-[1]"
      data-testid="container"
      style="--maxWidth: 45ch;"
    >
      <p>
        Coding makes fun
      </p>
    </div>
  `);
});

test('supports contentType header', () => {
  render(
    <Container contentType="header" data-testid="container">
      <p>sdf</p>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toMatchInlineSnapshot(`
    <div
      class="grid grid-cols-[minmax(0,_var(--maxWidth))_1fr_1fr] [&>*]:col-[1]"
      data-testid="container"
      style="--maxWidth: 25ch;"
    >
      <p>
        sdf
      </p>
    </div>
  `);
});

test('supports size small', () => {
  render(
    <Container size="small" data-testid="container">
      <p>sdf</p>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toMatchInlineSnapshot(`
    <div
      class="grid grid-cols-[minmax(0,_var(--maxWidth))_1fr_1fr] [&>*]:col-[1]"
      data-testid="container"
      style="--maxWidth: 20ch;"
    >
      <p>
        sdf
      </p>
    </div>
  `);
});

test('supports size large', () => {
  render(
    <Container size="large" data-testid="container">
      <p>sdf</p>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toMatchInlineSnapshot(`
    <div
      class="grid grid-cols-[minmax(0,_var(--maxWidth))_1fr_1fr] [&>*]:col-[1]"
      data-testid="container"
      style="--maxWidth: 60ch;"
    >
      <p>
        sdf
      </p>
    </div>
  `);
});

test('supports default align container left', () => {
  render(
    <Container data-testid="container">
      <p>sdf</p>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveClass(`[&>*]:col-[1]`);
});

test('supports align container center', () => {
  render(
    <Container align="center" data-testid="container">
      <p>sdf</p>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveClass(`[&>*]:col-[2]`);
});

test('supports align container right', () => {
  render(
    <Container align="right" data-testid="container">
      <p>sdf</p>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveClass(`[&>*]:col-[3]`);
});

test('supports default align items none', () => {
  render(
    <Container data-testid="container">
      <p>sdf</p>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).not.toHaveClass(`place-items`);
});

test('supports align items center', () => {
  render(
    <Container alignItems="center" data-testid="container">
      <p>sdf</p>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveClass(`place-items-center`);
});

test('supports align items right', () => {
  render(
    <Container alignItems="right" data-testid="container">
      <p>sdf</p>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveClass(`place-items-end`);
});
