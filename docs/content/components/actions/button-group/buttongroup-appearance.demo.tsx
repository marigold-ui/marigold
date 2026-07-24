import type { ButtonGroupProps } from '@marigold/components';
import { Button, ButtonGroup } from '@marigold/components';
import { Edit, Eye, Trash } from '@marigold/icons';

export default (props: ButtonGroupProps) => {
  const iconOnly = props.size === 'icon';
  return (
    <ButtonGroup {...props} aria-label="Row actions">
      <Button aria-label={iconOnly ? 'View' : undefined}>
        <Eye />
        {!iconOnly && 'View'}
      </Button>
      <Button aria-label={iconOnly ? 'Edit' : undefined}>
        <Edit />
        {!iconOnly && 'Edit'}
      </Button>
      <Button aria-label={iconOnly ? 'Delete' : undefined}>
        <Trash />
        {!iconOnly && 'Delete'}
      </Button>
    </ButtonGroup>
  );
};
