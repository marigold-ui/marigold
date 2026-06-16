import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import { LogOut, Settings, User } from '@marigold/icons';
import { Badge } from '../Badge/Badge';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Button } from '../Button/Button';
import { Description } from '../Description/Description';
import { Inline } from '../Inline/Inline';
import { ActionMenu } from '../Menu/ActionMenu';
import { Menu } from '../Menu/Menu';
import { Page } from '../Page/Page';
import { Panel } from '../Panel/Panel';
import { RouterProvider } from '../RouterProvider/RouterProvider';
import { Select } from '../Select/Select';
import { Sidebar } from '../Sidebar/Sidebar';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Title } from '../Title/Title';
import { TopNavigation } from '../TopNavigation/TopNavigation';
import { AppShell } from './AppShell';

const meta = preview.meta({
  title: 'Components/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
    surface: false,
  },
});

const pages: Record<string, { label: string; description: string }> = {
  '/dashboard': {
    label: 'Dashboard',
    description: 'An overview of your account activity.',
  },
  '/analytics': {
    label: 'Analytics',
    description: 'Traffic and conversion metrics.',
  },
  '/users': { label: 'Users', description: 'Manage people in your workspace.' },
  '/teams': { label: 'Teams', description: 'Organize people into teams.' },
  '/billing': {
    label: 'Billing',
    description: 'Manage your plan and invoices.',
  },
  '/general': { label: 'General', description: 'Workspace-wide settings.' },
  '/security': {
    label: 'Security',
    description: 'Authentication and access control.',
  },
};

const UserMenu = () => (
  <ActionMenu aria-label="User menu" variant="ghost">
    <Menu.Section title="Account">
      <Menu.Item id="profile" textValue="Profile">
        <User size={16} /> Profile
      </Menu.Item>
      <Menu.Item id="settings" textValue="Settings">
        <Settings size={16} /> Settings
      </Menu.Item>
      <Menu.Item id="sign-out" textValue="Sign out">
        <LogOut size={16} /> Sign out
      </Menu.Item>
    </Menu.Section>
  </ActionMenu>
);

const ShellFrame = ({ pageExtra }: { pageExtra?: React.ReactNode }) => {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const page = pages[currentPath];

  return (
    <RouterProvider navigate={setCurrentPath}>
      <AppShell defaultSidebarOpen>
        <Sidebar>
          <Sidebar.Header>
            <Text weight="bold" fontSize="lg">
              reservix
            </Text>
          </Sidebar.Header>
          <Sidebar.Nav current={currentPath}>
            <Sidebar.Item href="/dashboard">Dashboard</Sidebar.Item>
            <Sidebar.Item href="/analytics">Analytics</Sidebar.Item>
            <Sidebar.Separator />
            <Sidebar.Item id="management" textValue="Management">
              Management
              <Sidebar.Item href="/users">Users</Sidebar.Item>
              <Sidebar.Item href="/teams">Teams</Sidebar.Item>
              <Sidebar.Item href="/billing">Billing</Sidebar.Item>
            </Sidebar.Item>
            <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
            <Sidebar.Item href="/general">General</Sidebar.Item>
            <Sidebar.Item href="/security">Security</Sidebar.Item>
          </Sidebar.Nav>
          <Sidebar.Footer>
            <Text fontSize="xs">v1.0.0</Text>
          </Sidebar.Footer>
        </Sidebar>
        <TopNavigation>
          <TopNavigation.Start>
            <Sidebar.Toggle />
          </TopNavigation.Start>
          <TopNavigation.Middle>
            <Breadcrumbs>
              <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
              <Breadcrumbs.Item href={currentPath}>
                {page?.label}
              </Breadcrumbs.Item>
            </Breadcrumbs>
          </TopNavigation.Middle>
          <TopNavigation.End>
            <Inline space="related" alignY="center" noWrap>
              <Stack>
                <Inline space="tight" alignY="center" noWrap>
                  <Text size="sm" weight="bold">
                    Jane Doe
                  </Text>
                  <Badge variant="master">Master</Badge>
                </Inline>
                <Text size="xs" variant="muted">
                  Global Entertainment Solutions Inc.
                </Text>
              </Stack>
              <UserMenu />
            </Inline>
          </TopNavigation.End>
        </TopNavigation>
        <Page>
          <Page.Header>
            <Title>{page?.label}</Title>
            <Description>{page?.description}</Description>
            <Button variant="primary">Create</Button>
          </Page.Header>
          <Panel>
            <Panel.Header>
              <Title>Overview</Title>
            </Panel.Header>
            <Panel.Content>
              <Text>
                You are viewing the <strong>{page?.label}</strong> page.
              </Text>
            </Panel.Content>
          </Panel>
          {pageExtra}
        </Page>
      </AppShell>
    </RouterProvider>
  );
};

