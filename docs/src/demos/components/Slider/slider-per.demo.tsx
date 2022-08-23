import { Slider } from '@marigold/components';

export const PercentageSlider = () => (
  <Slider formatOptions={{ style: 'percent' }} step={0.01} maxValue={1}>
    Percent
  </Slider>
);
