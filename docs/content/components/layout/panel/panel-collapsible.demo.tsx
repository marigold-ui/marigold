import { venues } from '@/lib/data/venues';
import {
  DatePicker,
  Panel,
  Select,
  Stack,
  TextField,
} from '@marigold/components';

export default () => (
  <Panel size="form">
    <Panel.Header>
      <Panel.Title>Event details</Panel.Title>
      <Panel.Description>
        Information shown on the event page, confirmations, and tickets.
      </Panel.Description>
    </Panel.Header>
    <Panel.Content>
      <Stack space="regular">
        <TextField label="Event title" defaultValue="Summer Comedy Night" />
        <DatePicker label="Start date" />
        <Select label="Venue" placeholder="Select a venue">
          {venues.slice(0, 6).map(v => (
            <Select.Option key={v.id} id={v.id}>
              {v.name}
            </Select.Option>
          ))}
        </Select>
      </Stack>
    </Panel.Content>
    <Panel.Collapsible>
      <Panel.CollapsibleHeader>
        <Panel.CollapsibleTitle>SEO &amp; tracking</Panel.CollapsibleTitle>
        <Panel.CollapsibleDescription>
          Optional metadata used on the event page and in social shares.
        </Panel.CollapsibleDescription>
      </Panel.CollapsibleHeader>
      <Panel.CollapsibleContent>
        <Stack space="regular">
          <TextField
            label="URL slug"
            description="Used in the event page URL."
            defaultValue="summer-comedy-night"
          />
          <TextField label="Analytics tracking ID" />
          <TextField label="Social share image URL" />
        </Stack>
      </Panel.CollapsibleContent>
    </Panel.Collapsible>
  </Panel>
);
