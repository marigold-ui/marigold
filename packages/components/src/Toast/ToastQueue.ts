import { queue } from './ToastProvider';

export function useToast() {
  const addToast = (
    title: string,
    description?: string,
    variant?: 'info' | 'success' | 'error' | 'warning',
    timeout?: number
  ) => {
    if (timeout && timeout < 5000) {
      timeout = 5000; // Ensure a minimum timeout of 5000ms
    }
    return queue.add(
      {
        title,
        description,
        variant,
      },
      { timeout }
    );
  };

  const clearToasts = () => queue.clear();

  const removeToast = (key: string) => queue.close(key);

  return { addToast, clearToasts, removeToast };
}
