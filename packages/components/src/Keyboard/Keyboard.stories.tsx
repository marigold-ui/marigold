import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Keyboard } from './Keyboard';

const meta = preview.meta({
  title: 'Components/Keyboard',
  component: Keyboard,
});

export const Basic = meta.story({
  tags: ['component-test'],
  args: {
    children: '⌘K',
  },
  render: ({ children, ...args }) => <Keyboard {...args}>{children}</Keyboard>,
});

Basic.test(
  'renders its children',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    await expect(canvas.getByText('⌘K')).toBeInTheDocument();
  }
);
