'use client';

import { Button, Form, Inline, Inset, Stack } from '@marigold/components';
import { EventDetails } from '../../pattern/form/eventDetails';
import { LocationSettings } from '../../pattern/form/locationSettings';
import { OrganizerInfo } from '../../pattern/form/organizerInfo';
import { RegistrationSettings } from '../../pattern/form/registrationSettings';

const FormPage = () => (
  <Inset space={4}>
    <div className="mx-auto max-w-xl">
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
