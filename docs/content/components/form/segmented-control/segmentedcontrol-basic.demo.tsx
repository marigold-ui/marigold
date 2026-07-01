import { useState } from 'react';
import { SegmentedControl, Stack, Text } from '@marigold/components';

const content = {
  list: 'Showing 24 events as a compact list.',
  board: 'Showing 24 events grouped on a board.',
  calendar: 'Showing 24 events on a monthly calendar.',
};

export default () => {
  const [view, setView] = useState<keyof typeof content>('list');

  return (
    <Stack space={4}>
      <SegmentedControl
        label="View"
        value={view}
        onChange={value => setView(value as keyof typeof content)}
      >
        <SegmentedControl.Option value="list">List</SegmentedControl.Option>
        <SegmentedControl.Option value="board">Board</SegmentedControl.Option>
        <SegmentedControl.Option value="calendar">
          Calendar
        </SegmentedControl.Option>
      </SegmentedControl>
      <Text>{content[view]}</Text>
    </Stack>
  );
};
