'use client';

import { Button, Inline, Stack } from '@marigold/components';
import { EventDetails } from './eventDetails';
import { LocationSettings } from './locationSettings';
import { OrganizerInfo } from './organizerInfo';
import { RegistrationSettings } from './registrationSettings';

const FormPage = () => (
  <div className="mx-auto w-[800px] py-12">
    <Stack space={14}>
      <EventDetails />
      <LocationSettings />
      <Stack space={4}>
        <OrganizerInfo />
        <RegistrationSettings />
      </Stack>

      <Inline space={4}>
        <Button variant="primary">Save</Button>
        <Button variant="secondary">Cancel</Button>
      </Inline>
    </Stack>
  </div>
);

export default FormPage;
