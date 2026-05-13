'use client';

import { Button, Form, Inline, Inset, Stack } from '@marigold/components';
import { EventDetails } from './eventDetails';
import { LocationSettings } from './locationSettings';
import { OrganizerInfo } from './organizerInfo';
import { RegistrationSettings } from './registrationSettings';

const FormPage = () => (
  <Inset space={4}>
    <div className="max-w-xl">
      <Form>
        <Stack space="group">
          <EventDetails />
          <LocationSettings />
          <Stack space={4}>
            <OrganizerInfo />
            <RegistrationSettings />
          </Stack>
          <Inline space="regular">
            <Button variant="primary">Save</Button>
            <Button variant="secondary">Cancel</Button>
          </Inline>
        </Stack>
      </Form>
    </div>
  </Inset>
);

export default FormPage;
