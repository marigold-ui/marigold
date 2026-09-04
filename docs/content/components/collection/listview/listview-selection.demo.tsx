import { venues } from '@/lib/data/venues';
import { useState } from 'react';
import type { Selection } from '@marigold/components';
import {
  Button,
  Description,
  Inline,
  ListView,
  Stack,
  TextValue,
} from '@marigold/components';

const options = venues.slice(2, 5);

export default () => {
  // The selection lives here, not in a form. Nothing leaves this component
  // until the button commits it.
  const [selected, setSelected] = useState<Selection>(() => new Set());
  const chosen = options.find(
    venue => selected !== 'all' && selected.has(venue.id)
  );

  return (
    <Stack space={4}>
      <ListView
        aria-label="Venues"
        selectionMode="single" // [!code highlight]
        selectedKeys={selected} // [!code highlight]
        onSelectionChange={setSelected} // [!code highlight]
        items={options}
      >
        {(venue: (typeof options)[number]) => (
          <ListView.Item textValue={venue.name}>
            <TextValue>{venue.name}</TextValue>
            <Description>
              {venue.city} · {venue.capacity} seats
            </Description>
          </ListView.Item>
        )}
      </ListView>
      <Inline>
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
