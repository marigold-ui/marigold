import React from 'react';
import { useStyles } from '@marigold/system';
import { Box } from '../Box';

type ButtonProps = {
  className?: string;
  variant?: string;
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary.large',
  className,
  children,
  ...props
}) => {
  const classNames = useStyles(
    {
      variant: `button.${variant}`,
    },
    className
  );
  return (
    <button className={classNames} {...props}>
      <Box as="span" display="inline-flex" alignItems="center">
        {children}
      </Box>
    </button>
  );
};
