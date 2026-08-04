import {
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
} from 'react-aria-components/Dialog';
import { expect, fn, userEvent, waitFor } from 'storybook/test';
import { Archive } from '@marigold/icons';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Description } from '../Description/Description';
import { EmptyState as EmptyStateComponent } from '../EmptyState/EmptyState';
import { ActionMenu } from '../Menu/ActionMenu';
import { Popover } from '../Overlay/Popover';
import { Panel } from '../Panel/Panel';
import { TextValue } from '../TextValue/TextValue';
import { Title } from '../Title/Title';
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
      options: ['default', 'card'],
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

// `variant="card"` is the opt-in frame: fill, hairline ring and rounded
// corners of its own, for a list that sits directly on a page rather than in a
// container that already draws a surface. The first and last rows pick up the
// surface radius so a hover fill doesn't square off its corners.
export const Framed = meta.story({
  args: { variant: 'card' },
  parameters: { surface: false },
  render: args => (
    <ListView {...args} aria-label="Recent files">
      <ListView.Item id="report" textValue="Q3 report">
        <TextValue>Q3 report</TextValue>
        <Description>Edited 2 days ago</Description>
      </ListView.Item>
      <ListView.Item id="notes" textValue="Meeting notes">
        <TextValue>Meeting notes</TextValue>
        <Description>Edited just now</Description>
      </ListView.Item>
    </ListView>
  ),
});

// Scenario 1 — Notifications / activity feed: title + timestamp + a visible
// archive button and an overflow menu, operated in place. The shared DST-1485
// (Popover notifications panel) example.
//
// The visible glyph is `<Archive />`, not `<X />`: in Marigold an `X` means
// "close/cancel this transient thing" (`CloseButton`, `TableEditableCell`,
// `ActionBar`), and this feed ships inside a Popover that has its own `X` a
// few pixels away. `<Archive />` says what happens to the row.
//
// Muting is a menu command rather than a per-row `<Switch>`: a switch is the
// highest-contrast control in a row, and repeated down a feed a column of
// filled tracks out-shouts the notification text the feed exists to show. It
// also announces ambiguously — "Mute this thread, switch, off" leaves open
// whether off means not-muted or notifications-off — where `Mute thread` /
// `Unmute thread` can't be misread. Every shipping notification inbox
// (GitHub, Slack, Linear, Gmail) lands in the same place.
const onMute = fn();
const onMarkRead = fn();
const onArchive = fn();

export const NotificationsFeed = meta.story({
  tags: ['component-test'],
  render: args => (
    <ListView {...args} aria-label="Notifications">
      <ListView.Item id="build" textValue="Build finished">
        <TextValue>Build finished</TextValue>
        <Description>2 minutes ago</Description>
        <ButtonGroup>
          <Button
            size="icon"
            aria-label="Archive"
            onPress={() => onArchive('build')}
          >
            <Archive />
          </Button>
          <ActionMenu aria-label="Build finished actions">
            <ActionMenu.Item onAction={() => onMute('build')}>
              Mute thread
            </ActionMenu.Item>
            <ActionMenu.Item onAction={() => onMarkRead('build')}>
              Mark as read
            </ActionMenu.Item>
          </ActionMenu>
        </ButtonGroup>
      </ListView.Item>
      <ListView.Item id="deploy" textValue="Deploy succeeded">
        <TextValue>Deploy succeeded</TextValue>
        <Description>1 hour ago</Description>
        <ButtonGroup>
          <Button
            size="icon"
            aria-label="Archive"
            onPress={() => onArchive('deploy')}
          >
            <Archive />
          </Button>
          <ActionMenu aria-label="Deploy succeeded actions">
            <ActionMenu.Item onAction={() => onMute('deploy')}>
              Mute thread
            </ActionMenu.Item>
            <ActionMenu.Item onAction={() => onMarkRead('deploy')}>
              Mark as read
            </ActionMenu.Item>
          </ActionMenu>
        </ButtonGroup>
      </ListView.Item>
    </ListView>
  ),
});

