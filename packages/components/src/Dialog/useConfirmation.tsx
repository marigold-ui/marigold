import type { PropsWithChildren, ReactNode } from 'react';
import {
  createContext,
  use,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
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
// Settles the pending confirmation once the dialog has unmounted. React Aria
// returns focus to the trigger in an animation frame it schedules while the
// dialog unmounts. Scheduling ours after it means the caller acts only once
// focus is back, so it can safely remove the trigger, e.g. delete the row
// whose button opened the confirmation.
const SettleOnUnmount = ({ onUnmount }: { onUnmount: () => void }) => {
  const onUnmountRef = useRef(onUnmount);
  useLayoutEffect(() => {
    onUnmountRef.current = onUnmount;
  });
  useEffect(
    () => () => {
      requestAnimationFrame(() => onUnmountRef.current());
    },
    []
  );
  return null;
};

export const ConfirmationProvider = ({ children }: PropsWithChildren) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages, 'marigold');
  const [confirmation, setConfirmation] = useState<ConfirmationConfig | null>(
    null
  );
  const [open, setOpen] = useState(false);
  // Refs, not state: the unmount callback runs after the render that closed
  // the dialog and has to see the latest values.
  const openRef = useRef(false);
  const resultRef = useRef<ConfirmationResult>('cancelled');
  const resolveRef = useRef<((status: ConfirmationResult) => void) | null>(
    null
  );

  const changeOpen = (isOpen: boolean) => {
    openRef.current = isOpen;
    setOpen(isOpen);
  };

  const settle = () => {
    const resolve = resolveRef.current;
    resolveRef.current = null;
    resolve?.(resultRef.current);
  };

  const confirm = (config: ConfirmationConfig): Promise<ConfirmationResult> => {
    // Allow only one confirmation dialog at a time. Immediately resolve with a default status.
    if (open) {
      console.warn(
        'A confirmation dialog is already open. Rejecting new request.'
      );
      return Promise.resolve('cancelled');
    }

    // A dialog that is still closing settles now, before the next one opens.
    settle();

    return new Promise(resolve => {
      resultRef.current = 'cancelled';
      resolveRef.current = resolve;
      setConfirmation(config);
      changeOpen(true);
    });
  };

  return (
    <ConfirmationContext value={confirm}>
      {children}
      <ConfirmationDialog
        open={open}
        onOpenChange={changeOpen}
        variant={confirmation?.variant}
        size="xsmall"
        title={confirmation?.title || ''}
        confirmationLabel={
          confirmation?.confirmationLabel || stringFormatter.format('confirm')
        }
        cancelLabel={confirmation?.cancelLabel}
        autoFocusButton={confirmation?.autoFocusButton}
        onConfirm={() => {
          resultRef.current = 'confirmed';
        }}
      >
        {confirmation?.content}
        <SettleOnUnmount
          onUnmount={() => {
            // Strict mode unmounts once on mount, while the dialog is open.
            if (!openRef.current) settle();
          }}
        />
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
