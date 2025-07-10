import { queue } from './Toast';

export function addToast(
  title: string,
  description?: string,
  variant?: 'info' | 'success' | 'error' | 'warning',
  timeout?: number
) {
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
}

export function clearToasts() {
  queue.clear();
}
export function removeToast(key: string) {
  return queue.close(key);
}
