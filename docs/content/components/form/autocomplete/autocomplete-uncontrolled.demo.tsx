import { Key, useState } from 'react';

import { Autocomplete, Stack, Text } from '@marigold/components';

export default () => {
  const [submitted, setSubmitted] = useState<
    [Key | null, string | number | null]
  >(['', '']);

  return (
    <Stack space={5}>
      <Autocomplete
        label="Favorite vegetable:"
        onSubmit={(key, val) => setSubmitted([key, val])}
      >
        <Autocomplete.Item id="spinach">Spinach</Autocomplete.Item>
        <Autocomplete.Item id="carrots">Carrots</Autocomplete.Item>
        <Autocomplete.Item id="broccoli">Broccoli</Autocomplete.Item>
        <Autocomplete.Item id="garlic">Garlic</Autocomplete.Item>
        <Autocomplete.Item id="brussels-sprouts">
          Brussels Sprouts
        </Autocomplete.Item>
        <Autocomplete.Item id="kale">Kale</Autocomplete.Item>
        <Autocomplete.Item id="peas">Peas</Autocomplete.Item>
        <Autocomplete.Item id="beets">Beets</Autocomplete.Item>
      </Autocomplete>
      <Text weight="black">User subbmitted: "{submitted}"</Text>
    </Stack>
  );
};
