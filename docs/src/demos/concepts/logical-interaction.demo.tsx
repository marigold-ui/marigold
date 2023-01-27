import { useState } from 'react';
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

export const InteractionDemo = () => {
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState<string | number>('');
  console.log(setSelected, selected);
  return (
    <FieldGroup labelWidth="medium">
      <Headline level="2">Example Form</Headline>
      <Stack space="medium">
        <Columns columns={[2, 2]} space="medium">
          <TextField
            label="Firstname:"
            required
            description="Please enter your firstname"
            placeholder="Firstname"
            disabled
          />
          <TextField
            label="Name:"
            required
            description="Please enter your name"
            placeholder="Name"
            disabled
          />
        </Columns>
        <Stack space="medium">
          <TextField
            label="Phone:"
            required
            disabled
            placeholder="Phone"
            type="tel"
          />
          <TextField
            label="E-Mail:"
            description="Please enter your E-Mail adress"
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
            onSelectionChange={setSelected}
          >
            <Select.Option key={'none'}>Select an option...</Select.Option>
            <Select.Option key={'germany'}>Germany</Select.Option>
            <Select.Option key={'austria'}>Austria</Select.Option>
            <Select.Option key={'switzerland'}>Switzerland</Select.Option>
          </Select>
          {selected !== '' && selected !== 'none' && (
            <Checkbox>Agree to the terms</Checkbox>
          )}
        </Stack>
      </Stack>
      <Stack alignX="right">
        <Button variant="primary" size="small" type="submit" disabled>
          Submit
        </Button>
      </Stack>
    </FieldGroup>
  );
};
