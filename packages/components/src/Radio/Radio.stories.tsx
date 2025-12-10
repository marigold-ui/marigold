import { I18nProvider } from 'react-aria-components';
import { useState } from 'storybook/preview-api';
import { expect } from 'storybook/test';
import preview from '../../../../storybook/.storybook/preview';
import { Stack } from '../Stack/Stack';
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

export const DefaultSelected = meta.story({
  render: args => (
    <Radio.Group {...args} defaultValue="2">
      <Radio value="1">Option 1</Radio>
      <Radio value="2">Option 2</Radio>
      <Radio value="3" disabled>
        Option 3
      </Radio>
      <Radio value="4">Option 4</Radio>
    </Radio.Group>
  ),
});

export const Controlled = meta.story({
  render: args => {
    const [value, setValue] = useState('2');
    return (
      <Stack space={4}>
        <Radio.Group
          {...args}
          description="Hier steht ein HelpText"
          value={value}
          onChange={setValue}
        >
          <Radio value="1">Option 1</Radio>
          <Radio value="2">Option 2</Radio>
          <Radio value="3" disabled>
            Option 3
          </Radio>
          <Radio value="4">Option 4</Radio>
        </Radio.Group>
        <pre>
          <code>Current value: {value}</code>
        </pre>
      </Stack>
    );
  },
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
  play: async ({ step, canvas, userEvent }) => {
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
  },
});
