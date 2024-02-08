import { ListBox } from '@marigold/components/src/ListBox';

export default () => (
  <ListBox
    aria-labelledby="listbox"
    selectionMode="single"
    defaultSelectedKeys={['apple']}
    disabledKeys={['orange']}
  >
    <ListBox.Item id="apple">Apple</ListBox.Item>
    <ListBox.Item id="banana">Banana</ListBox.Item>
    <ListBox.Item id="orange">Orange</ListBox.Item>
    <ListBox.Item id="grape">Grape</ListBox.Item>
  </ListBox>
);
