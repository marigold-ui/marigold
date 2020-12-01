import React from 'react';
import { Svg } from '@marigold/components';

export const Check = ({ className = '', ...props }) => (
  <Svg className={className} {...props}>
    <path d="M8.17368 16.6154L3.19528 11.637L1.5 13.3204L8.17368 19.994L22.5 5.66772L20.8167 3.98437L8.17368 16.6154Z" />
  </Svg>
);
