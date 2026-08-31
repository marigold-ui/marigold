import { useState } from 'react';
import type { Key, Selection } from '@react-types/shared';
import {
  ActionBar,
  Button,
  Description,
  ListView,
  Stack,
  TextValue,
} from '@marigold/components';
import { Archive, Download } from '@marigold/icons';

const uploads = [
  { id: 'report', name: 'Report Q1.pdf', detail: '3 days ago · 2.1 MB' },
  { id: 'season', name: 'Season plan.xlsx', detail: 'Yesterday · 640 KB' },
  {
    id: 'contract',
    name: 'Venue contract.pdf',
    detail: '2 weeks ago · 1.2 MB',
  },
];

export default () => {
  const [selected, setSelected] = useState<Selection>(() => new Set<Key>());
  const count = selected === 'all' ? uploads.length : selected.size;

  return (
    <Stack space={8}>
      <ListView
        aria-label="Uploads"
        selectionMode="multiple" // [!code highlight]
        selectedKeys={selected}
        onSelectionChange={setSelected}
        items={uploads}
      >
        {(upload: (typeof uploads)[number]) => (
          <ListView.Item textValue={upload.name}>
            <TextValue>{upload.name}</TextValue>
            <Description>{upload.detail}</Description>
          </ListView.Item>
        )}
      </ListView>

      {/* A sibling, not a prop: the bar takes the count and a clear handler. */}
      <ActionBar
        selectedItemCount={count} // [!code highlight]
        onClearSelection={() => setSelected(new Set())} // [!code highlight]
      >
        <Button onPress={() => alert(`Download ${count} files`)}>
          <Download />
          Download
        </Button>
        <Button onPress={() => alert(`Archive ${count} files`)}>
          <Archive />
          Archive
        </Button>
      </ActionBar>
    </Stack>
  );
};
