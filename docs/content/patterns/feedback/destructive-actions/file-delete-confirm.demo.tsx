import { useState } from 'react';
import {
  Button,
  EmptyState,
  FileField,
  Inline,
  Stack,
  useConfirmation,
} from '@marigold/components';
import { RotateCcw } from '@marigold/icons';

interface UploadedFile {
  id: string;
  name: string;
}

// Near-identical names are the realistic case: the user cannot tell from the
// list alone which row they are about to destroy.
const initialFiles: UploadedFile[] = [
  { id: '1', name: 'agb-2026-08-01.pdf' },
  { id: '2', name: 'agb-2026-07-14.pdf' },
  { id: '3', name: 'vertrag-2026-07-14.pdf' },
];

export default () => {
  const [files, setFiles] = useState(initialFiles);
  const confirm = useConfirmation();

  const deleteFile = async (file: UploadedFile) => {
    // [!code highlight:7]
    const result = await confirm({
      variant: 'destructive',
      title: 'Delete file?',
      content: `“${file.name}” will be deleted permanently. This cannot be undone.`,
      confirmationLabel: 'Delete file',
      cancelLabel: 'Cancel',
    });

    if (result === 'confirmed') {
      setFiles(current => current.filter(item => item.id !== file.id));
    }
  };

  return (
    <Stack space={2}>
      {files.length === 0 ? (
        <EmptyState
          title="No files"
          description="Every file was removed through its confirmation dialog."
        />
      ) : (
        files.map(file => (
          <FileField.Item key={file.id} onRemove={() => deleteFile(file)}>
            {file.name}
          </FileField.Item>
        ))
      )}
      {files.length < initialFiles.length && (
        <Inline alignX="right">
          <Button
            variant="ghost"
            size="small"
            onPress={() => setFiles(initialFiles)}
          >
            <RotateCcw />
            Reset demo
          </Button>
        </Inline>
      )}
    </Stack>
  );
};
