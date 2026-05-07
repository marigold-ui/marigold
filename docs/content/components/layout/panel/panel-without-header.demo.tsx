import { Panel, Stack, TextField } from '@marigold/components';

export default () => (
  <Panel>
    <Panel.Title>Quick settings</Panel.Title>
    <Panel.Content>
      <Stack space="regular">
        <TextField label="Display name" defaultValue="Marigold Events" />
        <TextField label="Support email" defaultValue="hello@marigold-ui.io" />
      </Stack>
    </Panel.Content>
  </Panel>
);
