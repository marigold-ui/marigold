import { Key, useState } from 'react';
import { Autocomplete, Stack, Text } from '@marigold/components';

export const AutocompleteUncontrolledDemo = () => {
  const [submitted, setSubmitted] = useState<[Key | null, string | null]>([
    '',
    '',
  ]);

  return (
    <Stack space="medium">
      <Autocomplete
        label="Favorite vegetable:"
        onSubmit={(key, val) => setSubmitted([key, val])}
      >
        <Autocomplete.Item key="spinach">Spinach</Autocomplete.Item>
        <Autocomplete.Item key="carrots">Carrots</Autocomplete.Item>
        <Autocomplete.Item key="broccoli">Broccoli</Autocomplete.Item>
        <Autocomplete.Item key="garlic">Garlic</Autocomplete.Item>
        <Autocomplete.Item key="brussels-sprouts">
          Brussels Sprouts
        </Autocomplete.Item>
        <Autocomplete.Item key="kale">Kale</Autocomplete.Item>
        <Autocomplete.Item key="peas">Peas</Autocomplete.Item>
        <Autocomplete.Item key="beets">Beets</Autocomplete.Item>
      </Autocomplete>
      <Text fontWeight="900">User subbmitted: "{submitted}"</Text>
    </Stack>
  );
};
