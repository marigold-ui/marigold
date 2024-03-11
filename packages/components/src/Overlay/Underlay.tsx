import { ModalOverlay } from 'react-aria-components';
import RAC from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

import { usePortalContainer } from '../Provider';

// Props
// ---------------
export interface UnderlayProps
  extends Omit<
    RAC.ModalOverlayProps,
    'isOpen' | 'isDismissable' | 'isKeyboardDismissDisabled' | 'className'
  > {
  variant?: string;
  size?: string;
  open?: boolean;
  dismissable?: boolean;
  keyboardDismissable?: boolean;
}

// Component
// ---------------
export const Underlay = ({
  size,
  variant,
  open,
  dismissable,
  keyboardDismissable,
  ...rest
}: UnderlayProps) => {
  const classNames = useClassNames({ component: 'Underlay', size, variant });
  const props: RAC.ModalOverlayProps = {
    isOpen: open,
    isDismissable: dismissable,
    isKeyboardDismissDisabled: keyboardDismissable,
    ...rest,
  };
  const portal = usePortalContainer();
  return (
    <ModalOverlay
      className={({ isEntering, isExiting }) =>
        cn(
          'fixed inset-0 z-40 flex min-h-full items-center justify-center overflow-y-auto backdrop-blur ',
          isEntering ? 'animate-in fade-in duration-300 ease-out' : '',
          isExiting ? 'animate-out fade-out duration-200 ease-in' : '',
          classNames
        )
      }
      {...props}
      data-testid="underlay-id"
      UNSTABLE_portalContainer={portal as Element}
    >
      {props.children}
    </ModalOverlay>
  );
};
