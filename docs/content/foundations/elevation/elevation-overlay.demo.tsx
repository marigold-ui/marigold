import { Button, ToastProvider, useToast } from '@marigold/components';

export default () => {
  const { addToast } = useToast();

  return (
    <>
      <ToastProvider position="bottom-right" />
      <Button
        variant="secondary"
        onPress={() =>
          addToast({
            title: 'Event published',
            description: 'Summer Festival is now live.',
            variant: 'success',
          })
        }
      >
        Show Toast
      </Button>
    </>
  );
};
