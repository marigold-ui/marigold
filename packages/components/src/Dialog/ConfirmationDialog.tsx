import type { ReactNode } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { chain } from '@react-aria/utils';
import { Button } from '../Button/Button';
import { intlMessages } from '../intl/messages';
import type { DialogProps } from './Dialog';
import { Dialog } from './Dialog';

export interface ConfirmationDialogProps extends Pick<
  DialogProps,
  'variant' | 'size' | 'closeButton' | 'open' | 'onOpenChange'
> {
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
  autoFocusButton,
  children,
  variant,
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
          <Dialog.Actions>
            <Button
              onPress={() => chain(close(), onCancel?.())}
              autoFocus={autoFocusButton === 'cancel'}
            >
              {cancelLabel ?? stringFormatter.format('cancel')}
            </Button>
            <Button
              variant={variant === 'destructive' ? 'destructive' : 'primary'}
              onPress={() => chain(close(), onConfirm?.())}
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
