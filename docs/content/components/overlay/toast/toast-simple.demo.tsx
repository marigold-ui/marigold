import { Button, ToastProvider, useToast } from '@marigold/components';

export default () => {
  const { addToast } = useToast();

  return (
    <>
      <ToastProvider position="bottom-right" />
      <Button
        onPress={() => addToast({ title: 'Simple Toast', variant: 'success' })}
      >
        Show Toast
      </Button>
    </>
  );
};
