import type { Key } from 'react';
import { useState } from 'react';
import { expect, fn, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Checkbox } from '../Checkbox/Checkbox';
import { Form } from '../Form/Form';
import { Headline } from '../Headline/Headline';
import { NumberField } from '../NumberField/NumberField';
import { Radio } from '../Radio/Radio';
import { RouterProvider } from '../RouterProvider/RouterProvider';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';
import { expectFocusRingContrast } from '../contrast.utils';
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
    children: [],
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
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

Basic.test(
  'draws no focus ring until a step is focused',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const step = canvas.getByRole('button', { name: /Sign in/ });

    await expect(getComputedStyle(step).outlineStyle).toBe('none');
  }
);

Basic.test(
  'shows a pointer cursor on a step that can be returned to',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const completed = canvas.getByRole('button', { name: /Sign in/ });

    await expect(getComputedStyle(completed).cursor).toBe('pointer');
  }
);

Basic.test(
  'shows no pointer cursor on a step that is still ahead',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const upcoming = canvas.getByText('Pay').parentElement;

    await expect(getComputedStyle(upcoming!).cursor).not.toBe('pointer');
  }
);

Basic.test(
  'draws the focus ring once a step has keyboard focus',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.tab();

    await expect(
      getComputedStyle(canvas.getByRole('button', { name: /Sign in/ }))
        .outlineStyle
    ).toBe('solid');
  }
);

/**
 * All five states at once, in render priority order:
 * `disabled` > `error` > `current` > `completed` > `upcoming`.
 *
 * The two overlapping steps carry `completed` plus a state that outranks it.
 * The connector follows the same order, so both leave a grey line behind them.
 * `current` is the one exception: a revisited step keeps its green connector.
 */
export const States = meta.story({
  args: {
    'aria-label': 'Step states',
    selectedKey: 'current',
    completedKeys: ['done', 'doneFailed', 'doneLocked'],
    errorKeys: ['failed', 'doneFailed'],
    disabledKeys: ['locked', 'doneLocked'],
  },
  render: args => (
    <Stepper {...args}>
      <Stepper.Item id="done">Completed</Stepper.Item>
      <Stepper.Item id="current">Current</Stepper.Item>
      <Stepper.Item id="failed">Error</Stepper.Item>
      <Stepper.Item id="locked">Disabled</Stepper.Item>
      <Stepper.Item id="doneFailed">Completed + error</Stepper.Item>
      <Stepper.Item id="doneLocked">Completed + disabled</Stepper.Item>
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
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    'aria-label': 'Onboarding progress',
  },
  render: function Render(args) {
    const [selectedKey, setSelectedKey] = useState<Key>('profile');
    const [completedKeys, setCompletedKeys] = useState<Key[]>(['account']);

    const select = (key: Key) => {
      setCompletedKeys(keys =>
        keys.includes(selectedKey) ? keys : [...keys, selectedKey]
      );
      setSelectedKey(key);
    };

    return (
      <Stepper
        {...args}
        selectedKey={selectedKey}
        completedKeys={completedKeys}
        onSelectionChange={select}
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

Controlled.test(
  'keeps the step ahead reachable after walking back',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /Account/ }));

    await expect(
      canvas.getByRole('button', { name: /Profile/ })
    ).toBeInTheDocument();
  }
);

const EVENT_STEPS = [
  { id: 'basics', label: 'Basic data' },
  { id: 'dates', label: 'Dates' },
  { id: 'venue', label: 'Venue' },
  { id: 'categories', label: 'Ticket categories' },
  { id: 'prices', label: 'Prices' },
  { id: 'discounts', label: 'Discounts' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'payment', label: 'Payment' },
  { id: 'texts', label: 'Texts' },
  { id: 'images', label: 'Images' },
  { id: 'preview', label: 'Preview' },
  { id: 'publish', label: 'Publish' },
];

/**
 * The case `hideLabels` exists for: twelve steps, where no amount of horizontal
 * space makes twelve labels fit inline. The labels are still authored, so a
 * screen reader still hears "Ticket categories"; sighted users get the markers
 * plus the counter, which is the only thing telling them the flow is twelve
 * steps long without counting circles.
 */
export const ManySteps = meta.story({
  args: {
    'aria-label': 'Event creation progress',
    hideLabels: true,
    selectedKey: 'prices',
    completedKeys: ['basics', 'dates', 'venue', 'categories'],
  },
  render: args => (
    <Stepper {...args}>
      {EVENT_STEPS.map(step => (
        <Stepper.Item key={step.id} id={step.id}>
          {step.label}
        </Stepper.Item>
      ))}
    </Stepper>
  ),
});

