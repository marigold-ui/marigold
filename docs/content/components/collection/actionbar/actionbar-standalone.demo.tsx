import { useState } from 'react';
import {
  ActionBar,
  Button,
  Checkbox,
  CheckboxGroup,
  Stack,
} from '@marigold/components';
import { Download, Trash2 } from '@marigold/icons';

const files = [
  { id: 'report-q1', label: 'Report Q1.pdf' },
  { id: 'report-q2', label: 'Report Q2.pdf' },
  { id: 'budget', label: 'Budget.xlsx' },
  { id: 'notes', label: 'Meeting notes.docx' },
];

export default () => {
  const [selected, setSelected] = useState<string[]>(['report-q1']);

  return (
    <Stack space={8}>
      <CheckboxGroup label="Files" value={selected} onChange={setSelected}>
        {files.map(file => (
          <Checkbox key={file.id} value={file.id} label={file.label} />
        ))}
      </CheckboxGroup>

      <ActionBar
        selectedItemCount={selected.length}
        onClearSelection={() => setSelected([])}
      >
        <Button onPress={() => alert('Download')}>
          <Download />
          Download
        </Button>
        <Button onPress={() => alert('Delete')}>
          <Trash2 />
          Delete
        </Button>
      </ActionBar>
    </Stack>
  );
};
