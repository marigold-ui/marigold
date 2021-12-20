import React from 'react';
import { SVG } from '@marigold/system';

import { Box } from '../Box';

export const CheckboxChecked = ({ disabled = false, ...props }) => (
  <SVG width="16" height="32" viewBox="0 0 16 32" fill="none" {...props}>
    <Box
      as="rect"
      x="0.5"
      y="8.5"
      width="15px"
      height="15px"
      rx="1.5"
      variant={disabled ? 'checkbox.checked.disabled' : 'checkbox.checked'}
    />
    <Box
      as="path"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.9571 12.8338L12.4085 11.2852L6.08699 17.6007L3.59887 15.1126L2.04163 16.6588L6.08682 20.704L13.9571 12.8338Z"
      variant="checkbox.checked.icon"
    />
  </SVG>
);

export const CheckboxUnchecked = ({
  disabled = false,
  error = false,
  ...props
}) => (
  <SVG width="16" height="32" viewBox="0 0 16 32" fill="none" {...props}>
    <Box
      as="rect"
      x="0.5"
      y="8.5"
      width="15px"
      height="15px"
      rx="1.5"
      variant={
        disabled
          ? 'checkbox.unchecked.disabled'
          : error
          ? 'checkbox.unchecked.error'
          : 'checkbox.unchecked'
      }
    />
  </SVG>
);
