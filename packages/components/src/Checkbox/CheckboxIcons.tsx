import React from 'react';
import { SVG } from '@marigold/icons';

export const CheckboxChecked = ({ disabled = false, ...props }) => (
  <SVG width="16" height="32" viewBox="0 0 16 32" fill="none" {...props}>
    <rect
      x="0.5"
      y="8.5"
      width="15"
      height="15"
      rx="1.5"
      fill={disabled ? '#e3e3e3' : '#3AB3D5'}
      stroke={disabled ? '#e3e3e3' : '#1D67B6'}
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.9571 12.8338L12.4085 11.2852L6.08699 17.6007L3.59887 15.1126L2.04163 16.6588L6.08682 20.704L13.9571 12.8338Z"
      fill="#ffffff"
    />
  </SVG>
);

export const CheckboxUnchecked = ({
  disabled = false,
  error = false,
  ...props
}) => (
  <SVG width="16" height="32" viewBox="0 0 16 32" fill="none" {...props}>
    <rect
      x="0.5"
      y="8.5"
      width="15"
      height="15"
      rx="1.5"
      fill="white"
      stroke={disabled ? '#e3e3e3' : error ? '#dd4142' : '#cccccc'}
    />
  </SVG>
);
