import { useMemo, useState } from 'react';
import { expect, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import type { Key, Selection } from '@react-types/shared';
import { Copy, Download, Pencil, Trash2 } from '@marigold/icons';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Description } from '../Description/Description';
import { EmptyState } from '../EmptyState/EmptyState';
import { Form } from '../Form/Form';
import { Inline } from '../Inline/Inline';
import { ActionMenu } from '../Menu/ActionMenu';
import { SearchField } from '../SearchField/SearchField';
import { Select } from '../Select/Select';
import { Table } from '../Table/Table';
import { Tag } from '../TagGroup/Tag';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';
import { Title } from '../Title/Title';
import { Dialog } from './Dialog';

const meta = preview.meta({
  title: 'Components/Dialog',
  component: Dialog,
  parameters: { surface: false },
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: {
        type: 'radio',
      },
      description: 'Size of the dialog',
      options: ['default', 'xsmall', 'small', 'medium', 'large', 'fullscreen'],
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    dismissable: true,
    keyboardDismissable: true,
    size: 'small',
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: ({ size, ...args }) => (
    <Dialog.Trigger {...args}>
      <Button variant="primary">Open</Button>
      <Dialog size={size} closeButton>
        <Dialog.Title>Enable notifications</Dialog.Title>
        <Dialog.Content>
          Would you like to receive notifications for upcoming events and
          updates?
        </Dialog.Content>
        <Dialog.Actions>
          <Button variant="secondary" slot="close">
            Cancel
          </Button>
          <Button variant="primary" slot="close">
            Enable
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Dialog.Trigger>
  ),
});

Basic.test(
  'Open dialog',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));

    await waitFor(() => expect(canvas.getByRole('dialog')).toBeInTheDocument());
  }
);

Basic.test('Close dialog', async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
  await userEvent.click(canvas.getByRole('button', { name: 'Cancel' }));

  await waitFor(() =>
    expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
  );
});

// Minimal render-prop + form example. Kept as the fixture for the
// "children as function" and "form validation" unit tests in Dialog.test.tsx.
export const WithFormValidation = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  render: ({ size, ...args }) => (
    <Dialog.Trigger {...args} dismissable={false}>
      <Button variant="primary">Open</Button>
      <Dialog size={size}>
        {({ close }) => (
          <>
            <Dialog.Title>Please enter validation code</Dialog.Title>
            <Dialog.Content>
              <Form
                id="code-form"
                onSubmit={e => {
                  e.preventDefault();
                  close();
                }}
              >
                <TextField label="Code" name="code" required />
              </Form>
            </Dialog.Content>
            <Dialog.Actions>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button variant="primary" type="submit" form="code-form">
                Submit
              </Button>
            </Dialog.Actions>
          </>
        )}
      </Dialog>
    </Dialog.Trigger>
  ),
});

