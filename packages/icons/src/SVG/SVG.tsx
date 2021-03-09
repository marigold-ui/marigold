import React from 'react';
import { useStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

export type SVGProps = {
  variant?: string;
  size?: number;
  title?: string; // For Testing
} & ComponentProps<'svg'>;

export const SVG: React.FC<SVGProps> = ({
  variant = 'icon',
  size = 24,
  className,
  children,
  ...props
}) => {
  const classNames = useStyles(
    {
      variant: `icon.${variant}`,
    },
    className
  );

  return (
    <svg
      className={classNames}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentcolor"
      {...props}
    >
      {children}
    </svg>
  );
};
