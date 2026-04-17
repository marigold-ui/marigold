import { Panel, PanelProps, Stack, TextField } from '@marigold/components';

export default (props: PanelProps) => (
  <Panel {...props}>
    <Panel.Header>
      <Panel.Title>Organizer profile</Panel.Title>
      <Panel.Description>
        Public details shown to customers on ticket confirmations and event
        pages.
      </Panel.Description>
    </Panel.Header>
    <Panel.Content>
      <Stack space="regular">
        <TextField label="Organizer name" defaultValue="Marigold Events" />
        <TextField
          label="Support email"
          defaultValue="hello@marigold-events.com"
        />
      </Stack>
    </Panel.Content>
  </Panel>
);
