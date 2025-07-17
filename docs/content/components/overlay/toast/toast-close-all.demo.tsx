import { Button, addToast, clearToasts } from '@marigold/components';

export default () => (
  <div className="flex flex-row gap-2">
    <Button onPress={() => addToast('Updated Settings', undefined, 'success')}>
      Show Toast
    </Button>
    <Button onPress={clearToasts}>Clear Toasts</Button>
  </div>
);
