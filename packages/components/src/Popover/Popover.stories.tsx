import { useState } from 'react';
import { expect, fn, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import {
  Archive,
  Bell,
  CircleUser,
  ListFilter,
  Settings2,
  Tag,
  UserPlus,
} from '@marigold/icons';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Checkbox } from '../Checkbox/Checkbox';
import { Description } from '../Description/Description';
import { Inline } from '../Inline/Inline';
import { ListView } from '../ListView/ListView';
import { ActionMenu } from '../Menu/ActionMenu';
import { Select } from '../Select/Select';
import { Stack } from '../Stack/Stack';
import { Switch } from '../Switch/Switch';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';
import { TextValue } from '../TextValue/TextValue';
import { Title } from '../Title/Title';
import { Popover } from './Popover';

const meta = preview.meta({
  title: 'Components/Popover',
  component: Popover,
  // The popover portals into "storybook-root" (see the global
  // `OverlayContainerProvider`); this decorator provides that container so
  // the overlay mounts inside the story canvas during tests.
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    modal: {
      control: { type: 'radio' },
      options: [true, 'trap-focus', false],
      description: 'How strongly the popover takes over the page.',
      table: { defaultValue: { summary: 'true' } },
    },
    width: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
      description: 'Width of the popover on larger screens.',
      table: { defaultValue: { summary: 'medium' } },
    },
    placement: {
      control: { type: 'select' },
      options: ['bottom', 'bottom start', 'bottom end', 'top', 'left', 'right'],
      description: 'Placement of the popover relative to its trigger.',
      table: { defaultValue: { summary: 'bottom' } },
    },
  },
  args: {
    modal: true,
    width: 'medium',
    placement: 'bottom',
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => (
    <Popover.Trigger>
      <Button>Event details</Button>
      <Popover {...args}>
        <Title>Summer Open Air</Title>
        <Description>Sat, 12 July · Stadtgarten</Description>
        <Popover.Content>
          <Text>
            Doors open at 17:00. Seating is unreserved, so arrive early for a
            spot near the stage.
          </Text>
          <Inline space={2}>
            <Button slot="close" variant="primary">
              Got it
            </Button>
          </Inline>
        </Popover.Content>
      </Popover>
    </Popover.Trigger>
  ),
});

Basic.test(
  'Opens a labelled dialog and returns focus to the trigger on Escape',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent, step }) => {
    const trigger = canvas.getByRole('button', { name: 'Event details' });

    await step('opens on press, named by its title', async () => {
      await userEvent.click(trigger);

      const dialog = await canvas.findByRole('dialog', {
        name: 'Summer Open Air',
      });
      await expect(dialog).toBeVisible();
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    await step('modal by default: the page is hidden from AT', async () => {
      await waitFor(() =>
        expect(trigger.closest('[aria-hidden="true"], [inert]')).not.toBeNull()
      );
    });

    await step('Escape closes it and focus goes back', async () => {
      await userEvent.keyboard('{Escape}');

      await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
      await expect(trigger).toHaveFocus();
    });
  }
);

Basic.test(
  'Closes from a button in the close slot',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Event details' })
    );
    await userEvent.click(
      await canvas.findByRole('button', { name: 'Got it' })
    );

    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
  }
);

export const NotDismissable = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <Popover.Trigger dismissable={false}>
      <Button>Event details</Button>
      <Popover {...args} aria-label="Event details">
        <Popover.Content>
          <Text>Doors open at 17:00.</Text>
          <Button slot="close">Close</Button>
        </Popover.Content>
      </Popover>
    </Popover.Trigger>
  ),
});

NotDismissable.test(
  'Stays open on outside interaction',
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Event details' })
    );
    const dialog = await canvas.findByRole('dialog');

    await userEvent.click(document.body);

    await expect(dialog).toBeVisible();
  }
);

