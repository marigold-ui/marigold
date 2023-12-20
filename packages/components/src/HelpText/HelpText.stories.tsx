import type { Meta, StoryObj } from '@storybook/react';
import { Form, TextField } from 'react-aria-components';

import { Button } from '../Button';
import { Input } from '../Input';
import { Label } from '../Label';
import { Stack } from '../Stack';
import { HelpText } from './HelpText';

const meta = {
  title: 'Components/HelpText',
  component: HelpText,
  argTypes: {
    description: {
      control: {
        type: 'text',
      },
      description: 'The description',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'This is a help text description' },
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'The error message',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Something went wrong' },
      },
    },
  },
  args: {
    errorMessage: 'Something went wrong',
    description: 'This is a help text description',
  },
} satisfies Meta<typeof HelpText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <HelpText {...args} />,
};

export const WithinAField: Story = {
  render: () => (
    <>
      <Form onSubmit={e => e.preventDefault()}>
        <Stack space={8} alignX="left">
          <TextField name="email" type="email" isRequired>
            <Label>Email</Label>
            <Input />
            <HelpText description="Please enter your email!" />
          </TextField>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <hr />
          <p>Note that the HelpText is not styled in this example!</p>
        </Stack>
      </Form>
    </>
  ),
};
