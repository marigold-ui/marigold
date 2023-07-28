import type { ReactNode } from 'react';

export interface RectangleProps {
  height?: string;
  children?: ReactNode;
}

export const Rectangle = ({ children, height }: RectangleProps) => (
  <div
    className="w-full rounded-sm bg-gradient-to-r from-[hsl(29,_37%,_70%)] to-[hsl(29,_37%,_40%)] shadow"
    style={{ height: height }}
  >
    {children}
  </div>
);
