import { Calendar } from '@marigold/components';

export default () => (
  <Calendar
    aria-label="Event date"
    presets={['yesterday', 'today', 'tomorrow']} // [!code highlight]
  />
);
