import preview from '.storybook/preview';
import { Description } from './Description';

const meta = preview.meta({
  title: 'Components/Description',
  component: Description,
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['p', 'span', 'div'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base'],
    },
    slot: {
      control: { type: 'text' },
    },
    color: {
      control: { type: 'text' },
    },
  },
});

export const Basic: any = meta.story({
  args: {
    children: 'Helps a user understand what the parent region is for.',
  },
  render: ({ children, ...args }: any) => (
    <Description {...args}>{children}</Description>
  ),
});
