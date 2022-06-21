import React, { ReactNode } from 'react';
import { OverlayProps } from '@react-aria/overlays';
export interface PopoverProps
  extends Omit<
    OverlayProps,
    'isOpen' | 'isDismissable' | 'isKeyboardDismissDisabled'
  > {
  children?: ReactNode;
  open?: boolean;
  dismissable?: boolean;
  keyboardDismissDisabled?: boolean;
  /**
   * Adjust size of the popover. This is used to make the popover
   * at least the same width as its anchor element.
   */
  minWidth?: number | string;
}
export declare const Popover: React.ForwardRefExoticComponent<
  PopoverProps & React.RefAttributes<unknown>
>;
//# sourceMappingURL=Popover.d.ts.map
