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
    className="rounded-sm border border-dashed bg-gradient-to-r from-[hsl(29,_37%,_70%)] to-[hsl(29,_37%,_40%)]"
    style={{ height: height, width: width }}
  >
    {children}
  </div>
);
