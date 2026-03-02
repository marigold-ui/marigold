import preview from '.storybook/preview';
import { Search } from '@marigold/icons';
import { IconButton } from './IconButton';

const meta = preview.meta({
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'Button variant',
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'Button size',
    },
  },
});

export const Basic = meta.story({
  render: args => (
    <IconButton {...args}>
      <Search />
    </IconButton>
  ),
});
