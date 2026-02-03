# Drawer

_Component for showing additional content alongside the main page.._

The `<Drawer>` component is a flexible UI element used to present additional content is a side-in panel, typically from the edge of the screen. Unlike dialogs, it doesn't block interaction with the rest of the page, making it ideal for non-modal interactions.

Key features of the `<Drawer>` component include customizable placemnt, adjustable sizes and abilitly to remain non-modal for uninterrupted page interaction.

## Anatomy

A `<Drawer>` consists of an optinal title, content, actions. The title provides context for the user, while the content holds the main message or interactive elements like forms. The actions section contains controls such as buttons for confirming or cancelling.

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type                        | Description                                 |
| :-------- | :-------------------------- | :------------------------------------------ |
| `variant` | `-`                         | `The available variants of this component.` |
| `size`    | `xsmall \| small \| medium` | `The available sizes of this component.`    |

## Usage

A drawer displays supplemental content without blocking the main page. It should feel lightweight, letting users access extra information or controls while continuing their workflow. Keep content clear and focused so the drawer enhances the task without becoming a distraction.

✓ Use a drawer whenallowing users to adjust settings or view details without leaving the page, keeping the main workflow uninterrupted, presenting secondary or supporting content.

✗ Avoid using a drawer whenneeding critical confirmations or desctructive actions, having deep navigation or complex multi-step flows, the task requires full user attention or focus, critical information must be acknowledged before continuing,

### Secondary information

When users want more detail about an item without leaving the current view, a drawer is ideal. For instance, clicking on a ticket, order, or user could open a drawer with extended information and actions.

```tsx title="drawer-secondary-details"
import {
  Button,
  Drawer,
  DrawerProps,
  Inline,
  Stack,
  Text,
} from '@marigold/components';

export default function (props: DrawerProps) {
  return (
    <Drawer.Trigger>
      <Button>Open Ticket Details</Button>
      <Drawer {...props} size="medium">
        <Drawer.Title>Ticket #4521 - Login Issue</Drawer.Title>
        <Drawer.Content>
          <Stack space={6}>
            <Text>
              <strong>Description:</strong> User reports being unable to log in
              after the latest update. Error message:{' '}
              <em>"Invalid session token."</em>
            </Text>

            <Stack space={2}>
              <Text>
                <strong>Status:</strong> Open
              </Text>
              <Text>
                <strong>Priority:</strong> High
              </Text>
              <Text>
                <strong>Assigned to:</strong> Jane Doe
              </Text>
              <Text>
                <strong>Created:</strong> Sep 12, 2025
              </Text>
              <Text>
                <strong>Last Updated:</strong> Sep 15, 2025
              </Text>
            </Stack>

            <Text>
              <strong>Customer Notes:</strong>
              "I tried resetting my password, but I’m still locked out."
            </Text>
          </Stack>
        </Drawer.Content>
        <Drawer.Actions>
          <Inline space={3}>
            <Button slot="close">Close</Button>
            <Button
              slot="close"
              variant="primary"
              onPress={() => alert('Ticket marked as resolved')}
            >
              Resolve Ticket
            </Button>
          </Inline>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  );
}
```

### Creation or editing flows

Drawers can host lightweight forms, like adding a new event, editing a profle, or adjusting settings, they let users complete taksks without losing context or navigating away.

```tsx title="drawer-edit-flow"
import { Button, Drawer, Stack, Switch, TextField } from '@marigold/components';

export default function () {
  return (
    <Drawer.Trigger>
      <Button>Settings</Button>
      <Drawer>
        <Drawer.Title>Settings</Drawer.Title>
        <Drawer.Content>
          <Stack space={3}>
            <TextField label="Display Name" placeholder="Enter your name" />
            <TextField label="Email" placeholder="user@example.com" />
            <Switch label="Enable Notifications" />
          </Stack>
        </Drawer.Content>
        <Drawer.Actions>
          <Button slot="close">Cancel</Button>
          <Button slot="close" variant="primary">
            Save Changes
          </Button>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  );
}
```

