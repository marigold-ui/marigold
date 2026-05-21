import { ComboBox } from '@marigold/components';

export default () => (
  <ComboBox label="Animals" width={64} selectionMode="multiple">
    <ComboBox.Option id="red panda">Red Panda</ComboBox.Option>
    <ComboBox.Option id="cat">Cat</ComboBox.Option>
    <ComboBox.Option id="dog">Dog</ComboBox.Option>
    <ComboBox.Option id="aardvark">Aardvark</ComboBox.Option>
    <ComboBox.Option id="kangaroo">Kangaroo</ComboBox.Option>
    <ComboBox.Option id="snake">Snake</ComboBox.Option>
  </ComboBox>
);
