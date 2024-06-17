import { useContext } from 'react';
import { Dialog, OverlayTriggerStateContext } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

import { Headline, HeadlineProps } from '../Headline';
import { DialogTrigger } from './DialogTrigger';

// Close Button
// ---------------
interface CloseButtonProps {
  className?: string;
}

const CloseButton = ({ className }: CloseButtonProps) => {
  const { close } = useContext(OverlayTriggerStateContext);
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

// Dialog Headline
// ---------------
interface DialogHeadlineProps extends Omit<HeadlineProps, 'slot'> {}

const DialogHeadline = ({ children }: DialogHeadlineProps) => (
  <Headline slot="title">{children}</Headline>
);

// Props
// ---------------
export interface DialogProps
  extends Omit<RAC.DialogProps, 'className' | 'style'> {
  variant?: string;
  size?: string;
  /**
   * Show the close button.
   */
  closeButton?: boolean;
  /**
   * If `true`, the dialog will be non-modal, meaning it will not block interaction with the background content.
   * @default false
   */
  isNonModal?: boolean;
}

// Component
// ---------------
const _Dialog = ({
  variant,
  size,
  closeButton,
  isNonModal,
  ...props
}: DialogProps) => {
  const classNames = useClassNames({ component: 'Dialog', variant, size });
  let state = useContext(OverlayTriggerStateContext);

  let children = props.children;

  if (typeof children === 'function') {
    children = children({
      close: state?.close || (() => {}),
    });
  }
  return (
    <Dialog
      {...props}
      className={cn('relative outline-none', classNames.container)}
    >
      <>
        {closeButton && <CloseButton className={classNames.closeButton} />}
        {children}
      </>
    </Dialog>
  );
};

_Dialog.Trigger = DialogTrigger;
_Dialog.Headline = DialogHeadline;

export { _Dialog as Dialog };
