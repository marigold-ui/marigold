import { Button, addToast } from '@marigold/components';

export default () => (
  <>
    <Button onPress={() => addToast('Simple Toast', undefined, 'success')}>
      Show Toast
    </Button>
  </>
);
