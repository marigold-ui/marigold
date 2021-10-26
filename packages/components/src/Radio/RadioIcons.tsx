import React from 'react';
import { SVG } from '@marigold/icons';

import { Box } from '../Box';

export const RadioChecked = ({ disabled = false, ...props }) => (
  <SVG width="16" height="32" viewBox="0 0 16 32" fill="none" {...props}>
    <Box
      as="circle"
      cx="8"
      cy="16"
      r="7.5"
      variant={disabled ? 'radio.checked.disabled' : 'radio.checked'}
    />
    <Box as="circle" cx="8" cy="16" r="3" variant="radio.checked.circle" />
  </SVG>
);

export const RadioUnchecked = ({
  disabled = false,
  error = false,
  ...props
}) => (
  <SVG width="16" height="32" viewBox="0 0 16 32" fill="none" {...props}>
    <Box
      as="circle"
      cx="8"
      cy="16"
      r="7.5"
      variant={
        disabled
          ? 'radio.unchecked.disabled'
          : error
          ? 'radio.unchecked.error'
          : 'radio.unchecked'
      }
    />
  </SVG>
);
