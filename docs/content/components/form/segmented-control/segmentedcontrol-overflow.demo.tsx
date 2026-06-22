import { SegmentedControl } from '@marigold/components';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default () => (
  <div style={{ width: '100%', maxWidth: '20rem' }}>
    <SegmentedControl label="Month" defaultValue="Jan">
      {months.map(month => (
        <SegmentedControl.Option key={month} value={month}>
          {month}
        </SegmentedControl.Option>
      ))}
    </SegmentedControl>
  </div>
);
