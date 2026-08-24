import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Badge } from '../Badge/Badge';
import { firstLineOffset, isSingleLine } from '../control.utils';
import { Switch } from './Switch';

const meta = preview.meta({
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: [undefined, 'settings'],
      description: 'Switch variant style',
    },
    label: {
      control: {
        type: 'text',
      },
      description: 'Label of the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Default Switch' },
      },
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'The size of the switch.',
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Switch disabled state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'A helpful text below the switch',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the switch is invalid',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'An error message shown when `error` is set',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    selected: {
      control: {
        type: 'boolean',
      },
      description: 'Wether the switch is selected',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    label: 'Default Switch',
    disabled: false,
    defaultSelected: false,
    error: false,
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
});

export const Settings = meta.story({
  args: {
    variant: 'settings',
    label: 'Email notifications',
    description: 'Receive email notifications when someone mentions you',
  },
});

Basic.test('Toggles on when clicked', async ({ canvas, userEvent }) => {
  const button = canvas.getByRole('switch');

  await userEvent.click(button);

  await expect(button).toBeChecked();
});

Basic.test(
  'Toggles with the Space key',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    const input: HTMLInputElement = canvas.getByRole('switch');

    await userEvent.tab();

    await userEvent.keyboard(' ');
    await expect(input.checked).toBeTruthy();

    await userEvent.keyboard(' ');
    await expect(input.checked).toBeFalsy();
  }
);

Basic.test(
  'Toggles off from the default-selected state',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { defaultSelected: true },
  },
  async ({ canvas, userEvent }) => {
    const input: HTMLInputElement = canvas.getByRole('switch');

    await userEvent.click(input);

    await expect(input.checked).toBeFalsy();
  }
);

// There is no accessible way to reach the track. It is the direct child div of
// the label; the thumb is nested inside it. Matching on `rounded-full` would
// also match the thumb, and every assertion here reads `'none'` off a wrong
// element just as happily as off the right one — so pin the shape instead.
const getTrack = (switchEl: HTMLElement) => {
  const track = switchEl.closest('label')?.querySelector('div > div');

  expect(track).not.toBeNull();
  // The track is the `w-7` box; the thumb is `size-3`. If this ever matches the
  // thumb, fail here rather than passing three tests against the wrong element.
  expect(getComputedStyle(track!).width).toBe('28px');

  return track!;
};

const tintOf = (el: Element) => getComputedStyle(el).backgroundImage;
const fillOf = (el: Element) => getComputedStyle(el).backgroundColor;
const cursorOf = (el: Element) => getComputedStyle(el).cursor;

// The one positive assertion for the tint: the "leaves ... alone" cases below
// all pass against a rule that never matches at all, which is exactly how the
// `group-[indeterminate]` bug this PR fixes stayed green. This also pins the
// architectural choice — the tint arrives as `background-image` and leaves the
// transitioned `background-color` untouched.
Basic.test(
  'Hover darkens the track when off, without touching the eased fill',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    const switchEl = await canvas.findByRole('switch');
    const track = getTrack(switchEl);
    const off = fillOf(track);

    expect(tintOf(track)).toBe('none');

    await userEvent.hover(switchEl);

    expect(tintOf(track)).not.toBe('none');
    expect(fillOf(track)).toBe(off);
  }
);

Basic.test(
  'The hover tint is not a transitioned property',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const switchEl = await canvas.findByRole('switch');
    const track = getTrack(switchEl);
    const transitions = getComputedStyle(track).transitionProperty;

    expect(transitions).toContain('background-color');
    expect(transitions).not.toContain('background-image');
  }
);

// One test per state, because each needs its own `args`. Note `.test()` calls are
// collected statically — registering them from a loop yields no tests at all.
Basic.test(
  'Hover leaves the track alone when on',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { defaultSelected: true },
  },
  async ({ canvas, userEvent }) => {
    const switchEl = await canvas.findByRole('switch');
    const track = getTrack(switchEl);

    await userEvent.hover(switchEl);

    expect(tintOf(track)).toBe('none');
  }
);

Basic.test(
  'Hover leaves the track alone when disabled',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { disabled: true },
  },
  async ({ canvas, userEvent }) => {
    const switchEl = await canvas.findByRole('switch');
    const track = getTrack(switchEl);

    await userEvent.hover(switchEl);

    expect(tintOf(track)).toBe('none');
  }
);

