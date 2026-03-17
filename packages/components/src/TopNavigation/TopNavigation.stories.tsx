import { PanelRightClose } from 'lucide-react';
import preview from '.storybook/preview';
import { Logout, SettingDots, User } from '@marigold/icons';
import { useResponsiveValue } from '@marigold/system';
import { Badge } from '../Badge/Badge';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Button } from '../Button/Button';
import { Inline } from '../Inline/Inline';
import { ActionMenu } from '../Menu/ActionMenu';
import { Menu } from '../Menu/Menu';
import { SearchField } from '../SearchField/SearchField';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { TopNavigation } from './TopNavigation';

const LogoSection = () => {
  return (
    <Button variant="icon">
      <PanelRightClose />
    </Button>
  );
};

const UserMenu = () => (
  <ActionMenu aria-label="User menu" variant="ghost">
    <Menu.Section title="Account">
      <Menu.Item id="profile" textValue="Profile">
        <User size={16} /> Profile
      </Menu.Item>
      <Menu.Item id="settings" textValue="Settings">
        <SettingDots size={16} /> Settings
      </Menu.Item>
      <Menu.Item id="sign-out" textValue="Sign out">
        <Logout size={16} /> Sign out
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
    padding: false,
  },
});

export const WithSearchField = meta.story({
  render: args => (
    <TopNavigation {...args}>
      <TopNavigation.Start>
        <LogoSection />
      </TopNavigation.Start>
      <TopNavigation.Middle aria-label="SearchField" alignX="center">
        <SearchField placeholder="Search..." />
      </TopNavigation.Middle>
      <TopNavigation.End>
        <UserSection />
      </TopNavigation.End>
    </TopNavigation>
  ),
});

export const WithBreadcrumbs = meta.story({
  render: args => (
    <div style={{ height: '200vh' }}>
      <TopNavigation {...args}>
        <TopNavigation.Start>
          <LogoSection />
        </TopNavigation.Start>
        <TopNavigation.Middle>
          <Breadcrumbs>
            <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/events">Events</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/events/summer">Summer</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/events/details">
              Event Details
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </TopNavigation.Middle>
        <TopNavigation.End>
          <UserSection />
        </TopNavigation.End>
      </TopNavigation>
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
  ),
});

export const WithoutMiddle = meta.story({
  render: args => (
    <TopNavigation {...args}>
      <TopNavigation.Start>
        <LogoSection />
      </TopNavigation.Start>
      <TopNavigation.End>
        <UserSection />
      </TopNavigation.End>
    </TopNavigation>
  ),
});
