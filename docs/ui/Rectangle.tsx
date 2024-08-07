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
    className="rounded-sm border-2 border-dashed border-[hsl(29,_37%,_40%)] bg-[hsl(29,_37%,_70%)]"
    style={{ height: height, width: width }}
  >
    {children}
  </div>
);
