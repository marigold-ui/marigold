import { Ref, forwardRef } from 'react';
import { Modal, ModalOverlay, ModalOverlayProps } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

interface ModalProps extends ModalOverlayProps {
  size?: string;
}

export const _Modal = forwardRef(
  (props: ModalProps, ref: Ref<HTMLDivElement> | undefined) => {
    const classNames = useClassNames({ component: 'Underlay' });
    return (
      <ModalOverlay
        {...props}
        className={({ isEntering, isExiting }) =>
          cn(
            'fixed inset-0 z-40 flex min-h-full items-center justify-center overflow-y-auto backdrop-blur-xs',
            isEntering ? 'animate-in fade-in duration-300 ease-out' : '',
            isExiting ? 'animate-out fade-out duration-200 ease-in' : '',
            classNames
          )
        }
      >
        <Modal
          {...props}
          className="relative flex w-full justify-center"
          ref={ref}
        />
      </ModalOverlay>
    );
  }
);

export { _Modal as Modal };
