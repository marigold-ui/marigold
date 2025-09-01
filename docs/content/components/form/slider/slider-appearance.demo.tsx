import type { SliderProps } from '@marigold/components';
import { Slider } from '@marigold/components';

export default (props: SliderProps<any>) => (
  <Slider defaultValue={50} label="Volume" width="2/3" {...props} />
);
