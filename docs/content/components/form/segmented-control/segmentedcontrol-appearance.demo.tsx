import type { SegmentedControlProps } from '@marigold/components';
import { SegmentedControl } from '@marigold/components';

export default (props: SegmentedControlProps) => (
  <SegmentedControl label="View" defaultValue="list" {...props}>
    <SegmentedControl.Option value="list">List</SegmentedControl.Option>
    <SegmentedControl.Option value="board">Board</SegmentedControl.Option>
    <SegmentedControl.Option value="calendar">Calendar</SegmentedControl.Option>
  </SegmentedControl>
);
