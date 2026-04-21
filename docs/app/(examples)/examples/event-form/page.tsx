'use client';

import {
  Button,
  Headline,
  Inline,
  Inset,
  Stack,
  Text,
} from '@marigold/components';
import { EventDetails } from './eventDetails';
import { LocationSettings } from './locationSettings';
import { OrganizerInfo } from './organizerInfo';
import { RegistrationSettings } from './registrationSettings';

const FormPage = () => (
  <Inset space={4}>
    <Stack space="section">
      <Stack space="tight">
        <Headline level={2}>Create event</Headline>
        <Text>
          Fill in the details below to set up a new event. Required fields are
          marked with an asterisk.
        </Text>
      </Stack>
      <div className="max-w-xl">
        <Stack space="group">
          <EventDetails />
          <LocationSettings />
          <OrganizerInfo />
          <RegistrationSettings />
        </Stack>
      </div>
      <Inline space="regular">
        <Button variant="primary">Save</Button>
        <Button variant="secondary">Cancel</Button>
      </Inline>
    </Stack>
  </Inset>
);

export default FormPage;
