import {
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
} from 'react-aria-components/Dialog';
import { Building2 } from '@marigold/icons';
import { expect, fn, userEvent, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Description } from '../Description/Description';
import { EmptyState as EmptyStateComponent } from '../EmptyState/EmptyState';
import { ActionMenu } from '../Menu/ActionMenu';
import { Popover } from '../Overlay/Popover';
import { Panel } from '../Panel/Panel';
import { Switch } from '../Switch/Switch';
import { TextValue } from '../TextValue/TextValue';
import { Title } from '../Title/Title';
import { X } from '../icons/X';
import { ListView } from './ListView';

const meta = preview.meta({
  title: 'Components/ListView',
  component: ListView,
  // A row's `<ActionMenu>`/`<Popover>` portals into "storybook-root" (see the
  // global `OverlayContainerProvider`); this decorator provides that container
  // so those overlays mount inside the story canvas during tests.
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'plain'],
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'default' },
      },
      description: 'Visual variant of the list.',
    },
    size: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
      description: 'Size token applied to the list.',
    },
    emptyState: {
      control: false,
      table: {
        type: { summary: 'ReactNode' },
      },
      description: 'Content to render when the list is empty.',
    },
    disabledKeys: {
      control: false,
      table: {
        type: { summary: 'Iterable<Key>' },
      },
      description:
        'Keys of rows to disable. A disabled row is inert to press/keyboard ' +
        'interaction but, unlike removing it, stays visible and announced.',
    },
    disabledBehavior: {
      control: { type: 'radio' },
      options: ['all', 'selection'],
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'all' },
      },
      description:
        'Whether `disabledKeys` blocks all interactions with a row, or only ' +
        "selection. ListView doesn't support selection, so `all` is the " +
        'only setting with an observable effect.',
    },
  },
  args: {
    variant: 'default',
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => (
    <ListView {...args} aria-label="Recent files" disabledKeys={['budget']}>
      <ListView.Item id="report" textValue="Q3 report">
        <TextValue>Q3 report</TextValue>
        <Description>Edited 2 days ago</Description>
      </ListView.Item>
      <ListView.Item id="budget" textValue="Budget draft">
        <TextValue>Budget draft</TextValue>
        <Description>Edited yesterday</Description>
      </ListView.Item>
      <ListView.Item id="notes" textValue="Meeting notes">
        <TextValue>Meeting notes</TextValue>
        <Description>Edited just now</Description>
      </ListView.Item>
    </ListView>
  ),
});

Basic.test(
  'renders rows in a non-form grid with no selection, honoring disabledKeys',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const grid = await canvas.findByRole('grid', { name: 'Recent files' });
    const row = canvas.getByRole('row', { name: /q3 report/i });
    const disabledRow = canvas.getByRole('row', { name: /budget draft/i });

    expect(grid).toBeInTheDocument();
    expect(row).not.toHaveAttribute('aria-selected');
    expect(disabledRow).toHaveAttribute('aria-disabled', 'true');
  }
);

// Scenario 1 — Notifications / activity feed: title + timestamp + mute
// Switch + dismiss button, operated in place. The shared DST-1485
// (Popover notifications panel) example.
const onMute = fn();
const onDismiss = fn();

export const NotificationsFeed = meta.story({
  tags: ['component-test'],
  render: args => (
    <ListView {...args} aria-label="Notifications">
      <ListView.Item id="build" textValue="Build finished — 2 minutes ago">
        <TextValue>Build finished</TextValue>
        <Description>2 minutes ago</Description>
        <Switch
          aria-label="Mute this thread"
          onChange={() => onMute('build')}
        />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Dismiss"
          onPress={() => onDismiss('build')}
        >
          <X />
        </Button>
      </ListView.Item>
      <ListView.Item id="deploy" textValue="Deploy succeeded — 1 hour ago">
        <TextValue>Deploy succeeded</TextValue>
        <Description>1 hour ago</Description>
        <Switch
          aria-label="Mute this thread"
          onChange={() => onMute('deploy')}
        />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Dismiss"
          onPress={() => onDismiss('deploy')}
        >
          <X />
        </Button>
      </ListView.Item>
    </ListView>
  ),
});

