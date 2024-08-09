import type { ReactNode } from 'react';

export interface RectangleProps {
  height?: string;
  width?: string;
  children?: ReactNode;
}

export const Rectangle = ({
  children,
  height,
  width = '100%',
}: RectangleProps) => (
  <div
    className="border-border bg-bg-body flex rounded-sm border-2 border-dashed"
    style={{ height: height, width: width }}
  >
    {children}
  </div>
);
