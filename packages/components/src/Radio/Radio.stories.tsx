import { I18nProvider } from 'react-aria-components/I18nProvider';
import { expect, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Badge } from '../Badge/Badge';
import {
  WCAG_NON_TEXT,
  expectFocusRingContrast,
  inkContrast,
} from '../contrast.utils';
import {
  borderOf,
  controlIcon,
  fillOf,
  firstLineOffset,
  isSingleLine,
  labelBlockOf,
} from '../control.utils';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta = preview.meta({
  title: 'Components/Radio',
  component: RadioGroup,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Label' },
      },
    },
    orientation: {
      control: {
        type: 'select',
      },
      options: ['horizontal', 'vertical'],
      description: 'Orientation',
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'vertical' },
      },
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Error',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
  },
  args: {
    label: 'Label',
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => (
    <Radio.Group
      {...args}
      description="Hier steht ein HelpText"
      defaultValue="1"
    >
      <Radio value="1">Option 1</Radio>
      <Radio value="2">Option 2</Radio>
      <Radio value="3" disabled>
        Option 3
      </Radio>
      <Radio value="4">Option 4</Radio>
    </Radio.Group>
  ),
});

Basic.test(
  'Keyboard focus draws a ring around a selected radio',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    const radio = await canvas.findByRole('radio', { name: 'Option 1' });
    const icon = controlIcon(radio);

    await userEvent.tab();

    await expect(radio).toHaveFocus();
    await waitFor(() => expectFocusRingContrast(icon));
  }
);

// The one positive assertion: the "leaves the border alone" cases below pass
// just as happily against a rule that never matches at all.
Basic.test(
  'Hover darkens the border of an unselected radio',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    const radio = await canvas.findByRole('radio', { name: 'Option 2' });
    const icon = controlIcon(radio);
    const idle = borderOf(icon);

    await userEvent.hover(radio);

    expect(borderOf(icon)).not.toBe(idle);
  }
);

Basic.test(
  'Hover leaves the border alone when selected or disabled',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ step, canvas, userEvent }) => {
    await step('selected', async () => {
      const radio = await canvas.findByRole('radio', { name: 'Option 1' });
      const icon = controlIcon(radio);
      const selected = borderOf(icon);

      await userEvent.hover(radio);

      expect(borderOf(icon)).toBe(selected);
    });

    await step('disabled', async () => {
      const radio = await canvas.findByRole('radio', { name: 'Option 3' });
      const icon = controlIcon(radio);
      const disabled = borderOf(icon);

      await userEvent.hover(radio);

      expect(borderOf(icon)).toBe(disabled);
    });
  }
);

Basic.test(
  'Hover leaves the border alone when read only',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { readOnly: true },
  },
  async ({ canvas, userEvent }) => {
    const radio = await canvas.findByRole('radio', { name: 'Option 2' });
    const icon = controlIcon(radio);
    const readOnly = borderOf(icon);

    await userEvent.hover(radio);

    expect(borderOf(icon)).toBe(readOnly);
  }
);

export const ReadOnly = meta.story({
  tags: ['component-test'],
  parameters: {
    docs: {
      description: {
        story:
          'A read-only group keeps its selection legible and drops the ' +
          'affordances: quieter fill, no hover, `cursor-default`. The radios ' +
          'stay focusable and the group announces `aria-readonly`, which is ' +
          'what separates it from `disabled`.',
      },
    },
  },
  render: args => (
    <div className="grid grid-cols-2 gap-6">
      <Radio.Group {...args} label="Editable" defaultValue="editable-on">
        <Radio value="editable-on">Editable, selected</Radio>
        <Radio value="editable-off">Editable, unselected</Radio>
      </Radio.Group>
      <Radio.Group
        {...args}
        label="Read-only"
        defaultValue="read-only-on"
        readOnly
      >
        <Radio value="read-only-on">Read-only, selected</Radio>
        <Radio value="read-only-off">Read-only, unselected</Radio>
      </Radio.Group>
    </div>
  ),
});

ReadOnly.test(
  'A read-only radio is distinguishable from an editable one at rest',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, step }) => {
    for (const state of ['selected', 'unselected'] as const) {
      await step(state, async () => {
        const editable = canvas.getByRole('radio', {
          name: `Editable, ${state}`,
        });
        const readOnly = canvas.getByRole('radio', {
          name: `Read-only, ${state}`,
        });

        expect(fillOf(controlIcon(readOnly))).not.toBe(
          fillOf(controlIcon(editable))
        );
      });
    }
  }
);

ReadOnly.test(
  'The read-only selection clears 3:1 against its own fill',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const radio = canvas.getByRole('radio', { name: 'Read-only, selected' });
    const ratio = inkContrast(controlIcon(radio));

    expect(
      ratio,
      `read-only dot is ${ratio.toFixed(2)}:1, needs ${WCAG_NON_TEXT}:1`
    ).toBeGreaterThanOrEqual(WCAG_NON_TEXT);
  }
);

ReadOnly.test(
  'A read-only radio stays focusable and the group announces aria-readonly',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent, step }) => {
    const selected = canvas.getByRole('radio', { name: 'Read-only, selected' });
    const unselected = canvas.getByRole('radio', {
      name: 'Read-only, unselected',
    });

    await step('the group announces aria-readonly', async () => {
      expect(
        canvas.getByRole('radiogroup', { name: 'Read-only' })
      ).toHaveAttribute('aria-readonly', 'true');
    });

    await step('the selected radio stays focusable', async () => {
      // Tab rather than `focus()`: the criterion is keyboard reach, and
      // `focus()` would pass on a `tabIndex={-1}` radio too.
      canvas.getByRole('radio', { name: 'Editable, selected' }).focus();
      await userEvent.tab();

      await expect(selected).toHaveFocus();
    });

    await step(
      'clicking another option does not move the selection',
      async () => {
        await userEvent.click(unselected);

        expect(selected).toBeChecked();
      }
    );
  }
);

