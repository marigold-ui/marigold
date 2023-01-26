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

export const LayoutForms = () => (
  <FieldGroup labelWidth="medium">
    <Headline level="2">Example Form</Headline>
    <Stack space="medium">
      <Columns columns={[2, 2]} space="medium">
        <TextField
          label="Firstname:"
          required
          description="Please enter your firstname"
          placeholder="Firstname"
        />
        <TextField
          label="Name:"
          required
          description="Please enter your name"
          placeholder="Name"
        />
      </Columns>
      <Stack space="medium">
        <TextField label="Phone:" required placeholder="Phone" type="tel" />
        <TextField
          label="E-Mail:"
          description="Please enter your E-Mail adress"
          placeholder="E-Mail"
          required
        />
        <Select label="Country:" description="Please select your country.">
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
        <Checkbox>Agree to the terms</Checkbox>
      </Stack>
    </Stack>
    <Stack alignX="right">
      <Button variant="primary" size="small" type="submit">
        Submit
      </Button>
    </Stack>
  </FieldGroup>
);
