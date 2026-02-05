import RAC, { ModalOverlay } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

// Props
// ---------------
export interface UnderlayProps extends Omit<
  RAC.ModalOverlayProps,
  | 'isOpen'
  | 'isDismissable'
  | 'isKeyboardDismissDisabled'
  | 'className'
  | 'render'
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

  return (
    <ModalOverlay
      className={({ isEntering, isExiting }) =>
        cn(
          'fixed inset-0 z-40 grid place-items-center overflow-y-auto',
          isEntering ? 'animate-in fade-in duration-300 ease-out' : '',
          isExiting ? 'animate-out fade-out duration-200 ease-in' : '',
          classNames
        )
      }
      {...props}
      data-testid="underlay-id"
    >
      {props.children}
    </ModalOverlay>
  );
};
