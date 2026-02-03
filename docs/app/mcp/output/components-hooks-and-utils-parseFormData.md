# parseFormData

_Parse form data into objects_

The `parseFormData` utility streamlines the handling of HTML form submissions by converting `FormData` into a plain JavaScript object.

It creates a plain object by mapping each form field's name to its corresponding value. This approach is especially useful when working with uncontrolled components, as it allows you to bypass managing state for each individual input. Instead of tracking every field, you can efficiently gather all the form's values into a single object upon submission, making the data easy to process or send to an API.

## Usage

The `parseFormData` utility is designed to convert all the data from an HTML form into a simple JavaScript object. The ideal place to use this function is directly within the `onSubmit` event handler of your `<Form>` element.

When a user clicks the submit button, the `onSubmit` event captures the state of all form fields at that exact moment. By creating a `new FormData(event.currentTarget)` and passing it to `parseFormData`, you get a single object containing a complete snapshot of the user's input, which is perfect for immediate validation or for sending to an API.

```tsx title="parseFormData-basic"
import type { FormEvent } from 'react';
import { useState } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Stack,
  Text,
  TextField,
  parseFormData,
} from '@marigold/components';

export default () => {
  const [data, setData] = useState<any>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData(parseFormData(e));
  };

  return (
    <Stack space={8} alignX="left">
      <Form onSubmit={handleSubmit}>
        <Stack space={4} alignX="left">
          <TextField label="Username" name="username" />
          <Checkbox label="Remember me" name="remember" />
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Stack>
      </Form>
      <Stack space={1}>
        <Text weight="medium">Submitted data:</Text>
        <pre className="text-sm">
          <code>{JSON.stringify(data ?? {}, null, 2)}</code>
        </pre>
      </Stack>
    </Stack>
  );
};
```

### Handling Multiple Values

HTML forms can produce multiple values for a single field name, most commonly with a group of checkboxes or a [multiselect element](/patterns/multiple-selection). For example, if a user checks three boxes all named "interests", the `FormData` object will contain three separate entries for "interests".

`parseFormData` automatically handles this scenario. It checks if any field name has more than one value associated with it. If it does, the utility will create an array containing all of those values under a single key in the final object. If a field name has only one value, it will be stored as a single string or file object. This ensures the output is always predictable and easy to work with.

```tsx title="parseFormData-multiple"
import type { FormEvent } from 'react';
import { useState } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Stack,
  Text,
  parseFormData,
} from '@marigold/components';

export default () => {
  const [data, setData] = useState<any>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData(parseFormData(e));
  };

  return (
    <Stack space={8} alignX="left">
      <Form onSubmit={handleSubmit}>
        <Stack space={4} alignX="left">
          <Checkbox.Group name="eventTypes" label="Select Event Types">
            <Checkbox value="concert" label="Concert" />
            <Checkbox value="festival" label="Festival" />
            <Checkbox value="conference" label="Conference" />
            <Checkbox value="meetup" label="Meetup" />
            <Checkbox value="webinar" label="Webinar" />
          </Checkbox.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Stack>
      </Form>
      <Stack space={1}>
        <Text weight="medium">Submitted data:</Text>
        <pre className="text-sm">
          <code>{JSON.stringify(data ?? {}, null, 2)}</code>
        </pre>
      </Stack>
    </Stack>
  );
};
```
