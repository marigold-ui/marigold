'use client';

import { useRef, useState } from 'react';
import {
  Badge,
  Button,
  Checkbox,
  ConfirmationDialog,
  Description,
  Drawer,
  Form,
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

type VenueData = Omit<Venue, 'id'>;

// Reads the editable fields out of the form. Used both to submit and to detect
// unsaved edits, so the two always agree on what the record's data is.
const readForm = (form: HTMLFormElement): VenueData => {
  const data = new FormData(form);
  return {
    name: String(data.get('name') ?? ''),
    city: String(data.get('city') ?? ''),
    type: String(data.get('type') ?? 'outdoor'),
    capacity: Number(data.get('capacity') ?? 0),
    status: String(data.get('status') ?? 'draft') as Venue['status'],
    accessible: data.has('accessible'),
  };
};

// The values the form starts with, so a close attempt can tell whether the user
// changed anything. Editing starts from the selected record, creating from blank.
const baselineFor = (venue: Venue | null): VenueData =>
  venue
    ? {
        name: venue.name,
        city: venue.city,
        type: venue.type,
        capacity: venue.capacity,
        status: venue.status,
        accessible: venue.accessible,
      }
    : {
        name: '',
        city: '',
        type: 'outdoor',
        capacity: 0,
        status: 'draft',
        accessible: false,
      };

export default () => {
  const { addToast } = useToast();
  const [venues, setVenues] = useState(initialVenues);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [selected, setSelected] = useState<Venue | null>(null);
  const nextIdRef = useRef(initialVenues.length + 1);
  const formRef = useRef<HTMLFormElement>(null);
  const [discardOpen, setDiscardOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    // [!code highlight:11]
    setMode('create');
    setSelected(null);
    setOpen(true);
  };

  const openEdit = (venue: Venue) => {
    setMode('edit');
    setSelected(venue);
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = readForm(e.currentTarget);

    // Simulate a short save so the pending and success states feel real. A real
    // app would await its API call here instead of this timeout.
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 400));

    if (mode === 'create') {
      const id = String(nextIdRef.current++);
      setVenues(prev => [...prev, { id, ...data }]);
      addToast({
        title: 'Venue created',
        description: `“${data.name}” was added to the list.`,
        variant: 'success',
      });
    } else if (selected) {
      setVenues(prev =>
        prev.map(v => (v.id === selected.id ? { ...v, ...data } : v))
      );
      addToast({
        title: 'Changes saved',
        description: `“${data.name}” was updated.`,
        variant: 'success',
      });
    }

    setSaving(false);
    setOpen(false);
  };

  const hasUnsavedChanges = () => {
    const form = formRef.current;
    if (!form) return false;
    const current = readForm(form);
    const baseline = baselineFor(selected);
    return (Object.keys(baseline) as (keyof VenueData)[]).some(
      key => current[key] !== baseline[key]
    );
  };

  // Every close path (close button, Escape) funnels through here. If the form
  // holds unsaved edits, intercept the close and ask before discarding them.
  const requestClose = (next: boolean) => {
    // [!code highlight:7]
    if (!next && hasUnsavedChanges()) {
      setDiscardOpen(true);
      return;
    }
    setOpen(next);
  };

  return (
    <Panel aria-label="Venues">
      <ToastProvider position="bottom-right" />
      {/* [!code highlight:12] */}
      <ConfirmationDialog
        open={discardOpen}
        onOpenChange={setDiscardOpen}
        variant="destructive"
        title="Discard changes?"
        confirmationLabel="Discard"
        cancelLabel="Keep editing"
        autoFocusButton="cancel"
        onConfirm={() => setOpen(false)}
      >
        Your changes have not been saved. If you close the drawer now, they will
        be lost.
      </ConfirmationDialog>
      <Panel.Header>
        <Title>Venues</Title>
        <Description>Add a venue or edit an existing one.</Description>
        <Drawer.Trigger open={open} onOpenChange={requestClose}>
          <Button variant="primary" onPress={openCreate}>
            Add venue
          </Button>
          <Drawer size="medium" closeButton>
            <Form
              unstyled
              ref={formRef}
              key={`${mode}-${selected?.id ?? 'new'}`}
              onSubmit={handleSubmit}
            >
              <Drawer.Title>
                {/* [!code highlight] */}
                {mode === 'create' ? 'Add venue' : 'Edit venue'}
              </Drawer.Title>
              <Drawer.Content>
                <VenueForm venue={selected} />
              </Drawer.Content>
              <Drawer.Actions>
                <Button slot="close" disabled={saving}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" loading={saving}>
                  Save
                </Button>
              </Drawer.Actions>
            </Form>
          </Drawer>
        </Drawer.Trigger>
      </Panel.Header>
      <Panel.Content bleed>
        <Table aria-label="Venues">
          <Table.Header>
            <Table.Column rowHeader>Name</Table.Column>
            <Table.Column>City</Table.Column>
            <Table.Column>Type</Table.Column>
            <Table.Column alignX="right">Capacity</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column alignX="right">Actions</Table.Column>
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
                <Table.Cell alignX="right">
                  {/* [!code highlight:7] */}
                  <Button
                    variant="secondary"
                    size="small"
                    onPress={() => openEdit(venue)}
                  >
                    Edit
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Panel.Content>
    </Panel>
  );
};
