import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, vi } from 'vitest';
import { page, userEvent as pointer } from 'vitest/browser';
import { theme } from '@marigold/theme-rui';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { Stepper } from './Stepper';
import {
  Basic,
  HideLabels,
  LongLabelSmallScreen,
  ManySteps,
  ManyStepsSmallScreen,
  States,
  WithHrefs,
} from './Stepper.stories';
import { StepperItem } from './StepperItem';

test('renders a navigation landmark wrapping an ordered list of steps', () => {
  render(<Basic.Component />);

  const nav = screen.getByRole('navigation', { name: 'Checkout progress' });

  expect(nav).toBeInTheDocument();
  expect(within(nav).getByRole('list')).toBeInTheDocument();
  expect(within(nav).getAllByRole('listitem')).toHaveLength(4);
});

test('falls back to a localized landmark label when none is given', () => {
  render(<Basic.Component aria-label={undefined} />);

  expect(
    screen.getByRole('navigation', { name: 'Progress' })
  ).toBeInTheDocument();
});

test('marks the selected step with aria-current', () => {
  render(<Basic.Component />);

  expect(screen.getByRole('button', { name: /Choose plan/ })).toHaveAttribute(
    'aria-current',
    'step'
  );
});

test('exposes position and state to screen readers on every step', () => {
  render(<Basic.Component />);

  expect(screen.getByText('Step 1 of 4, completed')).toBeInTheDocument();
  expect(screen.getByText('Step 2 of 4, current step')).toBeInTheDocument();
  expect(screen.getByText('Step 3 of 4, not completed')).toBeInTheDocument();
});

test('derives data-state for each step in priority order', () => {
  render(<States.Component />);

  const items = screen.getAllByRole('listitem');

  expect(items[0]).toHaveAttribute('data-state', 'completed');
  expect(items[1]).toHaveAttribute('data-state', 'current');
  expect(items[2]).toHaveAttribute('data-state', 'error');
  expect(items[3]).toHaveAttribute('data-state', 'disabled');
  expect(items[4]).toHaveAttribute('data-state', 'error');
  expect(items[5]).toHaveAttribute('data-state', 'disabled');
  expect(items[6]).toHaveAttribute('data-state', 'upcoming');
});

test('keeps the step number out of the accessible name', () => {
  render(<Basic.Component />);

  expect(screen.getByText('2')).toHaveAttribute('aria-hidden', 'true');
  expect(
    screen.getByRole('button', { name: /^Choose plan/ })
  ).toBeInTheDocument();
});

test('renders one fewer connector than there are steps', () => {
  render(<Basic.Component />);

  expect(screen.getAllByTestId('stepper-connector')).toHaveLength(3);
});

test('calls onSelectionChange when a completed step is activated', async () => {
  const user = userEvent.setup();
  const onSelectionChange = vi.fn();
  render(<Basic.Component onSelectionChange={onSelectionChange} />);

  await user.click(screen.getByRole('button', { name: /Sign in/ }));

  expect(onSelectionChange).toHaveBeenCalledWith('signin');
});

test('renders an upcoming step as inert text rather than a control', () => {
  render(<Basic.Component />);

  expect(screen.queryByRole('button', { name: /Pay/ })).not.toBeInTheDocument();
  expect(screen.getByText('Pay')).toBeInTheDocument();
});

test('renders a disabled step as inert text without aria-disabled', () => {
  render(<States.Component />);

  const disabledItem = screen.getAllByRole('listitem')[3];

  expect(within(disabledItem).queryByRole('button')).not.toBeInTheDocument();
  expect(within(disabledItem).getByText('Disabled')).not.toHaveAttribute(
    'aria-disabled'
  );
});

test('keeps an errored step selectable so it can be fixed', () => {
  render(<States.Component />);

  expect(screen.getByRole('button', { name: /Error/ })).toBeInTheDocument();
});

test('drops the errored-step guarantee when selectableKeys leaves it out', () => {
  render(<States.Component selectableKeys={['done']} />);

  expect(
    screen.queryByRole('button', { name: /Error/ })
  ).not.toBeInTheDocument();
});

