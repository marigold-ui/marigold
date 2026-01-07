'use client';

import { useState } from 'react';
import { Autocomplete, Stack, Text } from '@marigold/components';

export default () => {
  const [submitted, setSubmitted] = useState<
    [string | number | null, string | number | null]
  >(['', '']);

  return (
    <Stack space={5}>
      <Autocomplete
        label="Favorite vegetable:"
        onSubmit={(id, val) => setSubmitted([id, val])}
      >
        <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
        <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
        <Autocomplete.Option id="broccoli">Broccoli</Autocomplete.Option>
        <Autocomplete.Option id="garlic">Garlic</Autocomplete.Option>
        <Autocomplete.Option id="brussels-sprouts">
          Brussels Sprouts
        </Autocomplete.Option>
        <Autocomplete.Option id="kale">Kale</Autocomplete.Option>
        <Autocomplete.Option id="peas">Peas</Autocomplete.Option>
        <Autocomplete.Option id="beets">Beets</Autocomplete.Option>
      </Autocomplete>
      <Text weight="black">User subbmitted: "{submitted}"</Text>
    </Stack>
  );
};
