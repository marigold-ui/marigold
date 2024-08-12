import { coreTheme } from '@/theme';
import { MarigoldProvider } from '@/ui';
import {
  Checkbox,
  CheckboxGroup,
  FieldBase,
  FieldGroup,
  Input,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@marigold/components';

export default () => (
  <MarigoldProvider theme={coreTheme}>
    <FieldGroup labelWidth="150px">
      <FieldBase label="First Name">
        <Input />
      </FieldBase>
      <FieldBase label="Last Name">
        <input type="text" />
      </FieldBase>
      <TextField type="email" label="Email" />
      <TextField
        type="tel"
        label="Phone Number"
        description="Please enter your phone number"
      />
      <Select label="Country">
        <Select.Option key="usa">USA</Select.Option>
        <Select.Option key="canada">Canada</Select.Option>
      </Select>
      <RadioGroup label="Preferred Language">
        <Radio value="english">English</Radio>
        <Radio value="spanish">Spanish</Radio>
      </RadioGroup>
      <CheckboxGroup label="Hobbies">
        <Checkbox value="reading">Reading</Checkbox>
        <Checkbox value="painting">Painting</Checkbox>
      </CheckboxGroup>
    </FieldGroup>
  </MarigoldProvider>
);
