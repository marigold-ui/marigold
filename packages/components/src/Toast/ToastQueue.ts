import { ReactNode, useCallback } from 'react';
import { queue } from './ToastProvider';

export type ToastVariant = 'info' | 'success' | 'error' | 'warning';

export type ToastOptions = {
  title: string;
  description?: ReactNode;
  variant?: ToastVariant;
  /**
   * Time in milliseconds before the toast auto-dismisses.
   *
   * When omitted, the default is derived from `variant`: `success`, `info` and
   * the default (no variant) auto-dismiss after 5000ms, while `warning` and
   * `error` persist until dismissed. Pass `0` to force a toast to persist
   * regardless of variant. Explicit values are clamped up to a 5000ms minimum.
   */
  timeout?: number;
  action?: ReactNode;
};

const MINIMUM_TIMEOUT_MS = 5000;

// Per-variant default timeout used when the caller does not pass one. Low
// severity / reassurance toasts auto-dismiss, while high-severity / actionable
// ones persist until dismissed (WCAG 2.1 SC 1.4.13 "Content on Hover or Focus").
const DEFAULT_TIMEOUT_BY_VARIANT: Record<ToastVariant, number | undefined> = {
  success: MINIMUM_TIMEOUT_MS,
  info: MINIMUM_TIMEOUT_MS,
  warning: undefined,
  error: undefined,
};

const resolveTimeout = (
  timeout: number | undefined,
  variant?: ToastVariant
) => {
  // No explicit timeout: use the per-variant default (no variant = default).
  if (timeout === undefined) {
    return variant ? DEFAULT_TIMEOUT_BY_VARIANT[variant] : MINIMUM_TIMEOUT_MS;
  }
  // Explicit opt-out: keep the toast until it is manually dismissed.
  if (timeout <= 0) {
    return undefined;
  }
  // Honor explicit values, clamped up to the minimum.
  return Math.max(timeout, MINIMUM_TIMEOUT_MS);
};

export function useToast() {
  const addToast = useCallback((options: ToastOptions) => {
    const { title, description, variant, timeout, action } = options;
    return queue.add(
      {
        title,
        description,
        variant,
        action,
      },
      { timeout: resolveTimeout(timeout, variant) }
    );
  }, []);

  const clearToasts = useCallback(() => queue.clear(), []);

  const removeToast = useCallback((key: string) => queue.close(key), []);

  return { addToast, clearToasts, removeToast };
}
