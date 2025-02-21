import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../Checkbox';
import { DateField } from '../DateField';
import { FieldGroup } from '../FieldBase';
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
