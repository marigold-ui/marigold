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
        <ComboBox.Item key="red panda">Red Panda</ComboBox.Item>
        <ComboBox.Item key="cat">Cat</ComboBox.Item>
        <ComboBox.Item key="dog">Dog</ComboBox.Item>
        <ComboBox.Item key="aardvark">Aardvark</ComboBox.Item>
        <ComboBox.Item key="kangaroo">Kangaroo</ComboBox.Item>
      </ComboBox>
      <Text weight="black">currentValue: "{currentValue}"</Text>
    </Stack>
  );
};
