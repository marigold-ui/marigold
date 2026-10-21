import { uploads } from '@/lib/data/uploads';
import { useState } from 'react';
import type { Selection } from '@marigold/components';
import {
  Description,
  ListView,
  Stack,
  Text,
  TextValue,
} from '@marigold/components';

export default () => {
  const [selected, setSelected] = useState<Selection>(() => new Set());
  const keys =
    selected === 'all' ? uploads.map(upload => upload.id) : [...selected];

  return (
    <Stack space={4}>
      <ListView
        aria-label="Uploads"
        selectionMode="multiple" // [!code highlight]
        allowSelectAll // [!code highlight]
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
      <Text>{keys.length > 0 ? keys.join(', ') : 'Nothing selected'}</Text>
    </Stack>
  );
};
