import { useState } from 'react';
import { Key } from 'react-aria-components/TagGroup';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { I18nProvider } from '@react-aria/i18n';
import { Stack } from '../Stack/Stack';
import { TagField } from './TagField';

const meta = preview.meta({
  title: 'Components/TagField',
  component: TagField,
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
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
  render: args => (
    <I18nProvider locale="en">
      <TagField {...args}>
        <TagField.Option id="rock">Rock</TagField.Option>
        <TagField.Option id="jazz">Jazz</TagField.Option>
        <TagField.Option id="pop">Pop</TagField.Option>
        <TagField.Option id="classical">Classical</TagField.Option>
        <TagField.Option id="electronic">Electronic</TagField.Option>
      </TagField>
    </I18nProvider>
  ),
});

Basic.test(
  'Show empty state when no items match',
  async ({ canvas, step, args }) => {
    await step('Open the dropdown', async () => {
      const trigger = canvas.getByLabelText(new RegExp(`${args.label}`, 'i'));
      await userEvent.click(trigger);
      await waitFor(() => canvas.getByRole('dialog'));
    });

    await step('Type a search that matches nothing', async () => {
      const searchInput = canvas.getByRole('searchbox');
      await userEvent.type(searchInput, 'zzzzz');
    });

    await step('Verify empty state is shown', async () => {
      expect(canvas.getByText(/no result found|kein ergebnis/i)).toBeVisible();
    });
  }
);

export const Controlled = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => {
    const [selected, setSelected] = useState<Key[]>(['rock', 'pop']);
    return (
      <Stack space={6}>
        <TagField {...args} value={selected} onChange={setSelected} width={80}>
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

Controlled.test('Select multiple items', async ({ canvas, step, args }) => {
  await step('Open the dropdown', async () => {
    const trigger = canvas.getByLabelText(new RegExp(`${args.label}`, 'i'));

    await userEvent.click(trigger);

    await waitFor(() => canvas.getByRole('dialog'));
  });

  await step('Select all items', async () => {
    const dialog = canvas.getByRole('dialog');

    await userEvent.click(within(dialog).getByText('Jazz'));
    await userEvent.click(within(dialog).getByText('Classical'));
    await userEvent.click(within(dialog).getByText('Electronic'));
  });

  await step('Close the dropdown', async () => {
    await userEvent.click(document.body);

    await waitFor(() => {
      expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  await step('Verify all selected items appear as tags', async () => {
    expect(canvas.getByTestId('selected')).toHaveTextContent(
      'selected: ["rock","pop","jazz","classical","electronic"]'
    );
  });
});

Controlled.test(
  'Remove a tag',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, step }) => {
    await step('Remove Rock tag', async () => {
      const removeButtons = await canvas.findAllByRole('button', {
        name: /remove|entfernen/i,
      });
      await userEvent.click(removeButtons[0]);
    });

    await step('Verify Rock was removed', async () => {
      expect(canvas.getByTestId('selected')).toHaveTextContent(
        'selected: ["pop"]'
      );
    });
  }
);

const LARGE_ITEMS = Array.from({ length: 800 }, (_, i) => ({
  id: `item-${i + 200}`,
  label: `Tenant ${i + 200} (item-${i + 200})`,
}));

export const LargeDataset = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    label: 'Tenants',
    placeholder: 'Search tenants...',
    width: 80,
  },
  render: args => (
    <TagField {...args} items={LARGE_ITEMS}>
      {(item: (typeof LARGE_ITEMS)[number]) => (
        <TagField.Option id={item.id}>{item.label}</TagField.Option>
      )}
    </TagField>
  ),
});

LargeDataset.test(
  'Search and select from large dataset',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, step, args }) => {
    await step('Open the dropdown', async () => {
      const trigger = canvas.getByLabelText(new RegExp(`${args.label}`, 'i'));
      await userEvent.click(trigger);
      await waitFor(() => canvas.getByRole('dialog'));
    });

    await step('Search for a specific item', async () => {
      const searchInput = canvas.getByRole('searchbox');
      await userEvent.type(searchInput, 'item-500');
    });

    await step('Verify filtered result and select it', async () => {
      const dialog = canvas.getByRole('dialog');
      const option = within(dialog).getByText('Tenant 500 (item-500)');
      expect(option).toBeVisible();
      await userEvent.click(option);
    });

    await step('Verify selected item appears as tag', async () => {
      const tagGroup = canvas.getByRole('grid', {
        name: /selected items|ausgewählte elemente/i,
      });
      expect(within(tagGroup).getByText('Tenant 500 (item-500)')).toBeVisible();
    });
  }
);

