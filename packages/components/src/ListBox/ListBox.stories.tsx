import preview from '.storybook/preview';
import { ListBox } from './ListBox';

const meta = preview.meta({
  title: 'Components/ListBox',
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

export const WithSections = meta.story({
  render: args => (
    <ListBox aria-labelledby="listbox" {...args}>
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
