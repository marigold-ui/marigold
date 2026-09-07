import {
  DEFAULT_CONTAINER_PADDING,
  getContainerPadding,
  measureOvershoot,
  measureScrollbarWidth,
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

const stubBoundaryWidth = (width: number) =>
  Object.defineProperty(window, 'visualViewport', {
    value: { width },
    configurable: true,
  });

afterEach(() => {
  // Own properties shadowing the native accessors; deleting restores them.
  // @ts-expect-error -- not optional on the real Window
  delete window.innerWidth;
  // @ts-expect-error -- not optional on the real Window
  delete window.visualViewport;
  document.documentElement.style.marginRight = '';
  document.body.style.marginRight = '';
});

describe('an overlay that locks scrolling', () => {
  test('measures nothing when no gutter is held back from the clip box', () => {
    stubInnerWidth(clipWidth());

    expect(measureOvershoot(true)).toBe(0);
  });

  test('measures the scrollbar, not the difference from innerWidth', () => {
    stubInnerWidth(clipWidth() + 999);

    expect(measureOvershoot(true)).toBe(measureScrollbarWidth());
    expect(measureOvershoot(true)).not.toBe(999);
  });

  test('never subtracts, so a wider clip box cannot pull the boundary outward', () => {
    stubInnerWidth(clipWidth() - 20);

    expect(measureOvershoot(true)).toBe(0);
  });

  test('ignores a body margin, which clips nothing', () => {
    stubInnerWidth(clipWidth());
    document.body.style.marginRight = '100px';

    expect(measureOvershoot(true)).toBe(0);
  });

  test('ignores a margin on the root element, which clips nothing either', () => {
    stubInnerWidth(clipWidth());
    document.documentElement.style.marginRight = '50px';

    expect(measureOvershoot(true)).toBe(0);
  });
});

describe('an overlay that leaves scrolling alone', () => {
  test('measures nothing while a scrollbar is on screen', () => {
    const clip = clipWidth();
    stubInnerWidth(clip + 15);
    stubBoundaryWidth(clip);

    expect(measureOvershoot(false)).toBe(0);
  });

  test('measures a gutter with no scrollbar drawn in it', () => {
    const clip = clipWidth();
    stubInnerWidth(clip + 15);
    stubBoundaryWidth(clip + 15);

    expect(measureOvershoot(false)).toBe(15);
  });

  test('keeps a fractional boundary fractional', () => {
    const clip = clipWidth();
    stubInnerWidth(clip + 4);
    stubBoundaryWidth(clip + 3.42);

    expect(measureOvershoot(false)).toBeCloseTo(3.42, 5);
  });

  test('never subtracts, so a wider clip box cannot pull the boundary outward', () => {
    const clip = clipWidth();
    stubInnerWidth(clip);
    stubBoundaryWidth(clip - 20);

    expect(measureOvershoot(false)).toBe(0);
  });
});

describe('getContainerPadding', () => {
  test('adds the overshoot to the default padding', () => {
    const clip = clipWidth();
    stubInnerWidth(clip + 40);
    stubBoundaryWidth(clip + 40);

    expect(getContainerPadding({ locksScroll: false })).toBe(
      DEFAULT_CONTAINER_PADDING + 40
    );
  });

  test('re-measures when the viewport changes', () => {
    const clip = clipWidth();

    stubInnerWidth(clip + 41);
    stubBoundaryWidth(clip + 41);
    expect(getContainerPadding({ locksScroll: false })).toBe(
      DEFAULT_CONTAINER_PADDING + 41
    );

    stubInnerWidth(clip + 42);
    stubBoundaryWidth(clip + 42);
    expect(getContainerPadding({ locksScroll: false })).toBe(
      DEFAULT_CONTAINER_PADDING + 42
    );
  });

  // The two states share an `innerWidth`, so a single cache slot handed one
  // overlay's answer to the other.
  test('re-measures when only the boundary moved', () => {
    const clip = clipWidth();

    stubInnerWidth(clip + 43);
    stubBoundaryWidth(clip + 43);
    expect(getContainerPadding({ locksScroll: false })).toBe(
      DEFAULT_CONTAINER_PADDING + 43
    );

    stubBoundaryWidth(clip);
    expect(getContainerPadding({ locksScroll: false })).toBe(
      DEFAULT_CONTAINER_PADDING
    );
  });

  test('keeps an answer per state, so the two do not evict each other', () => {
    const clip = clipWidth();
    stubInnerWidth(clip + 44);
    stubBoundaryWidth(clip);

    const locking = getContainerPadding();
    const passive = getContainerPadding({ locksScroll: false });

    expect(passive).toBe(DEFAULT_CONTAINER_PADDING);
    expect(locking).toBe(DEFAULT_CONTAINER_PADDING + measureScrollbarWidth());
    expect(getContainerPadding()).toBe(locking);
  });
});
