import { expect, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
import { Edit } from '@marigold/icons';
import { ActionButton } from '../ActionButton/ActionButton';
import { ActionMenu } from '../Menu/ActionMenu';
import { ActionGroup } from './ActionGroup';

const meta = preview.meta({
  title: 'Components/ActionGroup',
  component: ActionGroup,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['ghost', 'secondary', 'destructive-ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'small', 'large', 'icon'],
    },
    disabled: { control: { type: 'boolean' } },
  },
});

export const Basic: any = meta.story({
  tags: ['component-test'],
  render: () => (
    <ActionGroup aria-label="Item actions">
      <ActionButton aria-label="Edit">
        <Edit />
      </ActionButton>
      <ActionButton aria-label="Duplicate">Duplicate</ActionButton>
      <ActionButton aria-label="Delete">Delete</ActionButton>
    </ActionGroup>
  ),
  play: async ({ canvas }: any) => {
    const toolbar = canvas.getByRole('toolbar', { name: 'Item actions' });
    await expect(toolbar).toBeInTheDocument();

    const buttons = canvas.getAllByRole('button');
    await expect(buttons.length).toBe(3);

    buttons[0].focus();
    await expect(buttons[0]).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    await expect(buttons[1]).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    await expect(buttons[2]).toHaveFocus();
  },
});

export const DisabledCascade: any = meta.story({
  tags: ['component-test'],
  render: () => (
    <ActionGroup aria-label="Disabled actions" disabled>
      <ActionButton aria-label="Edit">Edit</ActionButton>
      <ActionButton aria-label="Delete">Delete</ActionButton>
    </ActionGroup>
  ),
  play: async ({ canvas }: any) => {
    const buttons = canvas.getAllByRole('button');
    for (const button of buttons) {
      await expect(button).toBeDisabled();
    }
  },
});

export const CascadePrecedence: any = meta.story({
  tags: ['component-test'],
  render: () => (
    <ActionGroup
      aria-label="Cascade precedence"
      size="small"
      variant="ghost"
      disabled
    >
      <ActionButton aria-label="Outsized" size="large">
        Outsized
      </ActionButton>
      <ActionButton aria-label="Delete" variant="destructive-ghost">
        Delete
      </ActionButton>
      <ActionButton aria-label="Save" disabled={false}>
        Save
      </ActionButton>
    </ActionGroup>
  ),
});

export const WithActionMenu: any = meta.story({
  tags: ['component-test'],
  render: () => (
    <ActionGroup aria-label="With ActionMenu" size="small" variant="ghost">
      <ActionButton aria-label="Edit">Edit</ActionButton>
      <ActionButton aria-label="Duplicate">Duplicate</ActionButton>
      <ActionMenu aria-label="More actions" size="large">
        <ActionMenu.Item id="archive">Archive</ActionMenu.Item>
        <ActionMenu.Item id="delete">Delete</ActionMenu.Item>
      </ActionMenu>
    </ActionGroup>
  ),
});
