import type RAC from 'react-aria-components';
import { UNSTABLE_ToastRegion as ToastRegion } from 'react-aria-components/Toast';
import { useClassNames } from '@marigold/system';
import { Toast } from './Toast';
import { getToastQueue } from './ToastQueue';

export interface ToastProviderProps extends Omit<
  RAC.ToastRegionProps<object>,
  RemovedProps
> {
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
    <ToastRegion
      queue={getToastQueue()}
      className={`${classNames[position]} z-80 gap-2`}
    >
      {({ toast }) => <Toast toast={toast} />}
    </ToastRegion>
  );
};

export { ToastProvider, Toast };
