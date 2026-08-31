import { useState } from 'react';
import type { Key, Selection } from '@react-types/shared';
import {
  Button,
  Description,
  Inline,
  ListView,
  Stack,
  TextValue,
} from '@marigold/components';

const venues = [
  { id: 'gasometer', name: 'Gasometer', detail: 'Vienna · 1600 seats' },
  { id: 'tempodrom', name: 'Tempodrom', detail: 'Berlin · 3800 seats' },
  { id: 'columbiahalle', name: 'Columbiahalle', detail: 'Berlin · 3500 seats' },
];

export default () => {
  // The selection lives here, not in a form. Nothing leaves this component
  // until the button commits it.
  const [selected, setSelected] = useState<Selection>(() => new Set<Key>());
  const chosen = venues.find(
    venue => selected !== 'all' && selected.has(venue.id)
  );

  return (
    <Stack space={4}>
      <ListView
        aria-label="Venues"
        selectionMode="single" // [!code highlight]
        selectedKeys={selected} // [!code highlight]
        onSelectionChange={setSelected} // [!code highlight]
        items={venues}
      >
        {(venue: (typeof venues)[number]) => (
          <ListView.Item textValue={venue.name}>
            <TextValue>{venue.name}</TextValue>
            <Description>{venue.detail}</Description>
          </ListView.Item>
        )}
      </ListView>
      <Inline space={2}>
        <Button
          variant="primary"
          disabled={!chosen}
          onPress={() => alert(`Booked ${chosen?.name}`)}
        >
          Use this venue
        </Button>
      </Inline>
    </Stack>
  );
};
