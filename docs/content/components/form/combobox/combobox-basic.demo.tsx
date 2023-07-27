import { ComboBox } from '@marigold/components';

export default () => (
  <ComboBox defaultSelectedKey={'dog'} label="Animals">
    <ComboBox.Item key="red panda">Red Panda</ComboBox.Item>
    <ComboBox.Item key="cat">Cat</ComboBox.Item>
    <ComboBox.Item key="dog">Dog</ComboBox.Item>
    <ComboBox.Item key="aardvark">Aardvark</ComboBox.Item>
    <ComboBox.Item key="kangaroo">Kangaroo</ComboBox.Item>
    <ComboBox.Item key="snake">Snake</ComboBox.Item>
    <ComboBox.Item key="vegan">Vegan</ComboBox.Item>
    <ComboBox.Item key="mar">Margrita</ComboBox.Item>
  </ComboBox>
);
