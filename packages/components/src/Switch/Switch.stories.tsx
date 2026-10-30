import { expect, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Badge } from '../Badge/Badge';
import {
  WCAG_NON_TEXT,
  contrastOn,
  expectFocusRingContrast,
  paintedGround,
} from '../contrast.utils';
import {
  borderOf,
  fillOf,
  firstLineOffset,
  isSingleLine,
  labelBlockOf,
} from '../control.utils';
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

const getTrack = (switchEl: HTMLElement) => {
  const track = switchEl
    .closest('label')
    ?.querySelector<HTMLElement>(':scope > div:has(> div)');

  expect(track).not.toBeNull();
  // The track is the `w-7` box; the thumb is `size-3`. If this ever matches the
  // thumb, fail here rather than passing three tests against the wrong element.
  expect(getComputedStyle(track!).width).toBe('28px');

  return track!;
};

const tintOf = (el: Element) => getComputedStyle(el).backgroundImage;
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

export const ReadOnly = meta.story({
  tags: ['component-test'],
  parameters: {
    docs: {
      description: {
        story:
          'A read-only switch keeps its value legible and drops the ' +
          'affordances: quieter track, a visible rim when off, no hover, ' +
          '`cursor-default`. It stays focusable and announces ' +
          '`aria-readonly`, which is what separates it from `disabled`.',
      },
    },
  },
  args: { label: undefined },
  render: args => (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
      <Switch {...args} label="Editable, off" />
      <Switch {...args} label="Read-only, off" readOnly />
      <Switch {...args} label="Editable, on" defaultSelected />
      <Switch {...args} label="Read-only, on" defaultSelected readOnly />
    </div>
  ),
});

ReadOnly.test(
  'A read-only switch is distinguishable from an editable one at rest',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, step }) => {
    await step('on — a quieter track fill', async () => {
      const editable = getTrack(
        canvas.getByRole('switch', { name: 'Editable, on' })
      );
      const readOnly = getTrack(
        canvas.getByRole('switch', { name: 'Read-only, on' })
      );

      expect(fillOf(readOnly)).not.toBe(fillOf(editable));
    });

    await step('off — a visible rim on an unchanged fill', async () => {
      const editable = getTrack(
        canvas.getByRole('switch', { name: 'Editable, off' })
      );
      const readOnly = getTrack(
        canvas.getByRole('switch', { name: 'Read-only, off' })
      );

      expect(fillOf(readOnly)).toBe(fillOf(editable));
      expect(borderOf(readOnly)).not.toBe(borderOf(editable));
    });
  }
);

ReadOnly.test(
  'The read-only value clears 3:1 against its track',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const track = getTrack(
      canvas.getByRole('switch', { name: 'Read-only, on' })
    );
    const thumb = track.querySelector<HTMLElement>(':scope > div');

    expect(thumb).not.toBeNull();

    const ratio = contrastOn(paintedGround(track), fillOf(thumb!));

    expect(
      ratio,
      `read-only thumb is ${ratio.toFixed(2)}:1, needs ${WCAG_NON_TEXT}:1`
    ).toBeGreaterThanOrEqual(WCAG_NON_TEXT);
  }
);

ReadOnly.test(
  'A read-only switch stays focusable and announces aria-readonly',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent, step }) => {
    const switchEl: HTMLInputElement = canvas.getByRole('switch', {
      name: 'Read-only, on',
    });

    await step('announces aria-readonly', async () => {
      expect(switchEl).toHaveAttribute('aria-readonly', 'true');
    });

    await step('stays focusable', async () => {
      // Tab rather than `focus()`: the criterion is keyboard reach, and
      // `focus()` would pass on a `tabIndex={-1}` switch too.
      canvas.getByRole('switch', { name: 'Editable, on' }).focus();
      await userEvent.tab();

      await expect(switchEl).toHaveFocus();
    });

    await step('ignores a click', async () => {
      await userEvent.click(switchEl);

      expect(switchEl.checked).toBeTruthy();
    });
  }
);

ReadOnly.test(
  'Disabled still wins over read-only',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { disabled: true },
  },
  async ({ canvas, step }) => {
    for (const state of ['off', 'on'] as const) {
      await step(state, async () => {
        const editable = getTrack(
          canvas.getByRole('switch', { name: `Editable, ${state}` })
        );
        const readOnly = getTrack(
          canvas.getByRole('switch', { name: `Read-only, ${state}` })
        );

        expect(fillOf(readOnly)).toBe(fillOf(editable));
        expect(borderOf(readOnly)).toBe(borderOf(editable));
      });
    }
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

export const WithBadge = meta.story({
  tags: ['component-test'],
  args: {
    label: 'Enable early bird pricing',
    addon: <Badge variant="master">Master</Badge>,
  },
});

WithBadge.test(
  'The badge leaves the track on the label line',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, step }) => {
    const track = getTrack(await canvas.findByRole('switch'));
    const labelBlock = labelBlockOf(
      canvas.getByText('Enable early bird pricing')
    );

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
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const track = getTrack(await canvas.findByRole('switch'));
    const labelBlock = canvas.getByText(/Notify the organiser/);

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

Basic.test(
  'Keyboard focus draws a 1px ring around the track, off and on',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent, step }) => {
    const switchEl = await canvas.findByRole('switch');
    const track = getTrack(switchEl) as HTMLElement;

    await step('off', async () => {
      await userEvent.tab();

      await expect(switchEl).toHaveFocus();
      await waitFor(() => expectFocusRingContrast(track));
    });

    await step('on', async () => {
      await userEvent.keyboard(' ');

      await expect(switchEl).toBeChecked();
      await waitFor(() => expectFocusRingContrast(track));
    });
  }
);
