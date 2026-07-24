import { Copy } from 'lucide-react';
import { ActionBar, ActionBarProps, Button } from '@marigold/components';
import { Delete, Edit } from '@marigold/icons';

export default (props: ActionBarProps) => {
  return (
    <ActionBar {...props} selectedItemCount={3}>
      <Button onPress={() => alert('Edit action')}>
        <Edit />
        <span>Edit</span>
      </Button>
      <Button onPress={() => alert('Copy action')}>
        <Copy />
        <span>Copy</span>
      </Button>
      <Button onPress={() => alert('Delete action')}>
        <Delete />
        <span>Delete</span>
      </Button>
    </ActionBar>
  );
};
