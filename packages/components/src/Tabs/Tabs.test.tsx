import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Basic,
  WithDisabledKeys,
  WithRenderProps,
  WithSelectedTab,
} from './Tabs.stories';

const user = userEvent.setup();

test('rendering content correctly', () => {
  render(<Basic.Component />);

  // rendering the tab controller
  expect(screen.getAllByText('Mouse Settings')[0]).toBeInTheDocument();
  // rendering tabpanel
  expect(screen.getAllByText(/Adjust the sensitivity/)[0]).toBeInTheDocument();
});

test('supports disabled prop', () => {
  render(<WithDisabledKeys.Component />);
  const tab = screen.getAllByText('private')[0];
  expect(tab).toHaveAttribute('aria-disabled', 'true');
  // First tab content should still be visible since disabled tab can't be selected
  expect(
    screen.getAllByText(/This panel displays your profile/)[0]
  ).toBeVisible();
});

test('set defaultValue via props in tabs', () => {
  render(<WithSelectedTab.Component />);
  expect(
    screen.getAllByText(/You're currently in the Settings tab/)[0]
  ).toBeVisible();
});

test('open tabpanel when its tab controller is clicked', async () => {
  render(<Basic.Component />);
  const tab = screen.getAllByText('Keyboard Settings')[0];
  await user.click(tab);
  expect(screen.getAllByText(/Customize the key bindings/)[0]).toBeVisible();
});

test('allows tab navigation via keyboard', async () => {
  render(<Basic.Component />);
  const firstTab = screen.getAllByText('Mouse Settings')[0];

  // Focus the first tab
  await user.click(firstTab);

  // Navigate to next tab with arrow key
  await user.keyboard('{ArrowRight}');

  // Second tab should now be focused
  expect(screen.getAllByText('Keyboard Settings')[0]).toHaveFocus();
});

test('tabs have correct ARIA roles', () => {
  render(<Basic.Component />);

  const tabs = screen.getAllByRole('tab');
  expect(tabs.length).toBeGreaterThanOrEqual(3);

  const tabpanel = screen.getAllByRole('tabpanel')[0];
  expect(tabpanel).toBeInTheDocument();
});

test('tablist has correct container structure', () => {
  render(<Basic.Component />);

  const tablist = screen.getAllByRole('tablist')[0];
  expect(tablist).toBeInTheDocument();
  expect(tablist).toHaveAttribute('aria-label', 'Input settings');
});

test('supports render prop children on Tabs.Item', async () => {
  // Arrange
  render(<WithRenderProps.Component />);
  const securityTab = screen.getAllByRole('tab', { name: 'Security' })[0];

  // Assert (initial state)
  expect(
    screen.getAllByRole('tab', { name: 'General (current)' })[0]
  ).toBeInTheDocument();
  expect(securityTab).toBeInTheDocument();

  // Act
  await user.click(securityTab);

  // Assert
  expect(
    screen.getAllByRole('tab', { name: 'Security (current)' })[0]
  ).toBeInTheDocument();
  expect(
    screen.getAllByRole('tab', { name: 'General' })[0]
  ).toBeInTheDocument();
});

describe('translates a vertical mouse wheel into horizontal scroll', () => {
  // The unit-test project loads no theme CSS, so the row is never actually
  // scrollable here. We instead drive the handler's decision logic directly:
  // force the overflow inputs it reads and spy on the scroll it performs. A
  // raw WheelEvent is dispatched (not `fireEvent`) because userEvent has no
  // wheel API. The real-CSS integration is covered by the `Mobile` play test.
  const setup = ({
    scrollWidth = 1000,
    clientWidth = 200,
    scrollLeft = 0,
  }: {
    scrollWidth?: number;
    clientWidth?: number;
    scrollLeft?: number;
  } = {}) => {
    render(<Basic.Component />);

    // The scroll container is the wrapper around the tablist. It carries the
    // wheel listener and a stable `data-testid` so this doesn't couple to the
    // motion wrapper's DOM nesting.
    const el = screen.getAllByTestId('tabs-list-scroll')[0];
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

  test('scrolls the row on a vertical wheel when it overflows', () => {
    const { el, scrollBy } = setup();

    wheel(el, { deltaY: 100 });

    expect(scrollBy).toHaveBeenCalledWith({ left: 100, behavior: 'instant' });
  });

  test('ignores the wheel when the row does not overflow', () => {
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

  test('lets the page scroll past the row at the end (no scroll trap)', () => {
    // Scrolled to the far right; a further rightward wheel has nowhere to go.
    const { el, scrollBy } = setup({ scrollLeft: 800 });

    const scrolled = wheel(el, { deltaY: 100 });

    expect(scrollBy).not.toHaveBeenCalled();
    // Not cancelled, so the page can scroll instead.
    expect(scrolled).toBe(true);
  });

  test('lets the page scroll past the row at the start (no scroll trap)', () => {
    // At the far left; a leftward (negative) wheel has nowhere to go.
    const { el, scrollBy } = setup({ scrollLeft: 0 });

    const scrolled = wheel(el, { deltaY: -100 });

    expect(scrollBy).not.toHaveBeenCalled();
    expect(scrolled).toBe(true);
  });
});
