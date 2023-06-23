import React, { useState } from 'react';
import { Slider } from '@marigold/components';

export const ControlledSlider = () => {
  const [value, setValue] = useState<number[] | number>(75);
  return (
    <Slider value={value} onChange={setValue}>
      Example
    </Slider>
  );
};
