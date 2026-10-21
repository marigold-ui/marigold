import {
  Button,
  Description,
  Form,
  SelectList,
  Stack,
  TextValue,
} from '@marigold/components';

export default () => (
  <Form
    onSubmit={event => {
      event.preventDefault();
      const scopes = new FormData(event.currentTarget).getAll('scopes');
      alert(
        scopes.length > 0
          ? `Granting: ${scopes.join(', ')}`
          : 'No scopes granted'
      );
    }}
  >
    <Stack space={4} alignX="left">
      <SelectList
        label="Token scopes"
        description="What this API token is allowed to do."
        name="scopes"
        selectionMode="multiple" // [!code highlight]
        allowSelectAll // [!code highlight]
      >
        <SelectList.Option id="events.read" textValue="Read events">
          <TextValue>Read events</TextValue>
          <Description>List and inspect events and their dates.</Description>
        </SelectList.Option>
        <SelectList.Option id="orders.read" textValue="Read orders">
          <TextValue>Read orders</TextValue>
          <Description>Inspect orders, tickets and refunds.</Description>
        </SelectList.Option>
        <SelectList.Option id="orders.write" textValue="Write orders">
          <TextValue>Write orders</TextValue>
          <Description>Refund, rebook and resend tickets.</Description>
        </SelectList.Option>
      </SelectList>
      <Button type="submit" variant="primary">
        Create token
      </Button>
    </Stack>
  </Form>
);
