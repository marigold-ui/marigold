'use client';

import { venues } from '@/lib/data/venues';
import { Archive, CloudDownload, UserCog } from 'lucide-react';
import {
  ActionMenu,
  Button,
  Inline,
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
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
