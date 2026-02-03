# Form Implementation

_This page should introduce you on how to develop form logic with Marigold._

This guide provides comprehensive instructions for implementing form functionality with Marigold components. Beyond basic form structure and design patterns, building effective forms requires understanding state management, validation, error handling, and user interaction patterns.

Whether you're creating simple contact forms or complex multi-step data collection interfaces, this guide covers the technical implementation details you need. You'll learn how to choose between controlled and uncontrolled components, implement real-time validation, handle form submissions, and integrate with popular form libraries like React Hook Form and validation schemas with Zod.

The examples and patterns shown here complement the design guidelines found in our [Forms](/patterns/forms) documentation, focusing specifically on the development aspects of creating robust, user-friendly forms with Marigold's component library.

## Controlled or uncontrolled Components?

In React, there are two main types of form components: controlled and uncontrolled.
Controlled components are controlled via React state (e.g. `useState`). Any changes to the value will update the state variable. This happens when the user interacts with a component and an event handler is called, `onChange` for example.
Uncontrolled components don't use any state to update. You can use props like `defaultValue` or `defaultChecked` to set their initial value.

When the state or props change, React will automatically re-render the component with its new data. This is called [data-binding](https://www.joshwcomeau.com/react/data-binding/). Components recive data from its parents component and update their output in response to changes in that data by using state and props, this allows to have a dynamic and reactive user interface.

## Interactive forms

Interactive forms can have several features like error handling, [validation](/foundations/validation), real-time feedback (password-strength indicator), logic (hide fields if a several field is checked etc.) or autocomplete.
All these features help to make interactive fields more user friendly and more efficient.

### Error Handling

Marigold's form components comes with the `error` prop. You can use it to show or hide the error message (`errorMessage`). If no error is present the field will display a help text (`description`), if given, instead.

In this example below you can have an example on how to check if the E-Mail adress is correctly filled.
Try out and type something!

```tsx title="error-handling"
import { useState } from 'react';
import {
  Button,
  Checkbox,
  Columns,
  Headline,
  Select,
  Stack,
  TextField,
} from '@marigold/components';

export default () => {
  const [value, setValue] = useState('');
  return (
    <>
      <Headline level={2}>Account Registration</Headline>
      <Stack space={4}>
        <Columns columns={[2, 2]} space={4}>
          <TextField
            label="Firstname:"
            required
            description="Please enter your first name."
            placeholder="Firstname"
            disabled
          />
          <TextField
            label="Name:"
            required
            description="Please enter your name."
            placeholder="Name"
            disabled
          />
        </Columns>
        <Stack space={4}>
          <TextField
            label="Phone:"
            required
            disabled
            placeholder="Phone"
            type="tel"
            description="Please enter your phone number."
          />
          <TextField
            label="E-Mail:"
            description="Please enter your E-Mail adress."
            placeholder="E-Mail"
            required
            onChange={e => setValue(e)}
            error={
              value.length > 0 && !/^\S+@\S+\.\S+$/.test(value) ? true : false
            }
            errorMessage="The field is required. Please enter a valid E-Mail adress."
          />
          <Select
            label="Country:"
            disabled
            description="Please select your country."
          >
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
          <Checkbox label="Agree to the terms" disabled />
        </Stack>
      </Stack>
      <Stack alignX="right">
        <Button variant="primary" size="small" type="submit" disabled>
          Submit
        </Button>
      </Stack>
    </>
  );
};
```

### Logical Interaction

You can have interactive forms which contains logical aspects. In this example you can interact with the `<Select>` and a new component `<Checkbox>` will appear. You can try out and switch the value of the select field.

```tsx title="logical-interaction"
import { Key, useState } from 'react';
import {
  Button,
  Checkbox,
  Columns,
  Headline,
  Select,
  Stack,
  TextField,
} from '@marigold/components';

export default () => {
  const [value] = useState('');
  const [selected, setSelected] = useState<Key | null>(null);
  return (
    <>
      <Headline level={2}>Account Registration</Headline>
      <Stack space={4}>
        <Columns columns={[2, 2]} space={4}>
          <TextField
            label="Firstname:"
            required
            description="Please enter your first name."
            placeholder="Firstname"
            disabled
          />
          <TextField
            label="Name:"
            required
            description="Please enter your name."
            placeholder="Name"
            disabled
          />
        </Columns>
        <Stack space={4}>
          <TextField
            label="Phone:"
            required
            disabled
            placeholder="Phone"
            description="Please enter your phone number."
            type="tel"
          />
          <TextField
            label="E-Mail:"
            description="Please enter your E-Mail adress."
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
            onChange={setSelected}
          >
            <Select.Option key={'none'}>Select an option...</Select.Option>
            <Select.Option key={'germany'}>Germany</Select.Option>
            <Select.Option key={'austria'}>Austria</Select.Option>
            <Select.Option key={'switzerland'}>Switzerland</Select.Option>
          </Select>
          {selected && selected !== 'none' && (
            <Checkbox label="Agree to the terms" />
          )}
        </Stack>
      </Stack>
      <Stack alignX="right">
        <Button variant="primary" size="small" type="submit" disabled>
          Submit
        </Button>
      </Stack>
    </>
  );
};
```

## Forms and submitting Data

In HTML, forms are build using the `<form>` element, which wraps a set of input fields to gather and submit user data. By default, HTML forms trigger a full-page refresh upon submission. To gain control over the process, you can use preventDefault during the onSubmit event, enabling you to make a custom API call to submit the data according to your preferences.

The simplest way to get data from a form is using the browser's [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) API during the `onSubmit` event. This can be passed directly to `fetch`, or converted into a regular JavaScript object using `Object.fromEntries`.

> ℹ️ Names are important!: Make sure to include the name attribute in each field, as it uniquely
> identifies each form element, facilitating server-side processing and
> ensuring a key-value pair for data submission.

Below is a basic example of extracting data from an [uncontrolled](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components) form. Submitting a promo code won't trigger a regular form submission; instead, it will display the provided data.

```tsx title="building-forms-submit"
import { useActionState } from 'react';
import { Button, Form, Stack, TextField } from '@marigold/components';

type FormState = {
  promoCode: FormDataEntryValue | null;
};

const INITIAL_STATE: FormState = {
  promoCode: null,
};

export default () => {
  const [state, formAction] = useActionState<FormState, FormData>(
    (_previousState: FormState, formData: FormData) => {
      // Access form data by form field name
      return { promoCode: formData.get('promocode') };
    },
    INITIAL_STATE
  );

  return (
    <Stack space={4}>
      <Form action={formAction}>
        <Stack space={1} alignX="left">
          <TextField label="Promo Code" name="promocode" width={44} />
          <Button variant="primary" size="small" type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
      {state && (
        <pre>
          <code>{JSON.stringify(state, null, 2)}</code>
        </pre>
      )}
    </Stack>
  );
};
```

## Handling complex forms and form state

You can simplify form handling in your React components and avoid repetitive tasks such as manually updating the form state, validating user inputs, and handling form submissions.
We decided to use `react-form-hook` for this because its reducing re-renders caused by state updates, you don't have much to configure and supports integrating UI libraries.
For the later we use the `<Controller>` component from `react-hook-form`, which must be wrapped around each Marigold component that should submits data.

In the formular we have used `<TextField>`, `<Select>` and `<Checkbox>` components. These components are wrapped around with the `<Controller>` component from `react-hook-form`. The `<Controller>` component acts as a bridge between the form element and the `react-hook-form` state management. It updates the `react-hook-form` state whenever the value of the form element changes.

```tsx title="building-forms-hook-form"
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  Checkbox,
  Columns,
  Headline,
  Select,
  Stack,
  TextField,
} from '@marigold/components';

interface IFormInputs {
  firstName: string;
  name: string;
  phone: string;
  mail: string;
  country: string | number;
  terms: boolean;
}
export default () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      name: '',
      phone: '',
      mail: '',
      country: '',
      terms: false,
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <Headline level={2}>Account Registration</Headline>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack space={4}>
          <Columns columns={[2, 2]} space={4}>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Firstname:"
                  required
                  description="Please enter your first name."
                  placeholder="Firstname"
                  error={field.value.length < 0 ? true : false}
                  errorMessage="The field is required. Please enter your firstname."
                />
              )}
            />
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name:"
                  required
                  description="Please enter your name."
                  placeholder="Name"
                  error={field.value.length < 0 ? true : false}
                  errorMessage="The field is required. Please enter your name."
                />
              )}
            />
          </Columns>
          <Stack space={4}>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: true,
                min: 6,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone:"
                  required
                  placeholder="Phone"
                  type="tel"
                  description="Please enter your phone number."
                  error={!/^[0-9]*$/.test(field.value) ? true : false}
                  errorMessage="The field is required. Please enter a valid phone number."
                />
              )}
            />
            <Controller
              name="mail"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="E-Mail:"
                  description="Please enter your E-Mail adress."
                  placeholder="E-Mail"
                  required
                  error={
                    field.value.length > 0 &&
                    !/^\S+@\S+\.\S+$/.test(field.value)
                      ? true
                      : false
                  }
                  errorMessage="The field is required. Please enter a valid E-Mail adress."
                />
              )}
            />
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Country:"
                  description="Please select your country."
                >
                  <Select.Option key={'none'}>
                    Select an option...
                  </Select.Option>
                  <Select.Option key={'germany'}>Germany</Select.Option>
                  <Select.Option key={'austria'}>Austria</Select.Option>
                  <Select.Option key={'switzerland'}>Switzerland</Select.Option>
                </Select>
              )}
            />
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="Agree to the terms"
                  defaultChecked={field.value}
                />
              )}
            />
          </Stack>
        </Stack>
        <Stack alignX="right">
          <Button
            variant="primary"
            size="small"
            type="submit"
            disabled={!isValid}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
};
```

### How to do Validation and Error Signaling

Some fields are required and throw error messages if you don't fill them out.
For this to work, `react-hook-form` has a property `formState`, which contains the boolean `isValid`. This prop is set to `true` if the form doesn't have errors. `isValid` will always observe the entire form to validate.

We don't explicit need to use a `onChange` event, instead of using useState and set a value we used directly `defaultValue`. With that the component is a uncontrolled component, it never gets undefined or null.

There are `rules` that can be applied on the components to trigger the validation, e.g. `required: true`. Our Marigold form components already have error properties and error messages build in. Now it should be combined. In the `handleSubmit` function we check if the recived data is valid, if that isn't the case we give the error value to the component and display the error message.

### Third party libraries

#### Zod

Zod is a TypeScript-first schema declaration and validation library. The term "schema" to broadly refer to any data type, from a simple string to a complex nested object.

It's designed to be as developer-friendly as possible. The goal is to eliminate duplicative type declarations. With Zod, you declare a validator once and Zod will automatically infer the static TypeScript type. It's easy to compose simpler types into complex data structures.

In the following example you can see how a form with all its fields can be submitted. The submitted data will be displayed in an alert message.

For validating the form we are using [`zod`](https://zod.dev/). It is a library for building schemas, which can be used to validate inputs. It is especially useful when you have more complex validation rules.

```tsx title="building-forms-zod"
import { FormEventHandler, useState } from 'react';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import {
  Button,
  Checkbox,
  Columns,
  Headline,
  Select,
  Stack,
  TextField,
} from '@marigold/components';

export default () => {
  const schemaData = z.object({
    firstname: z.string().min(1),
    name: z.string().min(1),
    phone: z.string().min(6),
    mail: z.string().email(),
    country: z.string(),
    terms: zfd.checkbox(),
  });

  const [error, setError] = useState<string[]>([]);
  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const errorList: Array<any> = [];
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    const validatedForm = schemaData.safeParse(data);

    if (!validatedForm.success) {
      validatedForm.error.issues.map(e => {
        return errorList.push(e.path.toString());
      });
      setError(errorList);
    } else {
      alert(JSON.stringify(data));
    }
  };

  return (
    <>
      <Headline level={2}>Account Registration</Headline>
      <form onSubmit={handleSubmit}>
        <Stack space={4}>
          <Columns columns={[2, 2]} space={4}>
            <TextField
              name="firstname"
              label="Firstname:"
              required
              description="Please enter your first name."
              placeholder="Firstname"
              error={error.includes('firstname')}
              errorMessage="The field is required. Please enter your firstname."
            />
            <TextField
              name="name"
              label="Name:"
              required
              description="Please enter your name."
              placeholder="Name"
              error={error.includes('name')}
              errorMessage="The field is required. Please enter your name."
            />
          </Columns>
          <Stack space={4}>
            <TextField
              name="phone"
              label="Phone:"
              required
              placeholder="Phone"
              type="tel"
              description="Please enter your phone number."
              error={error.includes('phone')}
              errorMessage="The field is required. Please enter a valid phone number."
            />
            <TextField
              label="E-Mail:"
              description="Please enter your E-Mail adress"
              placeholder="E-Mail"
              name="mail"
              required
              error={error.includes('mail')}
              errorMessage="The field is required. Please enter a valid E-Mail adress."
            />
            <Select
              name="country"
              label="Country:"
              description="Please select your country."
            >
              <Select.Option key={'none'}>Select an option...</Select.Option>
              <Select.Option key={'germany'}>Germany</Select.Option>
              <Select.Option key={'austria'}>Austria</Select.Option>
              <Select.Option key={'switzerland'}>Switzerland</Select.Option>
            </Select>
            <Checkbox label="Agree to the terms" name="terms" />
          </Stack>
        </Stack>
        <Stack alignX="right">
          <Button variant="primary" size="small" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
};
```

#### react-hook-form

React Hook Form is a library for managing form state and validation in React applications using hooks. It allows you to create forms with minimal boilerplate and provides a simple and efficient way to handle form validation, submission, and error handling.

With React Hook Form, you can easily manage form state without the need for controlled components, making your code cleaner and more concise. It also offers performance benefits by reducing unnecessary re-renders.

For some examples have a look at [Form developement guide](/patterns/form-implementation#handling-complex-forms-and-form-state) section.

### Async forms and useActionState hook

In React 19, you can handle async form submissions using Actions. With the `useActionState` hook, there's no need to manually manage an `isPending` state, React takes care of it automatically. Additionally, you can return a state directly from the action, eliminating the need for `useState`. This makes handling form state more streamlined and efficient.

```tsx title="building-forms-async"
import { useActionState } from 'react';
import { Button, Form, Headline, Stack, TextField } from '@marigold/components';

type FormState = {
  error?: string;
  success?: string;
};

const INITIAL_STATE: FormState = {
  error: '',
  success: '',
};

export default () => {
  const [{ error, success }, submitAction, isPending] = useActionState<
    FormState,
    FormData
  >(async (_previousState, formData) => {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (Math.random() > 0.5) {
      return {
        ...INITIAL_STATE,
        error: 'An error occurred. Please try again.',
      };
    }
    // Simulate async action (e.g., API call)
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
      ...INITIAL_STATE,
      success: `You searched successfully for ${name} and ${email}`,
    };
  }, INITIAL_STATE);

  return (
    <>
      <Headline level={2}>User Search</Headline>
      <Form action={submitAction}>
        <Stack space={4}>
          <Stack space={4}>
            <TextField
              type="text"
              name="name"
              label="Name:"
              placeholder="Name"
              required
              errorMessage={({ validationDetails }) =>
                validationDetails.valueMissing
                  ? 'Please enter a valid email address!'
                  : ''
              }
            />
            <TextField
              type="email"
              name="email"
              label="Email:"
              placeholder="Email"
              required
            />
          </Stack>
          <Stack alignX="right">
            <Button type="submit" loading={isPending} variant="primary">
              Search
            </Button>
          </Stack>
          {success && <p>{success}</p>}
          {error && <p className="text-red-600">{error}</p>}
        </Stack>
      </Form>
    </>
  );
};
```

## Related

- [Form Fields](../../foundations/form-fields) - Here you can find a comprehensive guide for working with form fields.

- [Forms](../../patterns/forms) - Here you can find a comprehensive guide for structuring forms.
