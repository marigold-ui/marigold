import React from 'react';
import { SVG } from '@marigold/icons';

import { Box } from '../Box';

type CheckboxIconProps = {
  className?: string;
  disabled?: boolean;
  error?: string;
};

export const CheckboxChecked: React.FC<CheckboxIconProps> = ({
  className,
  disabled,
}) => {
  return (
    <SVG width="16" height="32" viewBox="0 0 16 32" className={className}>
      <Box
        as="rect"
        variant={
          disabled
            ? 'checkbox.squareChecked.disabled'
            : 'checkbox.squareChecked'
        }
      />
      <path
        d="M13.9571 12.8338L12.4085 11.2852L6.08699 17.6007L3.59887 15.1126L2.04163 16.6588L6.08682 20.704L13.9571 12.8338Z"
        fill="white"
      />
    </SVG>
  );
};

export const CheckboxUnchecked: React.FC<CheckboxIconProps> = ({
  className,
  disabled,
  error,
}) => (
  <SVG width="16" height="32" viewBox="0 0 16 32" className={className}>
    <Box
      as="rect"
      variant={
        disabled
          ? 'checkbox.squareUnchecked.disabled'
          : error
          ? 'checkbox.squareUnchecked.error'
          : 'checkbox.squareUnchecked'
      }
    />
  </SVG>
);
