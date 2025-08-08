import { Headline, NumberField, Stack, Text } from '@marigold/components';

export default () => (
  <Stack space={5}>
    <div>
      <Headline level={3}>Confirm Guests</Headline>
      <Text>Who’s going on your trip?</Text>
    </div>
    <NumberField
      defaultValue={3}
      minValue={0}
      maxValue={20}
      width="1/6"
      label="Adults"
    />
    <NumberField
      defaultValue={0}
      minValue={0}
      maxValue={20}
      width="1/6"
      label="Children"
    />
    <NumberField
      defaultValue={0}
      minValue={0}
      maxValue={20}
      width="1/6"
      label="Infants"
    />
  </Stack>
);
