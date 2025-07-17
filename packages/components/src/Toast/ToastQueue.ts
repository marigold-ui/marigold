import { queue } from './ToastProvider';

export function useToast() {
  type ToastOptions = {
    title: string;
    description?: string;
    variant?: 'info' | 'success' | 'error' | 'warning';
    timeout?: number;
  };

  const addToast = (options: ToastOptions) => {
    let { title, description, variant, timeout } = options;
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
