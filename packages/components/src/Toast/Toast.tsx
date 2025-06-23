import {
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from 'react-aria-components';
import { Button } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { ToastContent } from './ToastContent';

interface MyToastContent {
  title: string;
  description?: string;
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
            Title={toast.content.title}
            Description={toast.content.description}
          />
          <Button slot="close" className={classNames.closeButton}>
            x
          </Button>
        </Toast>
      )}
    </ToastRegion>
  );
};
export { _Toast as Toast };
