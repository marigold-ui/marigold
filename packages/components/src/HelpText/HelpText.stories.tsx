import { Form, TextField } from 'react-aria-components';
import { useState } from 'storybook/preview-api';
import preview from '../../../../config/storybook/.storybook/preview';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Label } from '../Label/Label';
import { Stack } from '../Stack/Stack';
import { HelpText } from './HelpText';

const meta = preview.meta({
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
});

export const Basic = meta.story({
  render: args => <HelpText {...args} />,
});

export const WithinAField = meta.story({
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
});

export const MultipleMessages = meta.story({
  render: () => {
    const [password, setPassword] = useState('');
    const errors = [];

    if (password.length < 8) {
      errors.push('Password must be 8 characters or more.');
    }
    if ((password.match(/[A-Z]/g) ?? []).length < 2) {
      errors.push('Password must include at least 2 upper case letters.');
    }
    if ((password.match(/[^a-z]/gi) ?? []).length < 2) {
      errors.push('Password must include at least 2 symbols.');
    }

    return (
      <div className="w-96">
        <Stack space={8} alignX="left">
          <TextField
            isInvalid={errors.length > 0}
            value={password}
            onChange={setPassword}
          >
            <Label>Name</Label>
            <Input />
            <HelpText errorMessage={errors} />
          </TextField>
          <hr />
          <p>Note that the HelpText is not styled in this example!</p>
        </Stack>
      </div>
    );
  },
});