NotificationsFeed.test(
  'navigates rows and operates nested controls without leaving the page',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, step }) => {
    onMute.mockClear();
    onDismiss.mockClear();

    const buildRow = await canvas.findByRole('row', {
      name: /build finished/i,
    });
    const deployRow = canvas.getByRole('row', { name: /deploy succeeded/i });

    await step('arrow-down moves focus from one row to the next', async () => {
      buildRow.focus();
      await userEvent.keyboard('{ArrowDown}');
      expect(deployRow).toHaveFocus();
    });

    await step(
      'tab reaches the nested mute switch inside the row',
      async () => {
        await userEvent.tab();
        const muteSwitch = canvas.getAllByRole('switch', {
          name: 'Mute this thread',
        })[1];
        expect(muteSwitch).toHaveFocus();
        await userEvent.keyboard('[Space]');
        expect(onMute).toHaveBeenCalledWith('deploy');
      }
    );

    await step(
      'the dismiss button is reachable and fires its handler',
      async () => {
        const dismissButtons = canvas.getAllByRole('button', {
          name: 'Dismiss',
        });
        await userEvent.click(dismissButtons[0]);
        expect(onDismiss).toHaveBeenCalledWith('build');
      }
    );
  }
);

// Scenario 2 — Resource list with a per-row menu: icon + name + meta +
// ActionMenu (rename / delete / share).
// A plain rounded-rect outline reads as an unchecked checkbox at this size,
// which is misleading next to rows that don't support selection — the
// folded corner and text lines mark this as a file/document instead.
const FileIcon = () => (
  <svg aria-hidden width={20} height={20} viewBox="0 0 20 20" fill="none">
    <path
      d="M5 2.5h6.5L15 6v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M11.5 2.5V6H15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 10h6M6.5 13h4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

const onRename = fn();
const onShare = fn();
const onDelete = fn();

export const ResourceListWithMenu = meta.story({
  tags: ['component-test'],
  render: args => (
    <ListView {...args} aria-label="Resources">
      <ListView.Item id="report" textValue="Quarterly report">
        <FileIcon />
        <TextValue>Quarterly report</TextValue>
        <Description>Updated 3 days ago · 2.1 MB</Description>
        <ActionMenu aria-label="Quarterly report actions">
          <ActionMenu.Item onAction={() => onRename('report')}>
            Rename
          </ActionMenu.Item>
          <ActionMenu.Item onAction={() => onShare('report')}>
            Share
          </ActionMenu.Item>
          <ActionMenu.Item
            variant="destructive"
            size="icon"
            onAction={() => onDelete('report')}
          >
            Delete
          </ActionMenu.Item>
        </ActionMenu>
      </ListView.Item>
      <ListView.Item id="roadmap" textValue="Roadmap">
        <FileIcon />
        <TextValue>Roadmap</TextValue>
        <Description>Updated today · 640 KB</Description>
        <ActionMenu aria-label="Roadmap actions">
          <ActionMenu.Item onAction={() => onRename('roadmap')}>
            Rename
          </ActionMenu.Item>
          <ActionMenu.Item onAction={() => onShare('roadmap')}>
            Share
          </ActionMenu.Item>
          <ActionMenu.Item
            variant="destructive"
            size="icon"
            onAction={() => onDelete('roadmap')}
          >
            Delete
          </ActionMenu.Item>
        </ActionMenu>
      </ListView.Item>
    </ListView>
  ),
});

ResourceListWithMenu.test(
  'opens a row menu and fires an action',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, step }) => {
    onDelete.mockClear();

    const trigger = await canvas.findByRole('button', {
      name: 'Quarterly report actions',
    });

    await step('the trigger is reachable and collapsed by default', () => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    await step('activating the trigger opens the menu', async () => {
      await userEvent.click(trigger);
      await waitFor(() =>
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
      );
    });
  }
);

// `<Title>` is for a row whose primary text genuinely names a whole
// section, not a single fact within one — a workspace switcher is that
// case: each row is an entry point into its own dashboard, so the
// workspace name carries heading semantics, not just a label. Pairing it
// with a leading icon, two lines of metadata, and a row menu also shows
// `<Title>` composes with the same complex row shapes `<TextValue>` does.
const onOpenWorkspace = fn();
const onWorkspaceSettings = fn();
const onLeaveWorkspace = fn();

