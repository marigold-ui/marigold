import type { ReactNode } from 'react';
import { cn } from '@marigold/system';

const variants = {
  default: 'border-border bg-bg-body',
  primary: 'border-primary-300 bg-primary-50/25',
};

export interface RectangleProps {
  height?: string;
  width?: string;
  children?: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}

export const Rectangle = ({
  children,
  height,
  width = '100%',
  variant = 'default',
  className,
}: RectangleProps) => (
  <div
    className={cn(
      `${variants[variant]} flex rounded-xs border-2 border-dashed`,
      className
    )}
    style={{ height: height, width: width }}
  >
    {children}
  </div>
);
