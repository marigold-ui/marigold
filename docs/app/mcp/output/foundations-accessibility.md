# Accessibility

_A guide to accessibility best practices for making your product usable for all._

Delivering valuable, inspirational, and accessible experiences for all users, including those with disabilities, is everyone’s responsibility. We are committed to creating products where no one is left behind or faces a confusing or exclusionary experience. We continually iterate on Marigold to provide you with built-in accessibility features across our components, foundations, guidelines, and tooling.

However, how you use Marigold also affects the accessibility of a product. Learn on this page what accessibility means and how to make your apps accessible.

## What is accessibility?

Accessibility means making websites and apps easy for everyone to use, including people with disabilities. Disabilities can affect how someone sees, hears, or interacts with an app. The goal is to remove barriers, so everyone has the same access to content and features.

Here are the main areas to focus on:

- **Perceivability:** Ensure everyone can perceive your app by providing alt text for images and maintaining sufficient color contrast for readability. Also, include text alternatives for multimedia content, like captions for videos, to support users with visual or hearing impairments.
- **Operability:** Make your app usable with a keyboard to support users who cannot use a mouse. Ensure all interactive elements are accessible via keyboard, and allow users enough time to complete tasks without timing out.
- **Understandability:** Keep your content simple and easy to navigate. Use concise language, consistent navigation patterns, and clear error messages to help users understand and fix mistakes quickly.
- **Robustness:** Ensure your app works across devices, browsers, and assistive technologies by using semantic HTML and ARIA labels. Structure content logically with proper headings and labeled inputs to support screen reader users.

Keeping these points in mind makes your app more inclusive and user-friendly for everyone!

## Creating accessible apps