NotificationsFeed.test(
  'navigates rows and operates nested controls without leaving the page',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, step }) => {
    onMute.mockClear();
    onArchive.mockClear();

    const buildRow = await canvas.findByRole('row', {
      name: /build finished/i,
    });
    const deployRow = canvas.getByRole('row', { name: /deploy succeeded/i });

    await step('arrow-down moves focus from one row to the next', async () => {
      buildRow.focus();
      await userEvent.keyboard('{ArrowDown}');
      expect(deployRow).toHaveFocus();
    });

    await step('tab reaches the nested archive button in the row', async () => {
      await userEvent.tab();
      const archiveButtons = canvas.getAllByRole('button', {
        name: 'Archive',
      });
      expect(archiveButtons[1]).toHaveFocus();
      await userEvent.keyboard('[Space]');
      expect(onArchive).toHaveBeenCalledWith('deploy');
    });

    await step('the row menu opens and mutes the thread', async () => {
      const trigger = canvas.getByRole('button', {
        name: 'Build finished actions',
      });
      await userEvent.click(trigger);
      await waitFor(() =>
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
      );

      const muteItem = await canvas.findByRole('menuitem', {
        name: 'Mute thread',
      });
      await userEvent.click(muteItem);
      expect(onMute).toHaveBeenCalledWith('build');
    });
  }
);

// Scenario 2 — Resource list with a per-row menu: name + meta + ActionMenu
// (rename / share / delete).
const onRename = fn();
const onShare = fn();
const onDelete = fn();

export const ResourceListWithMenu = meta.story({
  tags: ['component-test'],
  render: args => (
    <ListView {...args} aria-label="Resources">
      <ListView.Item id="report" textValue="Quarterly report">
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
            onAction={() => onDelete('report')}
          >
            Delete
          </ActionMenu.Item>
        </ActionMenu>
      </ListView.Item>
      <ListView.Item id="roadmap" textValue="Roadmap">
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
// with two lines of metadata and a row menu also shows `<Title>` composes
// with the same complex row shapes `<TextValue>` does.
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
      <ListView.Item id="acme" textValue="Acme Inc">
        <Title>Acme Inc</Title>
        <Description>Enterprise plan · 24 members</Description>
        <ActionMenu aria-label="Acme Inc actions">
          <ActionMenu.Item onAction={() => onOpenWorkspace('acme')}>
            Open
          </ActionMenu.Item>
          <ActionMenu.Item onAction={() => onWorkspaceSettings('acme')}>
            Settings
          </ActionMenu.Item>
          <ActionMenu.Item
            variant="destructive"
            onAction={() => onLeaveWorkspace('acme')}
          >
            Leave
          </ActionMenu.Item>
        </ActionMenu>
      </ListView.Item>
      <ListView.Item id="globex" textValue="Globex Corp">
        <Title>Globex Corp</Title>
        <Description>Team plan · 8 members</Description>
        <ActionMenu aria-label="Globex Corp actions">
          <ActionMenu.Item onAction={() => onOpenWorkspace('globex')}>
            Open
          </ActionMenu.Item>
          <ActionMenu.Item onAction={() => onWorkspaceSettings('globex')}>
            Settings
          </ActionMenu.Item>
          <ActionMenu.Item
            variant="destructive"
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
    expect(
      canvas.getByText('Enterprise plan · 24 members')
    ).toBeInTheDocument();

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

// Scenario 3 — A row whose commands include a destructive one. Removing a
// member is rare and irreversible, so it's a `variant="destructive"` menu item
// rather than a one-click icon button: the page's own rule is that a row keeps
// its *frequent* action visible and groups the rest behind an `<ActionMenu>`.
const onRemoveMember = fn();
const onMessageMember = fn();
const onChangeRole = fn();

export const TeamRosterWithStatus = meta.story({
  tags: ['component-test'],
  render: args => (
    <ListView {...args} aria-label="Team roster">
      <ListView.Item id="jane" textValue="Jane Cooper">
        <Title>Jane Cooper</Title>
        <Description>Design lead · Active now</Description>
        <ActionMenu aria-label="Jane Cooper actions">
          <ActionMenu.Item onAction={() => onMessageMember('jane')}>
            Message
          </ActionMenu.Item>
          <ActionMenu.Item onAction={() => onChangeRole('jane')}>
            Change role
          </ActionMenu.Item>
          <ActionMenu.Item
            variant="destructive"
            onAction={() => onRemoveMember('jane')}
          >
            Remove from team
          </ActionMenu.Item>
        </ActionMenu>
      </ListView.Item>
      <ListView.Item id="alex" textValue="Alex Kim">
        <Title>Alex Kim</Title>
        <Description>Engineer · Away</Description>
        <ActionMenu aria-label="Alex Kim actions">
          <ActionMenu.Item onAction={() => onMessageMember('alex')}>
            Message
          </ActionMenu.Item>
          <ActionMenu.Item onAction={() => onChangeRole('alex')}>
            Change role
          </ActionMenu.Item>
          <ActionMenu.Item
            variant="destructive"
            onAction={() => onRemoveMember('alex')}
          >
            Remove from team
          </ActionMenu.Item>
        </ActionMenu>
      </ListView.Item>
    </ListView>
  ),
});

TeamRosterWithStatus.test(
  'keeps the destructive command behind the row menu',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, step }) => {
    onRemoveMember.mockClear();

    await step('the row exposes no one-click destructive control', () => {
      expect(
        canvas.queryByRole('button', { name: /remove/i })
      ).not.toBeInTheDocument();
    });

    await step('removing is reachable through the menu', async () => {
      const trigger = await canvas.findByRole('button', {
        name: 'Jane Cooper actions',
      });
      await userEvent.click(trigger);
      await waitFor(() =>
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
      );

      const removeItem = await canvas.findByRole('menuitem', {
        name: 'Remove from team',
      });
      await userEvent.click(removeItem);
      expect(onRemoveMember).toHaveBeenCalledWith('jane');
    });
  }
);

// The default list has no surface of its own, so it drops straight into a
// container that provides one.
//
// A `<Popover>` is the simplest such container: it owns the overlay surface
// (fill, rim, elevation) and carries no padding of its own, so the list fills
// it edge-to-edge with nothing to configure. This is the DST-1485
// notifications panel the component was built for.
//
// The `<DialogTrigger>`/`<Dialog>` pair comes from react-aria-components
// because Marigold's `<Popover>` doesn't yet expose a trigger-based
// composition of its own; `<ContextualHelp>` builds its popover the same way.
// `<Dialog>` isn't decorative here — it's what moves focus into the overlay on
// open and restores it to the trigger on close.
const onNotificationArchive = fn();

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
          <ListView aria-label="Notifications">
            <ListView.Item id="build" textValue="Build finished">
              <TextValue>Build finished</TextValue>
              <Description>2 minutes ago</Description>
              <Button
                size="icon"
                aria-label="Archive build finished"
                onPress={() => onNotificationArchive('build')}
              >
                <Archive />
              </Button>
            </ListView.Item>
            <ListView.Item id="review" textValue="Review requested">
              <TextValue>Review requested</TextValue>
              <Description>18 minutes ago</Description>
              <Button
                size="icon"
                aria-label="Archive review requested"
                onPress={() => onNotificationArchive('review')}
              >
                <Archive />
              </Button>
            </ListView.Item>
            <ListView.Item id="deploy" textValue="Deploy succeeded">
              <TextValue>Deploy succeeded</TextValue>
              <Description>1 hour ago</Description>
              <Button
                size="icon"
                aria-label="Archive deploy succeeded"
                onPress={() => onNotificationArchive('deploy')}
              >
                <Archive />
              </Button>
            </ListView.Item>
          </ListView>
        </RACDialog>
      </Popover>
    </RACDialogTrigger>
  ),
});

