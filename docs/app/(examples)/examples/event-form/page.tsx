'use client';

import {
  Button,
  Form,
  Headline,
  Inset,
  Stack,
  Text,
  ToastProvider,
  useToast,
} from '@marigold/components';
import { CoOrganizers } from './coOrganizers';
import { EventDetails } from './eventDetails';
import { LocationSettings } from './locationSettings';
import { OrganizerInfo } from './organizerInfo';
import { RegistrationSettings } from './registrationSettings';

const FormPage = () => {
  const { addToast } = useToast();

  return (
    <Inset space={4}>
      <Form
        onSubmit={e => {
          e.preventDefault();
          addToast({
            title: 'Event saved',
            description: 'Your event has been created successfully.',
            variant: 'success',
            timeout: 5000,
          });
        }}
      >
        <Stack space="group" alignX="left">
          <Stack space="tight">
            <Headline level={2}>Create event</Headline>
            <Text>
              Fill in the details below to set up a new event. Required fields
              are marked with an asterisk.
            </Text>
          </Stack>
          <div className="max-w-xl">
            <Stack space="group">
              <EventDetails />
              <LocationSettings />
              <OrganizerInfo />
              <CoOrganizers />
              <RegistrationSettings />
            </Stack>
          </div>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Stack>
      </Form>
      <ToastProvider position="bottom-right" />
    </Inset>
  );
};

export default FormPage;
