import { ReactNode } from 'react';
import { ResponsiveStyleValue } from '@marigold/system';
declare const ALIGNMENT_X: {
  left: string;
  center: string;
  right: string;
};
declare const ALIGNMENT_Y: {
  top: string;
  center: string;
  bottom: string;
};
export interface StackProps {
  as?: 'div' | 'ul' | 'ol';
  children?: ReactNode;
  space?: ResponsiveStyleValue<string>;
  alignX?: keyof typeof ALIGNMENT_X;
  alignY?: keyof typeof ALIGNMENT_Y;
  stretch?: boolean;
}
export declare const Stack: ({
  children,
  space,
  alignX,
  alignY,
  stretch,
  ...props
}: StackProps) => JSX.Element;
export {};
//# sourceMappingURL=Stack.d.ts.map
