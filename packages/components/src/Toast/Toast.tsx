import {
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from 'react-aria-components';
import { Button } from 'react-aria-components';
import { Close } from '@marigold/icons';
import { useClassNames } from '@marigold/system';
import { ToastContent } from './ToastContent';

interface MyToastContent {
  title: string;
  description?: string;
  variant?: 'info' | 'success' | 'error' | 'warning';
}
export const queue = new ToastQueue<MyToastContent>();

const _Toast = () => {
  const classNames = useClassNames({ component: 'Toast' });
  console.log(queue);

  return (
    <ToastRegion queue={queue}>
      {({ toast }) => (
        <Toast toast={toast} className={classNames.toast}>
          <ToastContent
            title={toast.content.title}
            description={toast.content.description}
            variant={toast.content.variant}
          />
          <Button slot="close" className={classNames.closeButton}>
            <Close size={16} />
          </Button>
        </Toast>
      )}
    </ToastRegion>
  );
};
export { _Toast as Toast };