export const Controlled = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => {
    const [open, setOpen] = useState(false);

    return (
      <Stack space={2} alignX="left">
        <Text>Open: {String(open)}</Text>
        <Button onPress={() => setOpen(true)}>Open from outside</Button>
        <Popover.Trigger open={open} onOpenChange={setOpen}>
          <Button>Event details</Button>
          <Popover {...args} aria-label="Event details">
            <Popover.Content>
              <Text>Doors open at 17:00.</Text>
            </Popover.Content>
          </Popover>
        </Popover.Trigger>
      </Stack>
    );
  },
});

Controlled.test(
  'Opens from state and reports when it closes',
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Open from outside' })
    );
    await canvas.findByRole('dialog', { name: 'Event details' });

    await userEvent.keyboard('{Escape}');

    await waitFor(() => expect(canvas.getByText('Open: false')).toBeVisible());
    await expect(canvas.queryByRole('dialog')).toBeNull();
  }
);

export const TrapFocus = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  args: { modal: 'trap-focus' },
  render: args => (
    <Stack space={4} alignX="left">
      <Popover.Trigger>
        <Button>Share</Button>
        <Popover {...args}>
          <Title>Share event</Title>
          <Popover.Content>
            <TextField label="Email" />
            <Button slot="close">Send invite</Button>
          </Popover.Content>
        </Popover>
      </Popover.Trigger>
      <Button>Outside</Button>
    </Stack>
  ),
});

TrapFocus.test(
  'Keeps Tab inside the popover',
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Share' }));
    const dialog = await canvas.findByRole('dialog', { name: 'Share event' });

    for (let i = 0; i < 4; i++) {
      await userEvent.tab();
      await expect(dialog).toContainElement(
        document.activeElement as HTMLElement
      );
    }
  }
);

export const NonModal = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  args: { modal: false },
  render: args => (
    <Stack space={4} alignX="left">
      <Popover.Trigger>
        <Button>Event details</Button>
        <Popover {...args} aria-label="Event details">
          <Popover.Content>
            <Text>Doors open at 17:00.</Text>
          </Popover.Content>
        </Popover>
      </Popover.Trigger>
      <Button>Outside</Button>
    </Stack>
  ),
});

NonModal.test(
  'Leaves the page reachable for assistive technology',
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Event details' })
    );
    await canvas.findByRole('dialog', { name: 'Event details' });

    // A modal popover hides the rest of the page (see `Basic`); a non-modal
    // one leaves it alone.
    const outside = canvas.getByRole('button', { name: 'Outside' });
    await expect(outside).toBeVisible();
    await expect(outside.closest('[aria-hidden="true"], [inert]')).toBeNull();
  }
);

// Without `<Popover.Content>`, the children are laid out as the body: the
// popover pads and scrolls them itself, and the title sits flush.
export const WithoutContent = meta.story({
  tags: ['component-test'],
  render: args => (
    <Popover.Trigger>
      <Button>Event details</Button>
      <Popover {...args}>
        <Title>Summer Open Air</Title>
        <Text>Doors open at 17:00.</Text>
      </Popover>
    </Popover.Trigger>
  ),
});

WithoutContent.test(
  'Pads the children like content',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Event details' })
    );
    const dialog = await canvas.findByRole('dialog', {
      name: 'Summer Open Air',
    });
    const title = canvas.getByRole('heading', { name: 'Summer Open Air' });

    await expect(getComputedStyle(dialog).paddingTop).toBe('16px');
    await expect(getComputedStyle(title).paddingLeft).toBe('0px');
  }
);

// A long body scrolls on its own, while the title above it stays put.
const EVENTS = Array.from({ length: 30 }, (_, i) => ({
  id: `event-${i + 1}`,
  name: `Event ${i + 1}`,
}));

export const ScrollingContent = meta.story({
  tags: ['component-test'],
  render: args => (
    <Popover.Trigger>
      <Button>Upcoming events</Button>
      <Popover {...args}>
        <Title>Upcoming events</Title>
        <Popover.Content>
          {EVENTS.map(event => (
            <Text key={event.id}>{event.name}</Text>
          ))}
        </Popover.Content>
      </Popover>
    </Popover.Trigger>
  ),
});

