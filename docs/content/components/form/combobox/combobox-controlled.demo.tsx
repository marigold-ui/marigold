import { useState } from 'react';
import type { Key } from '@react-types/shared';
import { ComboBox, Stack, Text } from '@marigold/components';

export default () => {
  const [value, setValue] = useState<Key | null>('cat');
  const [inputValue, setInputValue] = useState('Cat');
  return (
    <Stack>
      <ComboBox
        value={value}
        onChange={setValue}
        onInputChange={setInputValue}
        label="Animals"
      >
        <ComboBox.Option id="red panda">Red Panda</ComboBox.Option>
        <ComboBox.Option id="cat">Cat</ComboBox.Option>
        <ComboBox.Option id="dog">Dog</ComboBox.Option>
        <ComboBox.Option id="aardvark">Aardvark</ComboBox.Option>
        <ComboBox.Option id="kangaroo">Kangaroo</ComboBox.Option>
      </ComboBox>
      <Text weight="black">value: "{value}"</Text>
      <Text weight="black">inputValue: "{inputValue}"</Text>
    </Stack>
  );
};
