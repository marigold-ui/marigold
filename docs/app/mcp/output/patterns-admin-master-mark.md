# Admin- and Mastermark

_Marking internal-only features._

The admin- and master mark is a visual pattern used to signal that a setting or function is not available to organizers, but reserved for internal use by developers or Reservix employees. It provides a clear boundary between organizer-facing features and internal tools, helping designers and developers avoid accidental exposure of internal controls in user interfaces.

## Anatomy

The admin- and master mark uses color and labeling to indicate internal access. It appears either as a badge placed near the related element or section of a page, or through direct coloring of the element itself.

The badge contains the text "Admin" or "Master", depending on the role. To ensure quick visual differentiation, "Admin" is represented in purple and "Master" in orange. This consistent use of color helps communicate access levels clearly and supports scannability in shared interfaces.

```tsx title="admin-master-mark-anatomy"
import { Badge, Inline } from '@marigold/components';

export default () => (
  <Inline space={12} alignX="center">
    <Inline space={2} alignX="center">
      <Badge variant="admin">Admin</Badge>
      <div className="size-6 rounded-lg bg-(--color-access-admin-foreground)" />
      <div className="bg-access-admin size-6 rounded-lg" />
    </Inline>
    <Inline space={2} alignX="center">
      <Badge variant="master">Master</Badge>
      <div className="size-6 rounded-lg bg-(--color-access-master-foreground)" />
      <div className="bg-access-master size-6 rounded-lg" />
    </Inline>
  </Inline>
);
```

## Usage

The admin- and master mark is used to indicate that certain features in the user interface are not intended and visible for end users. In shared views where both internal users and end users operate, this pattern helps prevent confusion and highlights which elements are meant for internal use only.

- The **"Admin"** mark is applied to elements intended for developers. This includes technical tools such as environment toggles, debug options, or features still under development.
- The **"Master"** mark is used for features that are available to Reservix employees, such as internal workflows, support-only settings, or tools used by account management teams.

Apply the admin- and master mark in situations where internal-only functionality appears in shared views. Typical scenarios include:

- Controls in user interfaces visible to external users.
- Developer-specific configuration options that are not part of the public feature set.
- Features that are technically in production but intentionally hidden from or not relevant to external users.
- Functionality that is still under development, can only be partially enabled, or currently in a testing or staging phase.

This pattern is not a substitute for proper role-based access control. It should not be used to control visibility or enforce permissions. It also does not need to be applied in fully internal tools where organizers do not have access at all since in those cases, there is no risk of confusion and no need for additional visual marking.

### Placement

The admin- and master mark should be placed directly to the right of the label or heading of the section or element it applies to. This ensures the access distinction is immediately visible and clearly associated with the relevant control.

Use the `<Badge>` component with the "master" or "admin" variant to place the mark next to the label in form fields or input groups. This ensures that users understand the access level before interacting with the field. Placing it beside the label ensures a clean layout and avoids any confusion about its relation to the field content.

Consider using a `<Card>` with the "master" or "admin" variant to visually separate entire sections of a form or settings page that are internal-only. This makes the form easier to scan and understand at a glance.

In navigation elements such as tabs or grouped settings, place the mark next to the tab label or section heading. This makes it clear that the entire area is intended for internal use.

