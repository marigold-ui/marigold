import { Button, ButtonGroup } from '@marigold/components';

export default () => (
  <ButtonGroup aria-label="Document actions">
    <Button>Preview</Button>
    <Button>Save draft</Button>
    <Button variant="primary">Publish</Button>
  </ButtonGroup>
);
