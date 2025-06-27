import {
  Button,
  Checkbox,
  Columns,
  Headline,
  Select,
  Stack,
  TextField,
} from '@marigold/components';

export default () => (
  <>
    <Headline level={2}>Account Registration</Headline>
    <Stack space={4}>
      <Columns columns={[2, 2]} space={4}>
        <TextField
          label="Firstname:"
          required
          description="Please enter your first name."
          placeholder="Firstname"
        />
        <TextField
          label="Name:"
          required
          description="Please enter your name."
          placeholder="Name"
        />
      </Columns>
      <Stack space={4}>
        <TextField
          label="Phone:"
          required
          placeholder="Phone"
          type="tel"
          description="Please enter your phone number."
        />
        <TextField
          label="E-Mail:"
          description="Please enter your E-Mail adress."
          placeholder="E-Mail"
          required
        />
        <Select label="Country:" description="Please select your country.">
          <Select.Option key={'germany'}>Germany</Select.Option>
          <Select.Option key={'austria'}>Austria</Select.Option>
          <Select.Option key={'switzerland'}>Switzerland</Select.Option>
        </Select>
        <Checkbox label="Agree to the terms" />
      </Stack>
    </Stack>
    <Stack alignX="right">
      <Button variant="primary" size="small" type="submit">
        Submit
      </Button>
    </Stack>
  </>
);
