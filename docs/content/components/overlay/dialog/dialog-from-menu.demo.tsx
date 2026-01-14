import { Menu, useConfirmation } from '@marigold/components';

export default () => {
  const confirm = useConfirmation();
  const handleAction = async (key: React.Key) => {
    const action = key as 'save' | 'delete';
    switch (action) {
      case 'save':
        alert('saved!');
        break;
      case 'delete':
        await confirm({
          variant: 'destructive',
          title: 'Confirm delete',
          content:
            'Are you sure you want to delete this event? This action cannot be undone.',
          confirmationLabel: 'Delete',
        });
        break;
      default:
        throw new Error(`Unhandled action "${action}"!`);
    }
  };

  return (
    <Menu onAction={handleAction} label="Settings">
      <Menu.Item id="save">Save</Menu.Item>
      <Menu.Item id="delete" variant="destructive">
        Delete
      </Menu.Item>
    </Menu>
  );
};
