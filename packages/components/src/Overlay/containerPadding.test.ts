import {
  DEFAULT_CONTAINER_PADDING,
  getContainerPadding,
  measureViewportOvershoot,
} from './containerPadding';

/**
 * Stand in for the two numbers react-aria compares. A reserved scrollbar gutter
 * cannot be produced in a headless browser (they use overlay scrollbars), and
 * `documentElement.clientWidth` reports the viewport rather than the element's
 * own box, so neither value can be moved with CSS.
 */
const stubViewport = ({ visual, clip }: { visual: number; clip: number }) => {
  Object.defineProperty(window, 'visualViewport', {
    value: { width: visual },
    configurable: true,
  });
  Object.defineProperty(window, 'innerWidth', {
    value: visual,
    configurable: true,
  });
  Object.defineProperty(document.documentElement, 'clientWidth', {
    value: clip,
    configurable: true,
  });
};

afterEach(() => {
  // Own properties shadowing the native accessors; deleting restores them.
  // @ts-expect-error -- not optional on the real Window
  delete window.visualViewport;
  // @ts-expect-error -- not optional on the real Window
  delete window.innerWidth;
  // @ts-expect-error -- not optional on the real Element
  delete document.documentElement.clientWidth;
});

test('measures nothing when react-aria already sees the box that clips', () => {
  stubViewport({ visual: 1280, clip: 1280 });

  expect(measureViewportOvershoot()).toBe(0);
});

test('measures the gutter react-aria counts but the clip box does not', () => {
  stubViewport({ visual: 1280, clip: 1265 });

  expect(measureViewportOvershoot()).toBe(15);
});

test('rounds a fractional gutter up, so nothing is left sticking out', () => {
  stubViewport({ visual: 1280, clip: 1276.58 });

  expect(measureViewportOvershoot()).toBe(4);
});

test('never subtracts, so a wider clip box cannot pull the boundary outward', () => {
  stubViewport({ visual: 1280, clip: 1300 });

  expect(measureViewportOvershoot()).toBe(0);
});

// The measurement is cached against `window.innerWidth`, so the cases below use
// a distinct width each to make sure they measure rather than read a hit.
test('adds the overshoot to the default padding', () => {
  stubViewport({ visual: 1440, clip: 1425 });

  expect(getContainerPadding()).toBe(DEFAULT_CONTAINER_PADDING + 15);
});

test('re-measures when the window width changes', () => {
  stubViewport({ visual: 1024, clip: 1024 });
  expect(getContainerPadding()).toBe(DEFAULT_CONTAINER_PADDING);

  stubViewport({ visual: 900, clip: 885 });
  expect(getContainerPadding()).toBe(DEFAULT_CONTAINER_PADDING + 15);
});
