import React from 'react';
import { SVG } from '../SVG';

export const Home = ({ className = '', ...props }) => (
  <SVG className={className} {...props}>
    <path d="M9.9 20.113V13.8415H14.1V20.113H19.35V11.751H22.5L12 2.34375L1.5 11.751H4.65V20.113H9.9Z" />
  </SVG>
);
