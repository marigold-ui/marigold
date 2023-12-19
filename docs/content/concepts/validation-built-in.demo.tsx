import {
  Columns,
  Headline,
  Inline,
  Stack,
  Text,
  TextField,
} from '@marigold/components';

export default () => {
  return (
    <Stack space={7}>
      <Stack>
        <Headline level="2">Shipping Information</Headline>
        <Text>Please fill out the details for shipping.</Text>
      </Stack>
      <Columns columns={[1, 1]} space={4}>
        <TextField
          name="first_name"
          label="First Name"
          autoComplete="given-name"
        />
        <TextField
          name="lanst_name"
          label="Last Name"
          autoComplete="family-name"
        />
      </Columns>
      <TextField
        name="street_address"
        label="Street Address"
        autoComplete="street-address"
        description="The address should include house number or similiar."
      />
      <Columns columns={[1, 3]} space={4}>
        <TextField
          name="postal_code"
          label="Postacl Code"
          autoComplete="postal-code"
        />
        <TextField name="city" label="City" autoComplete="address-level2" />
      </Columns>
      <Inline space={4}>
        <TextField
          name="postal_code"
          label="Postacl Code"
          autoComplete="postal-code"
          width="2/5"
        />
        <TextField
          name="city"
          label="City"
          autoComplete="address-level2"
          width="full"
        />
      </Inline>
      <TextField name="country" label="Country" />
    </Stack>
  );
};
