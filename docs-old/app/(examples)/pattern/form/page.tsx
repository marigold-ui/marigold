'use client';

import { Button, Center, Form, Inline, Stack } from '@marigold/components';
import { EventDetails } from './eventDetails';
import { LocationSettings } from './locationSettings';
import { OrganizerInfo } from './organizerInfo';
import { RegistrationSettings } from './registrationSettings';

const FormPage = () => (
  <Center>
    <div className="w-container py-20">
      <Form>
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
  </Center>
);

export default FormPage;
