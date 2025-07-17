import { Badge, Tabs } from '@marigold/components';

export default () => (
  <Tabs aria-label="Organizer details">
    <Tabs.List aria-label="Organizer views">
      <Tabs.Item id="overview">Overview</Tabs.Item>
      <Tabs.Item id="events">Events</Tabs.Item>
      <Tabs.Item id="sales">
        Sales Info <Badge variant="admin">Admin</Badge>
      </Tabs.Item>
    </Tabs.List>
    <Tabs.TabPanel id="overview">
      View general information about the organizer, including contact details,
      status, and type.
    </Tabs.TabPanel>
    <Tabs.TabPanel id="events">
      Browse and manage events associated with this organizer, including
      upcoming and past shows.
    </Tabs.TabPanel>
    <Tabs.TabPanel id="sales">
      Internal sales data such as lead source, potential deal size, and account
      history. This information is restricted to internal use only.
    </Tabs.TabPanel>
  </Tabs>
);
