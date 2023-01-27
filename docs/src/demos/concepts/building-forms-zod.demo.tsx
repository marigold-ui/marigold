import { FormEventHandler, useState } from 'react';
import { z } from 'zod';
import {
  Button,
  Checkbox,
  Columns,
  FieldGroup,
  Headline,
  Select,
  Stack,
  TextField,
} from '@marigold/components';

const schema = z.object({
  firstname: z.string(),
  name: z.string(),
  phone: z.string().min(6),
  mail: z.string().email(),
  country: z.string(),
  terms: z.boolean(),
});

export const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData);
  try {
    const validatedForm = schema.parse(data);
    console.log(validatedForm);
  } catch (err) {
    console.log(err);
  }
  console.log(data);
};

export const SubmitForm = () => {
  return (
    <FieldGroup labelWidth="medium">
      <Headline level="2">Example Form</Headline>
      <form onSubmit={handleSubmit}>
        <Stack space="medium">
          <Columns columns={[2, 2]} space="medium">
            <TextField
              name="firstname"
              label="Firstname:"
              required
              description="Please enter your firstname"
              placeholder="Firstname"
            />
            <TextField
              name="name"
              label="Name:"
              required
              description="Please enter your name"
              placeholder="Name"
            />
          </Columns>
          <Stack space="medium">
            <TextField
              name="phone"
              label="Phone:"
              required
              placeholder="Phone"
              type="tel"
            />
            <TextField
              label="E-Mail:"
              description="Please enter your E-Mail adress"
              placeholder="E-Mail"
              name="mail"
              required
            />
            <Select
              name="country"
              label="Country:"
              description="Please select your country."
            >
              <Select.Option key={'none'}>Select an option...</Select.Option>
              <Select.Option key={'germany'}>Germany</Select.Option>
              <Select.Option key={'austria'}>Austria</Select.Option>
              <Select.Option key={'switzerland'}>Switzerland</Select.Option>
            </Select>
            <Checkbox name="terms">Agree to the terms</Checkbox>
          </Stack>
        </Stack>
        <Stack alignX="right">
          <Button variant="primary" size="small" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </FieldGroup>
  );
};
