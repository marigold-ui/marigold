import { useState } from 'react';
import type { Selection } from '@react-types/shared';
import { Tag } from '@marigold/components';

export default () => {
  const [selected, setSelected] = useState<Selection>(new Set(['parking']));

  return (
    <>
      <Tag.Group
        label="Amenities"
        selectionMode="multiple"
        selectedKeys={selected}
        onChange={setSelected}
      >
        <Tag id="laundry">Laundry</Tag>
        <Tag id="fitness">Fitness center</Tag>
        <Tag id="parking">Parking</Tag>
        <Tag id="pool">Swimming pool</Tag>
        <Tag id="breakfast">Breakfast</Tag>
      </Tag.Group>
      <p>Current selection (controlled): {[...selected].join(', ')}</p>
    </>
  );
};
