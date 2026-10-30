import { Description, SelectList, TextValue } from '@marigold/components';

export default () => (
  <SelectList
    label="Role permissions"
    description="What this role can do in the workspace."
    name="permissions"
    selectionMode="multiple" // [!code highlight]
    allowSelectAll // [!code highlight]
    defaultSelectedKeys={['events']}
  >
    <SelectList.Option id="events" textValue="Manage events">
      <TextValue>Manage events</TextValue>
      <Description>
        Create, edit and cancel events, and publish them to sales channels.
      </Description>
    </SelectList.Option>
    <SelectList.Option id="orders" textValue="Manage orders">
      <TextValue>Manage orders</TextValue>
      <Description>
        Refund, rebook and resend tickets for any order in the workspace.
      </Description>
    </SelectList.Option>
    <SelectList.Option id="reports" textValue="View reports">
      <TextValue>View reports</TextValue>
      <Description>
        Read sales and attendance figures, and export them as a spreadsheet.
      </Description>
    </SelectList.Option>
    <SelectList.Option id="billing" textValue="Manage billing" disabled>
      <TextValue>Manage billing</TextValue>
      <Description>
        Reserved for the workspace owner, so a select-all leaves it out.
      </Description>
    </SelectList.Option>
  </SelectList>
);
