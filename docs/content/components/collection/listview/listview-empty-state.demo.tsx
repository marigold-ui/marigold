import { EmptyState, ListView, TextValue } from '@marigold/components';

export default () => (
  <ListView
    aria-label="Resources"
    items={[]}
    emptyState={
      <EmptyState
        title="No resources yet"
        description="Files you add show up here."
      />
    }
  >
    {(item: { id: string; name: string }) => (
      <ListView.Item textValue={item.name}>
        <TextValue>{item.name}</TextValue>
      </ListView.Item>
    )}
  </ListView>
);
