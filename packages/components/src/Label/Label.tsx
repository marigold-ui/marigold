import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Required } from '@marigold/icons';

import { Box } from '../Box';

// Theme Extension
// ---------------
export interface LabelThemeExtension<Value> {
  label?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export type LabelProps = {
  htmlFor?: string;
  variant?: string;
  required?: boolean;
} & ComponentProps<'label'>;

// Component
// ---------------
export const Label: React.FC<LabelProps> = ({
  variant = 'above',
  required,
  children,
  ...props
}) => {
  return required ? (
    <Box as="span" display="inline-flex" alignItems="center">
      <Box {...props} as="label" variant={`label.${variant}`}>
        {children}
      </Box>
      {required && <Box as={Required} size={16} css={{ color: 'red60' }} />}
    </Box>
  ) : (
    <Box {...props} as="label" variant={`label.${variant}`}>
      {children}
    </Box>
  );
};
