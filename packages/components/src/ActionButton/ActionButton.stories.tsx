import { expect, fn, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
import { ActionButton } from './ActionButton';

const meta = preview.meta({
  title: 'Components/ActionButton',
  component: ActionButton,
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
    loading: { control: { type: 'boolean' } },
  },
});

export const Basic: any = meta.story({
  tags: ['component-test'],
  args: {
    children: 'Action',
    onPress: fn(),
  },
  render: args => <ActionButton {...args} />,
  play: async ({ canvas, args }) => {
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
  render: args => <ActionButton {...args} />,
});

export const Disabled: any = meta.story({
  tags: ['component-test'],
  args: {
    children: 'Disabled',
    disabled: true,
    onPress: fn(),
  },
  render: args => <ActionButton {...args} />,
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', { name: 'Disabled' });

    await userEvent.click(button);

    await expect(args.onPress).not.toHaveBeenCalled();
  },
});
