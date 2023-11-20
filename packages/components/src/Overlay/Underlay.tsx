import { ModalOverlay } from 'react-aria-components';
import RAC from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

// Props
// ---------------
export interface UnderlayProps extends RAC.ModalOverlayProps {
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Underlay = ({ size, variant, ...props }: UnderlayProps) => {
  const classNames = useClassNames({ component: 'Underlay', size, variant });
  return (
    <ModalOverlay
      className={({ isEntering, isExiting }) =>
        cn(
          'fixed inset-0 z-10 flex min-h-full items-center justify-center overflow-y-auto backdrop-blur ',
          isEntering ? 'animate-in fade-in duration-300 ease-out' : '',
          isExiting ? 'animate-out fade-out duration-200 ease-in' : '',
          classNames
        )
      }
      {...props}
    >
      {props.children}
    </ModalOverlay>
  );
};
