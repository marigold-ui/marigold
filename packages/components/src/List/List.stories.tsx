import preview from '../../../../config/storybook/.storybook/preview';
import { List } from './List';

const meta = preview.meta({
  title: 'Components/List',
  component: List,
  argTypes: {
    as: {
      control: {
        type: 'select',
      },
      options: ['ol', 'ul'],
      description: ' List should be ordered or unordered list',
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'ul' },
      },
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['default', 'small'],
      description: 'Size of the list items',
    },
  },
  args: {
    as: 'ul',
    size: 'default',
  },
});

export const Basic = meta.story({
  render: args => (
    <List {...args}>
      <List.Item>Cheese</List.Item>
      <List.Item>Milk</List.Item>
      <List.Item>Bread</List.Item>
    </List>
  ),
});

export const Ordered = meta.story({
  render: args => (
    <List as="ol" {...args}>
      <List.Item>Cheese</List.Item>
      <List.Item>Milk</List.Item>
      <List.Item>Bread</List.Item>
    </List>
  ),
});

export const Nested = meta.story({
  render: args => (
    <div className="p-4">
      <List {...args}>
        <List.Item>
          Crispy Chicken Burger
          <List>
            <List.Item>Hähnchen Filet im Crunchy Cornflakes Mantel</List.Item>
          </List>
        </List.Item>
        <List.Item>
          Cream Cheese Chicken Burger
          <List>
            <List.Item>Hähnchen Filet im Crunchy Cornflakes Mantel</List.Item>
            <List.Item>Rucola</List.Item>
            <List.Item>Frischkäse</List.Item>
          </List>
        </List.Item>
        <List.Item>
          Farmer
          <List>
            <List.Item>Rindfleisch</List.Item>
            <List.Item>Bacon</List.Item>
            <List.Item>Spiegelei</List.Item>
          </List>
        </List.Item>
      </List>
    </div>
  ),
});
