import { ListBox, ListBoxItem } from 'react-aria-components';
import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { TextValue } from './TextValue';

const meta = preview.meta({
  title: 'Components/TextValue',
  component: TextValue,
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['span', 'p', 'div'],
      description: 'Element to render.',
    },
    slot: {
      control: { type: 'text' },
      description: 'Slot name to consume from a parent context.',
    },
  },
});

export const Basic: any = meta.story({
  args: {
    children: 'Apple',
  },
  render: ({ children, ...args }: any) => (
    <TextValue {...args}>{children}</TextValue>
  ),
});

export const InsideListBoxItem: any = meta.story({
  tags: ['component-test'],
  render: () => (
    <ListBox aria-label="Fruits">
      <ListBoxItem id="apple">
        <TextValue>Apple</TextValue>
      </ListBoxItem>
      <ListBoxItem id="banana">
        <TextValue>Banana</TextValue>
      </ListBoxItem>
    </ListBox>
  ),
  play: async ({ canvas }: any) => {
    await expect(
      canvas.getByRole('option', { name: 'Apple' })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('option', { name: 'Banana' })
    ).toBeInTheDocument();
  },
});