export const Basic = meta.story({
  tags: ['component-test'],
  render: () => <ShellFrame />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all layout areas', async () => {
      await expect(canvas.getByRole('complementary')).toBeInTheDocument();
      await expect(canvas.getByRole('banner')).toBeInTheDocument();
      await expect(canvas.getByRole('main')).toBeInTheDocument();
    });

    await step('Page renders an h1 from Page.Header', async () => {
      await expect(
        canvas.getByRole('heading', { level: 1, name: 'Dashboard' })
      ).toBeInTheDocument();
    });

    await step('main landmark is labelled by the page title', async () => {
      const main = canvas.getByRole('main');
      const heading = canvas.getByRole('heading', { level: 1 });
      await expect(main).toHaveAttribute('aria-labelledby', heading.id);
    });

    await step('Toggle sidebar collapses and expands', async () => {
      const toggle = canvas.getByRole('button', {
        name: /toggle navigation/i,
      });
      await userEvent.click(toggle);
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await userEvent.click(toggle);
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    });

    await step('Navigate via sidebar', async () => {
      await userEvent.click(canvas.getByRole('link', { name: 'Analytics' }));
      await expect(
        canvas.getByRole('heading', { level: 1, name: 'Analytics' })
      ).toBeInTheDocument();
    });
  },
});

/**
 * Controlled sidebar state via an outer `Sidebar.Provider`. `<AppShell>`
 * detects the provider and passes through instead of creating its own.
 */
export const ControlledSidebar = meta.story({
  tags: ['component-test'],
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Sidebar.Provider open={open} onOpenChange={setOpen}>
        <ShellFrame />
      </Sidebar.Provider>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button', { name: /toggle navigation/i });

    await step('Sidebar starts closed (controlled)', async () => {
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });

    await step('Open via toggle drives controlled state', async () => {
      await userEvent.click(toggle);
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    });
  },
});

// Regression for DST-1464. The `main` grid track was `1fr` (= `minmax(auto,
// 1fr)`), so wide content pushed the column past the viewport. `<Page>`'s
// `<main>` carries `min-w-0` so the track can shrink and clip overflow.
export const WideContentDoesNotOverflow = meta.story({
  tags: ['component-test'],
  render: () => (
    <ShellFrame
      pageExtra={
        <Panel>
          <Panel.Content>
            <Select
              label="Picks"
              name="picks"
              selectionMode="multiple"
              width="full"
              defaultValue={[
                'Lord of the Rings',
                'Star Wars',
                'Star Trek',
                'Firefly',
              ]}
            >
              <Select.Option id="Harry Potter">
                Harry Potter and the Philosopher’s Stone
              </Select.Option>
              <Select.Option id="Lord of the Rings">
                The Lord of the Rings: The Fellowship of the Ring
              </Select.Option>
              <Select.Option id="Star Wars">
                Star Wars: Episode IV – A New Hope
              </Select.Option>
              <Select.Option id="Star Trek">
                Star Trek: The Original Series
              </Select.Option>
              <Select.Option id="Firefly">
                Firefly: The Complete Series
              </Select.Option>
            </Select>
          </Panel.Content>
        </Panel>
      }
    />
  ),
  play: async ({ canvasElement }) => {
    const main = within(canvasElement).getByRole('main');
    const grid = main.parentElement!;
    await expect(main.getBoundingClientRect().width).toBeLessThanOrEqual(
      grid.getBoundingClientRect().width
    );
    await expect(grid.scrollWidth).toBeLessThanOrEqual(grid.clientWidth);
  },
});
