import React from 'react';
import { Svg } from '@marigold/components';

export const BurgerMenu = ({ className = '', ...props }) => (
  <Svg className={className} {...props}>
    <path d="M3.5625 6.375H20.4375V8.25H3.5625V6.375ZM3.5625 16.125H20.4375V18H3.5625V16.125ZM20.4375 11.25H3.5625V13.125H20.4375V11.25Z" />
  </Svg>
);
