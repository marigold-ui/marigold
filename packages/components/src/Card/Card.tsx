import React from 'react';
import { ResponsiveStyleValue, useStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';
import { Heading } from '../Heading';

export type CardProps = {
  title?: string;
  width?: ResponsiveStyleValue<string>;
  variant?: string;
} & ComponentProps<'div'>;

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  title,
  width,
  className,
  children,
  ...props
}) => {
  const cardClassName = useStyles({
    css: { minWidth: width, maxWidth: width },
    className,
  });
  const titleClassName = useStyles({
    css: { pb: 'small' },
  });
  return (
    <Box {...props} variant={`card.${variant}`} className={cardClassName}>
      {title && (
        <Heading as="h2" variant="h2" className={titleClassName}>
          {title}
        </Heading>
      )}
      {children}
    </Box>
  );
};
