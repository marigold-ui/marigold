import { ReactNode } from 'react';
import { queue } from './ToastProvider';

export function useToast() {
  type ToastOptions = {
    title: string;
    description?: ReactNode;
    variant?: 'info' | 'success' | 'error' | 'warning';
    timeout?: number;
    action?: ReactNode;
  };
  const MINIMUM_TIMEOUT_MS = 5000;
  const addToast = (options: ToastOptions) => {
    let { title, description, variant, timeout, action } = options;
    if (timeout && timeout < MINIMUM_TIMEOUT_MS) {
      timeout = MINIMUM_TIMEOUT_MS; // Ensure a minimum timeout of 5000ms
    }
    return queue.add(
      {
        title,
        description,
        variant,
        action,
      },
      { timeout }
    );
  };

  const clearToasts = () => queue.clear();

  const removeToast = (key: string) => queue.close(key);

  return { addToast, clearToasts, removeToast };
}
