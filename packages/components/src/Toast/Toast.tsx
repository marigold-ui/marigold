import { ErrorFilled } from 'packages/components/src/icons/ErrorFilled';
import { InfoFilled } from 'packages/components/src/icons/InfoFilled';
import { SuccessFilled } from 'packages/components/src/icons/SuccessFilled';
import { WarningFilled } from 'packages/components/src/icons/WarningFilled';
import { UNSTABLE_ToastContent as RAC_ToastContent } from 'react-aria-components';
import { UNSTABLE_Toast as RAC_Toast, Text } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { Stack } from '../Stack/Stack';

const icons = {
  success: () => <SuccessFilled />,
  info: () => <InfoFilled />,
  warning: () => <WarningFilled />,
  error: () => <ErrorFilled />,
};

export type ToastContentProps = {
  title: string;
  description?: string;
  variant?: 'success' | 'info' | 'warning' | 'error';
};

export interface ToastProps {
  toast: { content: ToastContentProps; key: string };
}

export const Toast = ({ toast }: ToastProps) => {
  const classNames = useClassNames({
    component: 'Toast',
    variant: toast.content.variant,
  });
  const Icon = toast.content.variant ? icons[toast.content.variant] : null;
  return (
    <RAC_Toast
      toast={toast}
      className={classNames.toast}
      style={{ viewTransitionName: toast.key }}
    >
      <RAC_ToastContent className={classNames.content}>
        {Icon && (
          <div className={classNames.icon} slot="icon" data-testid="toast-icon">
            <Icon />
          </div>
        )}
        <Text slot="title" className={classNames.title}>
          {toast.content.title}
        </Text>
        <Stack space={2} />
        <Text slot="description" className={classNames.description}>
          {toast.content.description}
        </Text>
      </RAC_ToastContent>
      <CloseButton
        className={classNames.closeButton}
        aria-label="Close toast"
        slot="close"
      ></CloseButton>
    </RAC_Toast>
  );
};
