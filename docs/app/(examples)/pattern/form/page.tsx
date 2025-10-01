'use client';

import { Button, Form, Inline, Stack } from '@marigold/components';
import { EventDetails } from './eventDetails';
import { LocationSettings } from './locationSettings';
import { OrganizerInfo } from './organizerInfo';
import { RegistrationSettings } from './registrationSettings';

const FormPage = () => (
  <div className="flex justify-center py-20">
    <Form maxWidth="container">
      <Stack space="section">
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
    </Form>
  </div>
);

export default FormPage;
