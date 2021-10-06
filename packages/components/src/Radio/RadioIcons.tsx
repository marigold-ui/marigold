import React from 'react';
import { SVG } from '@marigold/icons';

export const RadioChecked = ({ disabled = false, ...props }) => (
  <SVG width="16" height="32" viewBox="0 0 16 32" fill="none" {...props}>
    <circle
      cx="8"
      cy="16"
      r="7.5"
      fill={disabled ? '#e3e3e3' : '#3AB3D5'}
      stroke={disabled ? '#e3e3e3' : '#1D67B6'}
    />
    <circle cx="8" cy="16" r="3" fill="#ffffff" />
  </SVG>
);

export const RadioUnchecked = ({ disabled = false, error = '', ...props }) => (
  <SVG width="16" height="32" viewBox="0 0 16 32" fill="none" {...props}>
    <circle
      cx="8"
      cy="16"
      r="7.5"
      fill="#ffffff"
      stroke={disabled ? '#e3e3e3' : error ? '#dd4142' : '#cccccc'}
    />
  </SVG>
);