// A `<Panel>` (or `<Card>`, or `<Drawer>`) does carry horizontal padding, so
// give the container `bleed`. The list then reads its row padding from the
// `--bleed-px` a bled container publishes: dividers and hover fill reach the
// Panel border while the row text stays aligned with the Panel title, the same
// way `<Table>` and `<Accordion>` behave — and with no opt-in on the list, the
// way those two need none. That alignment is the whole point of this story.
const onDownloadAttachment = fn();
const onAttachmentAction = fn();

export const InPanel = meta.story({
  // The story supplies its own titled Panel, so opt out of the decorator's.
  parameters: { surface: false },
  render: () => (
    <Panel>
      <Panel.Header>
        <Title>Attachments</Title>
        <Description>Files shared in this conversation.</Description>
      </Panel.Header>
      <Panel.Content bleed>
        <ListView aria-label="Attachments">
          <ListView.Item id="contract" textValue="Contract">
            <TextValue>Contract.pdf</TextValue>
            <Description>Added 3 days ago · 2.1 MB</Description>
            <ActionMenu
              aria-label="Contract actions"
              onAction={() => onAttachmentAction('contract')}
            >
              <ActionMenu.Item>Download</ActionMenu.Item>
              <ActionMenu.Item>Share</ActionMenu.Item>
              <ActionMenu.Item variant="destructive">Remove</ActionMenu.Item>
            </ActionMenu>
          </ListView.Item>
          <ListView.Item id="mockups" textValue="Mockups">
            <TextValue>Mockups.fig</TextValue>
            <Description>Added yesterday · 8.4 MB</Description>
            <ActionMenu
              aria-label="Mockups actions"
              onAction={() => onDownloadAttachment('mockups')}
            >
              <ActionMenu.Item>Download</ActionMenu.Item>
              <ActionMenu.Item>Share</ActionMenu.Item>
              <ActionMenu.Item variant="destructive">Remove</ActionMenu.Item>
            </ActionMenu>
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
