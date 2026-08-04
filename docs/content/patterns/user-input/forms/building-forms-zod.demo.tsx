import { FormEventHandler, useState } from 'react';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import {
  Button,
  Checkbox,
  Columns,
  Panel,
  Select,
  Stack,
  TextField,
  Title,
} from '@marigold/components';

const schema = z.object({
  firstname: z.string().min(1, 'Please enter your firstname.'),
  name: z.string().min(1, 'Please enter your name.'),
  phone: z.string().min(6, 'Please enter a valid phone number.'),
  mail: z.string().email('Please enter a valid e-mail address.'),
  country: z.string().min(1, 'Please select a country.'),
  terms: zfd.checkbox().refine(v => v === true, 'You must agree to the terms.'),
});

type FieldName = keyof z.infer<typeof schema>;

export default () => {
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = schema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Partial<Record<FieldName, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as FieldName;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Panel size="form">
        <Panel.Header>
          <Title>Account Registration</Title>
        </Panel.Header>
        <Panel.Content>
          <Stack space={4}>
            <Columns columns={[2, 2]} space={4}>
              <TextField
                name="firstname"
                label="Firstname"
                description="Please enter your first name."
                placeholder="Firstname"
                error={!!errors.firstname}
                errorMessage={errors.firstname}
              />
              <TextField
                name="name"
                label="Name"
                description="Please enter your name."
                placeholder="Name"
                error={!!errors.name}
                errorMessage={errors.name}
              />
            </Columns>
            <TextField
              name="phone"
              label="Phone"
              type="tel"
              placeholder="Phone"
              description="Please enter your phone number."
              error={!!errors.phone}
              errorMessage={errors.phone}
            />
            <TextField
              name="mail"
              label="E-Mail"
              placeholder="E-Mail"
              description="Please enter your e-mail address."
              error={!!errors.mail}
              errorMessage={errors.mail}
            />
            <Select
              name="country"
              label="Country"
              placeholder="Select a country..."
              description="Please select your country."
              error={!!errors.country}
              errorMessage={errors.country}
            >
              <Select.Option key="germany">Germany</Select.Option>
              <Select.Option key="austria">Austria</Select.Option>
              <Select.Option key="switzerland">Switzerland</Select.Option>
            </Select>
            <Checkbox
              name="terms"
              label="Agree to the terms"
              error={!!errors.terms}
              description={errors.terms}
            />
          </Stack>
        </Panel.Content>
        <Panel.Footer>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Panel.Footer>
      </Panel>
    </form>
  );
};
