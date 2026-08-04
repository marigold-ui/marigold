import { useState } from 'react';
import { expect, fn, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
import { Facebook } from '@marigold/icons';
import { Stack } from '../Stack/Stack';
import { Button } from './Button';

const meta = preview.meta({
  title: 'Components/Button',
  component: Button,
  parameters: {
    surface: false,
  },
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disable the button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the button is in a loading state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: {
        type: 'boolean',
      },
      description: 'Take availble width',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: {
        type: 'radio',
      },
      description: 'Size of the button',
      options: ['default', 'small', 'large', 'icon'],
    },
    variant: {
      control: {
        type: 'radio',
      },
      options: [
        'primary',
        'secondary',
        'destructive',
        'destructive-ghost',
        'ghost',
        'icon',
        'text',
      ],
      description: 'Variant of the button',
    },
    children: {
      control: 'text',
      description: 'Label of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: undefined },
      },
    },
  },
  args: {
    variant: undefined,
    children: 'Submit',
    size: 'default',
    loading: false,
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => <Button {...args}>Button</Button>,
});

Basic.test(
  'Calls onPress when clicked',
  {
    parameters: {
      chromatic: { disableSnapshot: true },
    },
    args: {
      onPress: fn(),
    },
  },
  async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button'));

    await expect(args.onPress).toHaveBeenCalled();
  }
);

export const ButtonVariants = meta.story({
  tags: ['component-test'],
  parameters: {
    surface: 'both',
    controls: { exclude: ['variant', 'children', 'loading'] },
  },
  args: {
    onPress: fn(),
  },
  render: args => (
    <Stack space={4} alignX="left">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args}>Secondary</Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="destructive-ghost">
        Destructive Ghost
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
      <Button {...args}>
        <Facebook size={30} data-testid="facebook" />
        Submit
      </Button>
    </Stack>
  ),
});

export const GhostOnBackground = meta.story({
  render: args => (
    <Stack space={4}>
      <div className="bg-primary text-primary-foreground flex items-center justify-center rounded p-8">
        <Button {...args} variant="ghost">
          Ghost on Dark
        </Button>
      </div>
      <div className="bg-background text-foreground flex items-center justify-center rounded border p-8">
        <Button {...args} variant="ghost">
          Ghost on Light
        </Button>
      </div>
    </Stack>
  ),
});

/**
 * A ghost Button in every state, on each ground it actually lands on.
 *
 * `GhostOnBackground` above covers the resting state; the inactive ones behave
 * differently, because `ui-state-disabled` paints the opaque
 * `--color-disabled-surface`. That fill is calibrated for a white surface, so on
 * `bg-background` it matches the page exactly and on `bg-primary` it reads as a
 * light block. Snapshotted so both stay visible in VRT; see DST-1590.
 */
export const GhostStatesOnBackground = meta.story({
  parameters: {
    controls: { exclude: ['variant', 'loading', 'disabled', 'children'] },
  },
  render: args => {
    const states = (
      <>
        <Button {...args} variant="ghost">
          Rest
        </Button>
        <Button {...args} variant="ghost" disabled>
          Disabled
        </Button>
        <Button {...args} variant="ghost" loading>
          Loading
        </Button>
      </>
    );

    return (
      <Stack space={4}>
        <div className="bg-surface flex items-center gap-3 rounded border p-6">
          {states}
        </div>
        <div className="bg-background text-foreground flex items-center gap-3 rounded border p-6">
          {states}
        </div>
        <div className="bg-primary text-primary-foreground flex items-center gap-3 rounded p-6">
          {states}
        </div>
      </Stack>
    );
  },
});

export const FullWidth = meta.story({
  args: {
    fullWidth: true,
  },
});

export const Loading = meta.story({
  // Required for the `Loading.test(...)` blocks below to be picked up by the
  // test runner — without it they are silently never executed.
  tags: ['component-test'],
  parameters: {
    controls: { exclude: ['loading'] },
    // The idle state is a plain primary button — already covered by `Basic` and
    // `ButtonVariants`. The pending state is the one worth a baseline, so the
    // snapshot lives on the test below that actually reaches it.
    chromatic: { disableSnapshot: true },
  },
  render: ({ children, ...args }) => {
    const [loading, setLoading] = useState<boolean | undefined>(false);
    const handleSubmit = async () => {
      //avoid multiple submits while loading
      if (loading) {
        return;
      }

      setLoading(true);
      try {
        await new Promise<void>(resolve => setTimeout(resolve, 8000));
      } finally {
        setLoading(false);
      }
    };

    return (
      <Button {...args} onPress={() => handleSubmit()} loading={loading}>
        {children}
      </Button>
    );
  },
});

Loading.test(
  'Shows a spinner while loading',
  {
    parameters: {
      // The one place the pending state gets a visual baseline: spinner
      // overlaid, label held at `opacity-0` so the width doesn't change.
      chromatic: { disableSnapshot: false },
    },
  },
  async ({ canvas }) => {
    const button = canvas.getByRole('button');

    await userEvent.click(button);

    await expect(await canvas.findByRole('progressbar')).toBeInTheDocument();
    await expect(button).toHaveAttribute('data-pending', 'true');
  }
);

Loading.test(
  'Keeps its accessible name while loading',
  {
    parameters: {
      chromatic: { disableSnapshot: true },
    },
  },
  async ({ canvas }) => {
    // The label is hidden with `opacity-0` rather than `invisible` precisely so
    // it survives here: `visibility: hidden` would drop it from the
    // accessibility tree and leave a pending button anonymous (WCAG 4.1.2).
    // Querying *by name* is the assertion — don't relax it to a state query.
    const button = canvas.getByRole('button', { name: 'Submit' });

    await userEvent.click(button);

    await expect(await canvas.findByRole('progressbar')).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Submit' })
    ).toHaveAttribute('data-pending', 'true');
  }
);
