import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Exclamation, Check, Notification } from '@marigold/icons';
import { Box } from '../Box';
import { Element } from '@marigold/system';

export type AlertProps = {
  variant?: string;
} & ComponentProps<'div'>;

export const Alert: React.FC<AlertProps> = ({
  variant = 'success',
  children,
  className,
  ...props
}) => {
  var bgColor = 'success';
  if (variant === 'warning') {
    bgColor = 'warning';
  } else if (variant === 'error') {
    bgColor = 'error';
  }
  const iconStyles = { bg: bgColor, m: '10px' };

  var icon = <Element as={Check} size={12} color="#ffffff" css={iconStyles} />;
  if (variant === 'warning') {
    icon = (
      <Element as={Notification} size={12} color="#ffffff" css={iconStyles} />
    );
  } else if (variant === 'error') {
    icon = (
      <Element as={Exclamation} size={12} color="#ffffff" css={iconStyles} />
    );
  }

  return (
    <Box
      {...props}
      css={{ display: 'flex', alignItems: 'center' }}
      variant={`alerts.${variant}`}
      className={className}
    >
      <Box
        // can't handle css prop & box ResponsiveStyles (Siehe auch Box.tsx Zeile 110)
        display="inline-block"
        alignItems="center"
        width="32px"
        height="32px"
        css={{
          bg: bgColor,
        }}
      >
        {icon}
      </Box>
      <Box mx="16px">{children}</Box>
    </Box>
  );
};
