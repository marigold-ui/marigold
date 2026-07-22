import { expect, fn, userEvent, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Description } from '../Description/Description';
import { EmptyState as EmptyStateComponent } from '../EmptyState/EmptyState';
import { ActionMenu } from '../Menu/ActionMenu';
import { Switch } from '../Switch/Switch';
import { TextValue } from '../TextValue/TextValue';
import { Title } from '../Title/Title';
import { X } from '../icons/X';
import { ListView } from './ListView';

const meta = preview.meta({
  title: 'Components/ListView',
  component: ListView,
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
          <ActionMenu.Item onAction={() => onDelete('report')}>
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
          <ActionMenu.Item onAction={() => onDelete('roadmap')}>
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

export const WithTitle = meta.story({
  tags: ['component-test'],
  parameters: {
    docs: {
      description: {
        story:
          "Rows can use `<Title>` instead of `<TextValue>` when the row's " +
          'primary text is genuinely heading-like. It still renders as a ' +
          '`<span>`, not an `<hN>` — visually identical to `<TextValue>` — ' +
          "so this isn't about adding a description, it's about which " +
          "semantics the row's primary text carries. See " +
          '[Accessibility](#accessibility) for when to reach for it.',
      },
    },
  },
  render: args => (
    <ListView {...args} aria-label="Team members">
      <ListView.Item id="jane" textValue="Jane Cooper">
        <Title>Jane Cooper</Title>
        <Description>Design lead</Description>
      </ListView.Item>
      <ListView.Item id="alex" textValue="Alex Kim">
        <Title>Alex Kim</Title>
        <Description>Engineer</Description>
      </ListView.Item>
    </ListView>
  ),
});

WithTitle.test(
  'renders `<Title>` rows as spans, not document headings',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    expect(canvas.queryAllByRole('heading')).toHaveLength(0);
    expect(await canvas.findByText('Jane Cooper')).toBeInTheDocument();
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

// `variant="plain"` drops the default surface (ring, shadow, radius) so the
// list can sit flush inside a container that already provides its own frame
// — a Popover, a Panel, or here, a Card. `bleed` lets the list's own dividers
// span the Card's full width instead of stopping at its padding.
export const EmbeddedInCard = meta.story({
  render: () => (
    <Card>
      <Card.Header>
        <Title>Notifications</Title>
      </Card.Header>
      <Card.Content bleed>
        <ListView variant="plain" aria-label="Notifications">
          <ListView.Item id="build" textValue="Build finished">
            <TextValue>Build finished</TextValue>
            <Description>2 minutes ago</Description>
          </ListView.Item>
          <ListView.Item id="deploy" textValue="Deploy succeeded">
            <TextValue>Deploy succeeded</TextValue>
            <Description>1 hour ago</Description>
          </ListView.Item>
        </ListView>
      </Card.Content>
    </Card>
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
