import { Button, useToast } from '@marigold/components';

export default () => {
  const { addToast, clearToasts } = useToast();

  return (
    <div className="flex flex-row gap-2">
      <Button
        onPress={() =>
          addToast({
            title: 'Updated Settings',
            variant: 'success',
            // Keep toasts until cleared so this demo can stack a few.
            timeout: 0,
          })
        }
      >
        Show Toast
      </Button>
      <Button onPress={clearToasts}>Clear Toasts</Button>
    </div>
  );
};
