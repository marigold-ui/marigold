import { Button, addToast } from '@marigold/components';

export default () => (
  <>
    <Button onPress={() => addToast('Updated', undefined, 'info', 5000)}>
      Show Toast
    </Button>
  </>
);
