import { DatePicker } from '@marigold/components';

export default () => (
  <DatePicker
    label="Event date"
    presets={['today', 'tomorrow']} // [!code highlight]
  />
);
