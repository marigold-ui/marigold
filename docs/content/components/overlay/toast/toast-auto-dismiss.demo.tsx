import { Button, useToast } from '@marigold/components';

export default () => {
  const { addToast } = useToast();

  return (
    <>
      <Button
        onPress={() =>
          addToast({
            title: 'Updated',
            description: 'I will vanish after 5 seconds',
            variant: 'info',
            timeout: 5000,
          })
        }
      >
        Show Toast
      </Button>
    </>
  );
};
