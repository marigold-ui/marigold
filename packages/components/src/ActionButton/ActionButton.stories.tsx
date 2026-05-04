import { expect, fn, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
import { Edit } from '@marigold/icons';
import { ActionButton } from './ActionButton';

const meta = preview.meta({
  title: 'Components/ActionButton',
  component: ActionButton,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'destructive',
        'destructive-ghost',
        'ghost',
        'link',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'small', 'large', 'icon'],
    },
    disabled: { control: { type: 'boolean' } },
    loading: { control: { type: 'boolean' } },
  },
});

export const Basic: any = meta.story({
  tags: ['component-test'],
  args: {
    children: 'Action',
    onPress: fn(),
  },
  render: (args: any) => <ActionButton {...args} />,
  play: async ({ canvas, args }: any) => {
    const button = canvas.getByRole('button', { name: 'Action' });
    await userEvent.click(button);
    await expect(args.onPress).toHaveBeenCalled();
  },
});

export const Loading: any = meta.story({
  args: {
    children: 'Working',
    loading: true,
  },
  render: (args: any) => <ActionButton {...args} />,
});

export const Disabled: any = meta.story({
  args: {
    children: 'Disabled',
    disabled: true,
  },
  render: (args: any) => <ActionButton {...args} />,
});

export const Group: any = meta.story({
  tags: ['component-test'],
  render: () => (
    <ActionButton.Group aria-label="Item actions">
      <ActionButton aria-label="Edit">
        <Edit />
      </ActionButton>
      <ActionButton aria-label="Duplicate">Duplicate</ActionButton>
      <ActionButton aria-label="Delete">Delete</ActionButton>
    </ActionButton.Group>
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

export const GroupDisabledCascade: any = meta.story({
  tags: ['component-test'],
  render: () => (
    <ActionButton.Group aria-label="Disabled actions" disabled>
      <ActionButton aria-label="Edit">Edit</ActionButton>
      <ActionButton aria-label="Delete">Delete</ActionButton>
    </ActionButton.Group>
  ),
  play: async ({ canvas }: any) => {
    const buttons = canvas.getAllByRole('button');
    for (const button of buttons) {
      await expect(button).toBeDisabled();
    }
  },
});

export const GroupCascadePrecedence: any = meta.story({
  tags: ['component-test'],
  render: () => (
    <ActionButton.Group
      aria-label="Cascade precedence"
      size="small"
      variant="ghost"
      disabled
    >
      <ActionButton aria-label="Outsized" size="large">
        Outsized
      </ActionButton>
      <ActionButton aria-label="Delete" variant="destructive">
        Delete
      </ActionButton>
      <ActionButton aria-label="Save" disabled={false}>
        Save
      </ActionButton>
    </ActionButton.Group>
  ),
});