ScrollingContent.test(
  'Scrolls the content, not the title',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Upcoming events' })
    );
    const dialog = await canvas.findByRole('dialog', {
      name: 'Upcoming events',
    });
    const content = dialog.querySelector<HTMLElement>('[data-slot=content]')!;
    const title = canvas.getByRole('heading', { name: 'Upcoming events' });

    await waitFor(() =>
      expect(content.scrollHeight).toBeGreaterThan(content.clientHeight)
    );
    await expect(content).not.toContainElement(title);
  }
);

// Must-support case 1: the notifications panel. Rows carry real controls, so
// they are a `ListView`, not a `Menu` (DST-1489). Same row design as the
// ListView `NotificationsFeed` story: archive plus an overflow menu, no
// per-row switch.
const onArchive = fn();

export const Notifications = meta.story({
  tags: ['component-test'],
  args: { placement: 'bottom end', width: 'large' },
  render: args => (
    <Popover.Trigger>
      <Button size="icon" aria-label="Notifications">
        <Bell />
      </Button>
      <Popover {...args}>
        <Title>Notifications</Title>
        <Description>2 unread</Description>
        <Popover.Content>
          <ListView aria-label="Notifications">
            <ListView.Item id="sold-out" textValue="Summer Open Air sold out">
              <TextValue>Summer Open Air sold out</TextValue>
              <Description>2 minutes ago</Description>
              <ButtonGroup>
                <Button
                  size="icon"
                  aria-label="Archive"
                  onPress={() => onArchive('sold-out')}
                >
                  <Archive />
                </Button>
                <ActionMenu aria-label="Summer Open Air sold out actions">
                  <ActionMenu.Item>Mute thread</ActionMenu.Item>
                  <ActionMenu.Item>Mark as read</ActionMenu.Item>
                </ActionMenu>
              </ButtonGroup>
            </ListView.Item>
            <ListView.Item id="payout" textValue="Payout sent">
              <TextValue>Payout sent</TextValue>
              <Description>1 hour ago</Description>
              <ButtonGroup>
                <Button
                  size="icon"
                  aria-label="Archive"
                  onPress={() => onArchive('payout')}
                >
                  <Archive />
                </Button>
                <ActionMenu aria-label="Payout sent actions">
                  <ActionMenu.Item>Mute thread</ActionMenu.Item>
                  <ActionMenu.Item>Mark as read</ActionMenu.Item>
                </ActionMenu>
              </ButtonGroup>
            </ListView.Item>
          </ListView>
        </Popover.Content>
      </Popover>
    </Popover.Trigger>
  ),
});

Notifications.test(
  'Reaches a control inside a row without closing',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    onArchive.mockClear();
    await userEvent.click(
      canvas.getByRole('button', { name: 'Notifications' })
    );
    const dialog = await canvas.findByRole('dialog', { name: 'Notifications' });

    const [archive] = await canvas.findAllByRole('button', { name: 'Archive' });
    await userEvent.click(archive);

    await expect(onArchive).toHaveBeenCalledWith('sold-out');
    await expect(dialog).toBeVisible();

    // No `Popover.Search` here, so the list keeps real focus (no virtual
    // focus without a field to drive it).
    const [first, second] = canvas.getAllByRole('row');
    first.focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(second).toHaveFocus();
  }
);

// Must-support case 2: a filter panel. Several inputs, committed on Apply.
export const FilterPanel = meta.story({
  args: { placement: 'bottom start' },
  render: args => (
    <Popover.Trigger>
      <Button>
        <ListFilter /> Filters
      </Button>
      <Popover {...args}>
        <Title>Filters</Title>
        <Popover.Content>
          <Select label="Status" defaultValue="on-sale">
            <Select.Option id="on-sale">On sale</Select.Option>
            <Select.Option id="sold-out">Sold out</Select.Option>
            <Select.Option id="cancelled">Cancelled</Select.Option>
          </Select>
          <TextField label="Venue" />
          <Checkbox label="Only my events" />
          <Inline space={2} alignX="right">
            <Button>Reset</Button>
            <Button slot="close" variant="primary">
              Apply
            </Button>
          </Inline>
        </Popover.Content>
      </Popover>
    </Popover.Trigger>
  ),
});

