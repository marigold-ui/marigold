# Form Fields

_Comprehensive guide for working with form fields_

Form components are individual elements that make up a form, such as text fields, checkboxes, radio buttons, select fields, text areas and buttons. They allow user input, selection and actions.

Marigold has a set of form components that you can use to build your form.

- [Autocomplete](/components/form/autocomplete)
- [Button](/components/actions/button)
- [Calendar](/components/form/calendar)
- [Checkbox](/components/form/checkbox)
- [ComboBox](/components/form/combobox)
- [DateField](/components/form/datefield)
- [DatePicker](/components/form/datepicker)
- [Multiselect](/components/form/multiselect)
- [NumberField](/components/form/number-field)
- [Radio](/components/form/radio)
- [SearchField](/components/form/search-field)
- [Select](/components/form/select)
- [Slider](/components/form/slider)
- [Switch](/components/form/switch)
- [TextArea](/components/form/text-area)
- [TextField](/components/form/text-field)

## Anatomy

An accessible form field includes a clear label associated with its corresponding form control (`<input>`, `<select>`, ...). Additional guidance is provided by a help text, which can give additional context or instructions or display a descriptive messages.

Marigold's form components allow to set these properties like shown below. All form components allow to set a `label`, `description` and `errorMessages` besides some additional control-specific props.

## Usage

Form fields are essential for collecting user input, making selections, or triggering actions. They should be designed for clarity and accessibility to ensure a smooth user experience. Proper use of labels, help texts, and error messages ensures users understand each field's purpose and can interact with it correctly. Accessible form fields also improve usability for people using assistive technologies.

### Label

Labels are essential for accessibility and clarity, ensuring that each form field is clearly defined. In most cases, a label should be provided for each form control to describe the expected input. They are used when fields require specific instructions (e.g., name, email, or password should have a clear label).

However, labels might not be necessary when the purpose of the input is obvious from context. For example, in search bars, the purpose of the input is clear. In these cases, it is still important to provide an `aria-label` attribute to ensure that users with assistive technologies can understand the input's purpose, maintaining accessibility for all users.

✓ Do provide a clear, descriptive label for each form field

✗ Don’t make labels overly long or complex.

### Placeholder

Placeholder text is a short hint displayed inside an input field before
a user enters a value. To save space, placeholder text is often used instead of a label, as shown in the first
example.
This is problematic for the following reasons:

- Placeholder text disappears once a person starts filling in an input field, causing some to forget what the
  field
  was for
- Some might miss or skip fields with placeholder text, as it can look like the field has already been pre-filled.
- Placeholder text colour contrast is almost always inaccessible, as it’s very light by design. This means many
  will struggle to read the label.

✓ Provide a short description of what the user will be able to search for.

✗ Don’t use placeholder alone.

### Help text

Help Text should be used to provide additional clarification or instructions when the label alone isn't enough to explain the input (e.g., complex or uncommon fields). It’s helpful for explaining specific formats or validation rules. However, it shouldn't be used when the input is straightforward and the label is clear, as it can clutter the form and overwhelm the user with unnecessary details.

✗ Don’t use Help Text as a substitute for a label. It should complement the label, not replace it.

```tsx title="form-fields-helper-text"
import { TextField } from '@marigold/components';

export default () => {
  return (
    <TextField
      label="Promo Code"
      description="You can find the code on the back of your ticket."
      errorMessage="The promo code was already used."
    />
  );
};
```

### Field States

Form components often exist in various states to indicate how they should behave or be interacted with. These states provide important context for users and ensure proper handling of inputs in different senarios. Below are the common field states used in forms.

#### Disabled State

Disabled input fields are non-interactive and signal that they are temporarily unavailable. They are typically used when the input is irrelevant based on prior user choices or when a prerequisite action is required. To avoid confusion, it's important to provide clear context or messaging explaining why the field is disabled, ensuring users understand when and how the input will become available.

```tsx title="form-fields-disabled-state"
import { Stack, TextField } from '@marigold/components';

export default () => {
  return (
    <Stack space={2}>
      <TextField label="username" placeholder="enter user name" disabled />
    </Stack>
  );
};
```

#### Required State

Required fields must be completed before form submission.

```tsx title="form-fields-required-state"
import { Select } from '@marigold/components';

export default () => (
  <Select label="Genre" placeholder="Select genre" width="fit" required>
    <Select.Option id="pop">Pop</Select.Option>
    <Select.Option id="hiphop">Hip Hop</Select.Option>
    <Select.Option id="rock">Rock</Select.Option>
    <Select.Option id="schlager">Schlager</Select.Option>
    <Select.Option id="jazz">Jazz</Select.Option>
    <Select.Option id="dance">Dance</Select.Option>
  </Select>
);
```

