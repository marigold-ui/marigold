import { useState } from 'react';
import { Tag } from '@marigold/components';

export default () => {
  const [selected, setSelected] = useState(new Set(['parking']));

  return (
    <>
      <Tag.Group
        label="Amenities"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected as any}
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
