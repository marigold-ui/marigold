import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Stack } from '../Stack/Stack';
import { Title } from './Title';

const meta = preview.meta({
  title: 'Components/Title',
  parameters: { surface: false },
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
  tags: ['component-test'],
  args: {
    children: 'Panel title',
  },
  render: ({ children, ...args }) => <Title {...args}>{children}</Title>,
});

Basic.test(
  'renders as a level-2 heading by default',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { level: 2, name: 'Panel title' })
    ).toBeInTheDocument();
  }
);

Basic.test(
  'renders at each configured heading level',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    render: () => (
      <Stack space={2}>
        <Title level={1}>Title rendered as h1</Title>
        <Title level={2}>Title rendered as h2 (default)</Title>
        <Title level={3}>Title rendered as h3</Title>
      </Stack>
    ),
  },
  async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { level: 1, name: 'Title rendered as h1' })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('heading', {
        level: 2,
        name: 'Title rendered as h2 (default)',
      })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('heading', { level: 3, name: 'Title rendered as h3' })
    ).toBeInTheDocument();
  }
);