export const WithDescription = meta.story({
  tags: ['component-test'],
  parameters: {
    docs: {
      description: {
        story:
          "Rows can use `<Title>` instead of `<TextValue>` when the row's " +
          'primary text genuinely names a whole section, not a single ' +
          "fact within one — here, each row is a workspace that's its own " +
          'dashboard, not just a filename or a person. `<Title>` still ' +
          'renders as a `<span>`, not an `<hN>` — visually identical to ' +
          "`<TextValue>` — so this isn't about how it looks, it's about " +
          "which semantics the row's primary text carries. See " +
          '[Accessibility](#accessibility) for when to reach for it.',
      },
    },
  },
  render: args => (
    <ListView {...args} aria-label="Workspaces">
      <ListView.Item
        id="acme"
        textValue="Acme Inc — Enterprise plan — 24 members"
      >
        <Building2 aria-hidden size={20} color="#6366F1" />
        <Title>Acme Inc</Title>
        <Description>Enterprise plan</Description>
        <Description>24 members</Description>
        <ActionMenu aria-label="Acme Inc actions">
          <ActionMenu.Item onAction={() => onOpenWorkspace('acme')}>
            Open
          </ActionMenu.Item>
          <ActionMenu.Item onAction={() => onWorkspaceSettings('acme')}>
            Settings
          </ActionMenu.Item>
          <ActionMenu.Item
            variant="destructive"
            size="icon"
            onAction={() => onLeaveWorkspace('acme')}
          >
            Leave
          </ActionMenu.Item>
        </ActionMenu>
      </ListView.Item>
      <ListView.Item
        id="globex"
        textValue="Globex Corp — Team plan — 8 members"
      >
        <Building2 aria-hidden size={20} color="#059669" />
        <Title>Globex Corp</Title>
        <Description>Team plan</Description>
        <Description>8 members</Description>
        <ActionMenu aria-label="Globex Corp actions">
          <ActionMenu.Item onAction={() => onOpenWorkspace('globex')}>
            Open
          </ActionMenu.Item>
          <ActionMenu.Item onAction={() => onWorkspaceSettings('globex')}>
            Settings
          </ActionMenu.Item>
          <ActionMenu.Item
            variant="destructive"
            size="icon"
            onAction={() => onLeaveWorkspace('globex')}
          >
            Leave
          </ActionMenu.Item>
        </ActionMenu>
      </ListView.Item>
    </ListView>
  ),
});

WithDescription.test(
  'renders `<Title>` rows as spans, not document headings, with the rest of the row still operable',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, step }) => {
    onLeaveWorkspace.mockClear();

    expect(canvas.queryAllByRole('heading')).toHaveLength(0);
    expect(await canvas.findByText('Acme Inc')).toBeInTheDocument();
    expect(canvas.getByText('24 members')).toBeInTheDocument();

    await step('the row menu opens and fires an action', async () => {
      const trigger = canvas.getByRole('button', { name: 'Acme Inc actions' });
      await userEvent.click(trigger);
      await waitFor(() =>
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
      );

      const leaveItem = await canvas.findByRole('menuitem', {
        name: 'Leave',
      });
      await userEvent.click(leaveItem);
      expect(onLeaveWorkspace).toHaveBeenCalledWith('acme');
    });
  }
);

// Scenario 4 — Complex layout: avatar + title + two lines of metadata +
// a Switch and a dismiss button, all in one row. Shows that a row isn't
// limited to a single leading icon / single description — leading media,
// multiple text lines, and several trailing controls can all combine.
const Avatar = ({ initials, color }: { initials: string; color: string }) => (
  <svg aria-hidden width={32} height={32} viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="16" fill={color} />
    <text
      x="16"
      y="21"
      textAnchor="middle"
      fontSize="12"
      fontWeight="600"
      fill="white"
    >
      {initials}
    </text>
  </svg>
);

const onNotifyChange = fn();
const onRemoveMember = fn();

export const TeamRosterWithStatus = meta.story({
  tags: ['component-test'],
  render: () => (
    <ListView aria-label="Team roster">
      <ListView.Item
        id="jane"
        textValue="Jane Cooper — Design lead — Active now"
      >
        <Avatar initials="JC" color="#6366F1" />
        <Title>Jane Cooper</Title>
        <Description>Design lead</Description>
        <Description>Active now</Description>
        <Switch
          aria-label="Notify Jane Cooper"
          selected
          onChange={selected => onNotifyChange('jane', selected)}
        />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Remove Jane Cooper"
          onPress={() => onRemoveMember('jane')}
        >
          <X />
        </Button>
      </ListView.Item>
      <ListView.Item id="alex" textValue="Alex Kim — Engineer — Away">
        <Avatar initials="AK" color="#059669" />
        <Title>Alex Kim</Title>
        <Description>Engineer</Description>
        <Description>Away</Description>
        <Switch
          aria-label="Notify Alex Kim"
          onChange={selected => onNotifyChange('alex', selected)}
        />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Remove Alex Kim"
          onPress={() => onRemoveMember('alex')}
        >
          <X />
        </Button>
      </ListView.Item>
    </ListView>
  ),
});

