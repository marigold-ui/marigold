import { useState } from 'react';
import { expect, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
import { Star } from '@marigold/icons';
import { ToggleButton } from './ToggleButton';

const meta = preview.meta({
  title: 'Components/ToggleButton',
  component: ToggleButton,
  parameters: {
    surface: false,
  },
  decorators: [
    Story => (
      <div className="self-start">
        <Story />
      </div>
    ),
  ],
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
  render: args => <ToggleButton {...args} />,
});

Basic.test(
  'Clicking the toggle button updates selection',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, step }) => {
    const button = canvas.getByRole('button');

    await step('Click to select the button', async () => {
      await userEvent.click(button);

      expect(button).toHaveAttribute('data-selected', 'true');
    });

    await step('Click again to deselect the button', async () => {
      await userEvent.click(button);

      expect(button).not.toHaveAttribute('data-selected');
    });
  }
);

Basic.test(
  'applies the selected foreground styling when toggled on',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas }) => {
    const button = canvas.getByRole('button');

    // The selected appearance is wired to react-aria's `data-selected` via the
    // theme's `selected:*` utilities on the button.
    expect(button).toHaveClass('selected:text-selected-bold-foreground');

    const colorWhenUnselected = getComputedStyle(button).color;

    await userEvent.click(button);

    expect(button).toHaveAttribute('data-selected', 'true');
    // Selecting swaps the text colour to the bold selected foreground, so the
    // resolved colour must actually change.
    expect(getComputedStyle(button).color).not.toBe(colorWhenUnselected);
  }
);

export const BothSurfaces = meta.story({
  parameters: {
    chromatic: { disableSnapshot: true },
    surface: 'both',
  },
  render: args => <ToggleButton {...args}>Toggle</ToggleButton>,
});

export const IconToggleButton = meta.story({
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
