import { Button, addToast } from '@marigold/components';

export default () => (
  <>
    <Button
      onPress={() =>
        addToast(
          'Test Toast',
          'This is a test description for the toast.',
          'success'
        )
      }
    >
      Show Toast
    </Button>
  </>
);
