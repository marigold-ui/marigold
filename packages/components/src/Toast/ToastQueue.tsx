import { ReactNode, useCallback } from 'react';
import { UNSTABLE_ToastQueue as ToastQueue } from 'react-aria-components/Toast';
import { flushSync } from 'react-dom';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { Button } from '../Button/Button';
import { intlMessages } from '../intl/messages';
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
      // Explicit rather than inherited: `clearToasts` reads `visibleToasts` as
      // the whole queue, which only holds while nothing is held back.
      maxVisibleToasts: Infinity,
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
  /**
   * Whether the toast renders its own close button. Ignored on a toast that
   * never auto-dismisses (`warning`, `error`, `timeout: 0`): with no timeout
   * and no close button there is no way out of the toast.
   * @default true
   */
  closeButton?: boolean;
  /**
   * Handler that is called when the toast closes, whether it timed out, was
   * dismissed, closed through `removeToast`, or cleared with `clearToasts`.
   *
   * Commit deferred work from here rather than from your own `setTimeout`: the
   * toast's timer pauses while the region is hovered or focused, so a separate
   * timer fires while the toast is still on screen.
   *
   * A toast that never auto-dismisses never runs this on its own. Don't pair it
   * with `variant="warning"`, `variant="error"` or `timeout: 0` when the
   * handler commits work the user has already been told happened.
   */
  onClose?: () => void;
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

/**
 * Options for a toast that reports a destructive action as done, defers the
 * work, and commits it when the toast closes. See the [Destructive Actions
 * pattern](https://www.marigold-ui.io/patterns/feedback/destructive-actions)
 * for choosing between this and a confirmation dialog.
 */
export type UndoToastOptions = {
  /**
   * Title of the toast. Name what happened to what ("“Newsletter August”
   * deleted"): it also names the undo button, which is what tells stacked
   * toasts apart for a screen reader.
   */
  title: string;
  description?: ReactNode;
  /**
   * Time in milliseconds the user has to undo, clamped up to 5000ms. Unlike
   * `addToast`, `0` falls back to the default window: an undo toast that never
   * closes never commits.
   */
  timeout?: number;
  /**
   * Called when the user presses undo. Restore whatever the interface hid.
   */
  onUndo: () => void;
  /**
   * Called when the window closes without an undo, whichever way the toast
   * went away. Send the real request from here.
   */
  onCommit: () => void;
};

export function useToast() {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  const addToast = useCallback(
    ({ timeout, onClose, ...content }: ToastOptions) =>
      getToastQueue().add(content, {
        timeout: resolveTimeout(timeout, content.variant),
        onClose,
      }),
    []
  );

  const removeToast = useCallback(
    (key: string) => getToastQueue().close(key),
    []
  );

  /**
   * Add a toast that offers to undo a destructive action and commits it when the
   * window closes. The commit rides the toast's own `onClose`: React Aria pauses
   * the toast timer on hover and focus, so a parallel `setTimeout` drifts.
   */
  const addUndoToast = useCallback(
    ({ title, description, timeout, onUndo, onCommit }: UndoToastOptions) => {
      // The undo press also closes the toast, and that close must not commit.
      let undone = false;

      // Read only when undo is pressed, by which point `addToast` has returned.
      const key: string = addToast({
        title,
        description,
        closeButton: false,
        // Never `undefined`: a toast that never closes never commits.
        timeout: Math.max(timeout ?? 0, MINIMUM_TIMEOUT_MS),
        action: (
          <Button
            size="small"
            variant="ghost"
            // Toasts stack, so a bare "Undo" is ambiguous to a screen reader.
            aria-label={stringFormatter.format('undoNamed', { title })}
            onPress={() => {
              undone = true;
              onUndo();
              removeToast(key);
            }}
          >
            {stringFormatter.format('undo')}
          </Button>
        ),
        onClose: () => {
          if (!undone) onCommit();
        },
      });

      return key;
    },
    [addToast, removeToast, stringFormatter]
  );

  const clearToasts = useCallback(() => {
    const queue = getToastQueue();
    // `clear()` skips close handlers, so run them first. `visibleToasts` is the
    // whole queue because `getToastQueue` sets `maxVisibleToasts: Infinity`.
    queue.visibleToasts.forEach(toast => toast.onClose?.());
    queue.clear();
  }, []);

  return { addToast, addUndoToast, clearToasts, removeToast };
}
