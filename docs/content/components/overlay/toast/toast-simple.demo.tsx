import { Button, ToastProvider, useToast } from '@marigold/components';

export default () => {
  const { addToast } = useToast();

  return (
    <>
      <ToastProvider position="bottom-right" />
      <Button onPress={() => addToast('Simple Toast', undefined, 'success')}>
        Show Toast
      </Button>
    </>
  );
};
