import { SegmentedControl } from '@marigold/components';

export default () => (
  <SegmentedControl
    label="Sort by"
    defaultValue="newest"
    variant="ghost"
    size="small"
  >
    <SegmentedControl.Option value="newest">Newest</SegmentedControl.Option>
    <SegmentedControl.Option value="popular">Popular</SegmentedControl.Option>
    <SegmentedControl.Option value="price">Price</SegmentedControl.Option>
  </SegmentedControl>
);
