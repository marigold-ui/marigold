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
    dismissable: {
      control: { type: 'boolean' },
      description:
        'Whether the popover closes when the user interacts outside of it.',
      table: { defaultValue: { summary: 'true' } },
    },
    keyboardDismissable: {
      control: { type: 'boolean' },
      description: 'Whether the popover closes when the user presses Escape.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    dismissable: true,
    keyboardDismissable: true,
    children: undefined,
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => (
    <Popover {...args}>
      <Button>Event details</Button>
      <Popover.Content>
        <Title>Summer Open Air</Title>
        <Description>Sat, 12 July · Stadtgarten</Description>
        <Text>
          Doors open at 17:00. Seating is unreserved, so arrive early for a spot
          near the stage.
        </Text>
        <Inline space={2}>
          <Button slot="close" variant="primary">
            Got it
          </Button>
        </Inline>
      </Popover.Content>
    </Popover>
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

Basic.test(
  'Stays open on outside interaction when not dismissable',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { dismissable: false },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Event details' })
    );
    const dialog = await canvas.findByRole('dialog');

    await userEvent.click(document.body);

    await expect(dialog).toBeVisible();
  }
);

export const TrapFocus = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <Stack space={4} alignX="left">
      <Popover {...args}>
        <Button>Share</Button>
        <Popover.Content modal="trap-focus">
          <Title>Share event</Title>
          <TextField label="Email" />
          <Button slot="close">Send invite</Button>
        </Popover.Content>
      </Popover>
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
  render: args => (
    <Stack space={4} alignX="left">
      <Popover {...args}>
        <Button>Event details</Button>
        <Popover.Content modal={false} aria-label="Event details">
          <Text>Doors open at 17:00.</Text>
        </Popover.Content>
      </Popover>
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

// Must-support case 1: the notifications panel. Rows carry real controls, so
// they are a `ListView`, not a `Menu` (DST-1489). Same row design as the
// ListView `NotificationsFeed` story: archive plus an overflow menu, no
// per-row switch.
const onArchive = fn();

export const Notifications = meta.story({
  tags: ['component-test'],
  render: args => (
    <Popover {...args}>
      <Button size="icon" aria-label="Notifications">
        <Bell />
      </Button>
      <Popover.Content placement="bottom end" width="large">
        <Title>Notifications</Title>
        <Description>2 unread</Description>
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
  }
);

// Must-support case 2: a filter panel. Several inputs, committed on Apply.
export const FilterPanel = meta.story({
  render: args => (
    <Popover {...args}>
      <Button>
        <ListFilter /> Filters
      </Button>
      <Popover.Content placement="bottom start">
        <Title>Filters</Title>
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
  ),
});

// Must-support case 3: a profile card. Identity and a couple of actions.
export const ProfileCard = meta.story({
  render: args => (
    <Popover {...args}>
      <Button size="icon" aria-label="Account">
        <CircleUser />
      </Button>
      <Popover.Content placement="bottom end" width="small">
        <Title>Jane Doe</Title>
        <Description>jane.doe@example.com</Description>
        <Text>Box office · Freiburg</Text>
        <Inline space={2}>
          <Button size="small">Profile</Button>
          <Button size="small">Sign out</Button>
        </Inline>
      </Popover.Content>
    </Popover>
  ),
});

// Must-support case 4: quick settings. Switches, not menu checkbox items: the
// row is content and the switch is one control in it.
export const QuickSettings = meta.story({
  render: args => (
    <Popover {...args}>
      <Button size="icon" aria-label="Display settings">
        <Settings2 />
      </Button>
      <Popover.Content width="small">
        <Title>Display</Title>
        <Switch label="Compact rows" defaultSelected />
        <Switch label="Show seat map" />
        <Select label="Density" defaultValue="cozy">
          <Select.Option id="cozy">Cozy</Select.Option>
          <Select.Option id="comfortable">Comfortable</Select.Option>
        </Select>
      </Popover.Content>
    </Popover>
  ),
});

// Must-support case 5: a searchable list via `Popover.Search`.
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
        <Popover {...args}>
          <Button>
            <UserPlus /> Assign to
          </Button>
          <Popover.Content>
            <Title>Assign to</Title>
            <Popover.Search aria-label="Search people" placeholder="Search…">
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
            </Popover.Search>
          </Popover.Content>
        </Popover>
        <Text>Assigned: {assignee ?? 'nobody'}</Text>
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
    await userEvent.keyboard('pri');

    await waitFor(() =>
      expect(canvas.getAllByRole('row').map(row => row.textContent)).toEqual([
        'Priya Natarajan',
      ])
    );
  }
);

// Must-support case 6: a mini-form with one or two optional fields.
export const MiniForm = meta.story({
  tags: ['component-test'],
  render: args => (
    <Popover {...args}>
      <Button>
        <Tag /> Add label
      </Button>
      <Popover.Content modal="trap-focus" width="small">
        <Title>New label</Title>
        <TextField label="Name" />
        <Inline space={2} alignX="right">
          <Button slot="close">Cancel</Button>
          <Button slot="close" variant="primary">
            Add
          </Button>
        </Inline>
      </Popover.Content>
    </Popover>
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
  render: Basic.input.render,
});

SmallScreen.test(
  'Renders a tray named by the same title',
  // Keep the snapshot: the open tray is the small-screen visual state.
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Event details' })
    );

    const tray = await canvas.findByRole('dialog', { name: 'Summer Open Air' });
    await waitFor(() => expect(tray).toBeVisible());
    await expect(canvas.getByRole('button', { name: 'Close' })).toBeVisible();
  }
);
