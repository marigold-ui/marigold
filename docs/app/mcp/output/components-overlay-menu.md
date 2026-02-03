# Menu

_Flexible component for constructing dynamic and customizable menus._

The `<Menu>` component allows you to define a menu element. It's useful when you want a list with options or actions.

It is structured in two parts `<Menu>` and `<Menu.Item>`. The `<Menu>` contains the trigger and the button per default. You also can use the `<Menu.Section>` which you can use to separate the menu items from each other.

There is also a companion component called `<ActionMenu>` which you can use if you want to take some actions. You can have a look on how it works in the examples. It works quiet similar to the normal `<Menu>` component. All you have to add are the `<Menu.Item>`s.

## Anatomy

- **Menu trigger:** The element, such as a button or icon, that opens or activates the menu.
- **Section:** Menus are made up of a section or multiple sections.
- **Section header:** Contains a heading to name a section of a group of similar menu items.
- **Menu item:** Represent an individual option or action within a Menu component.

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type                                | Description                                 |
| :-------- | :---------------------------------- | :------------------------------------------ |
| `variant` | `default \| destructive \| ghost`   | `The available variants of this component.` |
| `size`    | `default \| small \| large \| icon` | `The available sizes of this component.`    |

## Usage

In general, Menus are used to hide less frequently used or advanced options until users specifically need them. This keeps the interface clean and focused on essential elements.

Menus are ideal for interactive UI elements, it is distincit from `<Select>`, which is meant for form inputs and value selection.

Menus can speed up interactions for advanced users who are already familiar with the application. These users often rely on shortcuts and context-specific actions to work more efficiently.

✓ Write menu label that is clear, concise (max. 24 characters) and avoid unnecessary verbs.

✓ Organise your menu items based on priority, and put the most used items at the start of the menu.

### Simple menu with action

In this example you can see a simple `<Menu>` with some items to select. it is used when you need a to provide users with a set of of options that will result in a specific action being performed.

```tsx title="menu-action"
import { Menu } from '@marigold/components';

export default () => {
  return (
    <Menu label="Actions" onAction={action => alert(`Your action: ${action}`)}>
      <Menu.Item id="edit">Open in editor</Menu.Item>
      <Menu.Item id="settings">Settings</Menu.Item>
      <Menu.Item id="delete" variant="destructive">
        Delete
      </Menu.Item>
    </Menu>
  );
};
```

### Menu with sections

When you have mutliple menu items that can be categorized under different headings. This is particularly useful in complext menus with many options, you can use `<Menu.Section>` and pass `title` for the group name.

```tsx title="menu-section"
import { Menu } from '@marigold/components';

export default () => {
  return (
    <Menu label="Ticket Services">
      <Menu.Section title="Game Day">
        <Menu.Item id="match_info">📅 View Match Information</Menu.Item>
        <Menu.Item id="stadium_guide">🏟️ Stadium Guide</Menu.Item>
        <Menu.Item id="fan_zone">🎉 Fan Zone Activities</Menu.Item>
      </Menu.Section>
      <Menu.Section title="Support">
        <Menu.Item id="customer_support">📞 Contact Support</Menu.Item>
        <Menu.Item id="faq">❓ View FAQs</Menu.Item>
        <Menu.Item id="feedback">💬 Provide Feedback</Menu.Item>
      </Menu.Section>
    </Menu>
  );
};
```

### Disabled menu items

In this example the `<Menu>` has set its prop `disabeldKeys`. So you can't interact with the `<Menu.Item>` anymore. Keep in mind, that you have to set an id to the `<Menu.Item>`.

```tsx title="menu-disabled"
import { Menu } from '@marigold/components';

export default () => {
  return (
    <Menu label="Ticket Options" disabledKeys={['upgrade', 'resell']}>
      <Menu.Item id="view">👁️ View Ticket Details</Menu.Item>
      <Menu.Item id="download">📥 Download Ticket</Menu.Item>
      <Menu.Item id="upgrade">⬆️ Upgrade Seat</Menu.Item>
      <Menu.Item id="resell">💸 Resell Ticket</Menu.Item>
    </Menu>
  );
};
```

### ActionMenu

