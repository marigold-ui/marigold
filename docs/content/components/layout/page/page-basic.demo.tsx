import {
  ActionButton,
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
      <ActionButton variant="primary">Upgrade plan</ActionButton>
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
