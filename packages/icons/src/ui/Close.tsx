import React from 'react';
import { SVG } from '../SVG';

export const Close = ({ className = '', ...props }) => (
  <SVG className={className} {...props}>
    <path d="M19.8281 5.74868L18.2513 4.17188L12 10.4232L5.74868 4.17188L4.17188 5.74868L10.4232 12L4.17188 18.2513L5.74868 19.8281L12 13.5768L18.2513 19.8281L19.8281 18.2513L13.5768 12L19.8281 5.74868Z" />
  </SVG>
);
