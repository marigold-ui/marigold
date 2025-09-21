import type { ReactNode } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { Button } from '../Button';
import { intlMessages } from '../intl/messages';
import type { DialogProps } from './Dialog';
import { Dialog } from './Dialog';

export interface ConfirmationDialogProps
  extends Pick<
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
  actionLabel: string;
  /**
   * Optional label for the cancel button, default label is "cancel".
   */
  cancelLabel?: string;
  /**
   * Handler that is called when the cancel button is pressed.
   */
  onCancel?: () => void;
  /**
   * Handler that is called when the action button is pressed.
   */
  onAction?: () => void;
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
  actionLabel,
  cancelLabel,
  onCancel,
  onAction: onPrimaryAction,
  autoFocusButton,
  children,
  variant,
  size = 'xsmall',
  ...props
}: ConfirmationDialogProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages, 'marigold');

  return (
    <Dialog role="alertdialog" variant={variant} size={size} {...props}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>{children}</Dialog.Content>
      <Dialog.Actions>
        <Button
          slot="close"
          onPress={onCancel}
          autoFocus={autoFocusButton === 'cancel'}
        >
          {cancelLabel ?? stringFormatter.format('cancel')}
        </Button>
        <Button
          slot="close"
          variant={variant === 'destructive' ? 'destructive' : 'primary'}
          onPress={onPrimaryAction}
          autoFocus={autoFocusButton === 'action'}
        >
          {actionLabel}
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

ConfirmationDialog.Trigger = Dialog.Trigger;
