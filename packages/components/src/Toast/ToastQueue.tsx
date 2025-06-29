import { queue } from './Toast';

export function addToastToQueue(
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

export function clearToastQueue() {
  return queue.clear && queue.clear();
}
export function removeToastFromQueue(key: string) {
  return queue.close(key);
}
