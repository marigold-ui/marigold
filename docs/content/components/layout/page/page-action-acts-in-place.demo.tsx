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
      </Panel.Header>
      <Panel.Content>
        <Text>You are on the Team plan.</Text>
      </Panel.Content>
    </Panel>
  </Page>
);
