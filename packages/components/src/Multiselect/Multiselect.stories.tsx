import { useState } from 'storybook/preview-api';
import { expect, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Multiselect } from './Multiselect';

const meta = preview.meta({
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
    emptyState: {
      control: {
        type: 'text',
      },
      description: 'Set text when there is no result.',
      table: {
        type: { summary: 'text' },
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
});

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

export const Basic = meta.story({
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
  play: async ({ canvas, step }) => {
    await step('Open Multiselect', async () => {
      const input = canvas.getByLabelText(/Ticket Categories/i);

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
      const input = canvas.getByLabelText(/Ticket Categories/i);

      await userEvent.keyboard('{Escape}');
      input.blur();

      await expect(input).not.toHaveFocus();
      await expect(input).toHaveAttribute('aria-expanded', 'false');
    });
  },
});

export const Controlled = meta.story({
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
});

const ticketTypes = [
  { value: '1', label: 'Login Issue' },
  { value: '2', label: 'Payment Failed' },
  { value: '3', label: 'Bug Report' },
  { value: '4', label: 'Feature Request' },
  { value: '5', label: 'Account Setup' },
  { value: '6', label: 'Performance Issue' },
  { value: '7', label: 'Security Concern' },
  { value: '8', label: 'API Integration' },
];

export const EmptyResult = meta.story({
  render: args => {
    return (
      <Multiselect
        {...args}
        label="Ticket Types"
        items={ticketTypes}
        placeholder="select a city..."
        emptyState={() => <Text>no result found</Text>}
      />
    );
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText(/Ticket Types/i);
    await userEvent.type(input, 'xyz');

    const result = await canvas.getByText('no result found');
    expect(result).toBeInTheDocument();
  },
});
