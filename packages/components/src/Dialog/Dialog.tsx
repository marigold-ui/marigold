import { ReactNode, useContext } from 'react';
import type RAC from 'react-aria-components';
import { Dialog, OverlayTriggerStateContext } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { Header } from '../Header';
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
    <div className="absolute right-4 top-4 ml-4">
      <button
        className={cn(
          'h-4 w-4 cursor-pointer border-none p-0 leading-normal outline-0',
          className
        )}
        onClick={close}
        slot="dismiss-button"
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

// Dialog Title
// ---------------
interface DialogTitleProps extends Omit<HeadlineProps, 'slot'> {}

const DialogTitle = ({ children }: DialogTitleProps) => {
  return (
    <Header className="flex items-center [grid-area:title]">
      <Headline slot="title">{children}</Headline>
    </Header>
  );
};

// Dialog Content
// ---------------
interface DialogContentProps {
  children: ReactNode;
}
const DialogContent = ({ children }: DialogContentProps) => {
  return <div className="[grid-area:content]">{children}</div>;
};

// Dialog Actions
// ---------------
interface DialogActions {
  children: React.ReactNode;
}

const DialogActions = ({ children }: DialogActions) => {
  return <div className="flex gap-2 [grid-area:actions]">{children}</div>;
};

// Dialog Footer
// ---------------
interface DialogFooterProps {
  children: ReactNode;
}

const DialogFooter = ({ children }: DialogFooterProps) => {
  return <div className="[grid-area:footer]">{children}</div>;
};

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
      className={cn(
        // 'has-[button[slot="dismiss-button"]]:pt-10',
        'relative outline-none [&>*:not(:last-child)]:mb-4',
        "grid [grid-template-areas:'title'_'content'_'actions'_'footer']",
        classNames.container
      )}
    >
      {closeButton && <CloseButton className={classNames.closeButton} />}
      {children}
    </Dialog>
  );
};

_Dialog.Trigger = DialogTrigger;
_Dialog.Title = DialogTitle;
_Dialog.Content = DialogContent;
_Dialog.Actions = DialogActions;
_Dialog.Footer = DialogFooter;

export { _Dialog as Dialog };
