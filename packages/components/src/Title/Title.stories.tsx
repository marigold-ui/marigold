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
    size: {
      control: { type: 'select' },
      options: [
        'level-1',
        'level-2',
        'level-3',
        'level-4',
        'level-5',
        'level-6',
      ],
    },
    variant: {
      control: { type: 'text' },
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
    children: 'Panel title',
  },
  render: ({ children, ...args }: any) => <Title {...args}>{children}</Title>,
});

export const Levels: any = meta.story({
  render: () => (
    <Stack space={2}>
      <Title level={1}>Title rendered as h1</Title>
      <Title level={2}>Title rendered as h2 (default)</Title>
      <Title level={3}>Title rendered as h3</Title>
    </Stack>
  ),
});

export const Sizes: any = meta.story({
  render: () => (
    <Stack space={2}>
      <Title size="level-1">Title at level-1 typography</Title>
      <Title size="level-2">Title at level-2 typography</Title>
      <Title size="level-3">Title at level-3 typography (default)</Title>
      <Title size="level-4">Title at level-4 typography</Title>
      <Title size="level-5">Title at level-5 typography</Title>
      <Title size="level-6">Title at level-6 typography</Title>
    </Stack>
  ),
});
