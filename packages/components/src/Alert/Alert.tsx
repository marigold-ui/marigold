import React from 'react';
import { useStyles } from '@marigold/system';
import { Box } from '../Box';

type AlertProps = {
  className?: string;
  variant?: string;
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  className,
  children,
  ...props
}) => {
  const classNames = useStyles(
    {
      variant: `alerts.${variant}`,
    },
    className
  );

  return (
    <Box
      {...props}
      className={classNames}
      display="flex"
      alignItems="center"
      px={3}
      py={2}
      borderRadius={4}
    >
      {children}
    </Box>
  );
};
