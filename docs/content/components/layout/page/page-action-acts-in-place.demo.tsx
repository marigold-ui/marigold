import {
  Button,
  Description,
  Page,
  Panel,
  Text,
  Title,
} from '@marigold/components';

export default () => (
  <Page>
    <Page.Header>
      <Title>Billing</Title>
      <Description>Manage your plan and invoices.</Description>
      <Button variant="primary">Upgrade plan</Button>
    </Page.Header>
    <Panel>
      <Panel.Header>
        <Title>Current plan</Title>
      </Panel.Header>
      <Panel.Content>
        <Text>You are on the Team plan.</Text>
      </Panel.Content>
    </Panel>
  </Page>
);