const fullscreenVenues = [
  {
    id: 'astra',
    name: 'Astra Kulturhaus',
    city: 'Berlin',
    capacity: '1,500',
    type: 'Club',
  },
  {
    id: 'gruenspan',
    name: 'Grünspan',
    city: 'Hamburg',
    capacity: '1,200',
    type: 'Club',
  },
  {
    id: 'backstage',
    name: 'Backstage',
    city: 'Munich',
    capacity: '900',
    type: 'Club',
  },
  {
    id: 'zakk',
    name: 'zakk',
    city: 'Dusseldorf',
    capacity: '1,000',
    type: 'Club',
  },
  {
    id: 'batschkapp',
    name: 'Batschkapp',
    city: 'Frankfurt',
    capacity: '1,500',
    type: 'Club',
  },
  {
    id: 'conne-island',
    name: 'Conne Island',
    city: 'Leipzig',
    capacity: '1,100',
    type: 'Club',
  },
  {
    id: 'palladium',
    name: 'Palladium',
    city: 'Cologne',
    capacity: '4,000',
    type: 'Concert Hall',
  },
  {
    id: 'capitol',
    name: 'Capitol',
    city: 'Hanover',
    capacity: '1,350',
    type: 'Concert Hall',
  },
  {
    id: 'longhorn',
    name: 'LKA Longhorn',
    city: 'Stuttgart',
    capacity: '1,100',
    type: 'Concert Hall',
  },
  {
    id: 'alte-oper',
    name: 'Alte Oper',
    city: 'Frankfurt',
    capacity: '2,500',
    type: 'Concert Hall',
  },
  {
    id: 'laeiszhalle',
    name: 'Laeiszhalle',
    city: 'Hamburg',
    capacity: '2,000',
    type: 'Concert Hall',
  },
  {
    id: 'waldbuehne',
    name: 'Waldbühne',
    city: 'Berlin',
    capacity: '22,000',
    type: 'Open Air',
  },
  {
    id: 'loreley',
    name: 'Loreley',
    city: 'St. Goarshausen',
    capacity: '15,000',
    type: 'Open Air',
  },
  {
    id: 'zitadelle',
    name: 'Zitadelle',
    city: 'Berlin',
    capacity: '8,000',
    type: 'Open Air',
  },
  {
    id: 'kesselhaus',
    name: 'Kesselhaus Open Air',
    city: 'Augsburg',
    capacity: '3,500',
    type: 'Open Air',
  },
  {
    id: 'schauspielhaus',
    name: 'Schauspielhaus',
    city: 'Bochum',
    capacity: '800',
    type: 'Theatre',
  },
  {
    id: 'deutsches-theater',
    name: 'Deutsches Theater',
    city: 'Berlin',
    capacity: '600',
    type: 'Theatre',
  },
  {
    id: 'thalia',
    name: 'Thalia Theater',
    city: 'Hamburg',
    capacity: '1,000',
    type: 'Theatre',
  },
  {
    id: 'residenz',
    name: 'Residenztheater',
    city: 'Munich',
    capacity: '900',
    type: 'Theatre',
  },
  {
    id: 'lanxess',
    name: 'Lanxess Arena',
    city: 'Cologne',
    capacity: '18,000',
    type: 'Arena',
  },
  {
    id: 'barclays',
    name: 'Barclays Arena',
    city: 'Hamburg',
    capacity: '16,000',
    type: 'Arena',
  },
  {
    id: 'olympiahalle',
    name: 'Olympiahalle',
    city: 'Munich',
    capacity: '15,500',
    type: 'Arena',
  },
  {
    id: 'festhalle',
    name: 'Festhalle',
    city: 'Frankfurt',
    capacity: '13,000',
    type: 'Arena',
  },
  {
    id: 'sap-garden',
    name: 'SAP Garden',
    city: 'Munich',
    capacity: '11,500',
    type: 'Arena',
  },
];

const fullscreenVenueTypes = [
  'Club',
  'Concert Hall',
  'Open Air',
  'Theatre',
  'Arena',
];

interface FullscreenPickProps {
  size?: string;
  dismissable?: boolean;
  keyboardDismissable?: boolean;
}

// A content-heavy pick, the case the `fullscreen` size exists for.
const FullscreenPick = ({ size, ...args }: FullscreenPickProps) => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<Key | null>('all');
  const [selected, setSelected] = useState<Set<Key>>(() => new Set());

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    return fullscreenVenues.filter(venue => {
      const matchesSearch =
        !query || `${venue.name} ${venue.city}`.toLowerCase().includes(query);
      const matchesType = type == null || type === 'all' || venue.type === type;
      return matchesSearch && matchesType;
    });
  }, [search, type]);

  // Keep venues staged even while a search or filter hides them from view.
  const onSelectionChange = (keys: Selection) => {
    const visibleIds = new Set(results.map(venue => venue.id));
    setSelected(prev => {
      const offView = [...prev].filter(key => !visibleIds.has(String(key)));
      const visible = keys === 'all' ? [...visibleIds] : [...keys];
      return new Set<Key>([...offView, ...visible]);
    });
  };

  const unstage = (keys: Set<Key>) => {
    setSelected(prev => {
      const next = new Set<Key>(prev);
      keys.forEach(key => next.delete(key));
      return next;
    });
  };

  const staged = fullscreenVenues.filter(venue => selected.has(venue.id));

  return (
    <Dialog.Trigger {...args}>
      <Button variant="primary">Select venues</Button>
      <Dialog size={size} closeButton>
        <Dialog.Title>Select venues</Dialog.Title>
        <Dialog.Content>
          <div className="flex h-full min-h-0 flex-col gap-4">
            <Inline space={2} alignY="input">
              <SearchField
                aria-label="Search venues"
                placeholder="Search by name or city"
                value={search}
                onChange={setSearch}
                width={64}
              />
              <Select
                aria-label="Filter by type"
                value={type}
                onChange={setType}
                width={40}
              >
                <Select.Option id="all">All types</Select.Option>
                {fullscreenVenueTypes.map(t => (
                  <Select.Option key={t} id={t}>
                    {t}
                  </Select.Option>
                ))}
              </Select>
            </Inline>

            {staged.length > 0 && (
              <Tag.Group
                label={`Staged (${staged.length})`}
                selectionMode="none"
                onRemove={unstage}
              >
                {staged.map(venue => (
                  <Tag key={venue.id} id={venue.id}>
                    {venue.name}
                  </Tag>
                ))}
              </Tag.Group>
            )}

            <div
              className="min-h-0 flex-1 overflow-auto"
              data-testid="venue-list"
            >
              <Table
                aria-label="Venues"
                selectionMode="multiple"
                selectedKeys={selected}
                onSelectionChange={onSelectionChange}
              >
                <Table.Header sticky>
                  <Table.Column rowHeader>Venue</Table.Column>
                  <Table.Column>City</Table.Column>
                  <Table.Column>Type</Table.Column>
                  <Table.Column>Capacity</Table.Column>
                </Table.Header>
                <Table.Body
                  items={results}
                  emptyState={() => (
                    <EmptyState
                      title="No venues match"
                      description="Try a different search or type. Anything you already staged stays listed above."
                    />
                  )}
                >
                  {venue => (
                    <Table.Row id={venue.id}>
                      <Table.Cell>{venue.name}</Table.Cell>
                      <Table.Cell>{venue.city}</Table.Cell>
                      <Table.Cell>{venue.type}</Table.Cell>
                      <Table.Cell>{venue.capacity}</Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </div>
          </div>
        </Dialog.Content>
        <Dialog.Actions>
          <Button variant="secondary" slot="close">
            Cancel
          </Button>
          <Button variant="primary" slot="close">
            Add {staged.length} {staged.length === 1 ? 'venue' : 'venues'}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Dialog.Trigger>
  );
};

export const Fullscreen = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  args: { size: 'fullscreen' },
  render: args => <FullscreenPick {...args} />,
});

