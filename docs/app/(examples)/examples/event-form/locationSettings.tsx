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
        Venue, address, and accessibility information.
      </Panel.Description>
    </Panel.Header>
    <Panel.Content>
      <Stack space="group">
        <Stack space="regular">
          <TextField label="Venue Name" />
          <TextField label="Street" />
          <Inline space="related">
            <TextField label="Postcode" width={20} />
            <TextField label="City" width={44} />
          </Inline>
          <Stack space="tight">
            <Select label="Country" defaultValue="de" width={40}>
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
          <Checkbox.Group label="Accessibility Features">
            <Checkbox
              value="wheelchair-accessible"
              label="Wheelchair accessible"
            />
            <Checkbox value="elevator-access" label="Elevator available" />
            <Checkbox
              value="accessible-restrooms"
              label="Accessible restrooms"
            />
            <Checkbox value="hearing-loop" label="Hearing loop system" />
            <Checkbox
              value="sign-language"
              label="Sign language interpretation"
            />
          </Checkbox.Group>
          <TextField
            label="Additional Accessibility Notes"
            description="Anything not covered above, e.g. parking or entrance details."
          />
        </Stack>
      </Stack>
    </Panel.Content>
    <Panel.Collapsible>
      <Panel.CollapsibleHeader>
        <Panel.CollapsibleTitle>
          Advanced location settings
        </Panel.CollapsibleTitle>
      </Panel.CollapsibleHeader>
      <Panel.CollapsibleContent>
        <Stack space="regular">
          <TextField
            label="Room or Area"
            description="Specific room, hall, or outdoor area within the venue."
            width={64}
          />
          <Stack space="tight">
            <TextField
              label="Online Meeting Link"
              type="url"
              description="For hybrid or fully remote events."
            />
            <Link href="#" size="small">
              Test meeting link
            </Link>
          </Stack>
          <NumberField
            label="Maximum Attendees"
            description="Leave empty for unlimited."
            hideStepper
            width={32}
          />
        </Stack>
      </Panel.CollapsibleContent>
    </Panel.Collapsible>
  </Panel>
);
