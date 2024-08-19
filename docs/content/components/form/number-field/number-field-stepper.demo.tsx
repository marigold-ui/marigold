import {
  Header,
  Headline,
  NumberField,
  Stack,
  Text,
} from '@marigold/components';

export default () => (
  <Stack space={5} alignX="center">
    <Header>
      <Headline level={3}>Confirm Guests</Headline>
      <Text>Who’s going on your trip?</Text>
    </Header>
    <NumberField
      label="Adults"
      defaultValue={3}
      minValue={0}
      maxValue={20}
      width="fit"
    />
    <NumberField
      label="Children"
      defaultValue={0}
      minValue={0}
      maxValue={20}
      width="fit"
    />
    <NumberField
      label="Infants"
      defaultValue={0}
      minValue={0}
      maxValue={20}
      width="fit"
    />
  </Stack>
);
