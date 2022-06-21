import { ReactNode } from 'react';
import { ComponentProps } from '@marigold/types';
export interface OverlayProps extends ComponentProps<'div'> {
  children: ReactNode;
  open?: boolean;
  container?: HTMLElement;
}
export declare const Overlay: ({
  children,
  open,
  container,
  ...props
}: OverlayProps) => JSX.Element | null;
//# sourceMappingURL=Overlay.d.ts.map
