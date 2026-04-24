import { SelectList, SelectListProps, Text } from '@marigold/components';

export default (props: SelectListProps) => (
  <SelectList
    {...props}
    aria-label="Select ticket type"
    selectionMode="single"
    defaultSelectedKeys={['standard']}
  >
    <SelectList.Option id="standard" textValue="Standard Ticket">
      <Text slot="label">Standard Ticket</Text>
      <Text slot="description">Access to all main events • €49</Text>
    </SelectList.Option>
    <SelectList.Option id="vip" textValue="VIP Ticket">
      <Text slot="label">VIP Ticket</Text>
      <Text slot="description">Includes VIP lounge, free drinks • €129</Text>
    </SelectList.Option>
    <SelectList.Option id="student" textValue="Student Ticket">
      <Text slot="label">Student Ticket</Text>
      <Text slot="description">Valid student ID required • €29</Text>
    </SelectList.Option>
    <SelectList.Option id="child" textValue="Child Ticket">
      <Text slot="label">Child Ticket</Text>
      <Text slot="description">For children under 12 • €15</Text>
    </SelectList.Option>
  </SelectList>
);
