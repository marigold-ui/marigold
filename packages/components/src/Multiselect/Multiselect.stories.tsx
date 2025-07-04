import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';
import { Stack } from '../Stack';
import { Multiselect } from './Multiselect';

const meta: Meta<typeof Multiselect> = {
  title: 'Components/Multiselect',
  component: Multiselect,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Set the label of the Multiselect',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: '' },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Set the help text description.',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'This is a help text description' },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disable Multiselect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Is the input invalid?',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Set the Error Message',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'Something went wrong' },
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
      description: 'Set the placeholder text',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'undefined' },
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description:
        'The width of the field. For that we use the Tailwind tokens.',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'full' },
      },
    },
  },
  args: {
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
    error: false,
    disabled: false,
    width: 'full',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ticketCategories = [
  { value: 'general', label: 'General Admission' },
  { value: 'vip', label: 'VIP Experience' },
  { value: 'backstage', label: 'Backstage Pass' },
  { value: 'early', label: 'Early Bird Special' },
];

const ticketPriorities = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' },
  { value: 'critical', label: 'Critical Issue' },
];

export const Basic: Story = {
  tags: ['component-test'],
  render: args => (
    <Multiselect
      {...args}
      label="Ticket Categories"
      items={ticketCategories}
      placeholder="Select categories..."
      isOptionDisabled={(item: { value: string }) => item.value === 'backstage'}
    />
  ),
  play: async ({ step, userEvent }) => {
    const canvas = within(document.body);

    await step('Open Multiselect', async () => {
      const input = canvas.getByLabelText('Ticket Categories');

      await userEvent.click(input);

      await expect(await canvas.findByText('General Admission')).toBeVisible();
    });

    await step('Select an item from Multiselect', async () => {
      const generalOption = await canvas.findByText('General Admission');

      await userEvent.click(generalOption);

      await expect(await canvas.findByText('General Admission')).toBeVisible();
    });

    await step('Select another item from Multiselect', async () => {
      const VIPOption = await canvas.findByText('VIP Experience');

      await userEvent.click(VIPOption);

      await expect(
        await canvas.findByText('VIP Experience')
      ).toBeInTheDocument();
    });

    await step('Support removing selections', async () => {
      const generalOption = await canvas.findByText('General Admission');
      const removeButton = canvas.queryAllByRole('button', {
        name: /remove/i,
      });

      await userEvent.click(removeButton[0]);

      await expect(generalOption).not.toBeVisible();
    });

    await step('close Multiselect', async () => {
      const input = canvas.getByLabelText('Ticket Categories');

      await userEvent.keyboard('{Escape}');
      input.blur();

      await expect(input).not.toHaveFocus();
      await expect(input).toHaveAttribute('aria-expanded', 'false');
    });
  },
};

export const Controlled: Story = {
  render: args => {
    const [current, setCurrent] = useState<string>('');
    const [selectedItems, setSelectedItems] = useState<Array<object>>([]);

    return (
      <Stack space={3}>
        <Multiselect
          {...args}
          label="Ticket Priorities"
          placeholder="Set priorities..."
          items={ticketPriorities}
          isOptionDisabled={(item: { value: string }) =>
            item.value === 'critical'
          }
          onChange={value => setCurrent(value)}
          onSelectionChange={(selectedValues: object[]) =>
            setSelectedItems(selectedValues)
          }
          selectedItems={selectedItems}
        />
        <hr />
        <pre>
          Current Input: {current}
          <br />
          Selected Priorities:{' '}
          {selectedItems
            .map(({ value }: { value: string }) => value)
            .join(', ')}
        </pre>
      </Stack>
    );
  },
};
