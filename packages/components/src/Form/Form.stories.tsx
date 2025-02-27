import { CalendarDate } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from '../Autocomplete';
import { Calendar } from '../Calendar';
import { Checkbox } from '../Checkbox';
import { Columns } from '../Columns';
import { ComboBox } from '../ComboBox';
import { DateField } from '../DateField';
import { DatePicker } from '../DatePicker';
import { FieldGroup } from '../FieldBase';
import { Radio } from '../Radio';
import { Scrollable } from '../Scrollable';
import { Select } from '../Select';
import { Stack } from '../Stack';
import { TextField } from '../TextField';
import { Form, FormProps } from './Form';

const meta = {
  title: 'Components/Form',
  component: Form,
} satisfies Meta<FormProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args, ctx) => {
    const isCore = ctx.globals.theme === 'core';

    return (
      <FieldGroup labelWidth={isCore ? '100px' : undefined}>
        <div className="grid h-full place-items-center">
          <Form {...args}>
            <Stack space={5}>
              <TextField label="Name" width={isCore ? 72 : 72} />
              <TextField label="Email" type="email" width={isCore ? 72 : 72} />
              <DateField label="Date of Birth" width={isCore ? 56 : 44} />
              <Select label="Department" width={isCore ? 60 : 40}>
                <Select.Option id="engineering">Engineering</Select.Option>
                <Select.Option id="design">Design</Select.Option>
                <Select.Option id="product">Product</Select.Option>
              </Select>
              <Checkbox>Subscribe to Employee Newsletter</Checkbox>
            </Stack>
          </Form>
        </div>
      </FieldGroup>
    );
  },
};

export const Selected: Story = {
  render: (args, ctx) => {
    const isCore = ctx.globals.theme === 'core';

    return (
      <FieldGroup labelWidth={isCore ? '100px' : undefined}>
        <Form {...args}>
          <Columns space={5} columns={[1, 1, 1]}>
            <Stack space={5}>
              <Checkbox checked>Subscribe to Employee Newsletter</Checkbox>
              <Radio.Group defaultValue="2" label="Radio Group">
                <Radio value="1">Option 1</Radio>
                <Radio value="2">Option 2</Radio>
              </Radio.Group>
              <Select
                label="Department"
                width={isCore ? 60 : 40}
                selectedKey={'engineering'}
              >
                <Select.Option id="engineering">Engineering</Select.Option>
                <Select.Option id="design">Design</Select.Option>
                <Select.Option id="product">Product</Select.Option>
              </Select>
            </Stack>
            <Stack space={5}>
              <ComboBox
                label="Department"
                width={isCore ? 60 : 40}
                selectedKey={'engineering'}
              >
                <ComboBox.Option id="engineering">Engineering</ComboBox.Option>
                <ComboBox.Option id="design">Design</ComboBox.Option>
                <ComboBox.Option id="product">Product</ComboBox.Option>
              </ComboBox>
              <Autocomplete
                label="Department"
                width={isCore ? 60 : 40}
                selectedKey={'engineering'}
              >
                <Autocomplete.Option id="engineering">
                  Engineering
                </Autocomplete.Option>
                <Autocomplete.Option id="design">Design</Autocomplete.Option>
                <Autocomplete.Option id="product">Product</Autocomplete.Option>
              </Autocomplete>
            </Stack>
            <Stack space={5}>
              <Calendar defaultValue={new CalendarDate(2025, 8, 16)} />
            </Stack>
          </Columns>
        </Form>
      </FieldGroup>
    );
  },
};