const CHECKOUT_ROUTES = [
  { id: 'signin', label: 'Sign in', href: '/checkout/signin' },
  { id: 'plan', label: 'Choose plan', href: '/checkout/plan' },
  { id: 'pay', label: 'Pay', href: '/checkout/pay' },
];

/**
 * Steps that are real URLs. A `RouterProvider` turns the clicks into
 * client-side routing, which is why this story swaps a panel instead of
 * navigating away; without one they are ordinary links that load a page.
 */
export const WithHrefs = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    'aria-label': 'Checkout progress',
  },
  render: function Render(args) {
    const [path, setPath] = useState('/checkout/plan');
    const [visited, setVisited] = useState(['/checkout/signin']);
    const current =
      CHECKOUT_ROUTES.find(route => route.href === path) ?? CHECKOUT_ROUTES[0];

    const navigate = (href: string) => {
      setVisited(paths => (paths.includes(path) ? paths : [...paths, path]));
      setPath(href);
    };

    return (
      <RouterProvider navigate={navigate}>
        <Stack space={4}>
          <Stepper
            {...args}
            selectedKey={current.id}
            completedKeys={CHECKOUT_ROUTES.filter(route =>
              visited.includes(route.href)
            ).map(route => route.id)}
          >
            {CHECKOUT_ROUTES.map(route => (
              <Stepper.Item key={route.id} id={route.id} href={route.href}>
                {route.label}
              </Stepper.Item>
            ))}
          </Stepper>
          <Text>Current route: {path}</Text>
        </Stack>
      </RouterProvider>
    );
  },
});

WithHrefs.test(
  'routes through the RouterProvider instead of leaving the page',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('link', { name: /Sign in/ }));

    await expect(
      canvas.getByText('Current route: /checkout/signin')
    ).toBeInTheDocument();
  }
);

WithHrefs.test(
  'keeps the step ahead a link after routing back',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('link', { name: /Sign in/ }));

    await expect(
      canvas.getByRole('link', { name: /Choose plan/ })
    ).toBeInTheDocument();
  }
);

WithHrefs.test(
  'activates a link step with Enter',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    canvas.getByRole('link', { name: /Sign in/ }).focus();

    await userEvent.keyboard('{Enter}');

    await expect(
      canvas.getByText('Current route: /checkout/signin')
    ).toBeInTheDocument();
  }
);

WithHrefs.test(
  'Keyboard focus draws a ring that clears 3:1 on a step link',
  async ({ canvas, userEvent }) => {
    const [link] = canvas.getAllByRole('link');

    link!.focus();
    await userEvent.tab();

    await userEvent.tab({ shift: true });

    await expect(link).toHaveFocus();
    await waitFor(() => expectFocusRingContrast(link!));
  }
);

/**
 * Long flows drop the labels visually so the markers still fit, but every label
 * is still authored and still read aloud.
 */
export const HideLabels = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    'aria-label': 'Event creation progress',
    hideLabels: true,
    selectedKey: 'categories',
    completedKeys: ['basics', 'dates'],
  },
  render: args => (
    <Stepper {...args}>
      <Stepper.Item id="basics">Basic data</Stepper.Item>
      <Stepper.Item id="dates">Dates</Stepper.Item>
      <Stepper.Item id="categories">Ticket categories</Stepper.Item>
      <Stepper.Item id="prices">Prices</Stepper.Item>
      <Stepper.Item id="publish">Publish</Stepper.Item>
    </Stepper>
  ),
});

const FORM_STEPS = [
  { id: 'contact', label: 'Contact' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'review', label: 'Review' },
];

const StepPanel = ({ step }: { step: Key }) => {
  if (step === 'contact') {
    return (
      <Stack space={4}>
        <Headline level={3}>Contact</Headline>
        <TextField label="Full name" />
        <TextField label="Email" type="email" />
      </Stack>
    );
  }

  if (step === 'delivery') {
    return (
      <Stack space={4}>
        <Headline level={3}>Delivery</Headline>
        <TextField label="Street and number" />
        <TextField label="City" />
      </Stack>
    );
  }

  return (
    <Stack space={4}>
      <Headline level={3}>Review</Headline>
      <Text>Check your details, then place the order.</Text>
    </Stack>
  );
};

/**
 * The stepper reports progress, it does not drive it: "Continue" owns both the
 * panel that is shown and the keys handed back to `<Stepper>`. Completed steps
 * stay clickable, so the user can jump back without losing what they finished.
 */
