import { Slider } from '@marigold/components';

export const CurrencySlider = () => (
  <Slider formatOptions={{ style: 'currency', currency: 'EUR' }}>Price</Slider>
);
