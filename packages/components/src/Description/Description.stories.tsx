import { expect } from 'storybook/test';
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
    slot: {
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

export const Renders: any = meta.story({
  tags: ['component-test'],
  render: () => (
    <Description>
      Helps a user understand what the parent region is for.
    </Description>
  ),
  play: async ({ canvas }: any) => {
    await expect(
      canvas.getByText('Helps a user understand what the parent region is for.')
    ).toBeInTheDocument();
  },
});
