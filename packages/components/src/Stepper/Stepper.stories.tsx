import type { Key } from 'react';
import { useState } from 'react';
import { expect, fn } from 'storybook/test';
import preview from '.storybook/preview';
import { Stepper } from './Stepper';

const meta = preview.meta({
  title: 'Components/Stepper',
  component: Stepper,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default'],
    },
    hideLabels: {
      control: 'boolean',
    },
    'aria-label': {
      control: 'text',
    },
  },
  args: {
    variant: 'default',
    hideLabels: false,
    'aria-label': 'Checkout progress',
    // Each story supplies its own steps via `render`; this only satisfies the
    // required prop on the meta args. Same as Breadcrumbs.
    children: [],
  },
});

export const Basic = meta.story({
  args: {
    selectedKey: 'plan',
    completedKeys: ['signin'],
  },
  render: args => (
    <Stepper {...args}>
      <Stepper.Item id="signin">Sign in</Stepper.Item>
      <Stepper.Item id="plan">Choose plan</Stepper.Item>
      <Stepper.Item id="pay">Pay</Stepper.Item>
      <Stepper.Item id="done">Done</Stepper.Item>
    </Stepper>
  ),
});

/**
 * All five states at once, in render priority order:
 * `disabled` > `error` > `current` > `completed` > `upcoming`.
 */
export const States = meta.story({
  args: {
    'aria-label': 'Step states',
    selectedKey: 'current',
    completedKeys: ['done'],
    errorKeys: ['failed'],
    disabledKeys: ['locked'],
  },
  render: args => (
    <Stepper {...args}>
      <Stepper.Item id="done">Completed</Stepper.Item>
      <Stepper.Item id="current">Current</Stepper.Item>
      <Stepper.Item id="failed">Error</Stepper.Item>
      <Stepper.Item id="locked">Disabled</Stepper.Item>
      <Stepper.Item id="later">Upcoming</Stepper.Item>
    </Stepper>
  ),
});

/**
 * The step is owned by the flow. Marigold never advances it, and never marks a
 * step complete on its own.
 */
export const Controlled = meta.story({
  tags: ['component-test'],
  args: {
    'aria-label': 'Onboarding progress',
  },
  render: function Render(args) {
    const steps = ['account', 'profile', 'invite'];
    const [selectedKey, setSelectedKey] = useState<Key>('profile');
    const completedKeys = steps.slice(0, steps.indexOf(selectedKey as string));

    return (
      <Stepper
        {...args}
        selectedKey={selectedKey}
        completedKeys={completedKeys}
        onSelectionChange={setSelectedKey}
      >
        <Stepper.Item id="account">Account</Stepper.Item>
        <Stepper.Item id="profile">Profile</Stepper.Item>
        <Stepper.Item id="invite">Invite team</Stepper.Item>
      </Stepper>
    );
  },
});

Controlled.test(
  'moves the current step when a completed step is activated',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /Account/ }));

    await expect(
      canvas.getByRole('button', { name: /Account/ })
    ).toHaveAttribute('aria-current', 'step');
  }
);

/**
 * A failed step stays reachable. That is the whole point of surfacing the
 * failure on the step instead of in a toast.
 */
export const Errored = meta.story({
  args: {
    'aria-label': 'Checkout progress',
    selectedKey: 'done',
    completedKeys: ['signin', 'plan'],
    errorKeys: ['pay'],
  },
  render: args => (
    <Stepper {...args}>
      <Stepper.Item id="signin">Sign in</Stepper.Item>
      <Stepper.Item id="plan">Choose plan</Stepper.Item>
      <Stepper.Item id="pay">Pay</Stepper.Item>
      <Stepper.Item id="done">Done</Stepper.Item>
    </Stepper>
  ),
});

/**
 * Steps that are real URLs. With a `RouterProvider` in the tree these route
 * client-side; without one they are ordinary links.
 */
export const WithHrefs = meta.story({
  args: {
    'aria-label': 'Checkout progress',
    selectedKey: 'plan',
    completedKeys: ['signin'],
  },
  render: args => (
    <Stepper {...args}>
      <Stepper.Item id="signin" href="/checkout/signin">
        Sign in
      </Stepper.Item>
      <Stepper.Item id="plan" href="/checkout/plan">
        Choose plan
      </Stepper.Item>
      <Stepper.Item id="pay" href="/checkout/pay">
        Pay
      </Stepper.Item>
    </Stepper>
  ),
});

WithHrefs.test(
  'activates a link step with Enter',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { onSelectionChange: fn() },
  },
  async ({ args, canvas, userEvent }) => {
    const step = canvas.getByRole('link', { name: /Sign in/ });
    step.focus();

    await userEvent.keyboard('{Enter}');

    await expect(args.onSelectionChange).toHaveBeenCalledWith('signin');
  }
);
