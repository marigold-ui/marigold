import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import {
  WCAG_NON_TEXT,
  contrast,
  flatten,
  paintedGround,
} from '../contrast.utils';
import { borderOf, controlIcon } from '../control.utils';
import { Checkbox } from './Checkbox';

const meta = preview.meta({
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Label text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'This is a Checkbox' },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    indeterminate: {
      control: {
        type: 'boolean',
      },
      description: 'Option to define an indeterminate state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      description: 'Read only',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['default', 'small'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
      description: 'Padding y (top and bottom)',
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Description text',
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Error message shown when `error` is set',
    },
  },
  args: {
    readOnly: false,
    indeterminate: false,
    disabled: false,
    label: 'This is a Checkbox',
    size: 'default',
    defaultChecked: false,
    error: false,
    required: false,
    description: 'This is a description',
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
});

Basic.test('Checks checkbox', async ({ canvas, userEvent }) => {
  const checkbox = await canvas.findByRole('checkbox');

  await userEvent.click(checkbox);

  expect(checkbox).toBeChecked();
});

Basic.test(
  'Read only can not uncheck the checkbox',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas, userEvent }) => {
    const checkbox = await canvas.findByRole('checkbox');

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  }
);

Basic.test(
  'Description is set and accessible',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas }) => {
    const checkbox = await canvas.findByRole('checkbox');
    const description = await canvas.queryByText('This is a description');

    const helpTextId = description?.getAttribute('id');
    const checkboxDescribedBy = checkbox.getAttribute('aria-describedby');

    expect(description).toBeInTheDocument();
    expect(checkboxDescribedBy).toBe(helpTextId);
  }
);

// The one positive assertion: every "leaves the border alone" case below also
// passes against a rule that never matches, which is how the
// `group-[indeterminate]` bug this PR fixes stayed green for its whole life.
Basic.test(
  'Hover darkens the border',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    const checkbox = await canvas.findByRole('checkbox');
    const icon = controlIcon(checkbox);
    const idle = borderOf(icon);

    await userEvent.hover(checkbox);

    expect(borderOf(icon)).not.toBe(idle);
  }
);

// Hover and focus-visible both set `border-color`, and the hover rule compiles
// to (0,5,0) against (0,2,0) for the focus-visible border — so it wins unless it
// excludes `focus-visible` explicitly. Without that clause the border stays at
// the hover colour and the halo is all that marks focus, which is 2.08:1 alone.
Basic.test(
  'Hover does not weaken the focus indicator',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    const checkbox = await canvas.findByRole('checkbox');
    const icon = controlIcon(checkbox);

    await userEvent.tab();
    await expect(checkbox).toHaveFocus();
    const focused = borderOf(icon);

    await userEvent.hover(checkbox);

    expect(borderOf(icon)).toBe(focused);

    const ground = paintedGround(icon.parentElement as HTMLElement);
    expect(ground.length).toBeGreaterThan(0);

    const ratio = contrast(flatten([...ground, focused]), flatten(ground));
    expect(
      ratio,
      `focused + hovered border is ${ratio.toFixed(2)}:1, needs ${WCAG_NON_TEXT}:1`
    ).toBeGreaterThanOrEqual(WCAG_NON_TEXT);
  }
);

// One test per state, because each needs its own `args`. Note `.test()` calls are
// collected statically — registering them from a loop yields no tests at all.
Basic.test(
  'Hover leaves the border alone when checked',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { defaultChecked: true },
  },
  async ({ canvas, userEvent }) => {
    const checkbox = await canvas.findByRole('checkbox');
    const icon = controlIcon(checkbox);
    const before = borderOf(icon);

    await userEvent.hover(checkbox);

    expect(borderOf(icon)).toBe(before);
  }
);

Basic.test(
  'Hover leaves the border alone when indeterminate',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { indeterminate: true },
  },
  async ({ canvas, userEvent }) => {
    const checkbox = await canvas.findByRole('checkbox');
    const icon = controlIcon(checkbox);
    const before = borderOf(icon);

    await userEvent.hover(checkbox);

    expect(borderOf(icon)).toBe(before);
  }
);

Basic.test(
  'Hover leaves the border alone when disabled',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { disabled: true },
  },
  async ({ canvas, userEvent }) => {
    const checkbox = await canvas.findByRole('checkbox');
    const icon = controlIcon(checkbox);
    const before = borderOf(icon);

    await userEvent.hover(checkbox);

    expect(borderOf(icon)).toBe(before);
  }
);

Basic.test(
  'Hover leaves the border alone when read only',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { readOnly: true },
  },
  async ({ canvas, userEvent }) => {
    const checkbox = await canvas.findByRole('checkbox');
    const icon = controlIcon(checkbox);
    const before = borderOf(icon);

    await userEvent.hover(checkbox);

    expect(borderOf(icon)).toBe(before);
  }
);

Basic.test(
  'Indeterminate fills the box like a checked one',
  {
    parameters: { chromatic: { disableSnapshot: false } },
    args: { indeterminate: true },
  },
  async ({ canvas }) => {
    const checkbox = await canvas.findByRole('checkbox');
    const style = getComputedStyle(controlIcon(checkbox));

    expect(style.backgroundColor).toBe(style.borderColor);
  }
);

export const WithError = meta.story({
  tags: ['component-test'],
  args: {
    error: true,
    errorMessage: 'This selection is required',
    description: 'This is a description',
  },
});

WithError.test(
  'Error message replaces the description',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const checkbox = await canvas.findByRole('checkbox');

    // The error message replaces the description when `error` is set.
    expect(canvas.queryByText('This is a description')).not.toBeInTheDocument();
    await expect(checkbox).toHaveAccessibleDescription(
      'This selection is required'
    );
  }
);

// Without a containing block on the label, React Aria's absolute input stops
// travelling with the row and focusing it scrolls the wrong ancestor.
Basic.test(
  'Hidden input travels with the control inside a scroll container',
  {
    parameters: { surface: false, chromatic: { disableSnapshot: true } },
    render: () => (
      <div className="border-border h-32 w-64 overflow-auto rounded border p-3">
        <div className="flex flex-col gap-2">
          <Checkbox label="View events" />
          <Checkbox label="Create events" />
          <Checkbox label="Edit events" />
          <Checkbox label="Delete events" />
          <Checkbox label="Manage users" />
          <Checkbox label="Manage roles" />
          <Checkbox label="Export reports" />
          <Checkbox label="Manage billing" />
        </div>
      </div>
    ),
  },
  async ({ canvas }) => {
    // The last row, the one you have to scroll down to reach.
    const input = await canvas.findByRole('checkbox', {
      name: 'Manage billing',
    });
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
