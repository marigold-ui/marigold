'use client';

import {
  Button,
  Form,
  Headline,
  Inline,
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

const EventForm = () => {
  const { addToast } = useToast();

  return (
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
      <Stack space="group">
        <Stack space="tight">
          <Headline level={2}>Create event</Headline>
          <Text>
            Fill in the details below to set up a new event. Required fields are
            marked with an asterisk.
          </Text>
        </Stack>
        <Stack space="group">
          <EventDetails />
          <LocationSettings />
          <OrganizerInfo />
          <CoOrganizers />
          <RegistrationSettings />
        </Stack>
        <Inline>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Inline>
      </Stack>
    </Form>
  );
};

const FormPage = () => (
  <Inset space={4}>
    <EventForm />
    <ToastProvider position="bottom-right" />
  </Inset>
);

export default FormPage;
