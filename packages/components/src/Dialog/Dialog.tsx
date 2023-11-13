import { ReactNode } from 'react';
import { Dialog, DialogTrigger, ModalOverlay } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

import { Modal } from '../Overlay/Modal';

// Close Button
// ---------------
interface CloseButtonProps {
  className?: string;
  close: () => void;
}

const CloseButton = ({ className, close }: CloseButtonProps) => {
  return (
    <div className="flex justify-end">
      <button
        className={cn(
          'h-4 w-4 cursor-pointer border-none p-0 leading-normal outline-0',
          className
        )}
        onClick={close}
      >
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          />
        </svg>
      </button>
    </div>
  );
};

// Props
// ---------------
export interface DialogProps extends RAC.DialogProps {
  variant?: string;
  size?: string;
  closeButton?: boolean;
}

// Component
// ---------------
const _Dialog = ({ variant, size, closeButton, ...props }: DialogProps) => {
  const classNames = useClassNames({ component: 'Dialog', variant, size });
  return (
    <ModalOverlay
      className={({ isEntering, isExiting }) => `
          fixed inset-0 z-10 flex min-h-full items-center justify-center overflow-y-auto bg-black/25 p-4 text-center backdrop-blur
          ${isEntering ? 'animate-in fade-in duration-300 ease-out' : ''}
          ${isExiting ? 'animate-out fade-out duration-200 ease-in' : ''}
        `}
    >
      <Modal
        dismissable={false}
        className={({ isEntering, isExiting }) => `
            w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl
            ${isEntering ? 'animate-in zoom-in-95 duration-300 ease-out' : ''}
            ${isExiting ? 'animate-out zoom-out-95 duration-200 ease-in' : ''}
          `}
      >
        <Dialog
          {...props}
          className={cn(classNames.container, 'relative outline-none')}
        >
          {({ close }) => (
            <>
              {closeButton && (
                <CloseButton close={close} className={classNames.closeButton} />
              )}
              {props.children as ReactNode}
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

_Dialog.Trigger = DialogTrigger;

export { _Dialog as Dialog };