export const MultiStepForm = meta.story({
  tags: ['component-test'],
  args: {
    'aria-label': 'Order progress',
  },
  render: function Render(args) {
    const [index, setIndex] = useState(0);
    const [completed, setCompleted] = useState<Key[]>([]);
    const isLast = index === FORM_STEPS.length - 1;

    const goTo = (key: Key) =>
      setIndex(FORM_STEPS.findIndex(step => step.id === key));

    const advance = () => {
      setCompleted(done =>
        done.includes(FORM_STEPS[index].id)
          ? done
          : [...done, FORM_STEPS[index].id]
      );
      setIndex(current => current + 1);
    };

    return (
      <Stack space={8}>
        <Stepper
          {...args}
          selectedKey={FORM_STEPS[index].id}
          completedKeys={completed}
          onSelectionChange={goTo}
        >
          {FORM_STEPS.map(step => (
            <Stepper.Item key={step.id} id={step.id}>
              {step.label}
            </Stepper.Item>
          ))}
        </Stepper>

        <StepPanel step={FORM_STEPS[index].id} />

        <ButtonGroup>
          <Button
            variant="secondary"
            disabled={index === 0}
            onPress={() => setIndex(current => current - 1)}
          >
            Back
          </Button>
          <Button variant="primary" disabled={isLast} onPress={advance}>
            Continue
          </Button>
        </ButtonGroup>
      </Stack>
    );
  },
});

MultiStepForm.test(
  'swaps the panel content when Continue is pressed',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Continue' }));

    await expect(
      canvas.getByRole('textbox', { name: 'Street and number' })
    ).toBeInTheDocument();
  }
);

MultiStepForm.test(
  'marks the step just left as completed',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Continue' }));

    await expect(
      canvas.getByRole('button', { name: /Contact.*completed/ })
    ).toBeInTheDocument();
  }
);

MultiStepForm.test(
  'returns to an earlier step from the stepper itself',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Continue' }));
    await userEvent.click(canvas.getByRole('button', { name: /Contact/ }));

    await expect(
      canvas.getByRole('textbox', { name: 'Full name' })
    ).toBeInTheDocument();
  }
);

const CHECKOUT_STEPS = [
  { id: 'contact', label: 'Contact' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
];

const validateStep = (
  step: string,
  values: Record<string, string>
): Record<string, string> => {
  if (step === 'contact' && !values.email.includes('@')) {
    return { email: 'Enter a valid email address.' };
  }
  if (step === 'payment' && !/^\d{16}$/.test(values.card)) {
    return { card: 'The card number needs 16 digits.' };
  }
  return {};
};

/**
 * Where `errorKeys` earns its place: a step that fails validation is marked on
 * the stepper itself rather than only in a toast that disappears. The failing
 * fields keep their own messages, and because an errored step stays selectable
 * the user always has a way back to it.
 */
export const ValidationErrors = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    'aria-label': 'Checkout progress',
  },
  render: function Render(args) {
    const [index, setIndex] = useState(0);
    const [completed, setCompleted] = useState<Key[]>([]);
    const [failed, setFailed] = useState<Key[]>([]);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [values, setValues] = useState({ email: '', card: '' });
    const step = CHECKOUT_STEPS[index];

    const edit = (field: string) => (value: string) => {
      setValues(current => ({ ...current, [field]: value }));
      setFieldErrors({});
      setFailed(keys => keys.filter(key => key !== step.id));
    };

    const onContinue = () => {
      const failures = validateStep(step.id, values);
      setFieldErrors(failures);

      if (Object.keys(failures).length > 0) {
        setFailed(keys => (keys.includes(step.id) ? keys : [...keys, step.id]));
        return;
      }

      setCompleted(done =>
        done.includes(step.id) ? done : [...done, step.id]
      );
      setIndex(current => current + 1);
    };

    return (
      <Stack space={8}>
        <Stepper
          {...args}
          selectedKey={step.id}
          completedKeys={completed}
          errorKeys={failed}
          onSelectionChange={key =>
            setIndex(CHECKOUT_STEPS.findIndex(item => item.id === key))
          }
        >
          {CHECKOUT_STEPS.map(item => (
            <Stepper.Item key={item.id} id={item.id}>
              {item.label}
            </Stepper.Item>
          ))}
        </Stepper>

        <Form validationErrors={fieldErrors} unstyled>
          {step.id === 'contact' && (
            <TextField
              name="email"
              label="Email"
              value={values.email}
              onChange={edit('email')}
            />
          )}
          {step.id === 'payment' && (
            <TextField
              name="card"
              label="Card number"
              value={values.card}
              onChange={edit('card')}
            />
          )}
          {step.id === 'review' && <Text>Everything checks out.</Text>}
        </Form>

        <ButtonGroup>
          <Button
            variant="secondary"
            disabled={index === 0}
            onPress={() => setIndex(current => current - 1)}
          >
            Back
          </Button>
          <Button
            variant="primary"
            disabled={index === CHECKOUT_STEPS.length - 1}
            onPress={onContinue}
          >
            Continue
          </Button>
        </ButtonGroup>
      </Stack>
    );
  },
});

