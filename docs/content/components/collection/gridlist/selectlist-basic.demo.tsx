import { SelectList } from '@marigold/components';

export default () => (
  <SelectList aria-labelledby="SelectList" disabledKeys={['T012']}>
    <SelectList.Item id="T123">Ticket 123</SelectList.Item>
    <SelectList.Item id="T456">Ticket 456</SelectList.Item>
    <SelectList.Item id="T789">Ticket 789</SelectList.Item>
    <SelectList.Item id="T012">Ticket 012</SelectList.Item>
  </SelectList>
);
