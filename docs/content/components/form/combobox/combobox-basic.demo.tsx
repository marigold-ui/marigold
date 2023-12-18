import { ComboBox } from '@marigold/components';

export default () => (
  <ComboBox defaultSelectedKey={'dog'} label="Animals">
    <ComboBox.Item id="red panda">Red Panda</ComboBox.Item>
    <ComboBox.Item id="cat">Cat</ComboBox.Item>
    <ComboBox.Item id="dog">Dog</ComboBox.Item>
    <ComboBox.Item id="aardvark">Aardvark</ComboBox.Item>
    <ComboBox.Item id="kangaroo">Kangaroo</ComboBox.Item>
    <ComboBox.Item id="snake">Snake</ComboBox.Item>
    <ComboBox.Item id="vegan">Vegan</ComboBox.Item>
    <ComboBox.Item id="mar">Margrita</ComboBox.Item>
  </ComboBox>
);