### Contextual utilities

Drawers can provide utilities like quick help, a chat panel, or notes. These stay “on the side” and don’t interfere with the main content area.

```tsx title="drawer-contextual-utility"
import { Button, Drawer, Link, Stack, Text } from '@marigold/components';

export default function () {
  return (
    <Drawer.Trigger>
      <Button>Open Help</Button>
      <Drawer placement="right">
        <Drawer.Title>Quick Help</Drawer.Title>
        <Drawer.Content>
          <Stack space={4}>
            <Text>
              Need assistance while handling tickets? Here are some quick links:
            </Text>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="#">How to reset a user password</Link>
              </li>
              <li>
                <Link href="#">
                  Escalation policy for high-priority tickets
                </Link>
              </li>
              <li>
                <Link href="#">Troubleshooting login issues</Link>
              </li>
            </ul>
          </Stack>
        </Drawer.Content>
        <Drawer.Actions>
          <Button slot="close">Close</Button>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  );
}
```

### Filter

A common use case for drawers is displaying filter panels. Drawers provide a non-intrusive way to expose filtering options while keeping the main content visible and interactive. This allows users to adjust filters, apply changes, and immediately see updated results without leaving the page, for more information about the filter you can visit [Filter pattern](/patterns/filter).

### Placement

The `<Drawer>` can be placed on any edge of the screen using `placement` prop,, placement should relfect the type of content and user's workflow:

- **right(most common)**: details, contextual utilities.
- **left**: navigaiton, or menus that help users to swich between different views.
- **top**: lightweight global actions like notifications, announcements, or system alerts. Best for transient information that needs quick visibility but not long interaction.
- **bottom**: short confirmation actions, quick reply forms, or pickers. Ideal for focused tasks that don’t require leaving the current screen.

```tsx title="drawer-placement"
import { ReactNode, useState } from 'react';
import {
  Button,
  Drawer,
  Inline,
  Stack,
  Text,
  TextArea,
} from '@marigold/components';

interface DrawerConfig {
  [key: string]: {
    title: string;
    content: ReactNode;
    actions?: ReactNode;
  };
}

const drawers: DrawerConfig = {
  top: {
    title: 'System Notification',
    content: (
      <Stack space={3}>
        <Text>⚡ Scheduled maintenance on Sep 20, 2025</Text>
        <Text>📢 New feature: bulk ticket assignment now available</Text>
        <Text>✅ Ticket #4499 has been resolved</Text>
      </Stack>
    ),
  },
  bottom: {
    title: 'Reply to ticket',
    content: (
      <Drawer.Content>
        <Stack space={4}>
          <TextArea label="Your message" placeholder="Type a quick reply..." />
        </Stack>
      </Drawer.Content>
    ),
    actions: (
      <>
        <Button slot="close">Cancel</Button>
        <Button slot="close" variant="primary">
          Send
        </Button>
      </>
    ),
  },

  right: {
    title: 'Agent Activity',
    content: (
      <Stack space={4}>
        <Text>👩‍💻 Jane Doe assigned ticket #4521 to herself.</Text>
        <Text>🕒 Ticket #4477 marked as "In Progress".</Text>
        <Text>📤 John Smith replied to customer on ticket #4502.</Text>
        <Text>✅ Ticket #4499 was resolved.</Text>
      </Stack>
    ),
  },
  left: {
    title: 'Support Teams',
    content: (
      <Stack space={5}>
        <Stack>
          <Text>🎟 Frontline Support</Text>
          <Text>Active tickets: 34</Text>
        </Stack>
        <Stack>
          <Text>💳 Billing Team</Text>
          <Text>Active tickets: 12</Text>
        </Stack>
        <Stack>
          <Text>⚙️ Technical Support</Text>
          <Text>Active tickets: 8</Text>
        </Stack>
      </Stack>
    ),
    actions: <Button slot="close">Close</Button>,
  },
};

type Placement = 'right' | 'left' | 'top' | 'bottom';

export default function DrawerDemo() {
  const [placement, setPlacement] = useState<Placement>('right');
  const [open, setOpen] = useState(false);

  const currentDrawer = drawers[placement];

  const handleOpen = (nextPlacement: Placement) => {
    // Case 1: drawer open + same placement => close
    if (open && nextPlacement === placement) {
      setOpen(false);
      return;
    }

    // Case 2: drawer open + different placement => close, then reopen
    if (open && nextPlacement !== placement) {
      setOpen(false);
      setTimeout(() => {
        setPlacement(nextPlacement);
        setOpen(true);
      }, 300);
      return;
    }

    // Case 3: drawer closed => open with new placement
    setPlacement(nextPlacement);
    setOpen(true);
  };

  return (
    <Drawer.Trigger open={open} onOpenChange={setOpen}>
      <Inline space={3}>
        {['right', 'left', 'top', 'bottom'].map((p: Placement) => (
          <Button key={p} onPress={() => handleOpen(p)}>
            {p}
          </Button>
        ))}
      </Inline>
      <Drawer placement={placement}>
        <Drawer.Title>{currentDrawer.title}</Drawer.Title>
        <Drawer.Content>{currentDrawer.content}</Drawer.Content>
        <Drawer.Actions>{currentDrawer.actions}</Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  );
}
```

