import { ReactNode, useCallback } from 'react';
import { UNSTABLE_ToastQueue as ToastQueue } from 'react-aria-components/Toast';
import { flushSync } from 'react-dom';
import type { ToastContentProps } from './Toast';

let queue: ToastQueue<ToastContentProps> | undefined;

/**
 * Lazily create the shared toast queue.
 *
 * Constructing the queue at module scope ran on first import and touched
 * `document` during view-transition setup, which both violated the package's
 * `sideEffects: false` contract (hurting tree-shaking) and risked throwing
 * during SSR. Deferring construction to first call keeps the module
 * side-effect free while preserving the singleton: every caller — `useToast`
 * anywhere in the tree and the single `<ToastProvider>` — shares one queue.
 */
export const getToastQueue = (): ToastQueue<ToastContentProps> => {
  if (!queue) {
    queue = new ToastQueue<ToastContentProps>({
      // Wrap state updates in a CSS view transition.
      wrapUpdate(fn) {
        if (
          typeof document !== 'undefined' &&
          'startViewTransition' in document
        ) {
          const transition = document.startViewTransition(() => {
            // eslint-disable-next-line @eslint-react/dom-no-flush-sync
            flushSync(fn);
          });
          // Catch and suppress ViewTransition errors (e.g., when another
          // transition is already running)
          transition.ready.catch(() => {});
          transition.finished.catch(() => {});
        } else {
          fn();
        }
      },
    });
  }
  return queue;
};

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

// Only warning and error persist until dismissed (higher severity, per WCAG
// 2.1 SC 1.4.13). Everything else auto-dismisses after the minimum.
const resolveTimeout = (
  timeout: number | undefined,
  variant?: ToastVariant
) => {
  if (timeout === undefined) {
    return variant === 'warning' || variant === 'error'
      ? undefined
      : MINIMUM_TIMEOUT_MS;
  }
  // `0` or less keeps the toast until it is manually dismissed.
  if (timeout <= 0) {
    return undefined;
  }
  // Honor explicit values, clamped up to the minimum.
  return Math.max(timeout, MINIMUM_TIMEOUT_MS);
};

export function useToast() {
  const addToast = useCallback((options: ToastOptions) => {
    const { title, description, variant, timeout, action } = options;
    return getToastQueue().add(
      {
        title,
        description,
        variant,
        action,
      },
      { timeout: resolveTimeout(timeout, variant) }
    );
  }, []);

  const clearToasts = useCallback(() => getToastQueue().clear(), []);

  const removeToast = useCallback(
    (key: string) => getToastQueue().close(key),
    []
  );

  return { addToast, clearToasts, removeToast };
}