test('lets selectableKeys override the default rule', () => {
  render(<Basic.Component selectableKeys={['done']} />);

  expect(screen.getByRole('button', { name: /Done/ })).toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: /Sign in/ })
  ).not.toBeInTheDocument();
});

test('never makes a disabled step selectable, even via selectableKeys', () => {
  render(<States.Component selectableKeys={['locked']} />);

  expect(
    screen.queryByRole('button', { name: /Disabled/ })
  ).not.toBeInTheDocument();
});

test('accepts completion that skips a step', () => {
  render(
    <Basic.Component selectedKey="done" completedKeys={['signin', 'pay']} />
  );

  const items = screen.getAllByRole('listitem');

  expect(items.map(item => item.getAttribute('data-state'))).toEqual([
    'completed',
    'upcoming',
    'completed',
    'current',
  ]);
});

test('renders a step with an href as a real link', () => {
  render(<WithHrefs.Component />);

  expect(screen.getByRole('link', { name: /Sign in/ })).toHaveAttribute(
    'href',
    '/checkout/signin'
  );
});

test('selects the first step by default when uncontrolled', () => {
  render(<Basic.Component selectedKey={undefined} />);

  expect(screen.getByRole('button', { name: /Sign in/ })).toHaveAttribute(
    'aria-current',
    'step'
  );
});

test('starts on defaultSelectedKey when uncontrolled', () => {
  render(<Basic.Component selectedKey={undefined} defaultSelectedKey="pay" />);

  expect(screen.getByRole('button', { name: /Pay/ })).toHaveAttribute(
    'aria-current',
    'step'
  );
});

test('moves the current step itself when uncontrolled', async () => {
  const user = userEvent.setup();
  render(<Basic.Component selectedKey={undefined} defaultSelectedKey="pay" />);

  await user.click(screen.getByRole('button', { name: /Sign in/ }));

  expect(screen.getByRole('button', { name: /Sign in/ })).toHaveAttribute(
    'aria-current',
    'step'
  );
});

test('keeps labels in the accessible name when they are visually hidden', () => {
  render(<HideLabels.Component />);

  expect(
    screen.getByRole('button', { name: /Ticket categories/ })
  ).toBeInTheDocument();
});

test('shows a visible step counter when the labels are hidden', () => {
  render(<HideLabels.Component />);

  expect(screen.getByText('Step 3 of 5')).toBeInTheDocument();
});

test('hides the step counter from the accessibility tree', () => {
  render(<HideLabels.Component />);

  expect(screen.getByText('Step 3 of 5')).toHaveAttribute(
    'aria-hidden',
    'true'
  );
});

test('shows no step counter while the labels are visible', () => {
  render(<Basic.Component />);

  expect(screen.getByText('Step 2 of 4')).not.toBeVisible();
});

test('marks the current step even when its state resolves to error', () => {
  render(<States.Component selectedKey="failed" />);

  const errored = screen.getAllByRole('listitem')[2];

  expect(errored).toHaveAttribute('data-current', 'true');
});

test('marks a completed step even when its state resolves to current', () => {
  render(<Basic.Component selectedKey="signin" completedKeys={['signin']} />);

  const revisited = screen.getAllByRole('listitem')[0];

  expect(revisited).toHaveAttribute('data-completed', 'true');
});

test('drops data-completed when a completed step also errors', () => {
  render(<Basic.Component completedKeys={['signin']} errorKeys={['signin']} />);

  const errored = screen.getAllByRole('listitem')[0];

  expect(errored).not.toHaveAttribute('data-completed');
});

test('drops data-completed when a completed step is disabled', () => {
  render(
    <Basic.Component completedKeys={['signin']} disabledKeys={['signin']} />
  );

  const locked = screen.getAllByRole('listitem')[0];

  expect(locked).not.toHaveAttribute('data-completed');
});

test('marks only the current step with data-current', () => {
  render(<Basic.Component />);

  const marked = screen
    .getAllByRole('listitem')
    .filter(item => item.hasAttribute('data-current'));

  expect(marked).toHaveLength(1);
});

test('keeps the list role against the stylesheet', () => {
  render(<Basic.Component />);

  expect(screen.getByRole('list')).toHaveAttribute('role', 'list');
});

