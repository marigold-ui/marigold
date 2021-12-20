import React from 'react';
import { SVG } from '@marigold/system';

export const ArrowDown = ({ className = '', ...props }) => (
  <SVG className={className} {...props}>
    <path d="M5.97563 7.125L12 13.1363L18.0244 7.125L19.875 8.97563L12 16.8506L4.125 8.97563L5.97563 7.125Z" />
  </SVG>
);
