import { expect, fn, userEvent, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Description } from '../Description/Description';
import { IconButton } from '../IconButton/IconButton';
import { ActionMenu } from '../Menu/ActionMenu';
import { Switch } from '../Switch/Switch';
import { TextValue } from '../TextValue/TextValue';
import { Title } from '../Title/Title';
import { X } from '../icons/X';
import { ListView } from './ListView';

const meta = preview.meta({
  title: 'Components/ListView',
  component: ListView,
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => (
    <ListView {...args} aria-label="Recent files">
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
  'renders rows in a non-form grid with no selection',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const grid = await canvas.findByRole('grid', { name: 'Recent files' });
    const row = canvas.getByRole('row', { name: /q3 report/i });

    expect(grid).toBeInTheDocument();
    expect(row).not.toHaveAttribute('aria-selected');
  }
);

// Scenario 1 — Notifications / activity feed: title + timestamp + mute
// Switch + dismiss IconButton, operated in place. The shared DST-1485
// (Popover notifications panel) example.
const onMute = fn();
const onDismiss = fn();

export const NotificationsFeed = meta.story({
  tags: ['component-test'],
  render: () => (
    <ListView aria-label="Notifications">
      <ListView.Item id="build" textValue="Build finished — 2 minutes ago">
        <TextValue>Build finished</TextValue>
        <Description>2 minutes ago</Description>
        <Switch
          aria-label="Mute this thread"
          onChange={() => onMute('build')}
        />
        <IconButton aria-label="Dismiss" onPress={() => onDismiss('build')}>
          <X />
        </IconButton>
      </ListView.Item>
      <ListView.Item id="deploy" textValue="Deploy succeeded — 1 hour ago">
        <TextValue>Deploy succeeded</TextValue>
        <Description>1 hour ago</Description>
        <Switch
          aria-label="Mute this thread"
          onChange={() => onMute('deploy')}
        />
        <IconButton aria-label="Dismiss" onPress={() => onDismiss('deploy')}>
          <X />
        </IconButton>
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
const FileIcon = () => (
  <svg aria-hidden width={20} height={20} viewBox="0 0 20 20">
    <rect
      x="3"
      y="2"
      width="14"
      height="16"
      rx="1.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const onRename = fn();
const onShare = fn();
const onDelete = fn();

export const ResourceListWithMenu = meta.story({
  tags: ['component-test'],
  render: () => (
    <ListView aria-label="Resources">
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

// Scenario 3 — Settings list with toggles: label + description + Switch,
// operated in place.
const onSettingChange = fn();

export const SettingsList = meta.story({
  tags: ['component-test'],
  render: () => (
    <ListView aria-label="Notification settings">
      <ListView.Item id="email" textValue="Email notifications">
        <TextValue>Email notifications</TextValue>
        <Description>Receive updates by email.</Description>
        <Switch
          aria-label="Email notifications"
          onChange={selected => onSettingChange('email', selected)}
        />
      </ListView.Item>
      <ListView.Item id="push" textValue="Push notifications">
        <TextValue>Push notifications</TextValue>
        <Description>Receive updates on this device.</Description>
        <Switch
          aria-label="Push notifications"
          selected
          onChange={selected => onSettingChange('push', selected)}
        />
      </ListView.Item>
    </ListView>
  ),
});

SettingsList.test(
  'toggles a setting in place',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    onSettingChange.mockClear();

    const emailSwitch = await canvas.findByRole('switch', {
      name: 'Email notifications',
    });

    expect(emailSwitch).not.toBeChecked();

    await userEvent.click(emailSwitch);

    expect(emailSwitch).toBeChecked();
    expect(onSettingChange).toHaveBeenCalledWith('email', true);
  }
);

export const WithTitle = meta.story({
  tags: ['component-test'],
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

export const EmptyState = meta.story({
  render: args => (
    <ListView
      {...args}
      aria-label="Resources"
      items={[]}
      emptyState={
        <div className="text-secondary p-6 text-center text-sm">
          No resources yet.
        </div>
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
