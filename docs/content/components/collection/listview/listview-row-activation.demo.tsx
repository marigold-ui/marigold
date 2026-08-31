import { useState } from 'react';
import type { Key, Selection } from '@react-types/shared';
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

export default () => {
  const [selected, setSelected] = useState<Selection>(() => new Set<Key>());
  const [opened, setOpened] = useState<Key>();

  const count = selected === 'all' ? uploads.length : selected.size;
  const openedName = uploads.find(upload => upload.id === opened)?.name;

  const hint =
    count > 0
      ? `${count} selected, so pressing a row marks it instead of opening it.`
      : openedName
        ? `Opened ${openedName}. Nothing is selected, so a press still opens.`
        : 'Press a row to open it, or use a checkbox to start selecting.';

  return (
    <Stack space={4}>
      <ListView
        aria-label="Uploads"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        // Reached only while nothing is selected.
        onAction={setOpened} // [!code highlight]
        items={uploads}
      >
        {(upload: (typeof uploads)[number]) => (
          <ListView.Item textValue={upload.name}>
            <TextValue>{upload.name}</TextValue>
            <Description>{upload.detail}</Description>
          </ListView.Item>
        )}
      </ListView>
      <Text variant="muted" size="sm">
        {hint}
      </Text>
    </Stack>
  );
};
