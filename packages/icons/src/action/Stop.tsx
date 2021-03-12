import React from 'react';
import { SVG } from '../SVG';

export const Stop = ({ className = '', ...props }) => (
  <SVG className={className} {...props}>
    <path d="M4.76953 4.86328H19.1836V19.2773H4.76953V4.86328Z" />
  </SVG>
);
