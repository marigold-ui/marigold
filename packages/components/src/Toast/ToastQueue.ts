import { queue } from './Toast';

export function addToast(
  title: string,
  description?: string,
  variant?: 'info' | 'success' | 'error' | 'warning',
  timeout?: number
) {
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
