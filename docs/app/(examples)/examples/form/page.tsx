'use client';

import { Button, Form, Inline, Inset, Stack } from '@marigold/components';
import { EventDetails } from './eventDetails';
import { LocationSettings } from './locationSettings';
import { OrganizerInfo } from './organizerInfo';
import { RegistrationSettings } from './registrationSettings';

const FormPage = () => (
  <Inset space={4}>
    <Form>
      <Stack space="section">
        <EventDetails />
        <LocationSettings />
        <OrganizerInfo />
        <RegistrationSettings />
        <Inline space="regular">
          <Button variant="primary">Save</Button>
          <Button variant="secondary">Cancel</Button>
        </Inline>
      </Stack>
    </Form>
  </Inset>
);

export default FormPage;