```tsx title="admin-master-mark-placement"
import {
  Badge,
  Card,
  Checkbox,
  List,
  Select,
  Stack,
  Table,
  Tabs,
  TextField,
} from '@marigold/components';

export default () => (
  <Tabs aria-label="Organizer details">
    <Tabs.List aria-label="Organizer views">
      <Tabs.Item id="overview">Overview</Tabs.Item>
      <Tabs.Item id="events">Events</Tabs.Item>
      <Tabs.Item id="sales">
        Sales Notes <Badge variant="admin">Admin</Badge>
      </Tabs.Item>
    </Tabs.List>
    <Tabs.TabPanel id="overview">
      <Stack space={4}>
        <TextField
          label="Organizer Name"
          width="1/2"
          defaultValue="Lumen Events"
        />
        <Select
          label="Organizer Type"
          width={48}
          defaultSelectedKey={'promoter'}
        >
          <Select.Option id="agency">Agency</Select.Option>
          <Select.Option id="venue">Venue</Select.Option>
          <Select.Option id="promoter">Promoter</Select.Option>
          <Select.Option id="freelancer">Freelancer</Select.Option>
        </Select>
        <Card variant="master">
          <Select
            label={
              <>
                Associated Team <Badge variant="master">Master</Badge>
              </>
            }
            width={56}
            description="Select the team responsible for this organizer."
            defaultSelectedKey={'regional'}
          >
            <Select.Option id="inbound">Inbound Sales</Select.Option>
            <Select.Option id="outbound">Outbound Sales</Select.Option>
            <Select.Option id="keyaccounts">Key Accounts</Select.Option>
            <Select.Option id="regional">Regional Sales</Select.Option>
          </Select>
        </Card>
        <Card variant="admin">
          <Checkbox
            label={
              <>
                Enable Diagnostics <Badge variant="admin">Admin</Badge>
              </>
            }
            description="Allow system diagnostics and data collection for this organizer to improve service quality."
            defaultChecked
          />
        </Card>
      </Stack>
    </Tabs.TabPanel>
    <Tabs.TabPanel id="events">
      <Table aria-label="Event List" stretch>
        <Table.Header>
          <Table.Column>Name</Table.Column>
          <Table.Column>Date</Table.Column>
          <Table.Column>Location</Table.Column>
          <Table.Column>Status</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Spring Gala</Table.Cell>
            <Table.Cell>April 15, 2025</Table.Cell>
            <Table.Cell>Hamburg</Table.Cell>
            <Table.Cell>Confirmed</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jazz Night</Table.Cell>
            <Table.Cell>May 2, 2025</Table.Cell>
            <Table.Cell>Munich</Table.Cell>
            <Table.Cell>Sold Out</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Open Air Theater</Table.Cell>
            <Table.Cell>June 10, 2025</Table.Cell>
            <Table.Cell>Berlin</Table.Cell>
            <Table.Cell>On Sale</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Comedy Fest</Table.Cell>
            <Table.Cell>July 8, 2025</Table.Cell>
            <Table.Cell>Cologne</Table.Cell>
            <Table.Cell>Draft</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Classical Evening</Table.Cell>
            <Table.Cell>August 20, 2025</Table.Cell>
            <Table.Cell>Stuttgart</Table.Cell>
            <Table.Cell>Confirmed</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Tabs.TabPanel>
    <Tabs.TabPanel id="sales">
      <List>
        <List.Item>
          Reached out at Event Business Forum 2023. Very interested in bundling
          services.
        </List.Item>
        <List.Item>
          Prefers flexible contract terms due to seasonal event scheduling.
          Requested a trial phase before full onboarding.
        </List.Item>
        <List.Item>
          Potential for upselling premium analytics tools later this year. Wait
          until after Q3 for follow-up.
        </List.Item>
        <List.Item>
          Sent revised offer on June 10. Waiting for internal approval on their
          side before next steps.
        </List.Item>
      </List>
    </Tabs.TabPanel>
  </Tabs>
);
```

Avoid placing the mark at a distance from the related element. Doing so reduces clarity and can lead to incorrect assumptions about access. The mark is a functional visual indicator and should be treated with the same attention as labels or status cues.

### Within a Table

In tables, the admin- and master mark is not applied as a badge. Instead, internal-only rows are visually distinguished through background color and a subtle inline indicator. To apply the color use the "master" or "admin" variant on the `<Table.Row>` component.

This exception is intentional. Since badges can clutter dense tabular layouts, a more lightweight visual cue is used to signal internal visibility. A soft background tint helps set these rows apart without disrupting the structure of the table. An inline label or icon may be used when additional clarity is needed.

Use this approach when:

- A table contains a mix of internal and external data
- Some rows are only relevant to internal users (e.g. test entries, system-generated records, flagged data)
- You want to preserve alignment and readability without adding badges to every row

```tsx title="admin-master-mark-table"
import { Table } from '@marigold/components';

export default () => (
  <Table aria-label="Event List" stretch>
    <Table.Header>
      <Table.Column>Event Name</Table.Column>
      <Table.Column>Date</Table.Column>
      <Table.Column>Status</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row key="1">
        <Table.Cell>Spring Gala</Table.Cell>
        <Table.Cell>April 15, 2025</Table.Cell>
        <Table.Cell>Confirmed</Table.Cell>
      </Table.Row>
      <Table.Row key="2">
        <Table.Cell>Jazz Night</Table.Cell>
        <Table.Cell>May 2, 2025</Table.Cell>
        <Table.Cell>Sold Out</Table.Cell>
      </Table.Row>
      <Table.Row key="3" variant="admin">
        <Table.Cell>System Test Entry</Table.Cell>
        <Table.Cell>–</Table.Cell>
        <Table.Cell>Internal</Table.Cell>
      </Table.Row>
      <Table.Row key="4">
        <Table.Cell>Open Air Theater</Table.Cell>
        <Table.Cell>June 10, 2025</Table.Cell>
        <Table.Cell>On Sale</Table.Cell>
      </Table.Row>
      <Table.Row key="5" variant="admin">
        <Table.Cell>Flagged: Duplicate Listing</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>Review Needed</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);
```

## Related

- [Table](/components/collection/table) - Organize and display large amout of data in table format.

- [Badge](/components/content/badge) - Component for short notes with one color as status messages
