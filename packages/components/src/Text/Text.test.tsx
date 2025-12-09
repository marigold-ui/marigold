import { render, screen } from '@testing-library/react';
import { Basic } from './Text.stories';

test('renders a <div> element by default', () => {
  render(<Basic.Component>text</Basic.Component>);
  const text = screen.getByText(/text/);

  expect(text instanceof HTMLDivElement).toBeTruthy();
});

test('renders a <p>/<span> element', () => {
  render(
    <>
      <Basic.Component as="p">paragraph</Basic.Component>
      <Basic.Component as="span">span</Basic.Component>
    </>
  );
  const paragraph = screen.getByText(/paragraph/);
  const span = screen.getByText(/span/);

  expect(paragraph instanceof HTMLParagraphElement).toBeTruthy();
  expect(span instanceof HTMLSpanElement).toBeTruthy();
});

test('adheres to the "max text with" rule from container', () => {
  render(<Basic.Component>text</Basic.Component>);
  const text = screen.getByText(/text/);

  expect(text).toHaveClass('max-w-(--maxTextWidth)');
});

test('supports italic font style', () => {
  render(<Basic.Component fontStyle="italic">italic</Basic.Component>);
  const italic = screen.getByText(/italic/);

  expect(italic).toHaveClass('italic');
});

test('supports alignment', () => {
  render(
    <>
      <Basic.Component align="left">left</Basic.Component>
      <Basic.Component align="center">center</Basic.Component>
      <Basic.Component align="right">right</Basic.Component>
    </>
  );
  const left = screen.getByText(/left/);
  const center = screen.getByText(/center/);
  const right = screen.getByText(/right/);

  expect(left).toHaveClass('text-left');
  expect(center).toHaveClass('text-center');
  expect(right).toHaveClass('text-right');
});

test('supports cursor styles', () => {
  render(
    <>
      <Basic.Component cursor="pointer">pointer</Basic.Component>
      <Basic.Component cursor="notAllowed">not-allowed</Basic.Component>
      <Basic.Component cursor="default">default</Basic.Component>
    </>
  );
  const pointer = screen.getByText(/pointer/);
  const notAllowed = screen.getByText(/not-allowed/);
  const defaultCursor = screen.getByText(/default/);

  expect(pointer).toHaveClass('cursor-pointer');
  expect(notAllowed).toHaveClass('cursor-not-allowed');
  expect(defaultCursor).toHaveClass('cursor-default');
});

test('supports font weights', () => {
  render(
    <>
      <Basic.Component weight="light">light</Basic.Component>
      <Basic.Component weight="bold">bold</Basic.Component>
      <Basic.Component weight="extrabold">extrabold</Basic.Component>
    </>
  );
  const light = screen.getByText('light');
  const bold = screen.getByText('bold');
  const extrabold = screen.getByText('extrabold');

  expect(light).toHaveClass('font-light');
  expect(bold).toHaveClass('font-bold');
  expect(extrabold).toHaveClass('font-extrabold');
});

test('supports custom font sizes', () => {
  render(
    <>
      <Basic.Component fontSize="xs">xs</Basic.Component>
      <Basic.Component fontSize="lg">lg</Basic.Component>
      <Basic.Component fontSize="3xl">3xl</Basic.Component>
    </>
  );
  const fs12 = screen.getByText('xs');
  const fs24 = screen.getByText('lg');
  const fs48 = screen.getByText('3xl');

  expect(fs12).toHaveClass('text-xs');
  expect(fs24).toHaveClass('text-lg');
  expect(fs48).toHaveClass('text-3xl');
});

test('supports wrap prop', () => {
  render(
    <>
      <Basic.Component wrap="wrap">wrap</Basic.Component>
      <Basic.Component wrap="noWrap">noWrap</Basic.Component>
      <Basic.Component wrap="balance">balance</Basic.Component>
      <Basic.Component wrap="pretty">pretty</Basic.Component>
    </>
  );
  const wrap = screen.getByText(/wrap/);
  const noWrap = screen.getByText(/noWrap/);
  const balance = screen.getByText(/balance/);
  const pretty = screen.getByText(/pretty/);

  expect(wrap).toHaveClass('text-wrap');
  expect(noWrap).toHaveClass('text-nowrap');
  expect(balance).toHaveClass('text-balance');
  expect(pretty).toHaveClass('text-pretty');
});

test.each([
  { prop: 'normal', className: 'whitespace-normal' },
  { prop: 'nowrap', className: 'whitespace-nowrap' },
  { prop: 'pre', className: 'whitespace-pre' },
  { prop: 'preLine', className: 'whitespace-pre-line' },
  { prop: 'preWrap', className: 'whitespace-pre-wrap' },
  { prop: 'breakSpaces', className: 'whitespace-break-spaces' },
] as const)('supports whiteSpace prop: %s', ({ prop, className }) => {
  render(<Basic.Component whiteSpace={prop}>{prop}</Basic.Component>);
  const el = screen.getByText(prop);
  expect(el).toHaveClass(className);
});
