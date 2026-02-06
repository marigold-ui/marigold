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
      <Table aria-label="Event List">
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
