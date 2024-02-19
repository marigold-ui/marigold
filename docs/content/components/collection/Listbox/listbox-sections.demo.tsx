import { Header } from '@marigold/components';
import { ListBox } from '@marigold/components/src/ListBox';

export default () => (
  <ListBox aria-labelledby="listbox">
    <ListBox.Section>
      <Header>Veggies</Header>
      <ListBox.Item id="lettuce">Lettuce</ListBox.Item>
      <ListBox.Item id="tomato">Tomato</ListBox.Item>
      <ListBox.Item id="onion">Onion</ListBox.Item>
    </ListBox.Section>
    <ListBox.Section>
      <Header>Protein</Header>
      <ListBox.Item id="ham">Ham</ListBox.Item>
      <ListBox.Item id="tuna">Tuna</ListBox.Item>
      <ListBox.Item id="tofu">Tofu</ListBox.Item>
    </ListBox.Section>
    <ListBox.Section>
      <Header>Condiments</Header>
      <ListBox.Item id="mayo">Mayonaise</ListBox.Item>
      <ListBox.Item id="mustard">Mustard</ListBox.Item>
      <ListBox.Item id="ranch">Ranch</ListBox.Item>
    </ListBox.Section>
  </ListBox>
);
