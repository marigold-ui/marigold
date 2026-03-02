import { useState } from 'react';
import { Key } from '@react-types/shared';
import { TagField } from '@marigold/components';

export default () => {
  const [selected, setSelected] = useState<Key[]>([]);

  return (
    <TagField
      label="Genres"
      value={selected}
      onChange={setSelected}
      disabledKeys={['classical', 'electronic']}
      width={80}
    >
      <TagField.Option id="rock">Rock</TagField.Option>
      <TagField.Option id="jazz">Jazz</TagField.Option>
      <TagField.Option id="pop">Pop</TagField.Option>
      <TagField.Option id="classical">Classical</TagField.Option>
      <TagField.Option id="electronic">Electronic</TagField.Option>
    </TagField>
  );
};
