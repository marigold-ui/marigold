import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Stack } from '../Stack/Stack';
import { Title } from './Title';

const meta = preview.meta({
  title: 'Components/Title',
  component: Title,
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
    },
    slot: {
      control: { type: 'text' },
    },
  },
});

export const Basic = meta.story({
  args: {
    children: 'Panel title',
  },
  render: ({ children, ...args }) => <Title {...args}>{children}</Title>,
});

export const Levels = meta.story({
  render: () => (
    <Stack space={2}>
      <Title level={1}>Title rendered as h1</Title>
      <Title level={2}>Title rendered as h2 (default)</Title>
      <Title level={3}>Title rendered as h3</Title>
    </Stack>
  ),
});

export const Renders = meta.story({
  tags: ['component-test'],
  render: () => <Title>Panel title</Title>,
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { level: 2, name: 'Panel title' })
    ).toBeInTheDocument();
  },
});
