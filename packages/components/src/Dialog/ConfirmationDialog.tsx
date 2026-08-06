import type { ReactNode } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { chain } from '@react-aria/utils';
import { Button } from '../Button/Button';
import { intlMessages } from '../intl/messages';
import type { DialogProps } from './Dialog';
import { Dialog } from './Dialog';

export interface ConfirmationDialogProps extends Pick<
  DialogProps,
  'size' | 'closeButton' | 'open' | 'onOpenChange'
> {
  /**
   * Marks the confirmed action as destructive, which styles the confirm button
   * and focuses the cancel button by default.
   */
  variant?: 'destructive' | (string & {});
  /**
   * The dialog's title.
   */
  title: string;
  /**
   * Label for the primary action button.
   */
  confirmationLabel: string;
  /**
   * Optional label for the cancel button, default label is "cancel".
   */
  cancelLabel?: string;
  /**
   * Handler that is called when the confirm button is pressed.
   */
  onConfirm?: () => void;
  /**
   * Handler that is called when the cancel button is pressed.
   */
  onCancel?: () => void;
  /**
   * Button to focus by default when the dialog opens.
   *
   * Defaults to `cancel` for the `destructive` variant so that pressing
   * <kbd>Enter</kbd> out of habit takes the safe path.
   */
  autoFocusButton?: 'cancel' | 'action';
  /**
   * The dialog's content.
   */
  children?: ReactNode;
}

export const ConfirmationDialog = ({
  title,
  confirmationLabel,
  cancelLabel,
  onCancel,
  onConfirm,
  children,
  variant,
  autoFocusButton = variant === 'destructive' ? 'cancel' : undefined,
  size = 'xsmall',
  ...props
}: ConfirmationDialogProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages, 'marigold');

  return (
    <Dialog role="alertdialog" variant={variant} size={size} {...props}>
      {({ close }) => (
        <>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>{children}</Dialog.Content>
          {/* Handlers run before `close()`, so an owner watching `onOpenChange`
              sees the decision before it sees the close. */}
          <Dialog.Actions>
            <Button
              onPress={chain(onCancel, close)}
              autoFocus={autoFocusButton === 'cancel'}
            >
              {cancelLabel ?? stringFormatter.format('cancel')}
            </Button>
            <Button
              variant={variant === 'destructive' ? 'destructive' : 'primary'}
              onPress={chain(onConfirm, close)}
              autoFocus={autoFocusButton === 'action'}
            >
              {confirmationLabel}
            </Button>
          </Dialog.Actions>
        </>
      )}
    </Dialog>
  );
};

ConfirmationDialog.Trigger = Dialog.Trigger;
