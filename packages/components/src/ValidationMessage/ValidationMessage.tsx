import React from 'react';
import { useStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

export type ValidationMessageProps = {
  variant?: string;
} & ComponentProps<'span'>;

export const ValidationMessage: React.FC<ValidationMessageProps> = ({
  variant = 'negative',
  children,
  className,
  ...props
}) => {
  const classNames = useStyles(
    {
      variant: `validation.${variant}`,
      display: 'flex',
      alignItems: 'center',
    },
    className
  );

  return (
    <span className={classNames} {...props}>
      {children}
    </span>
  );
};
