import { Slider } from '@marigold/components';

export default () => (
  <>
    <Slider formatOptions={{ style: 'currency', currency: 'EUR' }}>
      Price
    </Slider>
    <Slider formatOptions={{ style: 'percent' }} step={0.01} maxValue={1}>
      Percent
    </Slider>
  </>
);
