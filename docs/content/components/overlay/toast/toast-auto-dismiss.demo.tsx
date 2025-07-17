import { Button, useToast } from '@marigold/components';

export default () => {
  const { addToast } = useToast();

  return (
    <>
      <Button
        onPress={() =>
          addToast('Updated', 'I will vanish after 5 seconds', 'info', 5000)
        }
      >
        Show Toast
      </Button>
    </>
  );
};
