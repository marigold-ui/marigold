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

// A long, self-contained nav group used to force the nav into its scrolling
// state so the sticky header/footer seams can be seen (DST-1586 review).
const workspaceSections = Array.from({ length: 40 }, (_, i) => ({
  href: `/section-${i + 1}`,
  label: `Section ${i + 1}`,
}));

// Tall page content so the document scrolls under the sticky TopNavigation,
// revealing its bottom-edge hairline (`ui-scroll-edge`).
const reportPanels = Array.from({ length: 10 }, (_, i) => i + 1);

const ShellFrame = ({
  pageExtra,
  longNav = false,
  longPage = false,
}: {
  pageExtra?: React.ReactNode;
  longNav?: boolean;
  longPage?: boolean;
}) => {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  // Fall back to a generic page for the synthesized long-nav routes.
  const page = pages[currentPath] ?? {
    label: 'Section',
    description: 'A workspace section.',
  };

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
            {longNav && [
              <Sidebar.GroupLabel key="workspace-label">
                Workspace
              </Sidebar.GroupLabel>,
              ...workspaceSections.map(section => (
                <Sidebar.Item key={section.href} href={section.href}>
                  {section.label}
                </Sidebar.Item>
              )),
            ]}
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
          {longPage &&
            reportPanels.map(n => (
              <Panel key={n}>
                <Panel.Header>
                  <Title>Report {n}</Title>
                </Panel.Header>
                <Panel.Content>
                  <Text>
                    Placeholder content so the page is tall enough to scroll
                    under the top navigation.
                  </Text>
                </Panel.Content>
              </Panel>
            ))}
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

/**
 * Both scroll axes of the shell at once (DST-1586):
 *
 * - **Sidebar nav** overflows, so its sticky header and footer show their
 *   scroll-revealed seams — seamless at rest; a hairline fades in under the
 *   header as you scroll, and the footer keeps its top hairline until the list
 *   bottoms out.
 * - **Page content** is tall, so the document scrolls under the sticky
 *   `TopNavigation`, which reveals its own bottom-edge hairline
 *   (`ui-scroll-edge`) once content passes beneath it.
 *
 * Both are scroll-linked (not autonomous), so intentionally not gated by
 * reduced-motion. In browsers without scroll-driven animations the sidebar
 * seams fall back to an always-on hairline; the top bar stays borderless (its
 * opaque background still separates it from passing content).
 */
export const ScrollingSidebar = meta.story({
  tags: ['component-test'],
  render: () => <ShellFrame longNav longPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation', { name: /app navigation/i });

    // The point of this story: a long nav rendered into a scroll container, so
    // the sticky header/footer regions are actually exercised (the docs demos
    // never scroll, so the seam behavior would otherwise go untested —
    // DST-1586 review). Asserted viewport-independently: the nav scrolls its
    // own overflow, and the tail of the long list is present.
    await expect(getComputedStyle(nav).overflowY).toBe('auto');
    await expect(
      canvas.getByRole('link', { name: 'Section 40' })
    ).toBeInTheDocument();
    await expect(nav.scrollHeight).toBeGreaterThan(600);

    // The footer shows its seam whenever nav content sits below it — which it
    // does at load (nav rests at the top of an overflowing list). That holds
    // both where scroll-driven animations run (the timeline pins the "content
    // below" keyframe) and in the always-on fallback, so the box-shadow
    // hairline is present here regardless of engine.
    // Anchored on the footer's structural grid slot (owned by the Sidebar.Footer
    // component) rather than a compiled theme class, so a theme-side style rename
    // can't silently break the lookup.
    const footer = canvas
      .getByRole('complementary')
      .querySelector<HTMLElement>('[class*="grid-area:footer"]');
    await expect(footer).not.toBeNull();
    await expect(getComputedStyle(footer!).boxShadow).not.toBe('none');

    // And the page itself is tall enough to scroll under the sticky top bar —
    // the precondition for the TopNavigation's own scroll-revealed edge (the
    // reveal is a Chromium-only scroll-driven animation, verified visually; the
    // test guards that the story actually exercises page scroll). The last
    // filler panel renders below the fold.
    await expect(canvas.getByText('Report 10')).toBeInTheDocument();
    await expect(document.documentElement.scrollHeight).toBeGreaterThan(
      window.innerHeight
    );
  },
});
