import {
  FieldBase,
  FieldGroup,
  Header,
  Headline,
  NumberField,
  Stack,
  Text,
} from '@marigold/components';

export default () => (
  <Stack space={5}>
    <Header>
      <Headline level={3}>Confirm Guests</Headline>
      <Text>Who’s going on your trip?</Text>
    </Header>
    <FieldGroup labelWidth="50px">
      <FieldBase label="Adults">
        <NumberField defaultValue={3} minValue={0} maxValue={20} width="1/6" />
      </FieldBase>
      <FieldBase label="Children">
        <NumberField defaultValue={0} minValue={0} maxValue={20} width="1/6" />
      </FieldBase>
      <FieldBase label="Infants">
        <NumberField defaultValue={0} minValue={0} maxValue={20} width="1/6" />
      </FieldBase>
    </FieldGroup>
  </Stack>
);
