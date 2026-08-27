import type { Key } from 'react';
import { useState } from 'react';
import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Form } from '../Form/Form';
import { Headline } from '../Headline/Headline';
import { RouterProvider } from '../RouterProvider/RouterProvider';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';
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
