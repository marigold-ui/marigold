import {
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from 'react-aria-components';
import { flushSync } from 'react-dom';
import { UNSAFE_PortalProvider } from '@react-aria/overlays';
import { usePortalContainer } from '../Provider';
import { ToastContent } from './ToastContent';

export interface MyToastContent {
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
type ToastPosition =
  | 'bottom-left'
  | 'bottom-right'
  | 'top-left'
  | 'top-right'
  | 'top'
  | 'bottom';

const positionMap: Record<ToastPosition, string> = {
  'bottom-left': 'fixed bottom-4 left-4 flex flex-col-reverse',
  'bottom-right': 'fixed bottom-4 right-4 flex flex-col-reverse',
  'top-left': 'fixed top-4 left-4 flex flex-col',
  'top-right': 'fixed top-4 right-4 flex flex-col',
  top: 'fixed top-4 left-1/2 right-auto -translate-x-1/2 flex flex-col items-center w-auto align-middle',
  bottom:
    'fixed bottom-4 left-1/2 right-auto -translate-x-1/2 flex flex-col-reverse items-center w-auto align-middle',
};

export interface ToastProps {
  position?: ToastPosition;
}
const _Toast = ({ position = 'bottom-right' }: ToastProps) => {
  const portal = usePortalContainer();
  return (
    <UNSAFE_PortalProvider getContainer={() => portal as HTMLElement | null}>
      <ToastRegion
        queue={queue}
        className={`${positionMap[position]} z-50 gap-2`}
      >
        {({ toast }) => <ToastContent toast={toast} />}
      </ToastRegion>
    </UNSAFE_PortalProvider>
  );
};

export { _Toast as Toast };
_Toast.Content = ToastContent;
