import {
  Description,
  LinkButton,
  Page,
  Panel,
  Text,
  Title,
} from '@marigold/components';

export default () => (
  <Page>
    <Page.Header>
      <Title>Events</Title>
      <Description>Create and manage your events.</Description>
      <LinkButton variant="primary" href="/events/new">
        Create event
      </LinkButton>
    </Page.Header>
    <Panel>
      <Panel.Header>
        <Title>Upcoming</Title>
      </Panel.Header>
      <Panel.Content>
        <Text>No events scheduled yet.</Text>
      </Panel.Content>
    </Panel>
  </Page>
);
