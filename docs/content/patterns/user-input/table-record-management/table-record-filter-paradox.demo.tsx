'use client';

import { useRef, useState } from 'react';
import {
  Badge,
  Button,
  Drawer,
  Form,
  Inline,
  Panel,
  SectionMessage,
  Select,
  Stack,
  Table,
  Text,
  TextField,
  Title,
  useToast,
} from '@marigold/components';

interface Venue {
  id: string;
  name: string;
  city: string;
  status: 'active' | 'draft' | 'archived';
}

const initialVenues: Venue[] = [
  {
    id: '1',
    name: 'Main Street Amphitheater',
    city: 'Laughville',
    status: 'active',
  },
  {
    id: '2',
    name: 'Shakytown Comedy Club',
    city: 'Shakytown',
    status: 'active',
  },
  { id: '3', name: 'Harbor Lights Hall', city: 'Portbury', status: 'draft' },
];

const statusLabels: Record<Venue['status'], string> = {
  active: 'Active',
  draft: 'Draft',
  archived: 'Archived',
};

const statusVariants: Record<Venue['status'], 'success' | 'info' | 'default'> =
  {
    active: 'success',
    draft: 'info',
    archived: 'default',
  };

export default () => {
  const { addToast } = useToast();
  const [venues, setVenues] = useState(initialVenues);
  const [filter, setFilter] = useState<'active' | 'all'>('active');
  const [open, setOpen] = useState(false);
  // The status is controlled so the form can warn the moment the user picks a
  // value that the active filter would hide.
  const [status, setStatus] = useState<Venue['status']>('active');
  const nextIdRef = useRef(initialVenues.length + 1);

  const visible =
    filter === 'active' ? venues.filter(v => v.status === 'active') : venues;

  // Inherit the active filter so a new record stays in view by default.
  const openCreate = () => {
    setStatus(filter === 'active' ? 'active' : 'draft');
    setOpen(true);
  };

  const willBeHidden = filter === 'active' && status !== 'active';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const venue: Venue = {
      id: String(nextIdRef.current++),
      name: String(formData.get('name') ?? ''),
      city: String(formData.get('city') ?? ''),
      status,
    };

    setVenues(prev => [venue, ...prev]);
    addToast({
      title: `“${venue.name}” created`,
      description: willBeHidden
        ? 'It is hidden by the current filter.'
        : undefined,
      variant: willBeHidden ? 'warning' : 'success',
    });
    setOpen(false);
  };

  return (
    <Panel aria-label="Venues">
      <Panel.Content>
        <Inline alignX="between" alignY="center">
          <Inline space="related" alignY="center">
            <Title>Venues</Title>
            <Select
              aria-label="Filter by status"
              value={filter}
              onChange={key => setFilter(key as 'active' | 'all')}
              width={48}
            >
              <Select.Option id="active">Active only</Select.Option>
              <Select.Option id="all">All statuses</Select.Option>
            </Select>
          </Inline>
          <Drawer.Trigger open={open} onOpenChange={setOpen}>
            <Button variant="primary" onPress={openCreate}>
              Add venue
            </Button>
            <Drawer size="medium" closeButton>
              <Form
                unstyled
                key={open ? 'open' : 'closed'}
                onSubmit={handleSubmit}
              >
                <Drawer.Title>Add venue</Drawer.Title>
                <Drawer.Content>
                  <Stack space="regular">
                    <TextField label="Name" name="name" required autoFocus />
                    <TextField label="City" name="city" />
                    <Select
                      label="Status"
                      value={status}
                      onChange={key => setStatus(key as Venue['status'])}
                    >
                      <Select.Option id="active">Active</Select.Option>
                      <Select.Option id="draft">Draft</Select.Option>
                      <Select.Option id="archived">Archived</Select.Option>
                    </Select>
                    {willBeHidden && (
                      <SectionMessage variant="warning">
                        <SectionMessage.Title>
                          This venue will not be visible
                        </SectionMessage.Title>
                        <SectionMessage.Content>
                          <Text>
                            The table is filtered to active venues. Saving with
                            another status hides the new venue from the current
                            view.
                          </Text>
                        </SectionMessage.Content>
                      </SectionMessage>
                    )}
                  </Stack>
                </Drawer.Content>
                <Drawer.Actions>
                  <Button slot="close">Cancel</Button>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                </Drawer.Actions>
              </Form>
            </Drawer>
          </Drawer.Trigger>
        </Inline>
      </Panel.Content>
      <Panel.Content bleed>
        <Table aria-label="Venues">
          <Table.Header>
            <Table.Column rowHeader>Name</Table.Column>
            <Table.Column>City</Table.Column>
            <Table.Column>Status</Table.Column>
          </Table.Header>
          <Table.Body
            items={visible}
            emptyState={() => (
              <Text variant="muted">No venues match the current filter.</Text>
            )}
          >
            {venue => (
              <Table.Row key={venue.id}>
                <Table.Cell>{venue.name}</Table.Cell>
                <Table.Cell>{venue.city}</Table.Cell>
                <Table.Cell>
                  <Badge variant={statusVariants[venue.status]}>
                    {statusLabels[venue.status]}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Panel.Content>
    </Panel>
  );
};