Thanks to [React Aria](https://react-spectrum.adobe.com/react-aria/), Marigold components come with built-in accessibility features, and we provide guidelines in the component documentation to help you follow best practices. However, it's important to remember that ensuring accessibility compliance when using Marigold components is a team effort. Accessibility is a shared responsibility, and everyone plays a part in making products inclusive for all.

> ℹ️ Powered by React Aria: Marigold is built using React Aria, a powerful library of unstyled React
> components and hooks designed to help create accessible, high-quality UI
> components. React Aria is essential to the development of Marigold, ensuring
> our components meet the highest accessibility standards. If you want to
> learn more, check out their
> docs.

Read on to learn more about how to ensure accessibility in your products and what is already taken care of by Marigold.

### ARIA attributes

Marigold implements accessibility support following the [WAI-ARIA specification](https://www.w3.org/WAI/standards-guidelines/aria/), which defines semantics for UI controls to help assistive technologies like screen readers understand the purpose of DOM elements. When native HTML elements can’t be used for styling or if no native element exists, ARIA is applied to give presentational elements semantic meaning. This allows screen readers and other assistive technology to understand these elements and announce them properly to the user.

However, ARIA only specifies semantics, developers are responsible for implementing behaviors and interactions with JavaScript, using the [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) to ensure proper keyboard interactions and accessibility.

### Labeling

Marigold includes most of the necessary accessibility features by default, but there’s one key thing you need to add: a text label for each control. This label helps screen reader users understand the control they are interacting with.

For form elements like text fields, checkboxes, or dropdowns, it’s best to provide a visible label. Marigold will automatically link this label with the control so that assistive technologies can describe it correctly.

If a visible label isn’t needed or you’re using a control without a built-in label, you’ll need to use the `aria-label` or `aria-labelledby` properties to ensure it’s accessible. Marigold will usually show a console warning if both a visible label and an ARIA label are missing.

To illustrate how labeling works, see the following examples. In the code below, the `<Button>` only shows an icon (✖), so the `aria-label` provides a description (“Close”) for screen readers.

```tsx
<Button aria-label="Close">✖</Button>
```

In the following example, the `aria-labelledby` attribute references both the ids of the heading (section-title) and the description (section-description). When the region is focused, a screen reader will announce both “Account Settings” and “Update your username, email, and password here,” providing clear context for the user.

```jsx
<Headline level="2" id="section-title">Account Settings</Headline>
<Text id="section-description">
  Update your username, email, and password here.
</Text>
<div role="region" aria-labelledby="section-title section-description">
  {/* Form content goes here */}
</div>
```

### Keyboard navigation

All components have built-in keyboard support, making it easy for users who can’t use a mouse or touch screen to navigate. But it also helps users who prefer using the keyboard to move around more quickly. The keyboard behavior follows the [W3C’s ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/), so it feels natural and familiar to users of common desktop systems.

Keyboard navigation is organized into tab stops, which you can move through using the Tab key (forward) and Shift + Tab (backward). A tab stop can be a single component like a button or text field, or a composite component like a listbox, radio group, or toolbar. Composite components act as one tab stop, with inner elements navigated using the arrow keys.

Check out the demo below to explore how keyboard navigation works. After clicking anywhere in the demo, use the arrow keys to move through the table, press space to select a row, and start typing to jump directly to a specific record.

```tsx title="accessibility-keyboard"
import { DateFormat, NumericFormat } from '@/ui';
import { useState } from 'react';
import type { Selection } from '@marigold/components';
import {
  Badge,
  Button,
  Headline,
  Stack,
  Table,
  Text,
} from '@marigold/components';

interface Event {
  id: number;
  name: string;
  date: string;
  price: number;
  availableTickets: number;
  status: 'available' | 'limited' | 'soldout';
}

const items: Event[] = [
  {
    id: 1,
    name: 'The Laughing Llamas',
    date: '2024-10-12',
    price: 75,
    availableTickets: 122,
    status: 'available',
  },
  {
    id: 2,
    name: "Broadway's Biggest Burrito",
    date: '2024-10-15',
    price: 95,
    availableTickets: 53,
    status: 'limited',
  },
  {
    id: 3,
    name: 'Ultimate Pillow Fight Finals',
    date: '2024-11-02',
    price: 150,
    availableTickets: 0,
    status: 'soldout',
  },
  {
    id: 4,
    name: 'The Cheesy Joke Marathon',
    date: '2024-10-20',
    price: 40,
    availableTickets: 201,
    status: 'available',
  },
  {
    id: 5,
    name: 'Symphony of Snoring',
    date: '2024-11-05',
    price: 60,
    availableTickets: 89,
    status: 'available',
  },
  {
    id: 6,
    name: 'The Great Mustache Showcase',
    date: '2024-12-01',
    price: 25,
    availableTickets: 336,
    status: 'available',
  },
];

const STATUS = {
  available: 'success',
  limited: 'warning',
  soldout: 'error',
};

export default () => {
  const [selected, setSelected] = useState<Selection>(new Set());
  const count = selected === 'all' ? selected : selected.size;

  return (
    <Stack space={6} alignX="right">
      <Stack space={3} stretch>
        <header>
          <Headline id="table-header" level="5">
            Event List
          </Headline>
          <Text id="table-description" color="accent-700">
            Select events to generate statistics for analysis.
          </Text>
        </header>
        <Table
          aria-labelledby="table-header table-description"
          selectionMode="multiple"
          stretch
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          <Table.Header>
            <Table.Column>Name</Table.Column>
            <Table.Column>Date</Table.Column>
            <Table.Column align="right">Price</Table.Column>
            <Table.Column align="right">Available Tickets</Table.Column>
            <Table.Column align="right">Status</Table.Column>
          </Table.Header>
          <Table.Body items={items}>
            {item => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>
                  <DateFormat
                    dateStyle="medium"
                    value={new Date(`${item.date}`)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <NumericFormat
                    style="currency"
                    value={item.price}
                    currency="EUR"
                  />
                </Table.Cell>
                <Table.Cell>
                  <NumericFormat value={item.availableTickets} tabular />
                </Table.Cell>
                <Table.Cell>
                  <Badge variant={STATUS[item.status] as any}>
                    {item.status}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Stack>
      <Button variant="primary" disabled={count === 0}>
        Create statistics for {count} events
      </Button>
    </Stack>
  );
};
```

### Focus management

Focus support, like keyboard navigation, is crucial for users who can’t use a mouse or touch screen. It also benefits power users who prefer faster navigation without switching from the keyboard.

A key feature for keyboard users is the [focus ring](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html), a visual indicator showing which element is currently focused. This helps keyboard users know where they are on the page. The focus ring should only appear during keyboard navigation to avoid distracting mouse and touchscreen users.

Additionally, overlay elements like dialogs, popovers, and menus have special focus behavior to keep focus within them while open. Once they are closed, focus is returned to the element that initially opened them.

To test this, try the demo below using only your keyboard. Tab through all the elements to see how the focus remains contained within the dialog.

```tsx title="accessibility-focus"
import {
  Button,
  Center,
  Checkbox,
  Dialog,
  Headline,
  Inline,
  Stack,
} from '@marigold/components';

export default () => (
  <Center>
    <Dialog.Trigger>
      <Button variant="primary">Open notification settings</Button>
      <Dialog closeButton>
        {({ close }) => (
          <>
            <Headline id="dialog-headline" level={2}>
              Notification settings
            </Headline>
            <Stack space={4}>
              <Checkbox.Group aria-labelledby="dialog-headline">
                <Checkbox
                  value="newsletter"
                  defaultChecked
                  label="Email Newsletter"
                />
                <Checkbox value="reminder" label="Event Reminders" />
                <Checkbox value="promo" label="Promo Notifications" />
              </Checkbox.Group>
              <Inline space={4}>
                <Button variant="primary" onPress={close}>
                  Update
                </Button>
                <Button variant="secondary" onPress={close}>
                  Cancel
                </Button>
              </Inline>
            </Stack>
          </>
        )}
      </Dialog>
    </Dialog.Trigger>
  </Center>
);
```

### Dynamic content

Apps often dynamically update their user interface, such as when displaying search results or showing alerts. To make these updates accessible, ARIA live regions are used. They enable screen readers to automatically announce changes, ensuring users stay informed without needing to shift focus.

It’s the developer’s responsibility to make sure these dynamic content updates are announce by using ARIA live regions. The aria-live attribute controls how screen readers announce updates to dynamic content. It sets the priority for announcements, with three possible values: `off`, `polite`, and `assertive`.

- `aria-live="polite"` is the most commonly used setting. It ensures that updates are announced when the user is idle, making it ideal for non-urgent information, such as search results.
- `aria-live="assertive"` should be reserved for critical, time-sensitive updates. It immediately interrupts any ongoing announcements to grab the user’s attention, but because it can be disruptive, it should be used sparingly.
- `aria-live="off"` doesn’t prevent updates from being announced but limits them to when the element is focused or interacted with.

Choosing the correct `aria-live` setting is crucial to ensure the right balance between informing users and avoiding unnecessary interruptions. To learn more, check out the [guide on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) or explore the excellent [article by Sara Soueidan](https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-1/).

Below is a demo showcasing the use of `aria-live` along with an `aria-control`. Changing the selection will update the UI, and the screen reader will announce this change to ensure accessibility.

```tsx title="accessibility-aria-live"
import { venueTypes, venues } from '@/lib/data/venues';
import { useState } from 'react';
import {
  Aside,
  Button,
  Columns,
  Form,
  Inline,
  Select,
  Stack,
  Text,
} from '@marigold/components';
import { NumericFormat } from '@marigold/system';

export default () => {
  const [selectedVenue, setSelectedVenue] = useState<string>(venues[0].id);
  const current = venues.find(venue => venue.id === selectedVenue)!;

  return (
    <Stack space={8}>
      <Form
        onSubmit={e => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const venue = form.get('venue')!;
          setSelectedVenue(venue.toString());
        }}
      >
        <Inline space={2}>
          <Select
            aria-label="Select a venue:"
            name="venue"
            width={64}
            defaultSelectedKey={selectedVenue}
          >
            {venues.slice(0, 10).map(venue => (
              <Select.Option key={venue.id} id={venue.id}>
                {venue.name}
              </Select.Option>
            ))}
          </Select>
          <Button variant="primary" type="submit" aria-controls="venueDetails">
            View details
          </Button>
        </Inline>
      </Form>
      <Aside sideWidth="160px" space={8}>
        <img alt="" className="rounded" src={current.image} />
        <Stack space={6} id="venueDetails" role="region" aria-live="polite">
          <Stack>
            <Text weight="extrabold" fontSize="2xl">
              {current.name}
            </Text>
            <Text fontStyle="italic" variant="muted">
              {venueTypes[current.type]}
            </Text>
          </Stack>
          <Stack>
            <Text weight="bold">Description</Text>
            <Text variant="muted">{current.description}</Text>
          </Stack>
          <Columns columns={[1, 1, 1]} space={4}>
            <Stack>
              <Text weight="bold">Address</Text>
              <Text variant="muted">{current.street}</Text>
              <Text variant="muted">{current.city}</Text>
            </Stack>
            <Stack>
              <Text weight="bold">Capacity</Text>
              <Text variant="muted">{current.capacity}</Text>
            </Stack>
            <Stack>
              <Text weight="bold">Price</Text>
              <Text variant="muted">
                <NumericFormat
                  style="currency"
                  value={[current.price.from, current.price.to]}
                  currency="EUR"
                  notation="compact"
                />
              </Text>
            </Stack>
          </Columns>
        </Stack>
      </Aside>
    </Stack>
  );
};
```

## Test accessibility yourself

To truly understand the accessibility of your product, test it for yourself using a screen reader. Tools like NVDA, JAWS, and VoiceOver allow you to experience your product as a user who relies on assistive technologies would. Navigate through your app, interact with elements, and listen for how well the content is announced. This hands-on approach helps you catch accessibility issues early and ensure an inclusive experience for all users.

Below is a list of screen readers available for different devices.

##### macOS

- **[VoiceOver](https://support.apple.com/guide/voiceover/welcome/mac)** - Built-in screen reader for macOS.

##### iOS

- **[VoiceOver](https://support.apple.com/guide/iphone/turn-on-and-set-up-voiceover-iph3e2e415f/ios)** - Built-in screen reader for iPhones and iPads.

##### Windows

- **[Narrator](https://support.microsoft.com/en-us/windows/chapter-1-introducing-narrator-c0b27732-4811-c0e6-7f2c-21021c8cf1ed)** - Built-in screen reader for Windows.
- **[NVDA (NonVisual Desktop Access)](https://www.nvaccess.org/)** - Free, open-source screen reader for Windows.
- **[JAWS (Job Access With Speech)](https://www.freedomscientific.com/products/software/jaws/)** - A popular screen reader for Windows (commercial).

##### Ubuntu (Linux)

- **[Orca](https://help.gnome.org/users/orca/stable/)** - Free, open-source screen reader included with the GNOME desktop environment.
