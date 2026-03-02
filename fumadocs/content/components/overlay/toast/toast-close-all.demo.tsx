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
          })
        }
      >
        Show Toast
      </Button>
      <Button onPress={clearToasts}>Clear Toasts</Button>
    </div>
  );
};
