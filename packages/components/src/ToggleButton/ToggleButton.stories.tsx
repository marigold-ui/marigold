import { Star } from 'lucide-react';
import { useState } from 'storybook/internal/preview-api';
import { expect, fn, userEvent, within } from 'storybook/test';
import preview from '../../../../config/storybook/.storybook/preview';
import { ToggleButton } from './ToggleButton';

const meta = preview.meta({
  title: 'Components/ToggleButton',
  component: ToggleButton,
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the toggle button',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    selected: {
      control: 'boolean',
      description: 'Whether the toggle button is selected',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      description: 'Handler called when the selection state changes',
      table: {
        type: { summary: '(isSelected: boolean) => void' },
      },
    },
    size: {
      control: { type: 'radio' },
      description: 'Size of the toggle button',
      options: ['default', 'small', 'icon'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
  },
  args: {
    children: 'Toggle',
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  args: {
    onChange: fn(),
  },
  render: args => <ToggleButton {...args} />,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await userEvent.click(button);

    await expect(args.onChange).toHaveBeenCalledWith(true);

    await userEvent.click(button);

    await expect(args.onChange).toHaveBeenCalledWith(false);
  },
});

export const Controlled = meta.story({
  render: args => {
    const [isSelected, setIsSelected] = useState(false);

    return (
      <div className="flex flex-col gap-4">
        <ToggleButton
          {...args}
          selected={isSelected}
          onChange={setIsSelected}
          size="icon"
          aria-label="Star toggle"
        >
          <Star fill={isSelected ? 'currentColor' : 'none'} />
        </ToggleButton>
        <div className="text-sm">
          Status: {isSelected ? '⭐ Favorited' : '☆ Not favorited'}
        </div>
      </div>
    );
  },
});

export default meta;
