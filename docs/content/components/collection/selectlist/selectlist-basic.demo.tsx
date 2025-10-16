import { SelectList } from '@marigold/components';

export default () => (
  <SelectList
    aria-label="Select a venue"
    selectionMode="single"
    defaultSelectedKeys={['1']}
  >
    <SelectList.Item id="1" textValue="Main Street Park Amphitheater">
      <SelectList.Label>Main Street Park Amphitheater</SelectList.Label>
    </SelectList.Item>
    <SelectList.Item id="2" textValue="Shakytown Comedy Club">
      <SelectList.Label>Shakytown Comedy Club</SelectList.Label>
    </SelectList.Item>
    <SelectList.Item id="3" textValue="Oak Ridge Barn">
      <SelectList.Label>Oak Ridge Barn</SelectList.Label>
    </SelectList.Item>
    <SelectList.Item id="4" textValue="Harborfront Promenade">
      <SelectList.Label>Harborfront Promenade</SelectList.Label>
    </SelectList.Item>
  </SelectList>
);
