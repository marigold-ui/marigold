import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Exclamation, Check, Notification } from '@marigold/icons';
import { useStyles } from '@marigold/system';
import { Box } from '../Box';

export type AlertProps = {
  variant?: string;
} & ComponentProps<'div'>;

export const Alert: React.FC<AlertProps> = ({
  variant = 'success',
  children,
  className,
  ...props
}) => {
  const classNames = useStyles({
    css: {
      display: 'flex',
      alignItems: 'center',
    },
    variant: `alerts.${variant}`,
    className,
  });

  var bgColor = 'success';
  if (variant === 'warning') {
    bgColor = 'warning';
  } else if (variant === 'error') {
    bgColor = 'error';
  }
  const iconClassName = useStyles({ css: { bg: bgColor, m: '10px' } });

  var icon = <Check size={12} color="#ffffff" className={iconClassName} />;
  if (variant === 'warning') {
    icon = <Notification size={12} color="#ffffff" className={iconClassName} />;
  } else if (variant === 'error') {
    icon = <Exclamation size={12} color="#ffffff" className={iconClassName} />;
  }

  return (
    <Box {...props} className={classNames}>
      <Box
        display="inline-block"
        alignItems="center"
        width="32px"
        height="32px"
        className={useStyles({
          css: {
            bg: bgColor,
          },
        })}
      >
        {icon}
      </Box>
      <Box mx="16px">{children}</Box>
    </Box>
  );
};
