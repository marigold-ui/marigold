'use client';

import { FormEventHandler, useState } from 'react';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import {
  Button,
  Checkbox,
  Columns,
  Headline,
  Select,
  Stack,
  TextField,
} from '@marigold/components';

export default () => {
  const schemaData = z.object({
    firstname: z.string().min(1),
    name: z.string().min(1),
    phone: z.string().min(6),
    mail: z.string().email(),
    country: z.string(),
    terms: zfd.checkbox(),
  });

  const [error, setError] = useState<string[]>([]);
  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const errorList: Array<any> = [];
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    const validatedForm = schemaData.safeParse(data);

    if (!validatedForm.success) {
      validatedForm.error.issues.map(e => {
        return errorList.push(e.path.toString());
      });
      setError(errorList);
    } else {
      alert(JSON.stringify(data));
    }
  };

  return (
    <>
      <Headline level={2}>Account Registration</Headline>
      <form onSubmit={handleSubmit}>
        <Stack space={4}>
          <Columns columns={[2, 2]} space={4}>
            <TextField
              name="firstname"
              label="Firstname:"
              required
              description="Please enter your first name."
              placeholder="Firstname"
              error={error.includes('firstname')}
              errorMessage="The field is required. Please enter your firstname."
            />
            <TextField
              name="name"
              label="Name:"
              required
              description="Please enter your name."
              placeholder="Name"
              error={error.includes('name')}
              errorMessage="The field is required. Please enter your name."
            />
          </Columns>
          <Stack space={4}>
            <TextField
              name="phone"
              label="Phone:"
              required
              placeholder="Phone"
              type="tel"
              description="Please enter your phone number."
              error={error.includes('phone')}
              errorMessage="The field is required. Please enter a valid phone number."
            />
            <TextField
              label="E-Mail:"
              description="Please enter your E-Mail adress"
              placeholder="E-Mail"
              name="mail"
              required
              error={error.includes('mail')}
              errorMessage="The field is required. Please enter a valid E-Mail adress."
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
            <Checkbox label="Agree to the terms" name="terms" />
          </Stack>
        </Stack>
        <Stack alignX="right">
          <Button variant="primary" size="small" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
};
