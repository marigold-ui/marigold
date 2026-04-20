import { Key, useState } from 'react';
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
  const [value] = useState('');
  const [selected, setSelected] = useState<Key | null>(null);
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
            description="Please enter your phone number."
            type="tel"
          />
          <TextField
            label="E-Mail:"
            description="Please enter your E-Mail adress."
            placeholder="E-Mail"
            required
            disabled
            error={
              value.length > 0 && !/^\S+@\S+\.\S+$/.test(value) ? true : false
            }
            errorMessage="The field is required. Please enter a valid E-Mail adress."
          />
          <Select
            label="Country:"
            description="Please select your country."
            onChange={setSelected}
          >
            <Select.Option key={'none'}>Select an option...</Select.Option>
            <Select.Option key={'germany'}>Germany</Select.Option>
            <Select.Option key={'austria'}>Austria</Select.Option>
            <Select.Option key={'switzerland'}>Switzerland</Select.Option>
          </Select>
          {selected && selected !== 'none' && (
            <Checkbox label="Agree to the terms" />
          )}
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
