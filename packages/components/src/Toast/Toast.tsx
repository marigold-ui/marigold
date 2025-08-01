import { UNSTABLE_ToastContent as RAC_ToastContent } from 'react-aria-components';
import { UNSTABLE_Toast as RAC_Toast, Text } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { CloseButton } from '../CloseButton';
import { Stack } from '../Stack';

const icons = {
  success: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  ),
  info: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  ),
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
