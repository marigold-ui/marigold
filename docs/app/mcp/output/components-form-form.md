# Form

_Wrap your fields to submit user data and enable input validation._

The `<Form>` component acts as a container for a set of fields, enabling data transmission to a server. It operates like a standard HTML form, initiating either a request based on the specified `method` attribute.

Additionally, the `<Form>` allows to validate user input and offers feedback for incorrect data entries, enhancing the overall resilience and user-friendliness of the form submission process. See the [Validation](/foundations/validation) guide to learn more about form validation.

## Import

```tsx
import { Form } from '@marigold/components';
```

## Appearance

| Property  | Type | Description                                 |
| :-------- | :--- | :------------------------------------------ |
| `variant` | `-`  | `The available variants of this component.` |
| `size`    | `-`  | `The available sizes of this component.`    |

## Props

| Prop                        | Type                                                                                                                                                                                                                                                  | Default    | Description                                                                                                                                                                                                                      |
| :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action                      | `string \| ((formData: FormData) => void \| Promise)`                                                                                                                                                                                                 | -          | Where to send the form-data when the form is submitted. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#action).                                                                                     |
| aria-describedby            | `string`                                                                                                                                                                                                                                              | -          | Identifies the element (or elements) that describes the object.                                                                                                                                                                  |
| aria-details                | `string`                                                                                                                                                                                                                                              | -          | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                               |
| aria-label                  | `string`                                                                                                                                                                                                                                              | -          | Defines a string value that labels the current element.                                                                                                                                                                          |
| aria-labelledby             | `string`                                                                                                                                                                                                                                              | -          | Identifies the element (or elements) that labels the current element.                                                                                                                                                            |
| autoCapitalize              | `"off" \| "on" \| "none" \| "sentences" \| "words" \| "characters"`                                                                                                                                                                                   | -          | Controls whether inputted text is automatically capitalized and, if so, in what manner. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize).                                        |
| autoComplete                | `"off" \| "on"`                                                                                                                                                                                                                                       | -          | Indicates whether input elements can by default have their values automatically completed by the browser. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#autocomplete).                             |
| children                    | `ReactNode`                                                                                                                                                                                                                                           | -          | The children of the component.                                                                                                                                                                                                   |
| dir                         | `string`                                                                                                                                                                                                                                              | -          |                                                                                                                                                                                                                                  |
| encType                     | `"application/x-www-form-urlencoded" \| "multipart/form-data" \| "text/plain"`                                                                                                                                                                        | -          | The enctype attribute specifies how the form-data should be encoded when submitting it to the server. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#enctype).                                      |
| hidden                      | `boolean`                                                                                                                                                                                                                                             | -          |                                                                                                                                                                                                                                  |
| id                          | `string`                                                                                                                                                                                                                                              | -          | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                           |
| inert                       | `boolean`                                                                                                                                                                                                                                             | -          |                                                                                                                                                                                                                                  |
| lang                        | `string`                                                                                                                                                                                                                                              | -          |                                                                                                                                                                                                                                  |
| maxWidth                    | `0 \| "auto" \| "full" \| "fit" \| "min" \| "max" \| "screen" \| "svh" \| "lvh" \| "dvh" \| "px" \| "0.5" \| 1 \| "1.5" \| 2 \| "2.5" \| 3 \| "3.5" \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 \| 11 \| 12 \| 14 \| 16 \| 20 \| 24 \| 28 \| ... 38 more ...` | `"full"`   | Sets the max-width of the element. You can see allowed tokens \[here]\(https\://tailwindcss.com/docs/max-width).                                                                                                                 |
| method                      | `"get" \| "post" \| "dialog"`                                                                                                                                                                                                                         | -          | The HTTP method to submit the form with. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#method).                                                                                                    |
| onAnimationEnd              | `AnimationEventHandler`                                                                                                                                                                                                                               | -          |                                                                                                                                                                                                                                  |
| onAnimationEndCapture       | `AnimationEventHandler`                                                                                                                                                                                                                               | -          |                                                                                                                                                                                                                                  |
| onAnimationIteration        | `AnimationEventHandler`                                                                                                                                                                                                                               | -          |                                                                                                                                                                                                                                  |
| onAnimationIterationCapture | `AnimationEventHandler`                                                                                                                                                                                                                               | -          |                                                                                                                                                                                                                                  |
| onAnimationStart            | `AnimationEventHandler`                                                                                                                                                                                                                               | -          |                                                                                                                                                                                                                                  |
| onAnimationStartCapture     | `AnimationEventHandler`                                                                                                                                                                                                                               | -          |                                                                                                                                                                                                                                  |
| onAuxClick                  | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onAuxClickCapture           | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onClick                     | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onClickCapture              | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onContextMenu               | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onContextMenuCapture        | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onDoubleClick               | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onDoubleClickCapture        | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onGotPointerCapture         | `PointerEventHandler`                                                                                                                                                                                                                                 | -          |                                                                                                                                                                                                                                  |
| onGotPointerCaptureCapture  | `PointerEventHandler`                                                                                                                                                                                                                                 | -          |                                                                                                                                                                                                                                  |
| onInvalid                   | `((event: FormEvent) => void)`                                                                                                                                                                                                                        | -          | Triggered for each invalid field when a user submits the form.                                                                                                                                                                   |
| onLostPointerCapture        | `PointerEventHandler`                                                                                                                                                                                                                                 | -          |                                                                                                                                                                                                                                  |
| onLostPointerCaptureCapture | `PointerEventHandler`                                                                                                                                                                                                                                 | -          |                                                                                                                                                                                                                                  |
| onMouseDown                 | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onMouseDownCapture          | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onMouseEnter                | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onMouseLeave                | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onMouseMove                 | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onMouseMoveCapture          | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onMouseOut                  | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onMouseOutCapture           | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onMouseOver                 | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onMouseOverCapture          | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onMouseUp                   | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onMouseUpCapture            | `MouseEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onPointerCancel             | `PointerEventHandler`                                                                                                                                                                                                                                 | -          |                                                                                                                                                                                                                                  |
| onPointerCancelCapture      | `PointerEventHandler`                                                                                                                                                                                                                                 | -          |                                                                                                                                                                                                                                  |
| onPointerDown               | `PointerEventHandler`                                                                                                                                                                                                                                 | -          |                                                                                                                                                                                                                                  |
| onPointerDownCapture        | `PointerEventHandler`                                                                                                                                                                                                                                 | -          |                                                                                                                                                                                                                                  |
| onPointerEnter              | `PointerEventHandler`                                                                                                                                                                                                                                 | -          |                                                                                                                                                                                                                                  |
| onPointerLeave              | `PointerEventHandler`                                                                                                                                                                                                                                 | -          |                                                                                                                                                                                                                                  |
| onPointerMove               | `PointerEventHandler`                                                                                                                                                                                                                                 | -          |                                                                                                                                                                                                                                  |
| onPointerMoveCapture        | `PointerEventHandler`                                                                                                                                                                                                                                 | -          |                                                                                                                                                                                                                                  |
| onPointerOut                | `PointerEventHandler`                                                                                                                                                                                                                                 | -          |                                                                                                                                                                                                                                  |
| onPointerOutCapture         | `PointerEventHandler`                                                                                                                                                                                                                                 | -          |                                                                                                                                                                                                                                  |
| onPointerOver               | `PointerEventHandler`                                                                                                                                                                                                                                 | -          |                                                                                                                                                                                                                                  |
| onPointerOverCapture        | `PointerEventHandler`                                                                                                                                                                                                                                 | -          |                                                                                                                                                                                                                                  |
| onPointerUp                 | `PointerEventHandler`                                                                                                                                                                                                                                 | -          |                                                                                                                                                                                                                                  |
| onPointerUpCapture          | `PointerEventHandler`                                                                                                                                                                                                                                 | -          |                                                                                                                                                                                                                                  |
| onReset                     | `((event: FormEvent) => void)`                                                                                                                                                                                                                        | -          | Triggered when a user resets the form.                                                                                                                                                                                           |
| onScroll                    | `UIEventHandler`                                                                                                                                                                                                                                      | -          |                                                                                                                                                                                                                                  |
| onScrollCapture             | `UIEventHandler`                                                                                                                                                                                                                                      | -          |                                                                                                                                                                                                                                  |
| onSubmit                    | `((event: FormEvent) => void)`                                                                                                                                                                                                                        | -          | Triggered when a user submits the form.                                                                                                                                                                                          |
| onTouchCancel               | `TouchEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onTouchCancelCapture        | `TouchEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onTouchEnd                  | `TouchEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onTouchEndCapture           | `TouchEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onTouchMove                 | `TouchEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onTouchMoveCapture          | `TouchEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onTouchStart                | `TouchEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onTouchStartCapture         | `TouchEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onTransitionCancel          | `TransitionEventHandler`                                                                                                                                                                                                                              | -          |                                                                                                                                                                                                                                  |
| onTransitionCancelCapture   | `TransitionEventHandler`                                                                                                                                                                                                                              | -          |                                                                                                                                                                                                                                  |
| onTransitionEnd             | `TransitionEventHandler`                                                                                                                                                                                                                              | -          |                                                                                                                                                                                                                                  |
| onTransitionEndCapture      | `TransitionEventHandler`                                                                                                                                                                                                                              | -          |                                                                                                                                                                                                                                  |
| onTransitionRun             | `TransitionEventHandler`                                                                                                                                                                                                                              | -          |                                                                                                                                                                                                                                  |
| onTransitionRunCapture      | `TransitionEventHandler`                                                                                                                                                                                                                              | -          |                                                                                                                                                                                                                                  |
| onTransitionStart           | `TransitionEventHandler`                                                                                                                                                                                                                              | -          |                                                                                                                                                                                                                                  |
| onTransitionStartCapture    | `TransitionEventHandler`                                                                                                                                                                                                                              | -          |                                                                                                                                                                                                                                  |
| onWheel                     | `WheelEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| onWheelCapture              | `WheelEventHandler`                                                                                                                                                                                                                                   | -          |                                                                                                                                                                                                                                  |
| role                        | `"search" \| "presentation"`                                                                                                                                                                                                                          | -          | An ARIA role override to apply to the form element.                                                                                                                                                                              |
| target                      | `"_blank" \| "_self" \| "_parent" \| "_top"`                                                                                                                                                                                                          | -          | The target attribute specifies a name or a keyword that indicates where to display the response that is received after submitting the form. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#target). |
| translate                   | `"yes" \| "no"`                                                                                                                                                                                                                                       | -          |                                                                                                                                                                                                                                  |
| unstyled                    | `boolean`                                                                                                                                                                                                                                             | -          | Removes the form's visual container so that it does not impact the layout, letting child elements render naturally.                                                                                                              |
| validationBehavior          | `"aria" \| "native"`                                                                                                                                                                                                                                  | `'native'` | Whether to use native HTML form validation to prevent form submission when a field value is missing or invalid, or mark fields as required or invalid via ARIA.                                                                  |
| validationErrors            | `ValidationErrors`                                                                                                                                                                                                                                    | -          | Validation errors for the form, typically returned by a server. This should be set to an object mapping from input names to errors.                                                                                              |

## Examples

### Setup

This is a simple setup how to use a `<Form>`.

```tsx title="form-base"
import { Button, Form, Inset, Stack, TextField } from '@marigold/components';

export default () => {
  return (
    <Form>
      <Inset space={8}>
        <Stack space={2} alignX="left">
          <TextField label="User Name" name="user" type="name" width="1/2" />
          <TextField
            label="Password"
            name="password"
            type="password"
            width="1/2"
          />
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Stack>
      </Inset>
    </Form>
  );
};
```

### Handling submission

The `onSubmit` event is useful for custom form actions, such as calling a REST API, instead of relying on the native form submission. It triggeres when a user submits the form using the Enter key or clicks the submit button. The `onReset` event is triggered when a user presses a reset button (`[type=reset]`).

```tsx title="form-submission"
import { useState } from 'react';
import {
  Button,
  Form,
  Inline,
  Inset,
  Stack,
  Text,
  TextField,
} from '@marigold/components';

export default () => {
  let [action, setAction] = useState<string | null>(null);
  return (
    <Form
      onSubmit={e => {
        // This will prevent the native form submission
        e.preventDefault();

        // Read the form values and convert it to a regular object
        const data = Object.fromEntries(new FormData(e.currentTarget));
        setAction(`data: ${JSON.stringify(data, null, 2)}`);
      }}
      onReset={() => setAction('reset')}
    >
      <Inset space={8}>
        <Stack space={4}>
          <Stack space={2} alignX="left">
            <TextField
              label="User Name"
              name="user"
              type="name"
              width="1/2"
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              width="1/2"
              required
            />
            <Inline space={2}>
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Button type="reset">Reset</Button>
            </Inline>
          </Stack>
          {action && (
            <div className="bg-secondary-200 rounded-lg p-4">
              <Text weight="bold">Action:</Text>
              <pre>
                <code>{action}</code>
              </pre>
            </div>
          )}
        </Stack>
      </Inset>
    </Form>
  );
};
```

### Server Errors

The `<Form>` component handles passed errors, typically received from a server after form submission. To display validation errors, set the `validationErrors` prop as an object mapping each field's name prop to a string or array of strings representing errors. These errors appear to the user as soon as the `validationErrors` prop is set and are cleared when the user modifies the corresponding field's value.

```tsx title="form-validation-errors"
import { Button, Form, Inset, Stack, TextField } from '@marigold/components';

export default () => {
  return (
    <Form validationErrors={{ password: 'Incorrect password.' }}>
      <Inset space={8}>
        <Stack space={2} alignX="left">
          <TextField label="User Name" name="user" type="name" width="1/2" />
          <TextField
            label="Password"
            name="password"
            type="password"
            width="1/2"
          />
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Stack>
      </Inset>
    </Form>
  );
};
```

For more information about form validation, see the [Validation](/foundations/validation) guide.

### Focus Management

As you can see in the previous server errors example, when a user submits a form with validation errors, the first invalid field is automatically focused. This behavior can be customized using `e.preventDefault` during the `onInvalid` event and manage the focus manually.

```tsx title="form-focus-management"
import { useState } from 'react';
import {
  Button,
  Form,
  Inline,
  Inset,
  SectionMessage,
  Stack,
  TextField,
} from '@marigold/components';

export default () => {
  let [invalid, setInvalid] = useState(false);
  return (
    <Form
      onInvalid={e => {
        e.preventDefault();
        setInvalid(true);
      }}
      onSubmit={e => {
        e.preventDefault();
        setInvalid(false);
      }}
      onReset={() => setInvalid(false)}
    >
      <Inset space={8}>
        <Stack space={4}>
          {invalid ? (
            <SectionMessage variant="error">
              <SectionMessage.Title>Whoopsies!</SectionMessage.Title>
              <SectionMessage.Content>
                Please enter both your email address and password to proceed.
                Ensure that all required fields are filled correctly before
                attempting to log in.
              </SectionMessage.Content>
            </SectionMessage>
          ) : null}
          <Stack space={2} alignX="left">
            <TextField
              label="User Name"
              name="user"
              type="name"
              width="1/2"
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              width="1/2"
              required
            />
            <Inline space={2}>
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Button type="reset">Reset</Button>
            </Inline>
          </Stack>
        </Stack>
      </Inset>
    </Form>
  );
};
```

> ℹ️ Want more?!: You can find more examples and usages of the `<Form>` component on the Validation page.
