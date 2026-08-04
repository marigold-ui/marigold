import { Panel, Stack, TextField, Title } from '@marigold/components';

export default () => (
  <Panel>
    <Title>Quick settings</Title>
    <Panel.Content>
      <Stack space="regular">
        <TextField label="Display name" defaultValue="Marigold Events" />
        <TextField label="Support email" defaultValue="hello@marigold-ui.io" />
      </Stack>
    </Panel.Content>
  </Panel>
);
