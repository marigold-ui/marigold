import { useState } from 'react';
import type { Key } from '@react-types/shared';
import type { Selection } from '@marigold/components';
import {
  Description,
  ListView,
  Stack,
  Text,
  TextValue,
} from '@marigold/components';

const uploads = [
  { id: 'report', name: 'Report Q1.pdf', detail: '3 days ago · 2.1 MB' },
  { id: 'season', name: 'Season plan.xlsx', detail: 'Yesterday · 640 KB' },
  {
    id: 'contract',
    name: 'Venue contract.pdf',
    detail: '2 weeks ago · 1.2 MB',
  },
];

const nameOf = (id: Key) =>
  uploads.find(upload => upload.id === id)?.name ?? null;

export default () => {
  const [selected, setSelected] = useState<Selection>(() => new Set());
  const [opened, setOpened] = useState<string | null>(null);
  const count = selected === 'all' ? uploads.length : selected.size;

  return (
    <Stack space={4}>
      <ListView
        aria-label="Uploads"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        // Reached only while nothing is selected.
        onAction={key => setOpened(nameOf(key))} // [!code highlight]
        items={uploads}
      >
        {(upload: (typeof uploads)[number]) => (
          <ListView.Item textValue={upload.name}>
            <TextValue>{upload.name}</TextValue>
            <Description>{upload.detail}</Description>
          </ListView.Item>
        )}
      </ListView>
      <Text size="sm" color="secondary">
        {count > 0
          ? `${count} selected. A row press now selects instead of opening.`
          : opened
            ? `Opened ${opened}. Tick a checkbox, then press a row again.`
            : 'Nothing selected. A row press opens.'}
      </Text>
    </Stack>
  );
};
