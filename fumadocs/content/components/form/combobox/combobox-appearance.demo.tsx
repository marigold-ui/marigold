import { ComboBox } from '@marigold/components';

export default () => (
  <ComboBox defaultSelectedKey={'dog'} label="Animals" width="fit">
    <ComboBox.Option id="red panda">Red Panda</ComboBox.Option>
    <ComboBox.Option id="cat">Cat</ComboBox.Option>
    <ComboBox.Option id="dog">Dog</ComboBox.Option>
    <ComboBox.Option id="aardvark">Aardvark</ComboBox.Option>
    <ComboBox.Option id="kangaroo">Kangaroo</ComboBox.Option>
    <ComboBox.Option id="snake">Snake</ComboBox.Option>
    <ComboBox.Option id="vegan">Vegan</ComboBox.Option>
    <ComboBox.Option id="mar">Margrita</ComboBox.Option>
  </ComboBox>
);