#### Error State

Fields in an error state indicate that the entered value is invalid or incorrect. Error messages and visual feedback.

```tsx title="form-fields-error-state"
import { NumberField } from '@marigold/components';

export default () => {
  return (
    <NumberField
      label="Quantity"
      error
      errorMessage="Max number of available tickets is 3"
      value={4}
    />
  );
};
```

#### ReadOnly State

Read-only fields display data that users can view but not modify. They are commonly used for displaying information that is fixed or derived from other inputs. It's important to provide context or a clear explanation for why a field is read-only, so users understand its purpose and why it cannot be changed.

```tsx title="form-fields-readonly-state"
import { Headline, Stack, Switch } from '@marigold/components';

export default () => {
  return (
    <Stack space={2}>
      <Headline level={'5'}>ReadOnly State</Headline>
      <Switch label="Settings Locked" readOnly />
    </Stack>
  );
};
```

### Validation

Form validation is a crucial aspect of web development, ensuring that user input meets the required criteria before it is processed. Validation helps maintain data accuracy, consistency, and security by guiding users to correct any errors in their inputs.

HTML forms enable developers to collect and submit user input on web pages, and they include built-in validation mechanisms through attributes like `required` and input types such as `email` or `number`. These attributes allow browsers to provide immediate feedback when inputs are invalid, improving the user experience.

Marigold's components seamlessly integrate with HTML forms, offering a developer-friendly solution for input data validation. It supports native attributes like `required` and validation based on input types. Additionally, Marigold's form elements allow custom validation functions to extend the browser's validation capabilities.

#### Built-in / native form validation

The most straightforward way to validate user input is to use the built-in [constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation). Marigold's form components work seamlessly with this API, allowing you to set constraints for each field. The browser will check these constraints on blur (user leaves the field) or when the form is submitted.

Marigold's form components utilize the same API as native HTML forms. Yet, the browser won't display error messages; instead, they will be styled to seamlessly blend with the overall design.

Here is an email subscription form. If you submit it without entering an email address or if the entered email address is invalid, an error will be displayed:

```tsx title="validation-base"
import {
  Button,
  Form,
  Inset,
  Stack,
  Text,
  TextField,
} from '@marigold/components';

export default () => {
  return (
    <Form>
      <Inset space={8}>
        <Stack space={7} alignX="left">
          <Stack>
            <Text fontSize="4xl" weight="extrabold">
              Subscribe to our Newsletter!
            </Text>
            <Text>Stay updated with our latest news and updates.</Text>
          </Stack>

          <TextField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
          />
          <Button variant="primary" type="submit">
            Subscribe
          </Button>
        </Stack>
      </Inset>
    </Form>
  );
};
```

#### Custom message

While browser-provided error messages are helpful, they might not be very descriptive. In such instances, you have the flexibility to override them by using a function with the `errorMessages` prop of the field. This allows you to display custom error messages tailored to better describe the occured error.

The example below customizes the default error messages for an unfilled required field. It's important to note that you only need to override the messages you want to; any unmodified aspects will fallback to the browser-provided messages.

```tsx title="validation-custom-message"
import {
  Button,
  Form,
  Inset,
  Stack,
  Text,
  TextField,
} from '@marigold/components';

export default () => {
  return (
    <Form>
      <Inset space={8}>
        <Stack space={7} alignX="left">
          <Stack>
            <Text fontSize="4xl" weight="extrabold">
              Subscribe to our Newsletter!
            </Text>
            <Text>Stay updated with our latest news and updates.</Text>
          </Stack>

          <TextField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
            errorMessage={({ validationDetails }) =>
              validationDetails.valueMissing
                ? 'Please enter your email address!'
                : ''
            }
          />
          <Button variant="primary" type="submit">
            Subscribe
          </Button>
        </Stack>
      </Inset>
    </Form>
  );
};
```

#### Custom validation

When the native validation options are insufficient or not ideal, it's also possible to entirely override them and implement a custom validation method by using the `validate` prop of a field. Ensure that the prop is assigned a function that returns one or more error messages. If there are multiple error messages, they should be provided as a string array.

The below example demonstrates a more sophisticated method for validating email addresses. The validation will always display the custom error messages. There is no separate message if the field is left empty.