ValidationErrors.test(
  'marks the step as errored when its fields fail validation',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Continue' }));

    await expect(
      canvas.getByRole('button', { name: /Contact.*error/ })
    ).toBeInTheDocument();
  }
);

ValidationErrors.test(
  'shows the failing field its own message',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Continue' }));

    await expect(
      canvas.getByText('Enter a valid email address.')
    ).toBeInTheDocument();
  }
);

ValidationErrors.test(
  'clears the error and advances once the field is fixed',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Continue' }));
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'Email' }),
      'ada@example.com'
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Continue' }));

    await expect(
      canvas.getByRole('textbox', { name: 'Card number' })
    ).toBeInTheDocument();
  }
);

/**
 * Below the `sm` breakpoint the row turns into a counter, the current step's
 * label and a segmented track. Every segment is still the step's button or
 * link, so the user can tap back to a finished step.
 */
export const SmallScreen = Basic.extend({
  globals: { viewport: { value: 'smallScreen' } },
});

SmallScreen.test(
  'shows the counter instead of the full row',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    await expect(canvas.getByText('Step 2 of 4')).toBeVisible();
  }
);

SmallScreen.test(
  'returns to a finished step from its segment',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { onSelectionChange: fn() },
  },
  async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /Sign in/ }));

    await expect(args.onSelectionChange).toHaveBeenCalledWith('signin');
  }
);

SmallScreen.test(
  'draws the focus ring on a segment with keyboard focus',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.tab();

    const step = canvas.getByRole('button', { name: /Sign in/ });
    await expect(step).toHaveFocus();
    await waitFor(() => expectFocusRingContrast(step));
  }
);

/**
 * Twelve steps still fit a phone, because only the current label is shown and
 * the segments share the width. `hideLabels` changes nothing here.
 */
export const ManyStepsSmallScreen = meta.story({
  globals: { viewport: { value: 'extraSmallScreen' } },
  parameters: { surface: false },
  args: ManySteps.input.args,
  // The narrowest phone with 16px page gutters.
  render: args => (
    <div className="px-4">
      <Stepper {...args}>
        {EVENT_STEPS.map(step => (
          <Stepper.Item key={step.id} id={step.id}>
            {step.label}
          </Stepper.Item>
        ))}
      </Stepper>
    </div>
  ),
});

/**
 * A failed step that is not the current one turns its segment red, and the
 * counter line says how many need attention, so the error does not rest on
 * colour alone. A failed current step shows the warning on its label instead.
 */
export const ErrorsSmallScreen = meta.story({
  globals: { viewport: { value: 'smallScreen' } },
  args: {
    'aria-label': 'Event creation progress',
    selectedKey: 'prices',
    completedKeys: ['basics', 'venue', 'categories'],
    errorKeys: ['dates'],
    disabledKeys: ['discounts'],
  },
  render: args => (
    <Stepper {...args}>
      {EVENT_STEPS.slice(0, 7).map(step => (
        <Stepper.Item key={step.id} id={step.id}>
          {step.label}
        </Stepper.Item>
      ))}
    </Stepper>
  ),
});

/**
 * A long current label wraps onto a second line instead of being cut off.
 */
export const LongLabelSmallScreen = meta.story({
  globals: { viewport: { value: 'smallScreen' } },
  args: {
    'aria-label': 'Checkout progress',
    selectedKey: 'seats',
  },
  render: args => (
    <Stepper {...args}>
      <Stepper.Item id="event">Event</Stepper.Item>
      <Stepper.Item id="seats">
        Ticket categories and seat reservations for the whole season
      </Stepper.Item>
    </Stepper>
  ),
});

const RESALE_STEPS = [
  { id: 'tickets', label: 'Tickets' },
  { id: 'price', label: 'Price' },
  { id: 'payout', label: 'Payout' },
  { id: 'review', label: 'Review and offer' },
];