// Must-support case 3: a profile card. Identity and a couple of actions.
export const ProfileCard = meta.story({
  args: { placement: 'bottom end', width: 'small' },
  render: args => (
    <Popover.Trigger>
      <Button size="icon" aria-label="Account">
        <CircleUser />
      </Button>
      <Popover {...args}>
        <Title>Jane Doe</Title>
        <Description>jane.doe@example.com</Description>
        <Popover.Content>
          <Text>Box office · Freiburg</Text>
          <Inline space={2}>
            <Button size="small">Profile</Button>
            <Button size="small">Sign out</Button>
          </Inline>
        </Popover.Content>
      </Popover>
    </Popover.Trigger>
  ),
});

// Must-support case 4: quick settings. Switches, not menu checkbox items: the
// row is content and the switch is one control in it.
export const QuickSettings = meta.story({
  args: { width: 'small' },
  render: args => (
    <Popover.Trigger>
      <Button size="icon" aria-label="Display settings">
        <Settings2 />
      </Button>
      <Popover {...args}>
        <Title>Display</Title>
        <Popover.Content>
          <Switch label="Compact rows" defaultSelected />
          <Switch label="Show seat map" />
          <Select label="Density" defaultValue="cozy">
            <Select.Option id="cozy">Cozy</Select.Option>
            <Select.Option id="comfortable">Comfortable</Select.Option>
          </Select>
        </Popover.Content>
      </Popover>
    </Popover.Trigger>
  ),
});

// Must-support case 5: a searchable list. `Popover.Search` sits next to the
// content it filters and stays in view while the results scroll.
const PEOPLE = [
  { id: 'jane', name: 'Jane Doe' },
  { id: 'john', name: 'John Smith' },
  { id: 'priya', name: 'Priya Natarajan' },
];

export const SearchableList = meta.story({
  tags: ['component-test'],
  render: args => {
    const [assignee, setAssignee] = useState<string | null>(null);

    return (
      <Stack space={2} alignX="left">
        <Text>Assigned: {assignee ?? 'nobody'}</Text>
        <Popover.Trigger>
          <Button>
            <UserPlus /> Assign to
          </Button>
          <Popover {...args}>
            <Title>Assign to</Title>
            <Popover.Search aria-label="Search people" placeholder="Search…" />
            <Popover.Content>
              <ListView
                aria-label="People"
                items={PEOPLE}
                selectionMode="single"
                onSelectionChange={keys =>
                  setAssignee(keys === 'all' ? null : String([...keys][0]))
                }
              >
                {(person: (typeof PEOPLE)[number]) => (
                  <ListView.Item id={person.id} textValue={person.name}>
                    {person.name}
                  </ListView.Item>
                )}
              </ListView>
            </Popover.Content>
          </Popover>
        </Popover.Trigger>
      </Stack>
    );
  },
});

SearchableList.test(
  'Filters the list as the user types',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Assign to' }));
    const search = await canvas.findByRole('searchbox', {
      name: 'Search people',
    });

    await waitFor(() => expect(search).toHaveFocus());
    await expect(search.closest('[data-slot=content]')).toBeNull();

    await userEvent.keyboard('pri');

    await waitFor(() =>
      expect(canvas.getAllByRole('row').map(row => row.textContent)).toEqual([
        'Priya Natarajan',
      ])
    );

    // A `ListView` keeps real focus (its rows hold their own controls), so
    // Tab moves from the field into the results.
    await userEvent.tab();
    await expect(canvas.getByRole('row')).toHaveFocus();
  }
);

