import React from 'react';
import { SVG } from '../SVG';

export const ArrowUp = ({ className = '', ...props }) => (
  <SVG className={className} {...props}>
    <path d="M5.97563 16.8506L12 10.8394L18.0244 16.8506L19.875 15L12 7.125L4.125 15L5.97563 16.8506Z" />
  </SVG>
);
