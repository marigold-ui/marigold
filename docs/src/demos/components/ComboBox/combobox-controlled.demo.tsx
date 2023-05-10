import { ComboBox, Stack, Text } from '@marigold/components';
import { useState } from 'react';

export const ControlledComboBox = () => {
  const [currentValue, setCurrentValue] = useState<string | undefined>();
  return (
    <Stack>
      <ComboBox
        value={currentValue}
        onChange={setCurrentValue}
        defaultSelectedKey={3}
        label="Animals"
      >
        <ComboBox.Item key="red panda">Red Panda</ComboBox.Item>
        <ComboBox.Item key="cat">Cat</ComboBox.Item>
        <ComboBox.Item key="dog">Dog</ComboBox.Item>
        <ComboBox.Item key="aardvark">Aardvark</ComboBox.Item>
        <ComboBox.Item key="kangaroo">Kangaroo</ComboBox.Item>
      </ComboBox>
      <Text fontWeight="900">currentValue: "{currentValue}"</Text>
    </Stack>
  );
};
