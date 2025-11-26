import type { PropsWithChildren, ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import { ConfirmationDialog } from './ConfirmationDialog';
import type { ConfirmationDialogProps } from './ConfirmationDialog';

// Types
// ---------------
export type ConfirmationResult = 'confirmed' | 'cancelled';
export interface ConfirmationConfig
  extends Pick<
    ConfirmationDialogProps,
    | 'variant'
    | 'title'
    | 'confirmationLabel'
    | 'cancelLabel'
    | 'autoFocusButton'
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
    <ConfirmationContext.Provider value={confirm}>
      {children}
      <ConfirmationDialog
        open={open}
        onOpenChange={setOpen}
        variant={confirmation?.variant}
        size="xsmall"
        title={confirmation?.title || ''}
        confirmationLabel={confirmation?.confirmationLabel || 'Confirm'}
        cancelLabel={confirmation?.cancelLabel}
        onConfirm={() => {
          confirmation?.resolve('confirmed');
        }}
        onCancel={() => {
          confirmation?.resolve('cancelled');
        }}
      >
        {confirmation?.content}
      </ConfirmationDialog>
    </ConfirmationContext.Provider>
  );
};

// Hook
// ---------------
export const useConfirmation = () => {
  const confirm = useContext(ConfirmationContext);

  if (confirm === null) {
    throw new Error(
      '`useConfirmation` must be used within a `ConfirmationProvider`'
    );
  }

  return confirm;
};
