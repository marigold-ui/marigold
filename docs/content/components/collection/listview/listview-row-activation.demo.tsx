import { useState } from 'react';
import type { Key, Selection } from '@react-types/shared';
import {
  Button,
  Description,
  Headline,
  Inline,
  ListView,
  Stack,
  Text,
  TextValue,
} from '@marigold/components';
import { ChevronLeft } from '@marigold/icons';

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
  const [openKey, setOpenKey] = useState<Key>();

  const opened = uploads.find(upload => upload.id === openKey);
  const count = selected === 'all' ? uploads.length : selected.size;

  // A row press really leaves the list, the way opening a record would.
  if (opened) {
    return (
      <Stack space={4}>
        <Inline space={2}>
          <Button onPress={() => setOpenKey(undefined)}>
            <ChevronLeft />
            Back to files
          </Button>
        </Inline>
        <Headline level={3}>{opened.name}</Headline>
        <Text>Uploaded {opened.detail}</Text>
      </Stack>
    );
  }

  return (
    <Stack space={4}>
      <ListView
        aria-label="Uploads"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        onAction={setOpenKey} // [!code highlight]
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
        {count > 0
          ? `${count} selected, so a row press only marks rows. Press Escape to open files again.`
          : 'Press a row to open the file. Tick a checkbox first and the same press marks the row instead.'}
      </Text>
    </Stack>
  );
};
