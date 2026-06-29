import { expect, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
import { Multiselect } from './Multiselect';

const meta = preview.meta({
  title: 'Components/Multiselect (deprecated)',
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
