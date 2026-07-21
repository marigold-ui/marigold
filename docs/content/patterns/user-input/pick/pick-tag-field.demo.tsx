import { useState } from 'react';
import type { Key } from '@react-types/shared';
import { Stack, TagField, Text } from '@marigold/components';

const performers = [
  { id: 'aurora-glass', name: 'Aurora Glass' },
  { id: 'neon-harbor', name: 'Neon Harbor' },
  { id: 'velvet-static', name: 'Velvet Static' },
  { id: 'midnight-cartography', name: 'Midnight Cartography' },
  { id: 'saltwater-choir', name: 'Saltwater Choir' },
  { id: 'brass-district', name: 'Brass District' },
  { id: 'echo-and-ivory', name: 'Echo & Ivory' },
  { id: 'the-lantern-club', name: 'The Lantern Club' },
  { id: 'northern-signal', name: 'Northern Signal' },
  { id: 'coral-transit', name: 'Coral Transit' },
  { id: 'wildflower-radio', name: 'Wildflower Radio' },
  { id: 'granite-youth', name: 'Granite Youth' },
  { id: 'the-tidal-order', name: 'The Tidal Order' },
  { id: 'paper-lantern-parade', name: 'Paper Lantern Parade' },
];

export default () => {
  // The selection is the committed set: the tags update live, so this tier
  // needs no explicit commit step the way the dialog does.
  const [lineup, setLineup] = useState<Key[]>([]);

  const chosen = performers
    .filter(performer => lineup.includes(performer.id))
    .map(performer => performer.name);

  return (
    <Stack space={4} alignX="left">
      <TagField
        label="Line-up"
        description="Search the roster and add performers to this event."
        placeholder="Search performers..."
        items={performers}
        value={lineup}
        onChange={setLineup}
        width={80}
      >
        {performer => (
          <TagField.Option id={performer.id}>{performer.name}</TagField.Option>
        )}
      </TagField>
      <Text>
        {chosen.length === 0
          ? 'No performers added yet.'
          : `Line-up (${chosen.length}): ${chosen.join(', ')}`}
      </Text>
    </Stack>
  );
};