// The one snapshot for the fullscreen size: the open dialog filling the viewport.
Fullscreen.test(
  'fills the viewport',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Select venues' })
    );

    await waitFor(() => expect(canvas.getByRole('dialog')).toBeInTheDocument());

    const rect = canvas.getByRole('dialog').getBoundingClientRect();
    expect(rect.width).toBeGreaterThan(window.innerWidth * 0.8);
    expect(rect.height).toBeGreaterThan(window.innerHeight * 0.8);
  }
);

Fullscreen.test(
  'scrolls the table region, not the header area or the dialog',
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Select venues' })
    );

    await waitFor(() => expect(canvas.getByRole('dialog')).toBeInTheDocument());

    const dialog = canvas.getByRole('dialog');
    const content = canvas.getByTestId('dialog-content');
    const list = canvas.getByTestId('venue-list');

    // Only the table region scrolls (the long venue list overflows it)...
    expect(list.scrollHeight).toBeGreaterThan(list.clientHeight);
    // ...the search/filter/tags area fits without scrolling...
    expect(content.scrollHeight).toBeLessThanOrEqual(content.clientHeight + 1);
    // ...and the dialog surface itself is clipped, so it can never scroll.
    expect(getComputedStyle(dialog).overflowY).toBe('hidden');
  }
);

export const VeryLongContent = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => {
    const { size, ...triggerArgs } = args;
    return (
      <Dialog.Trigger {...triggerArgs}>
        <Button variant="primary">Open Dialog with Long Content</Button>
        <Dialog size={size} closeButton>
          <Title>Terms and Conditions</Title>
          <Dialog.Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Text>
            <Text>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </Text>
            <Text>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
              non numquam eius modi tempora incidunt ut labore et dolore magnam
              aliquam quaerat voluptatem.
            </Text>
            <Text>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit qui in ea
              voluptate velit esse quam nihil molestiae consequatur, vel illum
              qui dolorem eum fugiat quo voluptas nulla pariatur?
            </Text>
            <Text>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga.
            </Text>
            <Text>
              Et harum quidem rerum facilis est et expedita distinctio. Nam
              libero tempore, cum soluta nobis est eligendi optio cumque nihil
              impedit quo minus id quod maxime placeat facere possimus, omnis
              voluptas assumenda est, omnis dolor repellendus.
            </Text>
            <Text>
              Temporibus autem quibusdam et aut officiis debitis aut rerum
              necessitatibus saepe eveniet ut et voluptates repudiandae sint et
              molestiae non recusandae. Itaque earum rerum hic tenetur a
              sapiente delectus, ut aut reiciendis voluptatibus maiores alias
              consequatur aut perferendis doloribus asperiores repellat.
            </Text>
            <Text>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit.
            </Text>
            <Text>
              Sed quia non numquam eius modi tempora incidunt ut labore et
              dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur.
            </Text>
            <Text>
              Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At
              vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi.
            </Text>
            <Text>
              Id est laborum et dolorum fuga. Et harum quidem rerum facilis est
              et expedita distinctio. Nam libero tempore, cum soluta nobis est
              eligendi optio cumque nihil impedit quo minus id quod maxime
              placeat facere possimus, omnis voluptas assumenda est, omnis dolor
              repellendus.
            </Text>
            <Text>
              Temporibus autem quibusdam et aut officiis debitis aut rerum
              necessitatibus saepe eveniet ut et voluptates repudiandae sint et
              molestiae non recusandae. Itaque earum rerum hic tenetur a
              sapiente delectus, ut aut reiciendis voluptatibus maiores alias
              consequatur aut perferendis doloribus asperiores repellat.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Text>
            <Text>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </Text>
            <Text>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
              non numquam eius modi tempora incidunt ut labore et dolore magnam
              aliquam quaerat voluptatem.
            </Text>
            <Text>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit qui in ea
              voluptate velit esse quam nihil molestiae consequatur, vel illum
              qui dolorem eum fugiat quo voluptas nulla pariatur?
            </Text>
            <Text>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button variant="secondary" slot="close">
              Decline
            </Button>
            <Button variant="primary" slot="close">
              Accept
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Dialog.Trigger>
    );
  },
});