ReadOnly.test(
  'Disabled still wins over read-only',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { disabled: true },
  },
  async ({ canvas, step }) => {
    for (const state of ['selected', 'unselected'] as const) {
      await step(state, async () => {
        const editable = controlIcon(
          canvas.getByRole('radio', { name: `Editable, ${state}` })
        );
        const readOnly = controlIcon(
          canvas.getByRole('radio', { name: `Read-only, ${state}` })
        );

        expect(fillOf(readOnly)).toBe(fillOf(editable));
        expect(borderOf(readOnly)).toBe(borderOf(editable));
      });
    }
  }
);

ReadOnly.test(
  'Read only swaps the cursor on the whole hit area',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const radio = canvas.getByRole('radio', { name: 'Read-only, unselected' });
    const cursorOf = (el: Element) => getComputedStyle(el).cursor;

    expect(cursorOf(controlIcon(radio))).toBe('default');
    expect(cursorOf(canvas.getByText('Read-only, unselected'))).toBe('default');
  }
);

export const WithOwnWidth = meta.story({
  parameters: {
    docs: {
      description: {
        story:
          'An individual `Radio` can set its own `width`. The tinted boxes mark ' +
          'each radio field: the first spans half the group, the second the full width.',
      },
    },
  },
  render: args => (
    // The tint marks the radio field — the element `width` actually sizes.
    // Without it the demo looks unchanged, since a radio dot and its label
    // never fill their container on their own.
    <div className="w-96 [&_[data-rac]:has(>label)]:bg-slate-200">
      <Radio.Group {...args}>
        <Radio value="1" width="1/2">
          Option 1
        </Radio>
        <Radio value="2">Option 2</Radio>
      </Radio.Group>
    </div>
  ),
});

export const WithBadge = meta.story({
  tags: ['component-test'],
  render: args => (
    <Radio.Group {...args} defaultValue="standard">
      <Radio value="standard">Standard admission</Radio>
      <Radio value="early-bird" addon={<Badge variant="master">Master</Badge>}>
        Early bird pricing
      </Radio>
    </Radio.Group>
  ),
});

WithBadge.test(
  'The badge leaves the dot on the label line',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, step }) => {
    const radio = await canvas.findByRole('radio', { name: /Early bird/ });
    const dot = controlIcon(radio);
    const labelBlock = labelBlockOf(canvas.getByText('Early bird pricing'));

    await step('the badge fits the line', async () => {
      expect(isSingleLine(labelBlock)).toBe(true);
    });

    await step('the dot is centred on it', async () => {
      expect(firstLineOffset(dot, labelBlock)).toBeLessThanOrEqual(0.5);
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
  render: args => (
    <div className="w-64">
      <Radio.Group {...args} defaultValue="all">
        <Radio value="all">
          Notify me about every registration, cancellation and waitlist movement
          as it happens
        </Radio>
        <Radio value="daily">Send one digest per day</Radio>
      </Radio.Group>
    </div>
  ),
});

LongMultilineLabel.test(
  'The dot stays on the first line of a wrapping label',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const radio = await canvas.findByRole('radio', {
      name: /every registration/,
    });
    const dot = controlIcon(radio);
    const labelBlock = canvas.getByText(/Notify me about every registration/);

    expect(isSingleLine(labelBlock)).toBe(false);

    expect(firstLineOffset(dot, labelBlock)).toBeLessThanOrEqual(0.5);
  }
);

export const Error = meta.story({
  render: args => (
    <Radio.Group errorMessage="Das ist ein Error" error {...args}>
      <Radio value="1">Option 1</Radio>
      <Radio value="2">Option 2</Radio>
      <Radio value="3" disabled>
        Option 3
      </Radio>
      <Radio value="4">Option 4</Radio>
    </Radio.Group>
  ),
});

export const CollapseAt = meta.story({
  tags: ['component-test'],
  args: {
    collapseAt: 3,
  },
  render: args => (
    <I18nProvider locale="en-US">
      <Radio.Group defaultValue="salami" {...args}>
        <Radio value="ham" data-testid="one">
          Ham
        </Radio>
        <Radio value="salami" data-testid="two">
          Salami
        </Radio>
        <Radio value="cheese" data-testid="three">
          Cheese
        </Radio>
        <Radio value="tomato" data-testid="four">
          Tomato
        </Radio>
        <Radio value="cucumber" data-testid="five">
          Cucumber
        </Radio>
        <Radio value="onions" data-testid="six">
          Onions
        </Radio>
        <Radio value="pepper" data-testid="seven">
          Pepper
        </Radio>
      </Radio.Group>
    </I18nProvider>
  ),
});

CollapseAt.test(
  'Expands and collapses the extra options',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ step, canvas, userEvent }) => {
    await step('show more', async () => {
      await userEvent.click(canvas.getByText('Show 4 more'));

      expect(canvas.queryByTestId('four')).toBeVisible();
      expect(canvas.queryByTestId('five')).toBeVisible();
      expect(canvas.queryByTestId('six')).toBeVisible();
      expect(canvas.queryByTestId('seven')).toBeVisible();
    });

    await step('show less', async () => {
      await userEvent.click(canvas.getByText('Show 4 less'));

      expect(canvas.queryByTestId('four')).not.toBeVisible();
      expect(canvas.queryByTestId('five')).not.toBeVisible();
      expect(canvas.queryByTestId('six')).not.toBeVisible();
      expect(canvas.queryByTestId('seven')).not.toBeVisible();
    });
  }
);
