import { Button, addToast } from '@marigold/components';

export default () => (
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
