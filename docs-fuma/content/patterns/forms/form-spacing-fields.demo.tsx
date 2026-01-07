'use client';

import {
  Headline,
  Inline,
  Inset,
  NumberField,
  Select,
  Stack,
  TextField,
} from '@marigold/components';

export default () => (
  <Stack space="fieldY">
    <Headline level={2}>Personal Information</Headline>
    <TextField label="Name" description="Enter your full name" required />
    <TextField
      label="Email"
      description="Enter your email address"
      type="email"
      required
    />
    <NumberField label="Phone" hideStepper width={40} />
    <Inset spaceY="group">
      <Stack space="group">
        <TextField label="Street" />
        <Inline space="fieldX">
          <TextField label="Postcode" width={20} />
          <TextField label="City" width={40} />
        </Inline>
        <Select label="Country" placeholder="Select your country" width={'fit'}>
          <Select.Option id="us">United States</Select.Option>
          <Select.Option id="ca">Canada</Select.Option>
          <Select.Option id="uk">United Kingdom</Select.Option>
          <Select.Option id="de">Germany</Select.Option>
          <Select.Option id="fr">France</Select.Option>
          <Select.Option id="it">Italy</Select.Option>
          <Select.Option id="es">Spain</Select.Option>
          <Select.Option id="au">Australia</Select.Option>
          <Select.Option id="eg">Egypt</Select.Option>
          <Select.Option id="other">Other</Select.Option>
        </Select>
      </Stack>
    </Inset>
  </Stack>
);
