'use client';

import {
  Checkbox,
  Inline,
  Link,
  NumberField,
  Panel,
  Select,
  Stack,
  TextField,
} from '@marigold/components';

export const LocationSettings = () => (
  <Panel headingLevel={3} size="form">
    <Panel.Header>
      <Panel.Title>Location & capacity</Panel.Title>
      <Panel.Description>
        Where the event takes place. The address is shown on the event page,
        tickets, and confirmation emails.
      </Panel.Description>
    </Panel.Header>
    <Panel.Content>
      <Stack space="group">
        <Stack space="regular">
          <TextField
            label="Venue Name"
            description="Name of the building or location, e.g. 'Konzerthaus Freiburg'."
          />
          <TextField
            label="Street"
            description="Street name and number as it should appear on tickets."
          />
          <Inline space="related">
            <TextField label="Postcode" width={20} />
            <TextField label="City" width={44} />
          </Inline>
          <Stack space="tight">
            <Select
              label="Country"
              defaultValue="de"
              description="Pre-filled from your organization's regional defaults."
              width={40}
            >
              <Select.Option id="de">Germany</Select.Option>
              <Select.Option id="at">Austria</Select.Option>
              <Select.Option id="ch">Switzerland</Select.Option>
              <Select.Option id="fr">France</Select.Option>
              <Select.Option id="nl">Netherlands</Select.Option>
            </Select>
            <Link href="https://maps.google.com" target="_blank" size="small">
              Open in maps
            </Link>
          </Stack>
        </Stack>
        <Stack space="regular">
          <Checkbox.Group
            label="Accessibility features"
            description="Shown on the event page so attendees can plan ahead. Only check what the venue actually provides."
          >
            <Checkbox
              value="wheelchair-accessible"
              label="Wheelchair accessible"
              description="Step-free access to the event area, including entrance, seating, and stage view."
            />
            <Checkbox
              value="elevator-access"
              label="Elevator available"
              description="Elevator access to all floors used during the event."
            />
            <Checkbox
              value="accessible-restrooms"
              label="Accessible restrooms"
              description="At least one restroom designed for wheelchair users, with grab bars and sufficient space."
            />
            <Checkbox
              value="hearing-loop"
              label="Hearing loop system"
              description="Induction loop installed in the main event area for hearing aid users."
            />
            <Checkbox
              value="sign-language"
              label="Sign language interpretation"
              description="A sign language interpreter will be present during talks and announcements."
            />
          </Checkbox.Group>
          <TextField
            label="Additional accessibility notes"
            description="Anything not covered above, e.g. accessible parking, entrance details, or sensory-friendly areas."
          />
        </Stack>
      </Stack>
    </Panel.Content>
    <Panel.Collapsible>
      <Panel.CollapsibleHeader>
        <Panel.CollapsibleTitle>Additional details</Panel.CollapsibleTitle>
        <Panel.CollapsibleDescription>
          Room assignments, hybrid event links, and venue capacity.
        </Panel.CollapsibleDescription>
      </Panel.CollapsibleHeader>
      <Panel.CollapsibleContent>
        <Stack space="regular">
          <TextField
            label="Room or area"
            description="Specific room, hall, or outdoor area within the venue. Printed on tickets if set."
            width={64}
          />
          <Stack space="tight">
            <TextField
              label="Online meeting link"
              type="url"
              description="For hybrid or fully remote events. Sent to attendees in the confirmation email."
            />
            <Link href="#" size="small">
              Test meeting link
            </Link>
          </Stack>
          <NumberField
            label="Maximum attendees"
            description="Caps registration at this number. Leave empty for unlimited. If a waitlist is enabled in your event settings, additional sign-ups go on the waitlist."
            hideStepper
            width={32}
          />
        </Stack>
      </Panel.CollapsibleContent>
    </Panel.Collapsible>
  </Panel>
);
