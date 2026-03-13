import { useState } from 'react';
import { ComboBox, Stack, Text } from '@marigold/components';

export default () => {
  const [currentValue, setCurrentValue] = useState<string | undefined>();
  return (
    <Stack>
      <ComboBox
        value={currentValue}
        onChange={setCurrentValue}
        defaultSelectedKey={3}
        label="Animals"
      >
        <ComboBox.Option id="red panda">Red Panda</ComboBox.Option>
        <ComboBox.Option id="cat">Cat</ComboBox.Option>
        <ComboBox.Option id="dog">Dog</ComboBox.Option>
        <ComboBox.Option id="aardvark">Aardvark</ComboBox.Option>
        <ComboBox.Option id="kangaroo">Kangaroo</ComboBox.Option>
      </ComboBox>
      <Text weight="black">currentValue: "{currentValue}"</Text>
    </Stack>
  );
};
