import { ComboBox, Description, TextValue } from '@marigold/components';

export default () => (
  <ComboBox label="Framework" placeholder="Search frameworks" width={72}>
    <ComboBox.Option id="react">
      <TextValue>React</TextValue>
      <Description>Component-based UI library</Description>
    </ComboBox.Option>
    <ComboBox.Option id="vue">
      <TextValue>Vue</TextValue>
      <Description>Progressive web framework</Description>
    </ComboBox.Option>
    <ComboBox.Option id="svelte">
      <TextValue>Svelte</TextValue>
      <Description>Compiles to vanilla JavaScript</Description>
    </ComboBox.Option>
    <ComboBox.Option id="solid">
      <TextValue>Solid</TextValue>
      <Description>Fine-grained reactivity</Description>
    </ComboBox.Option>
  </ComboBox>
);
