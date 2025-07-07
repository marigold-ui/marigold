import {
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from 'react-aria-components';
import { flushSync } from 'react-dom';
import { ToastContent } from './ToastContent';

interface MyToastContent {
  title: string;
  description?: string;
  variant?: 'info' | 'success' | 'error' | 'warning';
}
export const queue = new ToastQueue<MyToastContent>({
  // Wrap state updates in a CSS view transition.
  wrapUpdate(fn) {
    if ('startViewTransition' in document) {
      document.startViewTransition(() => {
        flushSync(fn);
      });
    } else {
      fn();
    }
  },
});
type ToastPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

const positionMap: Record<ToastPosition, string> = {
  'bottom-left': 'fixed bottom-4 left-4 flex flex-col-reverse',
  'bottom-right': 'fixed bottom-4 right-4 flex flex-col-reverse',
  'top-left': 'fixed top-4 left-4 flex flex-col',
  'top-right': 'fixed top-4 right-4 flex flex-col',
};

export interface ToastProps {
  position?: ToastPosition;
}
const _Toast = ({ position = 'bottom-right' }: ToastProps) => {
  return (
    <ToastRegion
      queue={queue}
      className={`${positionMap[position]} z-50 gap-2`}
    >
      {({ toast }) => (
        <ToastContent toast={toast} variant={toast.content.variant} />
      )}
    </ToastRegion>
  );
};
export { _Toast as Toast };
