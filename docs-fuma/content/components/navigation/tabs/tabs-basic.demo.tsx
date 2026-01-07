'use client';

import { Headline, Tabs, TabsProps } from '@marigold/components';

export default (props: TabsProps) => (
  <>
    <Headline level="2">Events</Headline>
    <Tabs aria-label="tabs" {...props}>
      <Tabs.List aria-label="Events">
        <Tabs.Item id="upcoming">Upcoming</Tabs.Item>
        <Tabs.Item id="past">Past</Tabs.Item>
        <Tabs.Item id="cancelled">Cancelled</Tabs.Item>
      </Tabs.List>
      <Tabs.TabPanel id="upcoming">Upcoming events.</Tabs.TabPanel>
      <Tabs.TabPanel id="past">Past events.</Tabs.TabPanel>
      <Tabs.TabPanel id="cancelled">Cancelled events</Tabs.TabPanel>
    </Tabs>
  </>
);
