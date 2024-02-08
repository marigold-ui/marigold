import { ListBox } from '@marigold/components';

export default () => (
  <ListBox
    aria-labelledby="listbox"
    selectionMode="multiple"
    defaultSelectedKeys={['one']}
    disabledKeys={['four']}
  >
    <ListBox.Item id="one">one</ListBox.Item>
    <ListBox.Item id="two">Two</ListBox.Item>
    <ListBox.Item id="three">Three</ListBox.Item>
    <ListBox.Item id="four">Four</ListBox.Item>
  </ListBox>
);