The `<ActionMenu>` is typically used to provide quick, context-specific actions related to an item or interface element. It is particularly useful in scenarios where speed and efficiency in selecting an action are crucial.

In this example, the `<ActionMenu>` is used within a table to allow users to perform actions like viewing details of a ticket or deleting a ticket. When "View Details" is selected, a dialog displays key information about the selected ticket, including its ID, event name, and status. The "Delete" option removes the ticket from the list.

The example shows that the `<ActionMenu>` is very similar to the standard `<Menu>` component, offering flexibility and ease of use in various contexts.

```tsx title="menu-action-table"
import { useState } from 'react';
import { ActionMenu, Menu, Table } from '@marigold/components';

const rows = [
  {
    ticketId: 'TCK-001',
    eventName: 'Champions League Final',
    status: 'Confirmed',
  },
  {
    ticketId: 'TCK-002',
    eventName: 'Rock Concert',
    status: 'Pending',
  },
  {
    ticketId: 'TCK-003',
    eventName: 'Broadway Show',
    status: 'Cancelled',
  },
];

interface Ticket {
  ticketId: string;
  eventName: string;
  status: 'Cancelled' | 'Pending' | 'Confirmed';
}

export default () => {
  const [tickets, setTickets] = useState(rows);

  const handleViewDetails = (ticket: Ticket) => {
    alert(
      `Ticket ID: ${ticket.ticketId}\nEvent: ${ticket.eventName}\nStatus: ${ticket.status}`
    );
  };

  return (
    <Table aria-label="Data Table" size="compact" stretch>
      <Table.Header>
        <Table.Column>ID</Table.Column>
        <Table.Column>Event Name</Table.Column>
        <Table.Column>Status</Table.Column>
        <Table.Column>Action</Table.Column>
      </Table.Header>
      <Table.Body items={rows}>
        {tickets.map((ticket: Ticket) => (
          <Table.Row key={ticket.ticketId}>
            <Table.Cell>{ticket.ticketId}</Table.Cell>
            <Table.Cell>{ticket.eventName}</Table.Cell>
            <Table.Cell>{ticket.status}</Table.Cell>
            <Table.Cell>
              <ActionMenu>
                <Menu.Item
                  onAction={() => handleViewDetails(ticket)}
                  id="view-details"
                >
                  View Details
                </Menu.Item>
                <Menu.Item
                  variant="destructive"
                  onAction={() =>
                    setTickets(
                      tickets.filter(
                        ticketItem => ticketItem.ticketId !== ticket.ticketId
                      )
                    )
                  }
                  id="delete"
                >
                  Delete
                </Menu.Item>
              </ActionMenu>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
```

### Menu item opens dialog

This Example shows how to open a [`<Dialog>`](/components/dialog/) from a `<Menu.Item>`. It is useful when a menu action requires additional user input or confirmation. Selecting the item opens a `Dialog` where users can provide the necessary information or confirm their choice, making the interaction smooth and efficient.

```tsx title="menu-open-dialog"
import { MessageCircleHeart, User } from 'lucide-react';
import { useState } from 'react';
import { Button, Dialog, Menu, TextArea } from '@marigold/components';

export default () => {
  const [open, setDialogOpen] = useState(false);

  const handleAction = (action: 'profile' | 'feedback') => {
    switch (action) {
      case 'profile':
        alert('Profile opened!');
        break;
      case 'feedback':
        setDialogOpen(true);
        break;
      default:
        throw new Error(`Unhandled action "${action}"!`);
    }
  };

  return (
    <>
      <Menu onAction={handleAction} label="User Menu">
        <Menu.Item id="profile">
          <User /> View Profile
        </Menu.Item>
        <Menu.Item id="feedback">
          <MessageCircleHeart /> Send Feedback
        </Menu.Item>
      </Menu>
      <Dialog
        size="xsmall"
        closeButton
        open={open}
        onOpenChange={setDialogOpen}
      >
        {({ close }) => (
          <>
            <Dialog.Title>Send Feedback</Dialog.Title>
            <Dialog.Content>
              <TextArea placeholder="Your feedback..." rows={4} />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={close}>Cancel</Button>
              <Button variant="primary" onPress={close}>
                Submit
              </Button>
            </Dialog.Actions>
          </>
        )}
      </Dialog>
    </>
  );
};
```

