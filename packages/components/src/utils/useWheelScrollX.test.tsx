import { render, screen } from '@testing-library/react';
import { useRef } from 'react';
import { vi } from 'vitest';
import { useWheelScrollX } from './useWheelScrollX';

// A minimal harness so the hook is exercised on a real element carrying its
// native (non-passive) wheel listener, decoupled from any component's DOM.
const Harness = () => {
  const ref = useRef<HTMLDivElement>(null);
  useWheelScrollX(ref);
  return <div ref={ref} data-testid="scroller" />;
};

describe('useWheelScrollX', () => {
  // The unit-test project loads no CSS, so the element is never actually
  // scrollable here. We instead drive the handler's decision logic directly:
  // force the overflow inputs it reads and spy on the scroll it performs. A
  // raw WheelEvent is dispatched (not `fireEvent`) because userEvent has no
  // wheel API.
  const setup = ({
    scrollWidth = 1000,
    clientWidth = 200,
    scrollLeft = 0,
  }: {
    scrollWidth?: number;
    clientWidth?: number;
    scrollLeft?: number;
  } = {}) => {
    render(<Harness />);

    const el = screen.getByTestId('scroller');
    Object.defineProperty(el, 'scrollWidth', {
      value: scrollWidth,
      configurable: true,
    });
    Object.defineProperty(el, 'clientWidth', {
      value: clientWidth,
      configurable: true,
    });
    Object.defineProperty(el, 'scrollLeft', {
      value: scrollLeft,
      writable: true,
      configurable: true,
    });
    const scrollBy = vi.fn();
    el.scrollBy = scrollBy;

    return { el, scrollBy };
  };

  const wheel = (el: HTMLElement, init: WheelEventInit) =>
    el.dispatchEvent(
      new WheelEvent('wheel', { bubbles: true, cancelable: true, ...init })
    );

  test('scrolls horizontally on a vertical wheel when the element overflows', () => {
    const { el, scrollBy } = setup();

    wheel(el, { deltaY: 100 });

    expect(scrollBy).toHaveBeenCalledWith({ left: 100, behavior: 'instant' });
  });

  test('ignores the wheel when the element does not overflow', () => {
    const { el, scrollBy } = setup({ scrollWidth: 200, clientWidth: 200 });

    wheel(el, { deltaY: 100 });

    expect(scrollBy).not.toHaveBeenCalled();
  });

  test('leaves ctrl+wheel to the browser so zoom is not hijacked', () => {
    const { el, scrollBy } = setup();

    wheel(el, { deltaY: 100, ctrlKey: true });

    expect(scrollBy).not.toHaveBeenCalled();
  });

  test('leaves a horizontal-dominant gesture to native scroll', () => {
    const { el, scrollBy } = setup();

    wheel(el, { deltaX: 100, deltaY: 10 });

    expect(scrollBy).not.toHaveBeenCalled();
  });

  test('normalizes line-unit deltas (Firefox physical mouse)', () => {
    const { el, scrollBy } = setup();

    // deltaMode 1 = lines; one notch of 3 lines -> 3 * 16px.
    wheel(el, { deltaY: 3, deltaMode: 1 });

    expect(scrollBy).toHaveBeenCalledWith({ left: 48, behavior: 'instant' });
  });

  test('lets the page scroll past the element at the end (no scroll trap)', () => {
    // Scrolled to the far right; a further rightward wheel has nowhere to go.
    const { el, scrollBy } = setup({ scrollLeft: 800 });

    const scrolled = wheel(el, { deltaY: 100 });

    expect(scrollBy).not.toHaveBeenCalled();
    // Not cancelled, so the page can scroll instead.
    expect(scrolled).toBe(true);
  });

  test('lets the page scroll past the element at the start (no scroll trap)', () => {
    // At the far left; a leftward (negative) wheel has nowhere to go.
    const { el, scrollBy } = setup({ scrollLeft: 0 });

    const scrolled = wheel(el, { deltaY: -100 });

    expect(scrollBy).not.toHaveBeenCalled();
    expect(scrolled).toBe(true);
  });
});
