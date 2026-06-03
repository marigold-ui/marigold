import preview from '.storybook/preview';
import { Text } from '../Text/Text';
import { ListBox } from './ListBox';

const meta = preview.meta({
  title: 'Components/ListBox',
  parameters: {
    surface: false,
  },
});

export const Basic = meta.story({
  render: args => (
    <ListBox
      aria-labelledby="listbox"
      selectionMode="single"
      defaultSelectedKeys={['one']}
      {...args}
      disabledKeys={['four']}
    >
      <ListBox.Item id="one">one</ListBox.Item>
      <ListBox.Item id="two">Two</ListBox.Item>
      <ListBox.Item id="three">Three</ListBox.Item>
      <ListBox.Item id="four">Four</ListBox.Item>
    </ListBox>
  ),
});

export const WithDescription = meta.story({
  render: args => (
    <ListBox
      aria-labelledby="listbox"
      selectionMode="single"
      defaultSelectedKeys={['harry']}
      {...args}
    >
      <ListBox.Item id="harry" textValue="Harry Potter">
        <Text slot="label">Harry Potter</Text>
        <Text slot="description">About the boy who lived</Text>
      </ListBox.Item>
      <ListBox.Item id="lotr" textValue="Lord of the Rings">
        <Text slot="label">Lord of the Rings</Text>
        <Text slot="description">In the lands of Middle earth</Text>
      </ListBox.Item>
    </ListBox>
  ),
});

export const WithSections = meta.story({
  render: args => (
    <ListBox aria-labelledby="listbox" selectionMode="single" {...args}>
      <ListBox.Section header="Veggies">
        <ListBox.Item id="lettuce">Lettuce</ListBox.Item>
        <ListBox.Item id="tomato">Tomato</ListBox.Item>
        <ListBox.Item id="onion">Onion</ListBox.Item>
      </ListBox.Section>
      <ListBox.Section header="Protein">
        <ListBox.Item id="ham">Ham</ListBox.Item>
        <ListBox.Item id="tuna">Tuna</ListBox.Item>
        <ListBox.Item id="tofu">Tofu</ListBox.Item>
      </ListBox.Section>
      <ListBox.Section header="Condiments">
        <ListBox.Item id="mayo">Mayonaise</ListBox.Item>
        <ListBox.Item id="mustard">Mustard</ListBox.Item>
        <ListBox.Item id="ranch">Ranch</ListBox.Item>
      </ListBox.Section>
    </ListBox>
  ),
});