const ResalePanel = ({ step }: { step: Key }) => {
  if (step === 'tickets') {
    return (
      <Stack space={4}>
        <Headline level={2}>Which tickets do you want to sell?</Headline>
        <Text variant="muted">
          Pick the tickets you can no longer use. They stay valid until a buyer
          has paid, so you can still go if nobody buys them.
        </Text>
        <Checkbox.Group label="Tickets for Hamlet, Sat 14 March, 7:30 pm">
          <Checkbox value="a-4-12" label="Stalls, row 4, seat 12" />
          <Checkbox value="a-4-13" label="Stalls, row 4, seat 13" />
        </Checkbox.Group>
      </Stack>
    );
  }
  if (step === 'price') {
    return (
      <Stack space={4}>
        <Headline level={2}>Set your price</Headline>
        <Text variant="muted">
          Buyers see this price plus a service fee. You can ask for at most what
          you paid, €49.00 per ticket.
        </Text>
        <NumberField
          label="Price per ticket"
          defaultValue={45}
          maxValue={49}
          formatOptions={{ style: 'currency', currency: 'EUR' }}
        />
      </Stack>
    );
  }
  if (step === 'payout') {
    return (
      <Stack space={4}>
        <Headline level={2}>How do you want to be paid?</Headline>
        <Text variant="muted">
          We pay out within five working days after the event.
        </Text>
        <Radio.Group label="Payout method" defaultValue="bank">
          <Radio value="bank">Bank transfer</Radio>
          <Radio value="voucher">Voucher for your next booking</Radio>
        </Radio.Group>
        <TextField label="IBAN" placeholder="DE00 0000 0000 0000 0000 00" />
      </Stack>
    );
  }
  return (
    <Stack space={4}>
      <Headline level={2}>Check your offer</Headline>
      <Text>
        Two tickets for Hamlet, Sat 14 March, at €45.00 each, paid out by bank
        transfer.
      </Text>
      <Text variant="muted">
        Once a buyer pays, your tickets are cancelled and new ones are issued to
        them. You can withdraw the offer until then.
      </Text>
    </Stack>
  );
};

/**
 * A complete flow on a phone: reselling tickets in the customer account. The
 * stepper takes two lines above the content, names the current step, and
 * lets the user tap back to anything already finished.
 */
export const ResaleFlowSmallScreen = meta.story({
  tags: ['component-test'],
  globals: { viewport: { value: 'smallScreen' } },
  args: {
    'aria-label': 'Resale progress',
  },
  render: function Render(args) {
    const [index, setIndex] = useState(0);
    const [completed, setCompleted] = useState<Key[]>([]);
    const isLast = index === RESALE_STEPS.length - 1;
    const goTo = (key: Key) =>
      setIndex(RESALE_STEPS.findIndex(step => step.id === key));
    const advance = () => {
      setCompleted(done =>
        done.includes(RESALE_STEPS[index].id)
          ? done
          : [...done, RESALE_STEPS[index].id]
      );
      setIndex(current => Math.min(current + 1, RESALE_STEPS.length - 1));
    };

    return (
      <Stack space={6}>
        <Stepper
          {...args}
          selectedKey={RESALE_STEPS[index].id}
          completedKeys={completed}
          onSelectionChange={goTo}
        >
          {RESALE_STEPS.map(step => (
            <Stepper.Item key={step.id} id={step.id}>
              {step.label}
            </Stepper.Item>
          ))}
        </Stepper>
        <ResalePanel step={RESALE_STEPS[index].id} />
        <ButtonGroup>
          <Button
            variant="secondary"
            disabled={index === 0}
            onPress={() => setIndex(current => current - 1)}
          >
            Back
          </Button>
          <Button variant="primary" onPress={advance}>
            {isLast ? 'Offer for resale' : 'Continue'}
          </Button>
        </ButtonGroup>
      </Stack>
    );
  },
});

ResaleFlowSmallScreen.test(
  'walks to the last step and back from the stepper',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent, step }) => {
    await step('Continue to the last step', async () => {
      for (let i = 0; i < 3; i++) {
        await userEvent.click(canvas.getByRole('button', { name: 'Continue' }));
      }

      await expect(canvas.getByText('Step 4 of 4')).toBeVisible();
    });

    await step('Tap the finished price step', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /^Price/ }));

      await expect(
        canvas.getByRole('heading', { name: 'Set your price' })
      ).toBeInTheDocument();
    });
  }
);
