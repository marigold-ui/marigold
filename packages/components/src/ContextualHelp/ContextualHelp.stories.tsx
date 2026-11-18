import { expect, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Badge } from '../Badge/Badge';
import { Link } from '../Link/Link';
import { TextField } from '../TextField/TextField';
import { expectFocusRingContrast } from '../contrast.utils';
import { ContextualHelp } from './ContextualHelp';

const meta = preview.meta({
  title: 'Components/ContextualHelp',
  component: ContextualHelp,
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['help', 'info'],
    },
    placement: {
      control: 'select',
      options: [
        'bottom',
        'bottom left',
        'bottom right',
        'bottom start',
        'bottom end',
        'top',
        'top left',
        'top right',
        'top start',
        'top end',
        'left',
        'left top',
        'left bottom',
        'start',
        'start top',
        'start bottom',
        'right',
        'right top',
        'right bottom',
        'end',
        'end top',
        'end bottom',
      ],
    },
    size: {
      options: ['default'],
      defaultValue: 'default',
    },
    width: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    offset: {
      control: 'number',
    },
    defaultOpen: {
      control: 'boolean',
    },
    open: {
      control: 'boolean',
    },
    onOpenChange: {
      action: 'onOpenChange',
    },
  },
  args: {
    variant: 'help',
    placement: 'bottom start',
    size: 'medium',
    width: 'medium',
    offset: 8,
    defaultOpen: false,
    children: undefined,
  } as const,
});

export const Basic = meta.story({
  tags: ['component-test'],
  parameters: { surface: false },
  render: args => (
    <div className="flex h-96 items-center justify-center">
      <ContextualHelp {...args}>
        <ContextualHelp.Title>What's this?</ContextualHelp.Title>
        <ContextualHelp.Content>
          This feature explains important functions to you directly in the
          context of the page.
          <br />
          <Link href="https://www.marigold-ui.io/components/overview?theme=rui">
            To the documentation
          </Link>
        </ContextualHelp.Content>
      </ContextualHelp>
    </div>
  ),
});

Basic.test('Opens contextual help', async ({ canvas, userEvent }) => {
  const helpButton = await canvas.getByLabelText(/help|hilfe/i);
  await userEvent.click(helpButton);

  expect(await canvas.findByText(/What.s this\?/)).toBeInTheDocument();
  expect(
    await canvas.findByText(
      'This feature explains important functions to you directly in the context of the page.'
    )
  ).toBeInTheDocument();
  expect(
    await canvas.findByRole('link', {
      name: 'To the documentation',
    })
  ).toBeInTheDocument();
});

export const WithDescription = meta.story({
  render: args => (
    <div className="flex h-96 items-center justify-center">
      <ContextualHelp {...args}>
        <ContextualHelp.Title>Feature overview</ContextualHelp.Title>
        <ContextualHelp.Description>
          A short summary of this feature.
        </ContextualHelp.Description>
        <ContextualHelp.Content>
          More detail about how this feature works.
        </ContextualHelp.Content>
      </ContextualHelp>
    </div>
  ),
});

export const WithTextField = meta.story({
  render: args => (
    <div className="flex h-96 items-center justify-center">
      <TextField
        label="Email"
        addon={
          <ContextualHelp offset={2} {...args}>
            <ContextualHelp.Title>Email Format</ContextualHelp.Title>
            <ContextualHelp.Content>
              Please enter a valid email address in the format: user@example.com
              <br />
              <Link href="https://www.marigold-ui.io/components/overview?theme=rui">
                Learn more
              </Link>
            </ContextualHelp.Content>
          </ContextualHelp>
        }
        type="email"
        description="We'll never share your email"
        width="fit"
      />
    </div>
  ),
});

export const WithBadgeInLabelAddon = meta.story({
  render: args => (
    <TextField
      label="Plan"
      addon={
        <ContextualHelp {...args}>
          <ContextualHelp.Title>Plans</ContextualHelp.Title>
          <ContextualHelp.Content>
            Exports are included in <Badge variant="info">Pro</Badge>.
          </ContextualHelp.Content>
        </ContextualHelp>
      }
      width="fit"
    />
  ),
});

Basic.test(
  'Keyboard focus draws a ring that clears 3:1 on the trigger',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    const trigger = await canvas.findByRole('button');

    trigger.focus();
    await userEvent.tab();

    await userEvent.tab({ shift: true });

    await expect(trigger).toHaveFocus();
    await waitFor(() => expectFocusRingContrast(trigger));
  }
);

Basic.test(
  'Keeps a side placement beside the trigger on larger screens',
  {
    globals: { viewport: { value: 'desktop' } },
    parameters: { chromatic: { disableSnapshot: true } },
    args: { placement: 'left' },
  },
  async ({ canvas, userEvent }) => {
    expect(window.innerWidth).toBeGreaterThanOrEqual(640);
    const trigger = canvas.getByRole('button', { name: /help|hilfe/i });

    await userEvent.click(trigger);

    const popover = await canvas.findByRole('dialog');
    const triggerRect = trigger.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const popoverMiddle = popoverRect.top + popoverRect.height / 2;
    expect(popoverRect.right).toBeLessThanOrEqual(triggerRect.left);
    expect(popoverMiddle).toBeGreaterThanOrEqual(triggerRect.top);
    expect(popoverMiddle).toBeLessThanOrEqual(triggerRect.bottom);
  }
);

// React Aria keeps this distance to the viewport edge when it positions a popover.
const VIEWPORT_INSET = 12;

const smallScreen = { viewport: { value: 'extraSmallScreen' } };

const expectInsideViewport = (popover: HTMLElement) => {
  const { left, right } = popover.getBoundingClientRect();

  expect(Math.round(left)).toBeGreaterThanOrEqual(VIEWPORT_INSET);
  expect(Math.round(window.innerWidth - right)).toBeGreaterThanOrEqual(
    VIEWPORT_INSET
  );
  expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(
    window.innerWidth
  );
};

Basic.test(
  'Keeps the default width clear of both viewport edges on small screens',
  {
    globals: smallScreen,
    parameters: { chromatic: { disableSnapshot: false, viewports: [320] } },
  },
  async ({ canvas, userEvent }) => {
    expect(window.innerWidth).toBeLessThan(344);

    await userEvent.click(canvas.getByRole('button', { name: /help|hilfe/i }));

    expectInsideViewport(await canvas.findByRole('dialog'));
  }
);

Basic.test(
  'Keeps the large width clear of both viewport edges on small screens',
  { globals: smallScreen, args: { width: 'large' } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /help|hilfe/i }));

    expectInsideViewport(await canvas.findByRole('dialog'));
  }
);

Basic.test(
  'Opens a left placement below the trigger on small screens',
  { globals: smallScreen, args: { placement: 'left' } },
  async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /help|hilfe/i });

    await userEvent.click(trigger);

    const popover = await canvas.findByRole('dialog');
    expect(popover.getBoundingClientRect().top).toBeGreaterThanOrEqual(
      trigger.getBoundingClientRect().bottom
    );
    expectInsideViewport(popover);
  }
);

Basic.test(
  'Opens a right placement below the trigger on small screens',
  { globals: smallScreen, args: { placement: 'right' } },
  async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /help|hilfe/i });

    await userEvent.click(trigger);

    const popover = await canvas.findByRole('dialog');
    expect(popover.getBoundingClientRect().top).toBeGreaterThanOrEqual(
      trigger.getBoundingClientRect().bottom
    );
    expectInsideViewport(popover);
  }
);
