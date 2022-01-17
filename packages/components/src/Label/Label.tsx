import React from 'react';

import { ComponentProps } from '@marigold/types';
import { Required } from '@marigold/icons';
import { ResponsiveStyleValue } from '@marigold/system';

import { Box } from '../Box';

// Theme Extension
// ---------------
export interface LabelThemeExtension<Value> {
  label?: {
    [key: string]: Value;
  };
}

// LabelBase
// ---------------
export type LabelBaseProps = {
  htmlFor?: string;
  variant?: string;
  required?: boolean;
  color?: ResponsiveStyleValue<string>;
} & ComponentProps<'label'>;

export const LabelBase: React.FC<LabelProps> = ({
  variant = 'above',
  required,
  color = 'text',
  children,
  ...props
}) => {
  return (
    <Box
      {...props}
      as="label"
      __baseCSS={{ color: color }}
      variant={`label.${variant}`}
    >
      {children}
    </Box>
  );
};

// Label
// ---------------
export type LabelProps = {
  required?: boolean;
} & LabelBaseProps;

export const Label: React.FC<LabelProps> = ({
  required,
  children,
  ...props
}) => {
  return required ? (
    <Box as="span" display="inline-flex" alignItems="center">
      <LabelBase {...props}>{children}</LabelBase>
      {required && <Box as={Required} size={16} css={{ color: 'error' }} />}
    </Box>
  ) : (
    <LabelBase {...props}>{children}</LabelBase>
  );
};
