import { expect } from 'storybook/test';
import preview from '.storybook/preview';
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

Basic.test(
  'Hidden input travels with the control inside a scroll container',
  {
    parameters: { surface: false, chromatic: { disableSnapshot: true } },
    render: () => (
      <div className="border-border h-32 w-64 overflow-auto rounded border p-3">
        <div className="flex flex-col gap-2">
          <Switch label="Email digest" />
          <Switch label="Push alerts" />
          <Switch label="Weekly report" />
          <Switch label="Beta features" />
          <Switch label="Developer mode" />
          <Switch label="Auto-refresh" />
          <Switch label="Compact rows" />
          <Switch label="Sound effects" />
        </div>
      </div>
    ),
  },
  async ({ canvas }) => {
    // The last row, the one you have to scroll down to reach.
    const input = await canvas.findByRole('switch', { name: 'Sound effects' });
    const label = input.closest('label')!;
    const scroller = label.closest('.overflow-auto')!;

    const before = {
      input: input.getBoundingClientRect().top,
      label: label.getBoundingClientRect().top,
    };

    scroller.scrollTop = scroller.scrollHeight;

    // Read back the real offset instead of assuming how far the list overflows.
    const scrolled = scroller.scrollTop;

    const after = {
      input: input.getBoundingClientRect().top,
      label: label.getBoundingClientRect().top,
    };

    // Guard: without a real scroll, the comparison is two zeroes agreeing.
    expect(scrolled).toBeGreaterThan(0);
    expect(after.label - before.label).toBe(-scrolled);
    expect(after.input - before.input).toBe(after.label - before.label);
  }
);
