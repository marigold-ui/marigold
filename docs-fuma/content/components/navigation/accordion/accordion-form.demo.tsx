'use client';

import { Accordion, TextField } from '@marigold/components';

export default function FormAccordion() {
  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header>Personal Information</Accordion.Header>
        <Accordion.Content>
          <TextField type="text" label="Name" />
          <TextField type="email" label="Email" />
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>Billing Details</Accordion.Header>
        <Accordion.Content>
          <TextField type="text" label="Card Number" />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
