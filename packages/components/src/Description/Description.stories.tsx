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
  args: {
    children: 'Helps a user understand what the parent region is for.',
  },
  render: ({ children, ...args }) => (
    <Description {...args}>{children}</Description>
  ),
});

export const Renders = meta.story({
  tags: ['component-test'],
  render: () => (
    <Description>
      Helps a user understand what the parent region is for.
    </Description>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Helps a user understand what the parent region is for.')
    ).toBeInTheDocument();
  },
});
