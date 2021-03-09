import React from 'react';
import { SVG } from '../SVG';

export const Remove = ({ className = '', ...props }) => (
  <SVG className={className} {...props}>
    <path d="M20.25 13.5603H3.75V11.2031H20.25V13.5603Z" />
  </SVG>
);