test('ignores children that are not a Stepper.Item', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Stepper aria-label="Checkout progress">
        <Stepper.Item id="signin">Sign in</Stepper.Item>
        <span>Not a step</span>
      </Stepper>
    </MarigoldProvider>
  );

  expect(screen.getAllByRole('listitem')).toHaveLength(1);
});

test('renders nothing when there are no steps', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Stepper aria-label="Checkout progress">{[]}</Stepper>
    </MarigoldProvider>
  );

  expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
});

test('renders nothing when a step is used outside a Stepper', () => {
  render(<StepperItem id="contact">Contact</StepperItem>);

  expect(screen.queryByText('Contact')).not.toBeInTheDocument();
});

// Decorative parts, out of reach of role and text queries.
const stepParts = (item: HTMLElement) => {
  // eslint-disable-next-line testing-library/no-node-access
  const control = item.firstElementChild as HTMLElement;
  return {
    // eslint-disable-next-line testing-library/no-node-access
    marker: control.firstElementChild as HTMLElement,
    // eslint-disable-next-line testing-library/no-node-access
    segment: control.lastElementChild as HTMLElement,
  };
};

// Marker: indicator + number. Segment: progress fill + indicator.
const hasIndicator = (part: HTMLElement) =>
  // eslint-disable-next-line testing-library/no-node-access
  part.childElementCount === 2;

// First child in both the marker and the connector.
const firstPart = (part: HTMLElement) =>
  // eslint-disable-next-line testing-library/no-node-access
  part.firstElementChild as HTMLElement;

const currentLabelLine = (text: string) => {
  const line = screen
    .getAllByText(text)
    .find(el => el.getAttribute('aria-hidden') === 'true');
  if (!line) throw new Error(`No current label line reads "${text}"`);
  return line;
};

describe('on a small screen', () => {
  beforeEach(async () => {
    await page.viewport(375, 800);
  });

  afterEach(async () => {
    await page.viewport(1280, 720);
  });

  test('keeps reachable steps as controls', () => {
    render(<Basic.Component />);

    expect(screen.getByRole('button', { name: /Sign in/ })).toBeVisible();
    expect(screen.getByRole('button', { name: /Choose plan/ })).toBeVisible();
  });

  test('shows the step counter and the current label', () => {
    render(<Basic.Component />);

    expect(screen.getByText('Step 2 of 4')).toBeVisible();
    expect(currentLabelLine('Choose plan')).toBeVisible();
  });

  test('keeps the current label visible even with hideLabels', () => {
    render(<HideLabels.Component />);

    expect(currentLabelLine('Ticket categories')).toBeVisible();
  });

  test('keeps the counter line out of the accessible names', () => {
    render(<Basic.Component />);

    expect(
      screen.getByRole('button', { name: /Choose plan/ })
    ).not.toContainElement(currentLabelLine('Choose plan'));
    expect(screen.getAllByText('Choose plan')).toHaveLength(2);
  });

  test('flags errored steps other than the current one', () => {
    render(<States.Component />);

    expect(screen.getByText('2 steps need attention')).toBeVisible();
  });

  test('flags errored steps even when no step is current', () => {
    render(<Basic.Component selectedKey="missing" errorKeys={['plan']} />);

    expect(screen.getByText('1 step needs attention')).toBeVisible();
  });

  test('marks the current step on its segment only', () => {
    render(<Basic.Component />);

    const items = screen.getAllByRole('listitem');

    expect(hasIndicator(stepParts(items[1]).segment)).toBe(true);
    expect(hasIndicator(stepParts(items[1]).marker)).toBe(false);
    expect(hasIndicator(stepParts(items[0]).segment)).toBe(false);
  });

  test('marks a failed current step on its segment', () => {
    render(<Basic.Component errorKeys={['plan']} />);

    const items = screen.getAllByRole('listitem');

    expect(hasIndicator(stepParts(items[1]).segment)).toBe(true);
  });

  test('keeps a disabled current step dashed on its segment', () => {
    render(<Basic.Component disabledKeys={['plan']} />);

    const { segment } = stepParts(screen.getAllByRole('listitem')[1]);

    expect(hasIndicator(segment)).toBe(false);
    expect(getComputedStyle(segment).borderTopStyle).toBe('dashed');
  });

  test('flags nothing when only the current step has failed', () => {
    render(<Basic.Component errorKeys={['plan']} />);

    expect(screen.queryByText(/need/)).not.toBeInTheDocument();
  });

  test('gives every segment a touch target of at least 24 by 44 pixels', () => {
    render(<ManySteps.Component />);

    for (const step of screen.getAllByRole('button')) {
      const { width, height } = step.getBoundingClientRect();

      expect(width).toBeGreaterThanOrEqual(24);
      expect(height).toBeGreaterThanOrEqual(44);
    }
  });

  test('keeps twelve segments at 24px on a 320px phone with 16px gutters', async () => {
    await page.viewport(320, 800);
    render(<ManyStepsSmallScreen.Component />);

    const steps = screen.getAllByRole('listitem');

    expect(steps).toHaveLength(12);
    for (const step of steps) {
      expect(step.getBoundingClientRect().width).toBeGreaterThanOrEqual(24);
    }
  });

  test('activates a step when its segment bar is tapped', async () => {
    const onSelectionChange = vi.fn();
    render(<Basic.Component onSelectionChange={onSelectionChange} />);

    // A real pointer click, so anything painted over the step would intercept it.
    await pointer.click(screen.getByRole('button', { name: /Sign in/ }));

    expect(onSelectionChange).toHaveBeenCalledWith('signin');
  });

  test('keeps a long current label whole instead of truncating it', () => {
    render(<LongLabelSmallScreen.Component />);

    const currentLabel = currentLabelLine(
      'Ticket categories and seat reservations for the whole season'
    );

    expect(currentLabel.scrollWidth).toBeLessThanOrEqual(
      currentLabel.clientWidth
    );
    expect(getComputedStyle(currentLabel).textOverflow).not.toBe('ellipsis');
  });
});

