import React from 'react';
import { SVG } from '@marigold/icons';

import { Box } from '../Box';

type RadioIconProps = {
  className?: string;
  disabled?: boolean;
  error?: string;
};

export const RadioChecked: React.FC<RadioIconProps> = ({
  className,
  disabled,
}) => {
  return (
    <SVG
      width="16"
      height="32"
      viewBox="0 0 16 32"
      fill="none"
      className={className}
    >
      <Box
        as="circle"
        variant={
          disabled ? 'radio.circleChecked.disabled' : 'radio.circleChecked'
        }
      />
      <Box as="circle" cx="8" cy="16" r="3" fill="white" />
    </SVG>
  );
};

export const RadioUnchecked: React.FC<RadioIconProps> = ({
  className,
  disabled,
  error,
}) => (
  <SVG
    width="16"
    height="32"
    viewBox="0 0 16 32"
    fill="none"
    className={className}
  >
    <Box
      as="circle"
      variant={
        disabled
          ? 'radio.circleUnchecked.disabled'
          : error
          ? 'radio.circleUnchecked.error'
          : 'radio.circleUnchecked'
      }
    />
  </SVG>
);