Basic.test(
  'Hover leaves the track alone when read only',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { readOnly: true },
  },
  async ({ canvas, userEvent }) => {
    const switchEl = await canvas.findByRole('switch');
    const track = getTrack(switchEl);

    await userEvent.hover(switchEl);

    expect(tintOf(track)).toBe('none');
  }
);

Basic.test(
  'The label shares the track cursor',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const switchEl = await canvas.findByRole('switch');

    expect(cursorOf(canvas.getByText('Default Switch'))).toBe('pointer');
    expect(cursorOf(getTrack(switchEl))).toBe('pointer');
  }
);

Basic.test(
  'Disabled swaps the cursor on the whole hit area',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { disabled: true },
  },
  async ({ canvas }) => {
    const switchEl = await canvas.findByRole('switch');

    expect(cursorOf(canvas.getByText('Default Switch'))).toBe('not-allowed');
    expect(cursorOf(getTrack(switchEl))).toBe('not-allowed');
  }
);

Basic.test(
  'Read only swaps the cursor on the whole hit area',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { readOnly: true },
  },
  async ({ canvas }) => {
    const switchEl = await canvas.findByRole('switch');

    expect(cursorOf(canvas.getByText('Default Switch'))).toBe('default');
    expect(cursorOf(getTrack(switchEl))).toBe('default');
  }
);

export const WithDescription = meta.story({
  tags: ['component-test'],
  args: {
    description: 'This is a description',
  },
});

WithDescription.test(
  'Description is set and accessible',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const switchEl = await canvas.findByRole('switch');

    expect(canvas.getByText('This is a description')).toBeInTheDocument();
    await expect(switchEl).toHaveAccessibleDescription('This is a description');
  }
);

// DST-1607. Switch carried the mirror of the Checkbox bug: `items-center` on the
// container, which is right for one line and wrong for every other -- so both
// stories below are snapshotted.
export const WithBadge = meta.story({
  tags: ['component-test'],
  args: {
    label: 'Enable early bird pricing',
    labelAdornment: (
      <Badge variant="master" size="inline">
        Master
      </Badge>
    ),
  },
});

WithBadge.test(
  'The badge leaves the track on the label line',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, step }) => {
    const track = getTrack(await canvas.findByRole('switch'));
    // `getByText` matches on an element's own text nodes, so this is the label
    // block itself and not the badge nested inside it.
    const labelBlock = canvas.getByText('Enable early bird pricing');

    await step('the badge fits the line', async () => {
      expect(isSingleLine(labelBlock)).toBe(true);
    });

    await step('the track is centred on it', async () => {
      expect(firstLineOffset(track, labelBlock)).toBeLessThanOrEqual(0.5);
    });

    await step('and so is the badge', async () => {
      expect(
        firstLineOffset(canvas.getByText('Master'), labelBlock)
      ).toBeLessThanOrEqual(0.5);
    });
  }
);

// `settings` puts the label in the first column, which is the wide one -- so it
// is the variant that actually wraps in practice, and the one where the old
// `items-center` dropped the track to the middle of the block.
export const LongMultilineLabel = meta.story({
  tags: ['component-test'],
  args: {
    variant: 'settings',
    label:
      'Notify the organiser about every registration, cancellation and waitlist movement as it happens',
    description: 'Applies to this event only.',
  },
  render: args => (
    <div className="w-72">
      <Switch {...args} />
    </div>
  ),
});

LongMultilineLabel.test(
  'The track stays on the first line of a wrapping label',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas }) => {
    const track = getTrack(await canvas.findByRole('switch'));
    const labelBlock = canvas.getByText(/Notify the organiser/);

    // Guards the guard: a track centred on a one-line block passes the
    // assertion below whether or not first-line anchoring works.
    expect(isSingleLine(labelBlock)).toBe(false);

    expect(firstLineOffset(track, labelBlock)).toBeLessThanOrEqual(0.5);
  }
);

export const WithError = meta.story({
  tags: ['component-test'],
  args: {
    error: true,
    errorMessage: 'This setting is required',
    description: 'This is a description',
  },
});

WithError.test(
  'Error message replaces the description',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const switchEl = await canvas.findByRole('switch');

    // The error message replaces the description when `error` is set.
    expect(canvas.queryByText('This is a description')).not.toBeInTheDocument();
    await expect(switchEl).toHaveAccessibleDescription(
      'This setting is required'
    );
  }
);
