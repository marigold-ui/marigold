import { Button } from '@marigold/components';

const ValidButton = () => (
  <Button variant="primary" onPress={() => console.log('clicked')}>
    Submit
  </Button>
);

export default ValidButton;
