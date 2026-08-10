import type { PropsWithChildren, ReactNode } from 'react';
import { createContext, use, useState } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { intlMessages } from '../intl/messages';
import { ConfirmationDialog } from './ConfirmationDialog';
import type { ConfirmationDialogProps } from './ConfirmationDialog';

// Types
// ---------------
export type ConfirmationResult = 'confirmed' | 'cancelled';
export interface ConfirmationConfig extends Pick<
  ConfirmationDialogProps,
  'variant' | 'title' | 'confirmationLabel' | 'cancelLabel' | 'autoFocusButton'
> {
  content?: ReactNode;
}

// Context
// ---------------
export type ConfirmationFn = (
  props: ConfirmationConfig
) => Promise<ConfirmationResult>;
export const ConfirmationContext = createContext<ConfirmationFn | null>(null);

// Provider
// ---------------
interface ConfirmationState extends ConfirmationConfig {
  resolve: (status: ConfirmationResult) => void;
}

export const ConfirmationProvider = ({ children }: PropsWithChildren) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages, 'marigold');
  const [confirmation, setConfirmation] = useState<ConfirmationState | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const confirm = (config: ConfirmationConfig): Promise<ConfirmationResult> => {
    // Allow only one confirmation dialog at a time. Immediately resolve with a default status.
    if (open) {
      console.warn(
        'A confirmation dialog is already open. Rejecting new request.'
      );
      return Promise.resolve('cancelled');
    }

    return new Promise(resolve => {
      setConfirmation({ ...config, resolve });
      setOpen(true);
    });
  };

  return (
    <ConfirmationContext value={confirm}>
      {children}
      <ConfirmationDialog
        open={open}
        onOpenChange={isOpen => {
          setOpen(isOpen);
          if (!isOpen) {
            confirmation?.resolve('cancelled');
          }
        }}
        variant={confirmation?.variant}
        size="xsmall"
        title={confirmation?.title || ''}
        confirmationLabel={
          confirmation?.confirmationLabel || stringFormatter.format('confirm')
        }
        cancelLabel={confirmation?.cancelLabel}
        autoFocusButton={confirmation?.autoFocusButton}
        onConfirm={() => {
          confirmation?.resolve('confirmed');
        }}
      >
        {confirmation?.content}
      </ConfirmationDialog>
    </ConfirmationContext>
  );
};

// Hook
// ---------------
export const useConfirmation = () => {
  const confirm = use(ConfirmationContext);

  if (confirm === null) {
    throw new Error(
      '`useConfirmation` must be used within a `ConfirmationProvider`'
    );
  }

  return confirm;
};
