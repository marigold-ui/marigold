'use client';

import { useToast } from '@marigold/components';

export const useSavedToast = () => {
  const { addToast } = useToast();
  return (description: string) =>
    addToast({
      title: 'Settings saved',
      description,
      variant: 'success',
    });
};
