import type { ReactNode } from 'react';

const variants = {
  default: 'border-border bg-bg-body',
  primary: 'border-(--color-primary-300) bg-(--color-primary-50)',
};

export interface RectangleProps {
  height?: string;
  width?: string;
  children?: ReactNode;
  variant?: keyof typeof variants;
}

export const Rectangle = ({
  children,
  height,
  width = '100%',
  variant = 'default',
}: RectangleProps) => (
  <div
    className={`${variants[variant]} flex rounded-xs border-2 border-dashed`}
    style={{ height: height, width: width }}
  >
    {children}
  </div>
);
