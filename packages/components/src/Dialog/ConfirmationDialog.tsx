import type { ReactNode } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { Button } from '../Button';
import { intlMessages } from '../intl/messages';
import type { DialogProps } from './Dialog';
import { Dialog } from './Dialog';

export interface ConfirmationDialogProps
  extends Pick<DialogProps, 'variant' | 'size' | 'closeButton'> {
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
   * Handler that is called when the primary button is pressed.
   */
  onPrimaryAction?: () => void;
  /**
   * Handler that is called when the secondary button is pressed.
   */
  autoFocusButton?: 'cancel' | 'primary';
  /**
   * The dialog's content.
   */
  children?: ReactNode;
}

export const ConfirmationDialog = ({
  title,
  actionLabel,
  cancelLabel,
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
        <Button variant="ghost" slot="close">
          {cancelLabel ?? stringFormatter.format('cancel')}
        </Button>
        <Button variant={variant === 'destructive' ? 'destructive' : 'primary'}>
          {actionLabel}
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
