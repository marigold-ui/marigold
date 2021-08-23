import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Required } from '@marigold/icons';
import { useStyles } from '@marigold/system';

import { Box } from '../Box';

export type LabelProps = {
  htmlFor?: string;
  variant?: string;
  required?: boolean;
} & ComponentProps<'label'>;

export const Label: React.FC<LabelProps> = ({
  variant = 'above',
  required,
  children,
  ...props
}) => {
  const requiredClassName = useStyles({ css: { color: 'red60' } });

  return required ? (
    <Box as="span" display="inline-flex" alignItems="center">
      <Box {...props} as="label" variant={`label.${variant}`}>
        {children}
      </Box>
      {required && <Required size={16} className={requiredClassName} />}
    </Box>
  ) : (
    <Box {...props} as="label" variant={`label.${variant}`}>
      {children}
    </Box>
  );
};
