import { Accordion, TextField } from '@marigold/components';

export default function FormAccordion() {
  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header title="Personal Information" />
        <Accordion.Content>
          <TextField type="text" label="Name" />
          <TextField type="email" label="Email" />
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header title="Billing Details" />
        <Accordion.Content>
          <TextField type="text" label="Card Number" />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
