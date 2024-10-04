import { useState } from 'react';
import { Checkbox } from '@marigold/components';

export default () => {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <>
      <Checkbox.Group
        label="Choose your event activities:"
        onChange={setSelected}
        description="Select the activities you'd like to participate in"
      >
        <Checkbox value="concerts">🎸 Concerts</Checkbox>
        <Checkbox value="meetups">🤝 Meetups</Checkbox>
        <Checkbox value="tours" disabled>
          🚌 Guided Tours
        </Checkbox>
        <Checkbox value="dining">🍽️ Dining Experiences</Checkbox>
        <Checkbox value="exhibitions">🖼️ Art Exhibitions</Checkbox>
        <Checkbox value="sports">⚽ Sports Events</Checkbox>
      </Checkbox.Group>
      <hr />
      <pre>Selected values: {selected.join(', ')}</pre>
    </>
  );
};
