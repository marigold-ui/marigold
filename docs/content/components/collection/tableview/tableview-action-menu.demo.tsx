import { venues } from '@/lib/data/venues';
import { Archive, CloudDownload, UserCog } from 'lucide-react';
import {
  ActionMenu,
  Button,
  Inline,
  TableView,
  Tooltip,
} from '@marigold/components';
import { Edit, Star } from '@marigold/icons';

export default () => (
  <TableView aria-label="Venue List">
    <TableView.Header>
      <TableView.Column>Venue</TableView.Column>
      <TableView.Column>Address</TableView.Column>
      <TableView.Column align="right">Rating</TableView.Column>
      <TableView.Column>Action</TableView.Column>
    </TableView.Header>
    <TableView.Body>
      {venues.slice(0, 3).map(item => (
        <TableView.Row key={item.id}>
          <TableView.Cell>{item.name}</TableView.Cell>
          <TableView.Cell>
            {item.street}, {item.city}
          </TableView.Cell>
          <TableView.Cell>{item.rating}</TableView.Cell>
          <TableView.Cell>
            <Inline space={1} alignX="center" noWrap>
              <Tooltip.Trigger>
                <Button size="small">
                  <Edit />
                </Button>
                <Tooltip>Edit</Tooltip>
              </Tooltip.Trigger>
              <Tooltip.Trigger>
                <Button size="small">
                  <Star />
                </Button>
                <Tooltip>View Ratings</Tooltip>
              </Tooltip.Trigger>
              <ActionMenu size="small">
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
            </Inline>
          </TableView.Cell>
        </TableView.Row>
      ))}
    </TableView.Body>
  </TableView>
);
