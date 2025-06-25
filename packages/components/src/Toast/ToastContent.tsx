import React from 'react';
import { UNSTABLE_ToastContent as ToastContents } from 'react-aria-components';
import { Text } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { Stack } from '../Stack';

interface ToastContentProps {
  Title: string;
  Description?: string;
}
export const ToastContent = ({ Title, Description }: ToastContentProps) => {
  const classNames = useClassNames({ component: 'Toast' });
  return (
    <ToastContents>
      <Text slot="title" className={classNames.title}>
        {Title}
      </Text>
      <Stack space={2} />
      <Text slot="description" className={classNames.description}>
        {Description}
      </Text>
    </ToastContents>
  );
};
