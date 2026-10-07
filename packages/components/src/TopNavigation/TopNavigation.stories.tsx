import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { EllipsisVertical, LogOut, User } from '@marigold/icons';
import { useResponsiveValue } from '@marigold/system';
import { Badge } from '../Badge/Badge';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Inline } from '../Inline/Inline';
import { ActionMenu } from '../Menu/ActionMenu';
import { Menu } from '../Menu/Menu';
import { SearchField } from '../SearchField/SearchField';
import { Sidebar } from '../Sidebar/Sidebar';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { TopNavigation, type TopNavigationProps } from './TopNavigation';

const UserMenu = () => (
  <ActionMenu aria-label="User menu" variant="ghost">
    <Menu.Section title="Account">
      <Menu.Item id="profile" textValue="Profile">
        <User size={16} /> Profile
      </Menu.Item>
      <Menu.Item id="settings" textValue="Settings">
        <EllipsisVertical size={16} /> Settings
      </Menu.Item>
      <Menu.Item id="sign-out" textValue="Sign out">
        <LogOut size={16} /> Sign out
      </Menu.Item>
    </Menu.Section>
  </ActionMenu>
);

const UserSection = () => {
  const showDetails = useResponsiveValue([false, false, true, true, true]);

  return (
    <Inline space={2} alignY="center" noWrap>
      <Stack>
        <Inline space={1} alignY="center" noWrap>
          <Text size="sm" weight="bold">
            {showDetails ? 'Jane Doe' : 'JD'}
          </Text>
          <Badge variant="master">{showDetails ? 'Master' : 'M'}</Badge>
        </Inline>
        {showDetails && (
          <Text size="xs" variant="muted">
            Global Entertainment Solutions Inc.
          </Text>
        )}
      </Stack>
      <UserMenu />
    </Inline>
  );
};

const meta = preview.meta({
  title: 'Components/TopNavigation',
  component: TopNavigation,
  argTypes: {
    sticky: {
      control: { type: 'boolean' },
      description: 'Make the navigation sticky',
    },
  },
  parameters: {
    layout: 'fullscreen',
    surface: false,
  },
});

export const WithSearchField = meta.story({
  render: args => (
    <Sidebar.Provider>
      <TopNavigation {...args}>
        <TopNavigation.Start>
          <Sidebar.Toggle />
        </TopNavigation.Start>
        <TopNavigation.Middle aria-label="SearchField" alignX="center">
          <SearchField placeholder="Search..." />
        </TopNavigation.Middle>
        <TopNavigation.End>
          <UserSection />
        </TopNavigation.End>
      </TopNavigation>
    </Sidebar.Provider>
  ),
});

const Trail = () => (
  <Breadcrumbs>
    <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/events">Events</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/events/summer">Summer</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/events/details">Event Details</Breadcrumbs.Item>
  </Breadcrumbs>
);

const Shell = (args: TopNavigationProps) => (
  <TopNavigation {...args}>
    <TopNavigation.Start>
      <div className="min-h-topbar flex items-center">
        <Sidebar.Toggle />
      </div>
    </TopNavigation.Start>
    <TopNavigation.Middle>
      <div className="w-full min-w-0 max-sm:hidden">
        <Trail />
      </div>
    </TopNavigation.Middle>
    <TopNavigation.End>
      <UserSection />
    </TopNavigation.End>
    <div className="col-span-full min-w-0 pb-2 sm:hidden">
      <Trail />
    </div>
  </TopNavigation>
);

export const WithBreadcrumbs = meta.story({
  render: args => (
    <Sidebar.Provider>
      <div style={{ height: '200vh' }}>
        <Shell {...args} />
        <div style={{ padding: '2rem' }}>
          <Stack space={4}>
            <Text weight="bold" size="xl">
              Summer Festival
            </Text>
            <Text>
              Manage your event details, ticket sales, and attendee information
              from this dashboard.
            </Text>
          </Stack>
        </div>
      </div>
    </Sidebar.Provider>
  ),
});

export const OverflowSmallScreen = meta.story({
  tags: ['component-test'],
  globals: {
    viewport: { value: 'extraSmallScreen' },
  },
  parameters: { chromatic: { viewports: [320] } },
  render: args => (
    <Sidebar.Provider>
      <Shell {...args} />
    </Sidebar.Provider>
  ),
});

OverflowSmallScreen.test(
  'keeps the trail readable at 320px without overflowing',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, canvasElement }) => {
    await expect(canvasElement.scrollWidth).toBeLessThanOrEqual(
      canvasElement.clientWidth
    );

    const list = canvas.getByRole('list');
    await expect(list.scrollWidth).toBeLessThanOrEqual(list.clientWidth);

    const current = canvas.getByRole('link', { name: 'Event Details' });
    await expect(current.scrollWidth).toBeLessThanOrEqual(current.clientWidth);

    for (const link of canvas.getAllByRole('link')) {
      await expect(link.scrollWidth).toBeLessThanOrEqual(link.clientWidth);
    }
  }
);

export const WithoutMiddle = meta.story({
  render: args => (
    <Sidebar.Provider>
      <TopNavigation {...args}>
        <TopNavigation.Start>
          <Sidebar.Toggle />
        </TopNavigation.Start>
        <TopNavigation.End>
          <UserSection />
        </TopNavigation.End>
      </TopNavigation>
    </Sidebar.Provider>
  ),
});
