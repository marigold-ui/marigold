import { useState } from 'react';
import { Key } from 'react-aria-components';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Stack } from '../Stack/Stack';
import { TagField } from './TagField';

const meta = preview.meta({
  title: 'Components/TagField',
  component: TagField,
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Set the label',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Set the placeholder text',
    },
    description: {
      control: { type: 'text' },
      description: 'Set the field description',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the field',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Require the field',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Set error state',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error Message',
    },
    width: {
      control: { type: 'text' },
      description: 'The width of the field',
    },
  },
  args: {
    label: 'Genres',
    error: false,
    errorMessage: 'Please select at least one.',
    required: false,
    disabled: false,
    width: 80,
    placeholder: 'Select genres...',
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => {
    const [selected, setSelected] = useState<Key[]>([]);
    return (
      <Stack space={6}>
        <TagField {...args} value={selected} onChange={setSelected}>
          <TagField.Option id="rock">Rock</TagField.Option>
          <TagField.Option id="jazz">Jazz</TagField.Option>
          <TagField.Option id="pop">Pop</TagField.Option>
          <TagField.Option id="classical">Classical</TagField.Option>
          <TagField.Option id="electronic">Electronic</TagField.Option>
        </TagField>
        <hr />
        <pre data-testid="selected">selected: {JSON.stringify(selected)}</pre>
      </Stack>
    );
  },
});

Basic.test('Select multiple items', async ({ canvas, step, args }) => {
  await step('Open the dropdown', async () => {
    const trigger = canvas.getByLabelText(new RegExp(`${args.label}`, 'i'));

    await userEvent.click(trigger);

    await waitFor(() => canvas.getByRole('dialog'));
  });

  await step('Select Rock and Jazz', async () => {
    const dialog = canvas.getByRole('dialog');

    await userEvent.click(within(dialog).getByText('Rock'));
    await userEvent.click(within(dialog).getByText('Jazz'));
  });

  await step('Close the dropdown', async () => {
    await userEvent.click(document.body);

    await waitFor(() => {
      expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  await step('Verify selected items appear as tags', async () => {
    expect(canvas.getByTestId('selected')).toHaveTextContent(
      'selected: ["rock","jazz"]'
    );
    expect(canvas.getAllByText('Rock')[0]).toBeVisible();
    expect(canvas.getAllByText('Jazz')[0]).toBeVisible();
  });
});

export const Controlled = meta.story({
  render: ({ label }) => {
    const [selected, setSelected] = useState<Key[]>(['rock', 'pop']);
    return (
      <Stack space={6}>
        <TagField
          label={label}
          value={selected}
          onChange={setSelected}
          width={80}
        >
          <TagField.Option id="rock">Rock</TagField.Option>
          <TagField.Option id="jazz">Jazz</TagField.Option>
          <TagField.Option id="pop">Pop</TagField.Option>
          <TagField.Option id="classical">Classical</TagField.Option>
          <TagField.Option id="electronic">Electronic</TagField.Option>
        </TagField>
        <hr />
        <pre data-testid="selected">selected: {JSON.stringify(selected)}</pre>
      </Stack>
    );
  },
});

export const Disabled = meta.story({
  render: args => (
    <TagField {...args} disabled defaultValue={['rock', 'jazz']}>
      <TagField.Option id="rock">Rock</TagField.Option>
      <TagField.Option id="jazz">Jazz</TagField.Option>
      <TagField.Option id="pop">Pop</TagField.Option>
      <TagField.Option id="classical">Classical</TagField.Option>
    </TagField>
  ),
});

export const WithError = meta.story({
  render: args => (
    <TagField {...args} error errorMessage="Please select at least one genre.">
      <TagField.Option id="rock">Rock</TagField.Option>
      <TagField.Option id="jazz">Jazz</TagField.Option>
      <TagField.Option id="pop">Pop</TagField.Option>
      <TagField.Option id="classical">Classical</TagField.Option>
    </TagField>
  ),
});

export const DisabledItems = meta.story({
  render: args => {
    const [selected, setSelected] = useState<Key[]>([]);
    return (
      <TagField
        {...args}
        value={selected}
        onChange={setSelected}
        disabledKeys={['classical', 'electronic']}
      >
        <TagField.Option id="rock">Rock</TagField.Option>
        <TagField.Option id="jazz">Jazz</TagField.Option>
        <TagField.Option id="pop">Pop</TagField.Option>
        <TagField.Option id="classical">Classical</TagField.Option>
        <TagField.Option id="electronic">Electronic</TagField.Option>
      </TagField>
    );
  },
});
