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
        <ComboBox.Item id="red panda">Red Panda</ComboBox.Item>
        <ComboBox.Item id="cat">Cat</ComboBox.Item>
        <ComboBox.Item id="dog">Dog</ComboBox.Item>
        <ComboBox.Item id="aardvark">Aardvark</ComboBox.Item>
        <ComboBox.Item id="kangaroo">Kangaroo</ComboBox.Item>
      </ComboBox>
      <Text weight="black">currentValue: "{currentValue}"</Text>
    </Stack>
  );
};
