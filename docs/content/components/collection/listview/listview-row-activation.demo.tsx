import { uploads } from '@/lib/data/uploads';
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

const files = uploads.slice(0, 3);

const nameOf = (id: Key) => files.find(file => file.id === id)?.name ?? null;

export default () => {
  const [selected, setSelected] = useState<Selection>(() => new Set());
  const [opened, setOpened] = useState<string | null>(null);
  const count = selected === 'all' ? files.length : selected.size;

  return (
    <Stack space={4}>
      <ListView
        aria-label="Uploads"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        // Reached only while nothing is selected.
        onAction={key => setOpened(nameOf(key))} // [!code highlight]
        items={files}
      >
        {(file: (typeof files)[number]) => (
          <ListView.Item textValue={file.name}>
            <TextValue>{file.name}</TextValue>
            <Description>{file.detail}</Description>
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