export const Disabled = Basic.extend({
  tags: ['component-test'],
  args: {
    disabled: true,
  },
});

Disabled.test('shows not-allowed cursor when disabled', async ({ canvas }) => {
  const trigger = canvas.getByRole('button');
  const style = window.getComputedStyle(trigger);

  await expect(style.cursor).toBe('not-allowed');
});

export const DisabledItems = Basic.extend({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    disabledKeys: ['classical', 'electronic'],
  },
});

DisabledItems.test(
  'Marks disabled options and keeps enabled ones selectable',
  // Keep the snapshot so Chromatic captures the open list with disabled items.
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, step, args }) => {
    await step('Open the dropdown', async () => {
      const trigger = canvas.getByLabelText(new RegExp(`${args.label}`, 'i'));
      await userEvent.click(trigger);
      await waitFor(() => canvas.getByRole('dialog'));
    });

    await step('Disabled options are marked aria-disabled', async () => {
      const dialog = canvas.getByRole('dialog');
      expect(
        within(dialog).getByRole('option', { name: 'Classical' })
      ).toHaveAttribute('aria-disabled', 'true');
      expect(
        within(dialog).getByRole('option', { name: 'Electronic' })
      ).toHaveAttribute('aria-disabled', 'true');
    });

    await step('Enabled options remain selectable', async () => {
      const dialog = canvas.getByRole('dialog');
      const rock = within(dialog).getByRole('option', { name: 'Rock' });
      expect(rock).not.toHaveAttribute('aria-disabled', 'true');

      await userEvent.click(rock);

      const tagGroup = canvas.getByRole('grid', {
        name: /selected items|ausgewählte elemente/i,
      });
      expect(within(tagGroup).getByText('Rock')).toBeVisible();
    });
  }
);

export const Mobile = Basic.extend({
  tags: ['component-test'],
  globals: {
    viewport: { value: 'smallScreen' },
  },
});

Mobile.test('Open tray and select an item', async ({ canvas, step, args }) => {
  await step('Open the tray', async () => {
    const trigger = canvas.getByLabelText(new RegExp(`${args.label}`, 'i'));

    await userEvent.click(trigger);
    await waitFor(() => canvas.getByRole('dialog'));
  });

  await step('Select an item', async () => {
    const dialog = canvas.getByRole('dialog');

    await userEvent.click(within(dialog).getByText('Rock'));
  });

  await step('Close the tray', async () => {
    const closeButton = canvas.getByRole('button', {
      name: /close|schließen/i,
    });

    await userEvent.click(closeButton);

    await waitFor(() => {
      expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  await step('Verify selected item appears as tag', async () => {
    const tagGroup = canvas.getByRole('grid', { name: /selected items/i });

    expect(within(tagGroup).getByText('Rock')).toBeVisible();
  });
});

Mobile.test(
  'Shows the open tray',
  // Keep the snapshot so Chromatic captures the opened tray.
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, step, args }) => {
    await step('Open the tray', async () => {
      const trigger = canvas.getByLabelText(new RegExp(`${args.label}`, 'i'));

      await userEvent.click(trigger);
      await waitFor(() => canvas.getByRole('dialog'));
    });

    await step('The tray shows the options and stays open', async () => {
      const tray = canvas.getByRole('dialog');

      expect(within(tray).getByRole('option', { name: 'Rock' })).toBeVisible();
      expect(within(tray).getByRole('option', { name: 'Jazz' })).toBeVisible();
    });
  }
);
