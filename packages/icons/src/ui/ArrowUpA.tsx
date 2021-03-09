import React from 'react';
import { SVG } from '../SVG';

export const ArrowUpA = ({ className = '', ...props }) => (
  <SVG className={className} {...props}>
    <path d="M3 12L4.58625 13.5863L10.875 7.30875V21H13.125V7.30875L19.4025 13.5975L21 12L12 3L3 12Z" />
  </SVG>
);
