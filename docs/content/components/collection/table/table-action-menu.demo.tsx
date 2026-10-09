import { venues } from '@/lib/data/venues';
import { Archive, CloudDownload, UserCog } from 'lucide-react';
import {
  ActionMenu,
  Button,
  ButtonGroup,
  Table,
  Tooltip,
} from '@marigold/components';
import { Edit, Star } from '@marigold/icons';

export default () => (
  <Table aria-label="Venue List">
    <Table.Header>
      <Table.Column rowHeader>Venue</Table.Column>
      <Table.Column>Address</Table.Column>
      <Table.Column alignX="right">Rating</Table.Column>
      <Table.Column>Action</Table.Column>
    </Table.Header>
    <Table.Body>
      {venues.slice(0, 3).map(item => (
        <Table.Row key={item.id}>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>
            {item.street}, {item.city}
          </Table.Cell>
          <Table.Cell>{item.rating}</Table.Cell>
          <Table.Cell>
            <ButtonGroup
              aria-label={`Actions for ${item.name}`}
              variant="ghost"
              size="icon"
            >
              <Tooltip.Trigger>
                <Button aria-label="Edit">
                  <Edit />
                </Button>
                <Tooltip>Edit</Tooltip>
              </Tooltip.Trigger>
              <Tooltip.Trigger>
                <Button aria-label="View Ratings">
                  <Star />
                </Button>
                <Tooltip>View Ratings</Tooltip>
              </Tooltip.Trigger>
              <ActionMenu aria-label="More actions">
                <ActionMenu.Item id="assign">
                  <UserCog /> Assign account manager
                </ActionMenu.Item>
                <ActionMenu.Item id="download">
                  <CloudDownload />
                  Download Data
                </ActionMenu.Item>
                <ActionMenu.Item id="archive">
                  <Archive /> Archive
                </ActionMenu.Item>
              </ActionMenu>
            </ButtonGroup>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