// The search filters the popover's own list, never the options of a field or
// the items of a menu opened from inside it (`AutocompleteBoundary`).
export const SearchWithNestedOverlays = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <Popover.Trigger>
      <Button>Assign to</Button>
      <Popover {...args}>
        <Title>Assign to</Title>
        <Popover.Search aria-label="Search people" />
        <Popover.Content>
          <Inline space={2} alignY="bottom">
            <Select label="Team" defaultValue="all">
              <Select.Option id="all">All teams</Select.Option>
              <Select.Option id="box-office">Box office</Select.Option>
            </Select>
            <ActionMenu aria-label="List actions">
              <ActionMenu.Item>Invite people</ActionMenu.Item>
              <ActionMenu.Item>Export list</ActionMenu.Item>
            </ActionMenu>
          </Inline>
          <ListView aria-label="People" items={PEOPLE}>
            {(person: (typeof PEOPLE)[number]) => (
              <ListView.Item id={person.id} textValue={person.name}>
                {person.name}
              </ListView.Item>
            )}
          </ListView>
        </Popover.Content>
      </Popover>
    </Popover.Trigger>
  ),
});

SearchWithNestedOverlays.test(
  'Keeps nested select options and menu items unfiltered',
  async ({ canvas, userEvent, step }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Assign to' }));
    const search = await canvas.findByRole('searchbox', {
      name: 'Search people',
    });
    await waitFor(() => expect(search).toHaveFocus());
    await userEvent.keyboard('jane');

    await step('the list is filtered', async () => {
      await waitFor(() =>
        expect(canvas.getAllByRole('row').map(row => row.textContent)).toEqual([
          'Jane Doe',
        ])
      );
    });

    await step('the select keeps all its options', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /Team/ }));
      await canvas.findByRole('listbox');
      await expect(
        canvas.getAllByRole('option').map(option => option.textContent)
      ).toEqual(['All teams', 'Box office']);
      await userEvent.keyboard('{Escape}');
    });

    await step('the menu keeps all its items', async () => {
      await userEvent.click(
        canvas.getByRole('button', { name: 'List actions' })
      );
      await canvas.findByRole('menu');
      await expect(
        canvas.getAllByRole('menuitem').map(item => item.textContent)
      ).toEqual(['Invite people', 'Export list']);
    });
  }
);

// Must-support case 6: a mini-form with one or two optional fields.
export const MiniForm = meta.story({
  tags: ['component-test'],
  args: { modal: 'trap-focus', width: 'small' },
  render: args => (
    <Popover.Trigger>
      <Button>
        <Tag /> Add label
      </Button>
      <Popover {...args}>
        <Title>New label</Title>
        <Popover.Content>
          <TextField label="Name" />
          <Inline space={2} alignX="right">
            <Button slot="close">Cancel</Button>
            <Button slot="close" variant="primary">
              Add
            </Button>
          </Inline>
        </Popover.Content>
      </Popover>
    </Popover.Trigger>
  ),
});

MiniForm.test(
  'Cancel closes the popover',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Add label' }));
    await userEvent.click(
      await canvas.findByRole('button', { name: 'Cancel' })
    );

    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
  }
);

export const SmallScreen = meta.story({
  tags: ['component-test'],
  globals: {
    viewport: { value: 'smallScreen' },
  },
  render: ScrollingContent.input.render,
});

SmallScreen.test(
  'Renders a tray whose title stays above the scrolling content',
  // Keep the snapshot: the open tray is the small-screen visual state.
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Upcoming events' })
    );

    const tray = await canvas.findByRole('dialog', {
      name: 'Upcoming events',
    });
    await waitFor(() => expect(tray).toBeVisible());

    const content = tray.querySelector<HTMLElement>('[data-slot=content]')!;
    const title = canvas.getByRole('heading', { name: 'Upcoming events' });
    await expect(content).not.toContainElement(title);
    await waitFor(() =>
      expect(content.scrollHeight).toBeGreaterThan(content.clientHeight)
    );
    await expect(canvas.getByRole('button', { name: 'Close' })).toBeVisible();
  }
);
