import { SegmentedControl } from '@marigold/components';

export default () => (
  <div style={{ width: '100%', maxWidth: '28rem' }}>
    <SegmentedControl
      label="Billing period"
      defaultValue="monthly"
      width="full"
    >
      <SegmentedControl.Option value="monthly">Monthly</SegmentedControl.Option>
      <SegmentedControl.Option value="yearly">Yearly</SegmentedControl.Option>
    </SegmentedControl>
  </div>
);
