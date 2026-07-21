import { ListBox, ListBoxItem } from 'react-aria-components/ListBox';
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

export const Basic = meta.story({
  args: {
    children: 'Apple',
  },
  render: ({ children, ...args }) => (
    <TextValue {...args}>{children}</TextValue>
  ),
});

export const InsideListBoxItem = meta.story({
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
});

InsideListBoxItem.test(
  'resolves each option accessible name from its TextValue',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    await expect(
      await canvas.findByRole('option', { name: 'Apple' })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('option', { name: 'Banana' })
    ).toBeInTheDocument();
  }
);
