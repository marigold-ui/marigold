import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './Text.stories';

const { Basic } = composeStories(stories);

test('renders a <div> element by default', () => {
  render(<Basic>text</Basic>);
  const text = screen.getByText(/text/);

  expect(text instanceof HTMLDivElement).toBeTruthy();
});

test('renders a <p>/<span> element', () => {
  render(
    <>
      <Basic as="p">paragraph</Basic>
      <Basic as="span">span</Basic>
    </>
  );
  const paragraph = screen.getByText(/paragraph/);
  const span = screen.getByText(/span/);

  expect(paragraph instanceof HTMLParagraphElement).toBeTruthy();
  expect(span instanceof HTMLSpanElement).toBeTruthy();
});

test('adheres to the "max text with" rule from container', () => {
  render(<Basic>text</Basic>);
  const text = screen.getByText(/text/);

  expect(text).toHaveClass('max-w-(--maxTextWidth)');
});

test('supports italic font style', () => {
  render(<Basic fontStyle="italic">italic</Basic>);
  const italic = screen.getByText(/italic/);

  expect(italic).toHaveClass('italic');
});

test('supports alignment', () => {
  render(
    <>
      <Basic align="left">left</Basic>
      <Basic align="center">center</Basic>
      <Basic align="right">right</Basic>
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
      <Basic cursor="pointer">pointer</Basic>
      <Basic cursor="notAllowed">not-allowed</Basic>
      <Basic cursor="default">default</Basic>
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
      <Basic weight="light">light</Basic>
      <Basic weight="bold">bold</Basic>
      <Basic weight="extrabold">extrabold</Basic>
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
      <Basic fontSize="xs">xs</Basic>
      <Basic fontSize="lg">lg</Basic>
      <Basic fontSize="3xl">3xl</Basic>
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
      <Basic wrap="wrap">wrap</Basic>
      <Basic wrap="noWrap">noWrap</Basic>
      <Basic wrap="balance">balance</Basic>
      <Basic wrap="pretty">pretty</Basic>
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
  render(<Basic whiteSpace={prop}>{prop}</Basic>);
  const el = screen.getByText(prop);
  expect(el).toHaveClass(className);
});
