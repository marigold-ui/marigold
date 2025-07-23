import { useState } from 'react';
import { Button, useToast } from '@marigold/components';

export default () => {
  const [toastKey, setToastKey] = useState<string | null>(null);
  const { addToast, removeToast } = useToast();

  return (
    <>
      <Button
        onPress={() => {
          if (!toastKey) {
            setToastKey(
              addToast({
                title: 'Error',
                description: 'Click the Hide Toast button to dismiss me!',
                variant: 'error',
              })
            );
          } else {
            removeToast(toastKey);
            setToastKey(null);
          }
        }}
      >
        {toastKey ? 'Hide' : 'Show'} Toast
      </Button>
    </>
  );
};
