import React from 'react';
import { ArrowDown } from '@marigold/icons';
import { useStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';

export type SelectProps = { variant?: string } & ComponentProps<'select'>;

export const Select: React.FC<SelectProps> = ({
  variant = 'default',
  children,
  ...props
}) => {
  const iconStyles = useStyles({
    alignSelf: 'center',
    pointerEvents: 'none',
    ml: '-28px',
  });

  return (
    <Box display="flex">
      <Box as="select" variant={`select.${variant}`} {...props}>
        {children}
      </Box>
      <ArrowDown className={iconStyles} />
    </Box>
  );
};
