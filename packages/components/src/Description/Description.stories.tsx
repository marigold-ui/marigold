import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Description } from './Description';

const meta = preview.meta({
  title: 'Components/Description',
  component: Description,
  argTypes: {
    slot: {
      control: { type: 'text' },
    },
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  args: {
    children: 'Helps a user understand what the parent region is for.',
  },
  render: ({ children, ...args }) => (
    <Description {...args}>{children}</Description>
  ),
});

Basic.test(
  'renders its children',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    await expect(
      canvas.getByText('Helps a user understand what the parent region is for.')
    ).toBeInTheDocument();
  }
);
