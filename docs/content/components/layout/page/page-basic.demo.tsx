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
        <Description>You are on the Team plan.</Description>
      </Panel.Header>
      <Panel.Content>
        <Text>Renews on the 1st of every month.</Text>
      </Panel.Content>
    </Panel>
  </Page>
);
