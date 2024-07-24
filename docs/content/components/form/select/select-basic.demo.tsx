import { useState } from 'react';

import { Select } from '@marigold/components';

export default () => {
  const [selected, setSelected] = useState<string | number>('');
  return (
    <>
      <Select label="Genre" placeholder="Select genre" onChange={setSelected}>
        <Select.Option id="pop">Pop</Select.Option>
        <Select.Option id="hiphop">Hip Hop</Select.Option>
        <Select.Option id="rock">Rock</Select.Option>
        <Select.Option id="schlager">Schlager</Select.Option>
        <Select.Option id="jazz">Jazz</Select.Option>
        <Select.Option id="dance">Dance</Select.Option>
      </Select>
      <hr />
      <pre>selected: {selected}</pre>
    </>
  );
};
