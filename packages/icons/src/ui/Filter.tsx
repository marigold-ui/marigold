import React from 'react';
import { SVG } from '../SVG';

export const Filter = ({ className = '', ...props }) => (
  <SVG className={className} {...props}>
    <path d="M3 6V8H21V6H3ZM10 18H14V16H10V18ZM18 13H6V11H18V13Z" />
  </SVG>
);
