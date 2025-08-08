import {
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from 'react-aria-components';
import type RAC from 'react-aria-components';
import { flushSync } from 'react-dom';
import { useClassNames } from '@marigold/system';
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

const ToastProvider = ({ position = 'bottom-right' }: ToastProviderProps) => {
  const classNames = useClassNames({
    component: 'Toast',
  });
  return (
    <ToastRegion queue={queue} className={`${classNames[position]} z-50 gap-2`}>
      {({ toast }) => <Toast toast={toast} />}
    </ToastRegion>
  );
};

export { ToastProvider, Toast };