## Props

### Drawer

| Prop                        | Type                                                                                             | Default           | Description                                                                                                                                                                                                                                                                                                                                                                                         |
| :-------------------------- | :----------------------------------------------------------------------------------------------- | :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-describedby            | `string`                                                                                         | -                 | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                                                                                                                                                     |
| aria-details                | `string`                                                                                         | -                 | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                                                                                                                                                  |
| aria-label                  | `string`                                                                                         | -                 | Defines a string value that labels the current element.                                                                                                                                                                                                                                                                                                                                             |
| aria-labelledby             | `string`                                                                                         | -                 | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                                                                                                                                               |
| children                    | `ReactNode \| ((opts: DialogRenderProps) => ReactNode)`                                          | -                 | Children of the dialog. A function may be provided to access a function to close the dialog.                                                                                                                                                                                                                                                                                                        |
| closeButton                 | `boolean`                                                                                        | -                 | Show the close button.                                                                                                                                                                                                                                                                                                                                                                              |
| dir                         | `string`                                                                                         | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| hidden                      | `boolean`                                                                                        | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| id                          | `string`                                                                                         | -                 | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                                                                                                                                              |
| inert                       | `boolean`                                                                                        | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| keyboardDismissable         | `boolean`                                                                                        | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| lang                        | `string`                                                                                         | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onAnimationEnd              | `AnimationEventHandler`                                                                          | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onAnimationEndCapture       | `AnimationEventHandler`                                                                          | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onAnimationIteration        | `AnimationEventHandler`                                                                          | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onAnimationIterationCapture | `AnimationEventHandler`                                                                          | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onAnimationStart            | `AnimationEventHandler`                                                                          | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onAnimationStartCapture     | `AnimationEventHandler`                                                                          | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onAuxClick                  | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onAuxClickCapture           | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onClick                     | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onClickCapture              | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onContextMenu               | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onContextMenuCapture        | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onDoubleClick               | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onDoubleClickCapture        | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onGotPointerCapture         | `PointerEventHandler`                                                                            | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onGotPointerCaptureCapture  | `PointerEventHandler`                                                                            | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onLostPointerCapture        | `PointerEventHandler`                                                                            | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onLostPointerCaptureCapture | `PointerEventHandler`                                                                            | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onMouseDown                 | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onMouseDownCapture          | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onMouseEnter                | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onMouseLeave                | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onMouseMove                 | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onMouseMoveCapture          | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onMouseOut                  | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onMouseOutCapture           | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onMouseOver                 | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onMouseOverCapture          | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onMouseUp                   | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onMouseUpCapture            | `MouseEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onPointerCancel             | `PointerEventHandler`                                                                            | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onPointerCancelCapture      | `PointerEventHandler`                                                                            | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onPointerDown               | `PointerEventHandler`                                                                            | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onPointerDownCapture        | `PointerEventHandler`                                                                            | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onPointerEnter              | `PointerEventHandler`                                                                            | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onPointerLeave              | `PointerEventHandler`                                                                            | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onPointerMove               | `PointerEventHandler`                                                                            | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onPointerMoveCapture        | `PointerEventHandler`                                                                            | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onPointerOut                | `PointerEventHandler`                                                                            | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onPointerOutCapture         | `PointerEventHandler`                                                                            | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onPointerOver               | `PointerEventHandler`                                                                            | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onPointerOverCapture        | `PointerEventHandler`                                                                            | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onPointerUp                 | `PointerEventHandler`                                                                            | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onPointerUpCapture          | `PointerEventHandler`                                                                            | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onScroll                    | `UIEventHandler`                                                                                 | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onScrollCapture             | `UIEventHandler`                                                                                 | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onTouchCancel               | `TouchEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onTouchCancelCapture        | `TouchEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onTouchEnd                  | `TouchEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onTouchEndCapture           | `TouchEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onTouchMove                 | `TouchEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onTouchMoveCapture          | `TouchEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onTouchStart                | `TouchEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onTouchStartCapture         | `TouchEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onTransitionCancel          | `TransitionEventHandler`                                                                         | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onTransitionCancelCapture   | `TransitionEventHandler`                                                                         | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onTransitionEnd             | `TransitionEventHandler`                                                                         | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onTransitionEndCapture      | `TransitionEventHandler`                                                                         | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onTransitionRun             | `TransitionEventHandler`                                                                         | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onTransitionRunCapture      | `TransitionEventHandler`                                                                         | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onTransitionStart           | `TransitionEventHandler`                                                                         | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onTransitionStartCapture    | `TransitionEventHandler`                                                                         | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onWheel                     | `WheelEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| onWheelCapture              | `WheelEventHandler`                                                                              | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |
| open                        | `boolean`                                                                                        | `"undefined"`     | Whether the overlay is open by default (controlled).                                                                                                                                                                                                                                                                                                                                                |
| placement                   | `"top" \| "bottom" \| "left" \| "right"`                                                         | `"right"`         | The placement of the drawer on the screen.                                                                                                                                                                                                                                                                                                                                                          |
| role                        | `"region" \| "search" \| "navigation" \| "form" \| "banner" \| "contentinfo" \| "complementary"` | `"complementary"` | The \`role\` property sets the ARIA landmark role for this component, enhancing accessibility by clarifying its purpose to assistive technologies. Only ARIA landmark roles (e.g., "complementary", "search", "banner", "navigation") can be used to ensure proper semantic context. Defaults to \`"complementary"\` for secondary content (e.g., filters, sidebar) that supports the main content. |
| slot                        | `string \| null`                                                                                 | -                 | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit \`null\` value indicates that the local props completely override all props received from a parent.                                                                                                                                                                                  |
| translate                   | `"yes" \| "no"`                                                                                  | -                 |                                                                                                                                                                                                                                                                                                                                                                                                     |

### Drawer.Trigger

| Prop                    | Type                          | Default   | Description                                                   |
| :---------------------- | :---------------------------- | :-------- | :------------------------------------------------------------ |
| **children (required)** | `ReactNode`                   | -         |                                                               |
| defaultOpen             | `boolean`                     | -         | Whether the overlay is open by default (uncontrolled).        |
| onOpenChange            | `((isOpen: boolean) => void)` | -         | Handler that is called when the overlay's open state changes. |
| open                    | `boolean`                     | `"false"` | Whether the overlay is open by default (controlled).          |

## Related

- [Dialog](../../components/overlay/dialog) - Learn more about Dialog component.

- [Filter Pattern](../../../patterns/filter) - Represents the usage of filter pattern.
