import { Copy } from 'lucide-react';
import { ActionBar, ActionBarProps } from '@marigold/components';
import { Delete, Edit } from '@marigold/icons';

export default (props: ActionBarProps) => {
  return (
    <ActionBar {...props} selectedItemCount={3}>
      <ActionBar.Button onPress={() => alert('Edit action')}>
        <Edit />
        <span>Edit</span>
      </ActionBar.Button>
      <ActionBar.Button onPress={() => alert('Copy action')}>
        <Copy />
        <span>Copy</span>
      </ActionBar.Button>
      <ActionBar.Button onPress={() => alert('Delete action')}>
        <Delete />
        <span>Delete</span>
      </ActionBar.Button>
    </ActionBar>
  );
};
