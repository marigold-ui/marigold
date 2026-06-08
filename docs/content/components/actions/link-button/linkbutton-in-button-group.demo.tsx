import { Button, ButtonGroup, LinkButton } from '@marigold/components';
import { Edit, Trash } from '@marigold/icons';

export default () => (
  <ButtonGroup aria-label="Row actions" size="small">
    <LinkButton href="#" aria-label="Edit">
      <Edit />
    </LinkButton>
    <Button
      variant="destructive-ghost"
      aria-label="Delete"
      onPress={() => alert('Delete')}
    >
      <Trash />
    </Button>
  </ButtonGroup>
);
