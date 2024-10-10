import { Headline, NumberField, Stack } from '@marigold/components';

<Stack space={2}>
  <Headline level={'5'}>Error State</Headline>
  <NumberField
    label="Quantity"
    error
    errorMessage="Max number of available tickets is 3"
    value={4}
  />
</Stack>;
