import React from 'react';
import { VisuallyHidden as AriaVisuallyHidden } from '@react-aria/visually-hidden';

export const VisuallyHidden: React.FC = ({ children, ...props }) => (
  <AriaVisuallyHidden {...props}>{children}</AriaVisuallyHidden>
);
