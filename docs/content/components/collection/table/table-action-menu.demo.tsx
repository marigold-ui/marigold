import { venues } from '@/lib/data/venues';
import { Archive, CloudDownload, UserCog } from 'lucide-react';
import {
  ActionMenu,
  Button,
  Inline,
  Menu,
  Table,
  Tooltip,
} from '@marigold/components';
import { Edit, Star } from '@marigold/icons';

export default () => (
  <Table aria-label="Venue List" stretch>
    <Table.Header>
      <Table.Column>Venue</Table.Column>
      <Table.Column>Address</Table.Column>
      <Table.Column align="right">Rating</Table.Column>
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
            <Inline space={1} alignX="center">
              <Tooltip.Trigger>
                <Button>
                  <Edit />
                </Button>
                <Tooltip>Edit</Tooltip>
              </Tooltip.Trigger>
              <Tooltip.Trigger>
                <Button>
                  <Star />
                </Button>
                <Tooltip>View Ratings</Tooltip>
              </Tooltip.Trigger>
              <ActionMenu>
                <Menu.Item id="assign">
                  <UserCog className="size-4" /> Assign account manager
                </Menu.Item>
                <Menu.Item id="download">
                  <CloudDownload className="size-4" />
                  Download Data
                </Menu.Item>
                <Menu.Item id="archive">
                  <Archive className="size-4" /> Archive
                </Menu.Item>
              </ActionMenu>
            </Inline>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
