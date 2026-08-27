import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { theme } from '@marigold/theme-rui';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { Stepper } from './Stepper';
import { Basic, HideLabels, States, WithHrefs } from './Stepper.stories';
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
  expect(items[4]).toHaveAttribute('data-state', 'upcoming');
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

  expect(screen.queryByText('Step 2 of 4')).not.toBeInTheDocument();
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
