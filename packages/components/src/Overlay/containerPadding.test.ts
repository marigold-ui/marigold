import {
  DEFAULT_CONTAINER_PADDING,
  getContainerPadding,
  measureViewportOvershoot,
} from './containerPadding';

/**
 * The box that clips, measured the way the browser defines it rather than the
 * way the implementation happens to. Test browsers use overlay scrollbars, so
 * `scrollbar-gutter: stable` reserves nothing and the gutter itself cannot be
 * reproduced here — what these tests pin down is the arithmetic on top of it,
 * and that page-level margins leave it alone. The gutter case is verified by
 * hand in a headed Chrome; see the table in `containerPadding.ts`.
 */
const clipWidth = () => {
  const probe = document.createElement('div');
  probe.style.cssText = 'position:fixed;left:0;right:0;height:0';
  document.body.appendChild(probe);
  const { width } = probe.getBoundingClientRect();
  probe.remove();

  return width;
};

/** Stand in for react-aria's boundary, the one number it reads. */
const stubVisualViewport = (width: number) =>
  Object.defineProperty(window, 'visualViewport', {
    value: { width },
    configurable: true,
  });

afterEach(() => {
  // Own properties shadowing the native accessors; deleting restores them.
  // @ts-expect-error -- not optional on the real Window
  delete window.visualViewport;
  // @ts-expect-error -- not optional on the real Window
  delete window.innerWidth;
  document.documentElement.style.marginRight = '';
  document.body.style.marginRight = '';
});

test('measures nothing when react-aria already sees the box that clips', () => {
  stubVisualViewport(clipWidth());

  expect(measureViewportOvershoot()).toBe(0);
});

test('measures how far react-aria overshoots the box that clips', () => {
  stubVisualViewport(clipWidth() + 15);

  expect(measureViewportOvershoot()).toBe(15);
});

test('rounds a fractional overshoot up, so nothing is left sticking out', () => {
  stubVisualViewport(clipWidth() + 3.42);

  expect(measureViewportOvershoot()).toBe(4);
});

test('never subtracts, so a wider clip box cannot pull the boundary outward', () => {
  stubVisualViewport(clipWidth() - 20);

  expect(measureViewportOvershoot()).toBe(0);
});

// The clip propagates from the body to the viewport, so neither the body's box
// nor the root's is what clips — a child renders past both, out to the viewport
// edge. Measuring either one would fold the margin into the padding for good.
test('ignores a body margin, which clips nothing', () => {
  const before = clipWidth();
  document.body.style.marginRight = '100px';
  stubVisualViewport(before);

  expect(measureViewportOvershoot()).toBe(0);
});

test('ignores a margin on the root element, which clips nothing either', () => {
  const before = clipWidth();
  document.documentElement.style.marginRight = '50px';
  stubVisualViewport(before);

  expect(measureViewportOvershoot()).toBe(0);
});

test('adds the overshoot to the default padding', () => {
  stubVisualViewport(clipWidth() + 15);
  Object.defineProperty(window, 'innerWidth', {
    value: 1441,
    configurable: true,
  });

  expect(getContainerPadding()).toBe(DEFAULT_CONTAINER_PADDING + 15);
});

test('re-measures when the window width changes', () => {
  const clip = clipWidth();
  stubVisualViewport(clip);
  Object.defineProperty(window, 'innerWidth', {
    value: 1442,
    configurable: true,
  });
  expect(getContainerPadding()).toBe(DEFAULT_CONTAINER_PADDING);

  stubVisualViewport(clip + 15);
  Object.defineProperty(window, 'innerWidth', {
    value: 1443,
    configurable: true,
  });
  expect(getContainerPadding()).toBe(DEFAULT_CONTAINER_PADDING + 15);
});
