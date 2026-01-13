'use client';

import { useState } from 'react';
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
  const [value, setValue] = useState('');
  return (
    <>
      <Headline level={2}>Account Registration</Headline>
      <Stack space={4}>
        <Columns columns={[2, 2]} space={4}>
          <TextField
            label="Firstname:"
            required
            description="Please enter your first name."
            placeholder="Firstname"
            disabled
          />
          <TextField
            label="Name:"
            required
            description="Please enter your name."
            placeholder="Name"
            disabled
          />
        </Columns>
        <Stack space={4}>
          <TextField
            label="Phone:"
            required
            disabled
            placeholder="Phone"
            type="tel"
            description="Please enter your phone number."
          />
          <TextField
            label="E-Mail:"
            description="Please enter your E-Mail adress."
            placeholder="E-Mail"
            required
            onChange={e => setValue(e)}
            error={
              value.length > 0 && !/^\S+@\S+\.\S+$/.test(value) ? true : false
            }
            errorMessage="The field is required. Please enter a valid E-Mail adress."
          />
          <Select
            label="Country:"
            disabled
            description="Please select your country."
          >
            <Select.Option key={'germany'} textValue={'germany'}>
              Germany
            </Select.Option>
            <Select.Option key={'austria'} textValue={'austria'}>
              Austria
            </Select.Option>
            <Select.Option key={'switzerland'} textValue={'switzerland'}>
              Switzerland
            </Select.Option>
          </Select>
          <Checkbox label="Agree to the terms" disabled />
        </Stack>
      </Stack>
      <Stack alignX="right">
        <Button variant="primary" size="small" type="submit" disabled>
          Submit
        </Button>
      </Stack>
    </>
  );
};