VeryLongContent.test(
  'Shows very long content',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Open Dialog with Long Content' })
    );

    await waitFor(() => {
      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog).toBeVisible();
    });

    const dialog = document.querySelector('[role="dialog"]')!;

    const dialogContent = dialog.querySelector(
      '[data-testid="dialog-content"]'
    )!;
    expect(dialogContent.scrollHeight).toBeGreaterThan(
      dialogContent.clientHeight
    );

    // Test scroll functionality - scroll to bottom
    dialogContent.scrollTop = dialogContent.scrollHeight;
    expect(dialogContent.scrollTop).toBeGreaterThan(0);
  }
);

/**
 * The slot-aware primitives `<Title>` / `<Description>` and the action
 * primitives can be used directly — `<Dialog.Header>` groups the title and
 * description, and a `<ButtonGroup>` inside `<Dialog.Actions>` picks up its
 * defaults from the dialog root.
 */
export const SlotPrimitives = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: ({ size, ...args }) => (
    <Dialog.Trigger {...args}>
      <Button variant="primary">Open</Button>
      <Dialog size={size} closeButton>
        <Dialog.Header>
          <Title>Manage event</Title>
          <Description>Update, duplicate, or remove this event.</Description>
        </Dialog.Header>
        <Dialog.Content>
          Choose an action below. Changes apply immediately.
        </Dialog.Content>
        <Dialog.Actions>
          <ButtonGroup aria-label="Event actions">
            <Button>
              <Pencil />
              Edit
            </Button>
            <Button>
              <Copy />
              Duplicate
            </Button>
            <ActionMenu aria-label="More actions">
              <ActionMenu.Item id="export">
                <Download />
                Export
              </ActionMenu.Item>
              <ActionMenu.Item id="delete" variant="destructive">
                <Trash2 />
                Delete
              </ActionMenu.Item>
            </ActionMenu>
          </ButtonGroup>
        </Dialog.Actions>
      </Dialog>
    </Dialog.Trigger>
  ),
});

SlotPrimitives.test(
  'Renders slot primitives with grouped actions',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(canvas.getByRole('dialog')).toBeInTheDocument());

    expect(
      canvas.getByRole('heading', { name: 'Manage event' })
    ).toBeInTheDocument();
    expect(
      canvas.getByText('Update, duplicate, or remove this event.').tagName
    ).toBe('P');
    expect(
      canvas.getByRole('toolbar', { name: 'Event actions' })
    ).toBeInTheDocument();
  }
);

/**
 * A bare `<Title slot="title">` (no `<Dialog.Header>`, no description) is a
 * fully valid, accessible title — the dialog's `aria-labelledby` resolves to
 * it automatically.
 */
export const TitleOnlyWithoutHeader = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: ({ size, ...args }) => (
    <Dialog.Trigger {...args}>
      <Button variant="primary">Open</Button>
      <Dialog size={size} closeButton>
        <Title>Session expiring</Title>
        <Dialog.Content>
          Your session will expire in 5 minutes. Save your work to avoid losing
          changes.
        </Dialog.Content>
      </Dialog>
    </Dialog.Trigger>
  ),
});

TitleOnlyWithoutHeader.test(
  'Labels the dialog with a bare Title',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));

    const dialog = await waitFor(() =>
      canvas.getByRole('dialog', { name: 'Session expiring' })
    );
    const title = canvas.getByRole('heading', { name: 'Session expiring' });

    expect(title.tagName).toBe('H2');
    expect(dialog).toHaveAttribute('aria-labelledby', title.id);
  }
);