### Menu selection mode

Use `multiple` selection mode when you want to allow users to select multiple options at once, providing flexibility in situations where multiple choices are valid and necessary.

Here you can see how the `selectionMode` from `<Menu>` works. In this example the `selectionMode` is set to `multiple`. If you open the items you can see a selected item.

```tsx title="menu-selection"
import { useState } from 'react';
import { Menu } from '@marigold/components';

export default () => {
  const [preferences, setPreferences] = useState(['newsletter']);
  return (
    <>
      <Menu
        label="Select Your Preference"
        selectionMode="multiple"
        selectedKeys={preferences}
        onSelectionChange={setPreferences as (keys: any) => void}
      >
        <Menu.Item id="newsletter">📧 Subscribe to Newsletter</Menu.Item>
        <Menu.Item id="offers">💸 Receive Special Offers</Menu.Item>
        <Menu.Item id="updates">🔔 Get Product Updates</Menu.Item>
        <Menu.Item id="events">🎉 Event Invitations</Menu.Item>
      </Menu>{' '}
      <pre>Your preferences are : {[...preferences].join(', ')}</pre>
    </>
  );
};
```

### Destructive actions

For actions that result in irreversible data loss, such as deleting an item or removing a user account, use the `"destructive"` variant on menu items to warn the user of the consequences. Always safeguard these actions with a confirmation dialog that clearly explains the outcome and requires an explicit second step to complete the process.

```tsx title="menu-destructive"
import { useState } from 'react';
import { Button, Dialog, Menu } from '@marigold/components';

export default () => {
  const [open, setDialogOpen] = useState(false);

  return (
    <>
      <Menu label="Settings">
        <Menu.Item id="save">Save</Menu.Item>
        <Menu.Item
          id="delete"
          variant="destructive"
          onAction={() => setDialogOpen(true)}
        >
          Delete
        </Menu.Item>
      </Menu>
      <Dialog.Trigger open={open} onOpenChange={setDialogOpen}>
        <Dialog role="alertdialog" closeButton>
          <Dialog.Title>Confirm delete</Dialog.Title>
          <Dialog.Content>
            Are you sure you want to delete this event? This action cannot be
            undone.
          </Dialog.Content>
          <Dialog.Actions>
            <Button variant="secondary" slot="close">
              Cancel
            </Button>
            <Button variant="destructive" slot="close">
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Dialog.Trigger>
    </>
  );
};
```

## Props

### Menu

