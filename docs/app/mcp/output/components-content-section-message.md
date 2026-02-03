# SectionMessage

_Display important informations in a section of a screen._

The `<SectionMessage>` component is a block-level element designed to alert users about specific content in a designated section on the page. It is positioned close to the relevant content to clearly indicate its connection. Section messages provide contextual feedback within a section of the page and are persistent, non-modal elements.

## Anatomy

The section message consists of a container which includes an optional icon to support the message and a title. The actual content of section messages is located under the title.

Optionally, you can add a button to dismiss the message.

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type                                  | Description                                 |
| :-------- | :------------------------------------ | :------------------------------------------ |
| `variant` | `success \| warning \| info \| error` | `The available variants of this component.` |
| `size`    | `-`                                   | `The available sizes of this component.`    |

## Usage

Section messages are ideal for displaying important feedback related to a specific section of the page.

Unlike modal dialogs, which interrupt the user's workflow, section messages remain visible without blocking interaction with other parts of the interface.

✓ The section message title should make the topic or purpose of the message clear. The content provides a brief description of the event that has occurred on the page.

### Position

They should be positioned close to the relevant content, typically directly above, to ensure users can easily identify the relationship between the message and the affected area.

✓ Place section message near the affected content.

✗ Don't place section messages in unaffected sections.

### Dismissable message

Dismissable messages are used to provide temporary feedback or notifications that the user can manually close or dismiss when they no longer need the information. They are generally used when feedback is helpful but doesn't need to stay on screen permanently.

To provide this, you have to use the `closeButton` property on the `<SectionMessage>`.

```tsx title="section-message-dismissable"
import { SectionMessage } from '@marigold/components';

export default () => (
  <SectionMessage closeButton>
    <SectionMessage.Title>
      Configuration of the hardware key
    </SectionMessage.Title>
    <SectionMessage.Content>
      Activating the function allows you to change the scanning direction. Keep
      in mind to have the correct settings set to "changeable".
    </SectionMessage.Content>
  </SectionMessage>
);
```

You can also control the dismissable message by using the `close` and `onClose` property.

### Actions

Actions, such as buttons or links, should be placed near the message content to make the next steps intuitive for users. Clear, accessible options help users easily respond to the feedback provided, allowing them to address the issue without disrupting their workflow.

```tsx title="section-message-action"
import { Inline, Link, SectionMessage, Stack } from '@marigold/components';

export default () => (
  <SectionMessage closeButton>
    <SectionMessage.Title>This page is read-only.</SectionMessage.Title>
    <SectionMessage.Content>
      <Stack space={2}>
        You don't have permission to edit this page. If you think you should
        have editing rights, contact your group administrator.
        <Inline space={4}>
          <Link href="#">View team roles</Link>
          <Link href="#">About permission</Link>
        </Inline>
      </Stack>
    </SectionMessage.Content>
  </SectionMessage>
);
```

✓ Use section messages for providing non-disruptive feedback or notifications, allowing users to address the message when convenient.

✗ Don't use the section message if you need to interact with it to procced with a task or a flow.

## Props

### SectionMessage

| Prop          | Type                         | Default | Description                                                                       |
| :------------ | :--------------------------- | :------ | :-------------------------------------------------------------------------------- |
| children      | `ReactNode`                  | -       | The children of the component.                                                    |
| close         | `boolean`                    | -       | If the message should be closed/dismissed (controlled).                           |
| closeButton   | `boolean`                    | -       | Adds a close button, makes the section message dismissable.                       |
| onCloseChange | `((close: boolean) => void)` | -       | Handler that is called when you need to control the dismissable message to close. |

### SectionMessage.Title

| Prop     | Type        | Default | Description                    |
| :------- | :---------- | :------ | :----------------------------- |
| children | `ReactNode` | -       | The children of the component. |

### SectionMessage.Content

| Prop     | Type        | Default | Description                    |
| :------- | :---------- | :------ | :----------------------------- |
| children | `ReactNode` | -       | The children of the component. |

## Alternative components

- **[Dialog](/components/overlay/dialog)**: If you need to interact with messages to procced with a task or a flow you should use a dialog.

- **[Form components](/patterns/form-implementation)**: When you need to inform the users of a status from a form field, you can use the help text/ validation message which comes with our form components.

## Related

- [Feedback Messages](/patterns/feedback-messages) - Learn when to use which message.
