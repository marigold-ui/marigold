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
  render: args => <ToggleButton {...args} />,
});
