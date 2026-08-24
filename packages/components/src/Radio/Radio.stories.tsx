import { I18nProvider } from 'react-aria-components/I18nProvider';
import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Badge } from '../Badge/Badge';
import {
  borderOf,
  controlIcon,
  firstLineOffset,
  isSingleLine,
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

// DST-1607, on the Radio side: a decoration that outgrows the label's line box
// inflates it and leaves the dot above the text it belongs to.
export const WithBadge = meta.story({
  tags: ['component-test'],
  render: args => (
    <Radio.Group {...args} defaultValue="standard">
      <Radio value="standard">Standard admission</Radio>
      <Radio
        value="early-bird"
        labelAdornment={
          <Badge variant="master" size="inline">
            Master
          </Badge>
        }
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui tempore
        sunt possimus dolorum. Maiores consequatur, explicabo, qui natus
        accusamus vero quis temporibus excepturi repudiandae eos, eveniet nulla
        sequi ipsum! Doloribus?
      </Radio>
    </Radio.Group>
  ),
});

WithBadge.test(
  'The badge leaves the dot on the label line',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, step }) => {
    const radio = await canvas.findByRole('radio', { name: /Early bird/ });
    const dot = controlIcon(radio);
    // `getByText` matches on an element's own text nodes, so this is the label
    // block itself and not the badge nested inside it.
    const labelBlock = canvas.getByText('Early bird pricing');

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
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas }) => {
    const radio = await canvas.findByRole('radio', {
      name: /every registration/,
    });
    const dot = controlIcon(radio);
    const labelBlock = canvas.getByText(/Notify me about every registration/);

    // Guards the guard: a dot centred on a one-line block passes the assertion
    // below whether or not first-line anchoring works.
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
