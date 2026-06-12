'use client';

import { useRef, useState } from 'react';
import {
  Badge,
  Button,
  Checkbox,
  Description,
  Drawer,
  Form,
  Inline,
  NumberField,
  Panel,
  Select,
  Stack,
  Table,
  TextField,
  Title,
  ToastProvider,
  useToast,
} from '@marigold/components';

interface Venue {
  id: string;
  name: string;
  city: string;
  type: string;
  capacity: number;
  status: 'active' | 'draft' | 'archived';
  accessible: boolean;
}

const initialVenues: Venue[] = [
  {
    id: '1',
    name: 'Main Street Amphitheater',
    city: 'Laughville',
    type: 'outdoor',
    capacity: 500,
    status: 'active',
    accessible: true,
  },
  {
    id: '2',
    name: 'Shakytown Comedy Club',
    city: 'Shakytown',
    type: 'club',
    capacity: 300,
    status: 'active',
    accessible: false,
  },
  {
    id: '3',
    name: 'Harbor Lights Hall',
    city: 'Portbury',
    type: 'formal',
    capacity: 850,
    status: 'draft',
    accessible: true,
  },
];

const typeLabels: Record<string, string> = {
  outdoor: 'Outdoor venue',
  club: 'Club or lounge',
  formal: 'Formal venue',
  arena: 'Arena',
};

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

const VenueForm = ({ venue }: { venue: Venue | null }) => (
  <Stack space="regular">
    <TextField
      label="Name"
      name="name"
      defaultValue={venue?.name}
      required
      autoFocus
    />
    <TextField label="City" name="city" defaultValue={venue?.city} />
    <Select label="Type" name="type" defaultValue={venue?.type ?? 'outdoor'}>
      <Select.Option id="outdoor">Outdoor venue</Select.Option>
      <Select.Option id="club">Club or lounge</Select.Option>
      <Select.Option id="formal">Formal venue</Select.Option>
      <Select.Option id="arena">Arena</Select.Option>
    </Select>
    <NumberField
      label="Capacity"
      name="capacity"
      defaultValue={venue?.capacity}
      minValue={0}
      width="1/2"
    />
    <Select
      label="Status"
      name="status"
      defaultValue={venue?.status ?? 'draft'}
    >
      <Select.Option id="active">Active</Select.Option>
      <Select.Option id="draft">Draft</Select.Option>
      <Select.Option id="archived">Archived</Select.Option>
    </Select>
    <Checkbox
      label="Wheelchair accessible"
      name="accessible"
      value="true"
      defaultChecked={venue?.accessible}
    />
  </Stack>
);

export default () => {
  const { addToast } = useToast();
  const [venues, setVenues] = useState(initialVenues);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [selected, setSelected] = useState<Venue | null>(null);
  const nextIdRef = useRef(initialVenues.length + 1);

  const openCreate = () => {
    setMode('create');
    setSelected(null);
    setOpen(true);
  };

  const openEdit = (id: React.Key) => {
    const venue = venues.find(v => v.id === id);
    if (venue) {
      setMode('edit');
      setSelected(venue);
      setOpen(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: String(formData.get('name') ?? ''),
      city: String(formData.get('city') ?? ''),
      type: String(formData.get('type') ?? 'outdoor'),
      capacity: Number(formData.get('capacity') ?? 0),
      status: String(formData.get('status') ?? 'draft') as Venue['status'],
      accessible: formData.has('accessible'),
    };

    if (mode === 'create') {
      const id = String(nextIdRef.current++);
      setVenues(prev => [{ id, ...data }, ...prev]);
      addToast({ title: `“${data.name}” created`, variant: 'success' });
    } else if (selected) {
      setVenues(prev =>
        prev.map(v => (v.id === selected.id ? { ...v, ...data } : v))
      );
      addToast({ title: `“${data.name}” updated`, variant: 'success' });
    }

    setOpen(false);
  };

  return (
    <Panel aria-label="Venues">
      <ToastProvider position="bottom-right" />
      <Panel.Content>
        <Inline alignX="between" alignY="center">
          <Stack space="tight">
            <Title>Venues</Title>
            <Description>Select a row to edit it.</Description>
          </Stack>
          <Drawer.Trigger open={open} onOpenChange={setOpen}>
            <Button variant="primary" onPress={openCreate}>
              Add venue
            </Button>
            <Drawer size="medium" closeButton>
              <Form
                unstyled
                key={`${mode}-${selected?.id ?? 'new'}`}
                onSubmit={handleSubmit}
              >
                <Drawer.Title>
                  {mode === 'create' ? 'Add venue' : 'Edit venue'}
                </Drawer.Title>
                <Drawer.Content>
                  <VenueForm venue={selected} />
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
        <Table aria-label="Venues" onRowAction={openEdit}>
          <Table.Header>
            <Table.Column rowHeader>Name</Table.Column>
            <Table.Column>City</Table.Column>
            <Table.Column>Type</Table.Column>
            <Table.Column alignX="right">Capacity</Table.Column>
            <Table.Column>Status</Table.Column>
          </Table.Header>
          <Table.Body>
            {venues.map(venue => (
              <Table.Row key={venue.id}>
                <Table.Cell>{venue.name}</Table.Cell>
                <Table.Cell>{venue.city}</Table.Cell>
                <Table.Cell>{typeLabels[venue.type]}</Table.Cell>
                <Table.Cell alignX="right">
                  {venue.capacity.toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  <Badge variant={statusVariants[venue.status]}>
                    {statusLabels[venue.status]}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Panel.Content>
    </Panel>
  );
};
