import {
  DEFAULT_CONTAINER_PADDING,
  getContainerPadding,
  measureReservedGutter,
} from './containerPadding';

const clipWidth = () => {
  const probe = document.createElement('div');
  probe.style.cssText = 'position:fixed;left:0;right:0;height:0';
  document.body.appendChild(probe);
  const { width } = probe.getBoundingClientRect();
  probe.remove();

  return width;
};

const stubInnerWidth = (width: number) =>
  Object.defineProperty(window, 'innerWidth', {
    value: width,
    configurable: true,
  });

afterEach(() => {
  // An own property shadowing the native accessor; deleting restores it.
  // @ts-expect-error -- not optional on the real Window
  delete window.innerWidth;
  document.documentElement.style.marginRight = '';
  document.body.style.marginRight = '';
});

test('measures nothing when no gutter is held back from the clip box', () => {
  stubInnerWidth(clipWidth());

  expect(measureReservedGutter()).toBe(0);
});

test('measures the width held back from the clip box', () => {
  stubInnerWidth(clipWidth() + 15);

  expect(measureReservedGutter()).toBe(15);
});

test('rounds a fractional gutter up, so nothing is left sticking out', () => {
  stubInnerWidth(clipWidth() + 3.42);

  expect(measureReservedGutter()).toBe(4);
});

test('never subtracts, so a wider clip box cannot pull the boundary outward', () => {
  stubInnerWidth(clipWidth() - 20);

  expect(measureReservedGutter()).toBe(0);
});

// The clip propagates from the body to the viewport, so neither the body's box
// nor the root's is what clips — a child renders past both, out to the viewport
// edge. Measuring either one would fold the margin into the padding for good.
test('ignores a body margin, which clips nothing', () => {
  stubInnerWidth(clipWidth());
  document.body.style.marginRight = '100px';

  expect(measureReservedGutter()).toBe(0);
});

test('ignores a margin on the root element, which clips nothing either', () => {
  stubInnerWidth(clipWidth());
  document.documentElement.style.marginRight = '50px';

  expect(measureReservedGutter()).toBe(0);
});

test('adds the gutter to the default padding', () => {
  stubInnerWidth(clipWidth() + 15);

  expect(getContainerPadding()).toBe(DEFAULT_CONTAINER_PADDING + 15);
});

test('re-measures when the window width changes', () => {
  const clip = clipWidth();

  stubInnerWidth(clip);
  expect(getContainerPadding()).toBe(DEFAULT_CONTAINER_PADDING);

  stubInnerWidth(clip + 16);
  expect(getContainerPadding()).toBe(DEFAULT_CONTAINER_PADDING + 16);
});
