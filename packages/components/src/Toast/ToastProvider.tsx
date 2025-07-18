import {
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from 'react-aria-components';
import type RAC from 'react-aria-components';
import { flushSync } from 'react-dom';
import { UNSAFE_PortalProvider } from '@react-aria/overlays';
import { usePortalContainer } from '../Provider';
import { Toast } from './Toast';
import { ToastContentProps } from './Toast';

export const queue = new ToastQueue<ToastContentProps>({
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

export interface ToastProviderProps
  extends Omit<RAC.ToastRegionProps<object>, RemovedProps> {
  position?: ToastPosition;
}

type RemovedProps = 'children' | 'className' | 'style' | 'queue';

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
//TODO: test
const ToastProvider = ({ position = 'bottom-right' }: ToastProviderProps) => {
  const portal = usePortalContainer();
  return (
    <UNSAFE_PortalProvider getContainer={() => portal as HTMLElement | null}>
      <ToastRegion
        queue={queue}
        className={`${positionMap[position]} z-50 gap-2`}
      >
        {({ toast }) => <Toast toast={toast} />}
      </ToastRegion>
    </UNSAFE_PortalProvider>
  );
};

export { ToastProvider, Toast };
