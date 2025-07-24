import { Link, Table } from '@marigold/components';

export default () => (
  <Table aria-label="Event Links Table" stretch>
    <Table.Header>
      <Table.Column>Event</Table.Column>
      <Table.Column>Details</Table.Column>
      <Table.Column>Website</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Annual Tech Conference</Table.Cell>
        <Table.Cell>
          Join industry leaders for a day of talks and networking.
        </Table.Cell>
        <Table.Cell>
          <Link href="https://techconf.example.com" target="_blank">
            techconf.example.com
          </Link>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>React Advanced Workshop</Table.Cell>
        <Table.Cell>
          Hands-on coding session for intermediate React developers.
        </Table.Cell>
        <Table.Cell>
          <Link href="https://reactworkshop.example.com" target="_blank">
            reactworkshop.example.com
          </Link>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Frontend Community Meetup</Table.Cell>
        <Table.Cell>Monthly meetup for frontend enthusiasts.</Table.Cell>
        <Table.Cell>
          <Link href="https://frontendmeetup.example.com" target="_blank">
            frontendmeetup.example.com
          </Link>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);
