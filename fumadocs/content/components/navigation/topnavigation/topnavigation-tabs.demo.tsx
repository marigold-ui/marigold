import {
  Button,
  Inline,
  Tabs,
  Text,
  TopNavigation,
} from '@marigold/components';

export default () => (
  <TopNavigation>
    <TopNavigation.Start>
      <Inline space={2} alignY="center">
        <Text weight="bold">Acme Inc.</Text>
      </Inline>
    </TopNavigation.Start>
    <TopNavigation.Middle alignY="bottom">
      <Tabs defaultSelectedKey="home">
        <Tabs.List aria-label="Navigation">
          <Tabs.Item id="home">Home</Tabs.Item>
          <Tabs.Item id="events">Events</Tabs.Item>
          <Tabs.Item id="reports">Reports</Tabs.Item>
          <Tabs.Item id="settings">Settings</Tabs.Item>
        </Tabs.List>
      </Tabs>
    </TopNavigation.Middle>
    <TopNavigation.End>
      <Button variant="secondary" size="small">
        Sign in
      </Button>
    </TopNavigation.End>
  </TopNavigation>
);