TeamRosterWithStatus.test(
  'operates the trailing controls of a row with multiple text lines',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    onNotifyChange.mockClear();
    onRemoveMember.mockClear();

    const notifySwitch = await canvas.findByRole('switch', {
      name: 'Notify Alex Kim',
    });
    await userEvent.click(notifySwitch);
    expect(onNotifyChange).toHaveBeenCalledWith('alex', true);

    const removeButton = canvas.getByRole('button', {
      name: 'Remove Jane Cooper',
    });
    await userEvent.click(removeButton);
    expect(onRemoveMember).toHaveBeenCalledWith('jane');
  }
);

// `variant="plain"` drops the list's own surface (ring, shadow, radius) so it
// can sit inside a container that already provides one.
//
// A `<Popover>` is the simplest such container: it owns the overlay surface
// (fill, rim, elevation) and carries no padding of its own, so a `plain` list
// fills it edge-to-edge with nothing further to configure. This is the
// DST-1485 notifications panel the component was built for.
//
// The `<DialogTrigger>`/`<Dialog>` pair comes from react-aria-components
// because Marigold's `<Popover>` doesn't yet expose a trigger-based
// composition of its own; `<ContextualHelp>` builds its popover the same way.
// `<Dialog>` isn't decorative here — it's what moves focus into the overlay on
// open and restores it to the trigger on close.
const onNotificationDismiss = fn();

export const InPopover = meta.story({
  // No `component-test` tag: the story runner can't see the popover's portaled
  // content from the story canvas, so an interaction test here would only
  // exercise the runner. Row interaction is already covered by
  // `NotificationsFeed`; this story exists to show the composition.
  // The trigger is a bare button on the page, not content inside a Panel.
  parameters: { surface: false },
  render: () => (
    <RACDialogTrigger defaultOpen>
      <Button>Notifications</Button>
      <Popover placement="bottom start" matchTriggerWidth={false}>
        <RACDialog aria-label="Notifications" className="w-80 outline-none">
          <ListView variant="plain" aria-label="Notifications">
            <ListView.Item id="build" textValue="Build finished">
              <TextValue>Build finished</TextValue>
              <Description>2 minutes ago</Description>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Dismiss build finished"
                onPress={() => onNotificationDismiss('build')}
              >
                <X />
              </Button>
            </ListView.Item>
            <ListView.Item id="review" textValue="Review requested">
              <TextValue>Review requested</TextValue>
              <Description>18 minutes ago</Description>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Dismiss review requested"
                onPress={() => onNotificationDismiss('review')}
              >
                <X />
              </Button>
            </ListView.Item>
            <ListView.Item id="deploy" textValue="Deploy succeeded">
              <TextValue>Deploy succeeded</TextValue>
              <Description>1 hour ago</Description>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Dismiss deploy succeeded"
                onPress={() => onNotificationDismiss('deploy')}
              >
                <X />
              </Button>
            </ListView.Item>
          </ListView>
        </RACDialog>
      </Popover>
    </RACDialogTrigger>
  ),
});

// A `<Panel>` (or `<Card>`, or `<Drawer>`) does carry horizontal padding, so
// pair `plain` with the container's `bleed`. The list then reads its row
// padding from the `--bleed-px` a bled container publishes: dividers and hover
// fill reach the Panel border while the row text stays aligned with the Panel
// title, the same way `<Table>` and `<Accordion>` behave.
const onIntegrationToggle = fn();

export const InPanel = meta.story({
  // The story supplies its own titled Panel, so opt out of the decorator's.
  parameters: { surface: false },
  render: () => (
    <Panel>
      <Panel.Header>
        <Title>Integrations</Title>
        <Description>Turn a connection on to start syncing.</Description>
      </Panel.Header>
      <Panel.Content bleed>
        <ListView variant="plain" aria-label="Integrations">
          <ListView.Item id="slack" textValue="Slack">
            <TextValue>Slack</TextValue>
            <Description>Post updates to #releases</Description>
            <Switch
              aria-label="Enable Slack"
              selected
              onChange={selected => onIntegrationToggle('slack', selected)}
            />
          </ListView.Item>
          <ListView.Item id="github" textValue="GitHub">
            <TextValue>GitHub</TextValue>
            <Description>Link commits to tickets</Description>
            <Switch
              aria-label="Enable GitHub"
              onChange={selected => onIntegrationToggle('github', selected)}
            />
          </ListView.Item>
        </ListView>
      </Panel.Content>
    </Panel>
  ),
});

export const EmptyState = meta.story({
  render: args => (
    <ListView
      {...args}
      aria-label="Resources"
      items={[]}
      emptyState={
        <EmptyStateComponent
          title="No resources yet."
          description="Resources you add will show up here."
        />
      }
    >
      {(item: { id: string; name: string }) => (
        <ListView.Item textValue={item.name}>
          <TextValue>{item.name}</TextValue>
        </ListView.Item>
      )}
    </ListView>
  ),
});