describe('on a large screen', () => {
  test('hides the current label line', () => {
    render(<Basic.Component />);

    expect(currentLabelLine('Choose plan')).not.toBeVisible();
  });

  test('hides the attention count', () => {
    render(<States.Component />);

    expect(screen.getByText('2 steps need attention')).not.toBeVisible();
  });
});

describe('progress fill', () => {
  const filledShare = (connector: HTMLElement) =>
    firstPart(connector).getBoundingClientRect().width /
    connector.getBoundingClientRect().width;

  test('fills the connector behind a completed step', () => {
    render(<Basic.Component />);

    const [afterCompleted, afterCurrent] =
      screen.getAllByTestId('stepper-connector');

    expect(filledShare(afterCompleted)).toBe(1);
    expect(filledShare(afterCurrent)).toBe(0);
  });

  test('marks only the current step, on its marker', () => {
    render(<Basic.Component />);

    const items = screen.getAllByRole('listitem');

    expect(hasIndicator(stepParts(items[1]).marker)).toBe(true);
    expect(hasIndicator(stepParts(items[1]).segment)).toBe(false);
    expect(hasIndicator(stepParts(items[0]).marker)).toBe(false);
  });

  test('marks a failed current step too', () => {
    render(<Basic.Component errorKeys={['plan']} />);

    const { marker } = stepParts(screen.getAllByRole('listitem')[1]);

    expect(hasIndicator(marker)).toBe(true);
    // The error border would otherwise ring the current fill.
    expect(getComputedStyle(marker).borderTopColor).toBe('rgba(0, 0, 0, 0)');
  });

  test('keeps a disabled current step dashed on its marker', () => {
    render(<Basic.Component disabledKeys={['plan']} />);

    const { marker } = stepParts(screen.getAllByRole('listitem')[1]);

    expect(hasIndicator(marker)).toBe(false);
    expect(getComputedStyle(marker).borderTopStyle).toBe('dashed');
    expect(getComputedStyle(marker).borderTopColor).not.toBe(
      'rgba(0, 0, 0, 0)'
    );
  });

  test('fills the whole current marker, border included', () => {
    render(<Basic.Component />);

    const { marker } = stepParts(screen.getAllByRole('listitem')[1]);

    expect(firstPart(marker).getBoundingClientRect().width).toBe(
      marker.getBoundingClientRect().width
    );
  });
});
