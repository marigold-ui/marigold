import {
  Badge,
  Columns,
  Description,
  Inline,
  Page,
  Panel,
  Stack,
  Text,
  Title,
} from '@marigold/components';

export default () => (
  <Page>
    <Page.Header>
      <Title>Summer Festival</Title>
      <Description>Event details and ticketing.</Description>
    </Page.Header>
    <Columns columns={[2, 1]} space="group" collapseAt="40rem">
      {/* Primary column: the page's main content */}
      <Panel>
        <Panel.Header>
          <Title>About</Title>
        </Panel.Header>
        <Panel.Content>
          <Text>
            A weekend of live music across three stages, with food stalls and
            hands-on workshops.
          </Text>
        </Panel.Content>
      </Panel>

      {/* Secondary column: status and at-a-glance metadata, not the header */}
      <Panel>
        <Panel.Header>
          <Title>Overview</Title>
        </Panel.Header>
        <Panel.Content>
          <Stack space="regular">
            <Stack space="tight">
              <Text variant="muted" fontSize="xs">
                Status
              </Text>
              <Inline>
                <Badge variant="success">Published</Badge>
              </Inline>
            </Stack>
            <Stack space="tight">
              <Text variant="muted" fontSize="xs">
                Tickets sold
              </Text>
              <Text weight="semibold">1,284</Text>
            </Stack>
          </Stack>
        </Panel.Content>
      </Panel>
    </Columns>
  </Page>
);
