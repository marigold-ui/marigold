import { FileField, useConfirmation } from '@marigold/components';

export default () => {
  const confirm = useConfirmation();

  return (
    <FileField
      label="Documents"
      multiple
      // [!code highlight:10]
      onBeforeRemove={async file => {
        const result = await confirm({
          variant: 'destructive',
          title: 'Delete file?',
          content: `“${file.name}” will be deleted permanently. This cannot be undone.`,
          confirmationLabel: 'Delete file',
        });

        return result === 'confirmed';
      }}
    />
  );
};
