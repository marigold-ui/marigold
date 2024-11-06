import { Slider } from '@marigold/components';

export default () => (
  <Slider defaultValue={[10, 30]} thumbLabels={['min', 'max']} step={5}>
    Ticket price range
  </Slider>
);
