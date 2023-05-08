import { Tabs } from '@marigold/components';

export const TabsWithLargeSize = () => (
  <Tabs size="large">
    <Tabs.Item key={'1'} title="tab1">
      tab-1 content
    </Tabs.Item>
    <Tabs.Item key={'2'} title="tab2">
      tab-2 content
    </Tabs.Item>
    <Tabs.Item key={'3'} title="tab3">
      tab-3 content
    </Tabs.Item>
  </Tabs>
);