```tsx title="validation-custom-validation"
import {
  Button,
  Form,
  Inset,
  Stack,
  Text,
  TextField,
} from '@marigold/components';

export default () => {
  return (
    <Form>
      <Inset space={8}>
        <Stack space={7} alignX="left">
          <Stack>
            <Text fontSize="4xl" weight="extrabold">
              Subscribe to our Newsletter!
            </Text>
            <Text>Stay updated with our latest news and updates.</Text>
          </Stack>

          <TextField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
            validate={val =>
              val.length && /^\S+@\S+\.\S+$/.test(val)
                ? ''
                : 'Please enter a valid email address!'
            }
          />
          <Button variant="primary" type="submit">
            Subscribe
          </Button>
        </Stack>
      </Inset>
    </Form>
  );
};
```

#### Real-time Validation

By default, validation errors are shown to the user after the value is confirmed, for example, when they click away (on blur) or upon submitting the form. This prevents the user from being confused by irrelevant errors while they are still in the process of entering a value.

In specific situations though, choosing real-time validation proves beneficial, for example when enforcing certain password requirements. To enable real-time validation, [control the field](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components) and configure the `error` and `errorMessages` props accordingly.

Here's an example where real-time validation is employed to check password requirements, immediately informing the user when a criteria is met.

```tsx title="validation-realtime"
import { useState } from 'react';
import { TextField } from '@marigold/components';

export default () => {
  const [password, setPassword] = useState('');
  const errors = [];

  if (password.length < 8) {
    errors.push('Password must be 8 characters or more.');
  }
  if ((password.match(/[A-Z]/g) ?? []).length < 2) {
    errors.push('Password must include at least 2 upper case letters');
  }
  if ((password.match(/[^a-z]/gi) ?? []).length < 2) {
    errors.push('Password must include at least 2 symbols.');
  }

  return (
    <TextField
      label="Password"
      value={password}
      onChange={setPassword}
      error={errors.length > 0}
      errorMessage={errors}
    />
  );
};
```

#### Handling Server Errors

Server-side validation is essential alongside client-side validation to ensure robust and secure applications. While client-side validation offers immediate feedback and a smoother user experience, server-side validation is crucial for maintaining data integrity and security.

Marigold supports displaying server validation errors via the `validationErrors` prop on the `<Form>` component. The errors should be an object, where each field's `name`is mapped to a string or array of strings representing error messages. The errors are immediately shown to the user upon setting the `validationErrors` and are cleared when the user modifies the field's value.

The subscription example now involves sending and receiving the provided email to and from the server. While most email subscriptions will be successful, attempting to use `support@reservix.de` serves as a negative example, triggering an error response from the server.

```tsx title="validation-server-error"
import { ValidationError, post } from '@/lib/fetch';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from '@tanstack/react-query';
import type { FormEvent } from 'react';
import {
  Button,
  Form,
  Inline,
  Inset,
  Stack,
  Text,
  TextField,
} from '@marigold/components';
import { Check } from '@marigold/icons';

const SuccessMessage = () => (
  <Inline alignY="center" space={1}>
    <Check color="text-success" size="12" /> Successfully subscribed!
  </Inline>
);

const App = () => {
  /**
   * Server communication
   *
   * (We are using `@tanstack/react-query` in this example to interact
   * with a server. Regular form request via the `action` attribute work too!)
   */
  const mutation = useMutation<any, ValidationError, string>({
    mutationFn: (email: string) => post('/api/subscribe', { email }),
  });

  // Form handling
  const subscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = new FormData(e.currentTarget).get('email') as string;
    mutation.mutate(email);
  };

  // Show form errors from server
  const validationErrors = mutation.error ? mutation.error.cause : undefined;

  return (
    <Form onSubmit={subscribe} validationErrors={validationErrors}>
      <Inset space={8}>
        <Stack space={7} alignX="left">
          <Stack>
            <Text fontSize="4xl" weight="extrabold">
              Subscribe to our Newsletter!
            </Text>
            <Text>Stay updated with our latest news and updates.</Text>
          </Stack>

          <TextField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email address"
            description={mutation.isSuccess && <SuccessMessage />}
            required
          />
          <Button variant="primary" type="submit">
            Subscribe
          </Button>
        </Stack>
      </Inset>
    </Form>
  );
};

const queryClient = new QueryClient();

export default () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

## Related

- [Form implementation guide](../../patterns/form-implementation) - Learn how to build forms.

- [Forms](../../patterns/forms) - Here you can find a comprehensive guide for structuring forms.
