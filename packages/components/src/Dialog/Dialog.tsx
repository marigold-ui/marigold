import { useContext } from 'react';
import type RAC from 'react-aria-components';
import { Dialog, OverlayTriggerStateContext } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { CloseButton } from '../CloseButton';
import { DialogActions } from './DialogActions';
import { DialogContent } from './DialogContent';
import { DialogTitle } from './DialogTitle';
import { DialogTrigger } from './DialogTrigger';

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
  const state = useContext(OverlayTriggerStateContext);

  const children =
    typeof props.children === 'function'
      ? props.children({
          close: state?.close ?? (() => {}),
        })
      : props.children;

  return (
    <Dialog
      {...props}
      className={cn(
        'relative outline-hidden',
        "grid [grid-template-areas:'title'_'content'_'actions']",
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

export { _Dialog as Dialog };