| Prop                        | Type                          | Default            | Description                                                                                                                                                                                                                                                                                                   |
| :-------------------------- | :---------------------------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| aria-describedby            | `string`                      | -                  | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                                                               |
| aria-details                | `string`                      | -                  | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                                                            |
| aria-label                  | `string`                      | -                  | Defines a string value that labels the current element.                                                                                                                                                                                                                                                       |
| aria-labelledby             | `string`                      | -                  | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                                                         |
| autoFocus                   | `boolean \| FocusStrategy`    | -                  | Where the focus should be set.                                                                                                                                                                                                                                                                                |
| children                    | `ReactNode`                   | -                  | The contents of the menu.                                                                                                                                                                                                                                                                                     |
| defaultOpen                 | `boolean`                     | -                  | Whether the overlay is open by default (uncontrolled).                                                                                                                                                                                                                                                        |
| defaultSelectedKeys         | `Iterable \| "all"`           | -                  | The initial selected keys in the collection (uncontrolled).                                                                                                                                                                                                                                                   |
| dependencies                | `readonly any[]`              | -                  | Values that should invalidate the item cache when using dynamic collections.                                                                                                                                                                                                                                  |
| dir                         | `string`                      | -                  |                                                                                                                                                                                                                                                                                                               |
| disabled                    | `boolean`                     | -                  | Whether the menu trigger is disabled.                                                                                                                                                                                                                                                                         |
| disabledKeys                | `Iterable`                    | -                  | The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with.                                                                                                                                                                                                       |
| disallowEmptySelection      | `boolean`                     | -                  | Whether the collection allows empty selection.                                                                                                                                                                                                                                                                |
| escapeKeyBehavior           | `"clearSelection" \| "none"`  | `'clearSelection'` | Whether pressing the escape key should clear selection in the menu or not. Most experiences should not modify this option as it eliminates a keyboard user's ability to easily clear selection. Only use if the escape key is being handled externally or should not trigger selection clearing contextually. |
| hidden                      | `boolean`                     | -                  |                                                                                                                                                                                                                                                                                                               |
| id                          | `string`                      | -                  | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                                                        |
| inert                       | `boolean`                     | -                  |                                                                                                                                                                                                                                                                                                               |
| items                       | `Iterable`                    | -                  | Item objects in the collection.                                                                                                                                                                                                                                                                               |
| label                       | `ReactNode`                   | -                  | The label for the menu trigger button.                                                                                                                                                                                                                                                                        |
| lang                        | `string`                      | -                  |                                                                                                                                                                                                                                                                                                               |
| onAction                    | `((key: Key) => void)`        | -                  | Handler that is called when an action is performed on an item.                                                                                                                                                                                                                                                |
| onAnimationEnd              | `AnimationEventHandler`       | -                  |                                                                                                                                                                                                                                                                                                               |
| onAnimationEndCapture       | `AnimationEventHandler`       | -                  |                                                                                                                                                                                                                                                                                                               |
| onAnimationIteration        | `AnimationEventHandler`       | -                  |                                                                                                                                                                                                                                                                                                               |
| onAnimationIterationCapture | `AnimationEventHandler`       | -                  |                                                                                                                                                                                                                                                                                                               |
| onAnimationStart            | `AnimationEventHandler`       | -                  |                                                                                                                                                                                                                                                                                                               |
| onAnimationStartCapture     | `AnimationEventHandler`       | -                  |                                                                                                                                                                                                                                                                                                               |
| onAuxClick                  | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onAuxClickCapture           | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onClick                     | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onClickCapture              | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onClose                     | `(() => void)`                | -                  | Handler that is called when the menu should close after selecting an item.                                                                                                                                                                                                                                    |
| onContextMenu               | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onContextMenuCapture        | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onDoubleClick               | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onDoubleClickCapture        | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onGotPointerCapture         | `PointerEventHandler`         | -                  |                                                                                                                                                                                                                                                                                                               |
| onGotPointerCaptureCapture  | `PointerEventHandler`         | -                  |                                                                                                                                                                                                                                                                                                               |
| onLostPointerCapture        | `PointerEventHandler`         | -                  |                                                                                                                                                                                                                                                                                                               |
| onLostPointerCaptureCapture | `PointerEventHandler`         | -                  |                                                                                                                                                                                                                                                                                                               |
| onMouseDown                 | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onMouseDownCapture          | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onMouseEnter                | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onMouseLeave                | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onMouseMove                 | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onMouseMoveCapture          | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onMouseOut                  | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onMouseOutCapture           | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onMouseOver                 | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onMouseOverCapture          | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onMouseUp                   | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onMouseUpCapture            | `MouseEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onOpenChange                | `((isOpen: boolean) => void)` | -                  | Handler that is called when the overlay's open state changes.                                                                                                                                                                                                                                                 |
| onPointerCancel             | `PointerEventHandler`         | -                  |                                                                                                                                                                                                                                                                                                               |
| onPointerCancelCapture      | `PointerEventHandler`         | -                  |                                                                                                                                                                                                                                                                                                               |
| onPointerDown               | `PointerEventHandler`         | -                  |                                                                                                                                                                                                                                                                                                               |
| onPointerDownCapture        | `PointerEventHandler`         | -                  |                                                                                                                                                                                                                                                                                                               |
| onPointerEnter              | `PointerEventHandler`         | -                  |                                                                                                                                                                                                                                                                                                               |
| onPointerLeave              | `PointerEventHandler`         | -                  |                                                                                                                                                                                                                                                                                                               |
| onPointerMove               | `PointerEventHandler`         | -                  |                                                                                                                                                                                                                                                                                                               |
| onPointerMoveCapture        | `PointerEventHandler`         | -                  |                                                                                                                                                                                                                                                                                                               |
| onPointerOut                | `PointerEventHandler`         | -                  |                                                                                                                                                                                                                                                                                                               |
| onPointerOutCapture         | `PointerEventHandler`         | -                  |                                                                                                                                                                                                                                                                                                               |
| onPointerOver               | `PointerEventHandler`         | -                  |                                                                                                                                                                                                                                                                                                               |
| onPointerOverCapture        | `PointerEventHandler`         | -                  |                                                                                                                                                                                                                                                                                                               |
| onPointerUp                 | `PointerEventHandler`         | -                  |                                                                                                                                                                                                                                                                                                               |
| onPointerUpCapture          | `PointerEventHandler`         | -                  |                                                                                                                                                                                                                                                                                                               |
| onScroll                    | `UIEventHandler`              | -                  |                                                                                                                                                                                                                                                                                                               |
| onScrollCapture             | `UIEventHandler`              | -                  |                                                                                                                                                                                                                                                                                                               |
| onSelectionChange           | `((keys: Selection) => void)` | -                  | Handler that is called when the selection changes.                                                                                                                                                                                                                                                            |
| onTouchCancel               | `TouchEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onTouchCancelCapture        | `TouchEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onTouchEnd                  | `TouchEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onTouchEndCapture           | `TouchEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onTouchMove                 | `TouchEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onTouchMoveCapture          | `TouchEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onTouchStart                | `TouchEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onTouchStartCapture         | `TouchEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onTransitionCancel          | `TransitionEventHandler`      | -                  |                                                                                                                                                                                                                                                                                                               |
| onTransitionCancelCapture   | `TransitionEventHandler`      | -                  |                                                                                                                                                                                                                                                                                                               |
| onTransitionEnd             | `TransitionEventHandler`      | -                  |                                                                                                                                                                                                                                                                                                               |
| onTransitionEndCapture      | `TransitionEventHandler`      | -                  |                                                                                                                                                                                                                                                                                                               |
| onTransitionRun             | `TransitionEventHandler`      | -                  |                                                                                                                                                                                                                                                                                                               |
| onTransitionRunCapture      | `TransitionEventHandler`      | -                  |                                                                                                                                                                                                                                                                                                               |
| onTransitionStart           | `TransitionEventHandler`      | -                  |                                                                                                                                                                                                                                                                                                               |
| onTransitionStartCapture    | `TransitionEventHandler`      | -                  |                                                                                                                                                                                                                                                                                                               |
| onWheel                     | `WheelEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| onWheelCapture              | `WheelEventHandler`           | -                  |                                                                                                                                                                                                                                                                                                               |
| open                        | `boolean`                     | `"false"`          | Whether the menu is open.                                                                                                                                                                                                                                                                                     |
| placement                   | `Placement`                   | `'bottom'`         | Placement of the popover.                                                                                                                                                                                                                                                                                     |
| renderEmptyState            | `(() => ReactNode)`           | -                  | Provides content to display when there are no items in the list.                                                                                                                                                                                                                                              |
| selectedKeys                | `Iterable \| "all"`           | -                  | The currently selected keys in the collection (controlled).                                                                                                                                                                                                                                                   |
| selectionMode               | `SelectionMode`               | -                  | The type of selection that is allowed in the collection.                                                                                                                                                                                                                                                      |
| shouldFocusWrap             | `boolean`                     | -                  | Whether keyboard navigation is circular.                                                                                                                                                                                                                                                                      |
| slot                        | `string \| null`              | -                  | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit \`null\` value indicates that the local props completely override all props received from a parent.                                                                                            |
| translate                   | `"yes" \| "no"`               | -                  |                                                                                                                                                                                                                                                                                                               |
| trigger                     | `MenuTriggerType`             | `'press'`          | How the menu is triggered.                                                                                                                                                                                                                                                                                    |

### Menu.Item

| Prop                        | Type                              | Default | Description                                                                                                                                                                                                           |
| :-------------------------- | :-------------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-label                  | `string`                          | -       | An accessibility label for this item.                                                                                                                                                                                 |
| children                    | `ChildrenOrFunction`              | -       | The children of the component. A function may be provided to alter the children based on component state.                                                                                                             |
| dir                         | `string`                          | -       |                                                                                                                                                                                                                       |
| download                    | `string \| boolean`               | -       | Causes the browser to download the linked URL. A string may be provided to suggest a file name. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).                                   |
| hidden                      | `boolean`                         | -       |                                                                                                                                                                                                                       |
| href                        | `string`                          | -       | A URL to link to. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href).                                                                                                                     |
| hrefLang                    | `string`                          | -       | Hints at the human language of the linked URL. See\[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang).                                                                                     |
| id                          | `Key`                             | -       | The unique id of the item.                                                                                                                                                                                            |
| inert                       | `boolean`                         | -       |                                                                                                                                                                                                                       |
| isDisabled                  | `boolean`                         | -       | Whether the item is disabled.                                                                                                                                                                                         |
| lang                        | `string`                          | -       |                                                                                                                                                                                                                       |
| onAction                    | `(() => void)`                    | -       | Handler that is called when the item is selected.                                                                                                                                                                     |
| onAnimationEnd              | `AnimationEventHandler`           | -       |                                                                                                                                                                                                                       |
| onAnimationEndCapture       | `AnimationEventHandler`           | -       |                                                                                                                                                                                                                       |
| onAnimationIteration        | `AnimationEventHandler`           | -       |                                                                                                                                                                                                                       |
| onAnimationIterationCapture | `AnimationEventHandler`           | -       |                                                                                                                                                                                                                       |
| onAnimationStart            | `AnimationEventHandler`           | -       |                                                                                                                                                                                                                       |
| onAnimationStartCapture     | `AnimationEventHandler`           | -       |                                                                                                                                                                                                                       |
| onAuxClick                  | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onAuxClickCapture           | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onClick                     | `((e: MouseEvent) => void)`       | -       | \*\*Not recommended – use \`onPress\` instead.\*\* \`onClick\` is an alias for \`onPress\` provided for compatibility with other libraries. \`onPress\` provides additional event details for non-mouse interactions. |
| onClickCapture              | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onContextMenu               | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onContextMenuCapture        | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onDoubleClick               | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onDoubleClickCapture        | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onGotPointerCapture         | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onGotPointerCaptureCapture  | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onHoverChange               | `((isHovering: boolean) => void)` | -       | Handler that is called when the hover state changes.                                                                                                                                                                  |
| onHoverEnd                  | `((e: HoverEvent) => void)`       | -       | Handler that is called when a hover interaction ends.                                                                                                                                                                 |
| onHoverStart                | `((e: HoverEvent) => void)`       | -       | Handler that is called when a hover interaction starts.                                                                                                                                                               |
| onLostPointerCapture        | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onLostPointerCaptureCapture | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onMouseDown                 | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseDownCapture          | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseEnter                | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseLeave                | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseMove                 | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseMoveCapture          | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseOut                  | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseOutCapture           | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseOver                 | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseOverCapture          | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseUp                   | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onMouseUpCapture            | `MouseEventHandler`               | -       |                                                                                                                                                                                                                       |
| onPointerCancel             | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerCancelCapture      | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerDown               | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerDownCapture        | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerEnter              | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerLeave              | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerMove               | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerMoveCapture        | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerOut                | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerOutCapture         | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerOver               | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerOverCapture        | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerUp                 | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPointerUpCapture          | `PointerEventHandler`             | -       |                                                                                                                                                                                                                       |
| onPress                     | `((e: PressEvent) => void)`       | -       | Handler that is called when the press is released over the target.                                                                                                                                                    |
| onPressChange               | `((isPressed: boolean) => void)`  | -       | Handler that is called when the press state changes.                                                                                                                                                                  |
| onPressEnd                  | `((e: PressEvent) => void)`       | -       | Handler that is called when a press interaction ends, either over the target or when the pointer leaves the target.                                                                                                   |
| onPressStart                | `((e: PressEvent) => void)`       | -       | Handler that is called when a press interaction starts.                                                                                                                                                               |
| onPressUp                   | `((e: PressEvent) => void)`       | -       | Handler that is called when a press is released over the target, regardless of whether it started on the target or not.                                                                                               |
| onScroll                    | `UIEventHandler`                  | -       |                                                                                                                                                                                                                       |
| onScrollCapture             | `UIEventHandler`                  | -       |                                                                                                                                                                                                                       |
| onTouchCancel               | `TouchEventHandler`               | -       |                                                                                                                                                                                                                       |
| onTouchCancelCapture        | `TouchEventHandler`               | -       |                                                                                                                                                                                                                       |
| onTouchEnd                  | `TouchEventHandler`               | -       |                                                                                                                                                                                                                       |
| onTouchEndCapture           | `TouchEventHandler`               | -       |                                                                                                                                                                                                                       |
| onTouchMove                 | `TouchEventHandler`               | -       |                                                                                                                                                                                                                       |
| onTouchMoveCapture          | `TouchEventHandler`               | -       |                                                                                                                                                                                                                       |
| onTouchStart                | `TouchEventHandler`               | -       |                                                                                                                                                                                                                       |
| onTouchStartCapture         | `TouchEventHandler`               | -       |                                                                                                                                                                                                                       |
| onTransitionCancel          | `TransitionEventHandler`          | -       |                                                                                                                                                                                                                       |
| onTransitionCancelCapture   | `TransitionEventHandler`          | -       |                                                                                                                                                                                                                       |
| onTransitionEnd             | `TransitionEventHandler`          | -       |                                                                                                                                                                                                                       |
| onTransitionEndCapture      | `TransitionEventHandler`          | -       |                                                                                                                                                                                                                       |
| onTransitionRun             | `TransitionEventHandler`          | -       |                                                                                                                                                                                                                       |
| onTransitionRunCapture      | `TransitionEventHandler`          | -       |                                                                                                                                                                                                                       |
| onTransitionStart           | `TransitionEventHandler`          | -       |                                                                                                                                                                                                                       |
| onTransitionStartCapture    | `TransitionEventHandler`          | -       |                                                                                                                                                                                                                       |
| onWheel                     | `WheelEventHandler`               | -       |                                                                                                                                                                                                                       |
| onWheelCapture              | `WheelEventHandler`               | -       |                                                                                                                                                                                                                       |
| ping                        | `string`                          | -       | A space-separated list of URLs to ping when the link is followed. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#ping).                                                                     |
| referrerPolicy              | `HTMLAttributeReferrerPolicy`     | -       | How much of the referrer to send when following the link. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy).                                                                   |
| rel                         | `string`                          | -       | The relationship between the linked resource and the current page. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel).                                                                    |
| routerOptions               | `undefined`                       | -       | Options for the configured client side router.                                                                                                                                                                        |
| target                      | `HTMLAttributeAnchorTarget`       | -       | The target window for the link. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target).                                                                                                     |
| textValue                   | `string`                          | -       | A string representation of the item's contents, used for features like typeahead.                                                                                                                                     |
| translate                   | `"yes" \| "no"`                   | -       |                                                                                                                                                                                                                       |
| value                       | `object`                          | -       | The object value that this item represents. When using dynamic collections, this is set automatically.                                                                                                                |

### Menu.Section

| Prop                        | Type                     | Default | Description                                                                                               |
| :-------------------------- | :----------------------- | :------ | :-------------------------------------------------------------------------------------------------------- |
| aria-label                  | `string`                 | -       | An accessibility label for the section.                                                                   |
| **children (required)**     | `ReactNode`              | -       |                                                                                                           |
| dependencies                | `readonly any[]`         | -       | Values that should invalidate the item cache when using dynamic collections.                              |
| dir                         | `string`                 | -       |                                                                                                           |
| hidden                      | `boolean`                | -       |                                                                                                           |
| id                          | `Key`                    | -       | The unique id of the section.                                                                             |
| inert                       | `boolean`                | -       |                                                                                                           |
| items                       | `Iterable`               | -       | Item objects in the section.                                                                              |
| lang                        | `string`                 | -       |                                                                                                           |
| onAnimationEnd              | `AnimationEventHandler`  | -       |                                                                                                           |
| onAnimationEndCapture       | `AnimationEventHandler`  | -       |                                                                                                           |
| onAnimationIteration        | `AnimationEventHandler`  | -       |                                                                                                           |
| onAnimationIterationCapture | `AnimationEventHandler`  | -       |                                                                                                           |
| onAnimationStart            | `AnimationEventHandler`  | -       |                                                                                                           |
| onAnimationStartCapture     | `AnimationEventHandler`  | -       |                                                                                                           |
| onAuxClick                  | `MouseEventHandler`      | -       |                                                                                                           |
| onAuxClickCapture           | `MouseEventHandler`      | -       |                                                                                                           |
| onClick                     | `MouseEventHandler`      | -       |                                                                                                           |
| onClickCapture              | `MouseEventHandler`      | -       |                                                                                                           |
| onContextMenu               | `MouseEventHandler`      | -       |                                                                                                           |
| onContextMenuCapture        | `MouseEventHandler`      | -       |                                                                                                           |
| onDoubleClick               | `MouseEventHandler`      | -       |                                                                                                           |
| onDoubleClickCapture        | `MouseEventHandler`      | -       |                                                                                                           |
| onGotPointerCapture         | `PointerEventHandler`    | -       |                                                                                                           |
| onGotPointerCaptureCapture  | `PointerEventHandler`    | -       |                                                                                                           |
| onLostPointerCapture        | `PointerEventHandler`    | -       |                                                                                                           |
| onLostPointerCaptureCapture | `PointerEventHandler`    | -       |                                                                                                           |
| onMouseDown                 | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseDownCapture          | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseEnter                | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseLeave                | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseMove                 | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseMoveCapture          | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseOut                  | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseOutCapture           | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseOver                 | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseOverCapture          | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseUp                   | `MouseEventHandler`      | -       |                                                                                                           |
| onMouseUpCapture            | `MouseEventHandler`      | -       |                                                                                                           |
| onPointerCancel             | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerCancelCapture      | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerDown               | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerDownCapture        | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerEnter              | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerLeave              | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerMove               | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerMoveCapture        | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerOut                | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerOutCapture         | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerOver               | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerOverCapture        | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerUp                 | `PointerEventHandler`    | -       |                                                                                                           |
| onPointerUpCapture          | `PointerEventHandler`    | -       |                                                                                                           |
| onScroll                    | `UIEventHandler`         | -       |                                                                                                           |
| onScrollCapture             | `UIEventHandler`         | -       |                                                                                                           |
| onTouchCancel               | `TouchEventHandler`      | -       |                                                                                                           |
| onTouchCancelCapture        | `TouchEventHandler`      | -       |                                                                                                           |
| onTouchEnd                  | `TouchEventHandler`      | -       |                                                                                                           |
| onTouchEndCapture           | `TouchEventHandler`      | -       |                                                                                                           |
| onTouchMove                 | `TouchEventHandler`      | -       |                                                                                                           |
| onTouchMoveCapture          | `TouchEventHandler`      | -       |                                                                                                           |
| onTouchStart                | `TouchEventHandler`      | -       |                                                                                                           |
| onTouchStartCapture         | `TouchEventHandler`      | -       |                                                                                                           |
| onTransitionCancel          | `TransitionEventHandler` | -       |                                                                                                           |
| onTransitionCancelCapture   | `TransitionEventHandler` | -       |                                                                                                           |
| onTransitionEnd             | `TransitionEventHandler` | -       |                                                                                                           |
| onTransitionEndCapture      | `TransitionEventHandler` | -       |                                                                                                           |
| onTransitionRun             | `TransitionEventHandler` | -       |                                                                                                           |
| onTransitionRunCapture      | `TransitionEventHandler` | -       |                                                                                                           |
| onTransitionStart           | `TransitionEventHandler` | -       |                                                                                                           |
| onTransitionStartCapture    | `TransitionEventHandler` | -       |                                                                                                           |
| onWheel                     | `WheelEventHandler`      | -       |                                                                                                           |
| onWheelCapture              | `WheelEventHandler`      | -       |                                                                                                           |
| title                       | `string`                 | -       |                                                                                                           |
| translate                   | `"yes" \| "no"`          | -       |                                                                                                           |
| value                       | `object`                 | -       | The object value that this section represents. When using dynamic collections, this is set automatically. |
