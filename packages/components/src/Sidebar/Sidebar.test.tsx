import { render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { vi } from 'vitest';
import { theme } from '@marigold/theme-rui';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { RouterProvider } from '../RouterProvider/RouterProvider';
import { ensureOverlayContainer, mockMatchMedia } from '../test.utils';
import { useSidebar } from './Context';
import { Sidebar } from './Sidebar';
import {
  Basic,
  Complex,
  Controlled,
  DefaultCollapsed,
  WithActiveBranch,
} from './Sidebar.stories';
import {
  SidebarGroupLabel,
  SidebarItem,
  SidebarSeparator,
} from './SidebarItem';
import { buildCollection, findActiveBranch } from './collection';

// Testing Library has no API for querying ancestor elements.
// eslint-disable-next-line testing-library/no-node-access
const closest = (el: HTMLElement, sel: string) => el.closest(sel);

// In-browser tests: `inert` panels remove elements from the a11y tree,
// so getByRole can't find them. Use getByText (DOM search) + closest instead.
const linkByText = (name: string) =>
  screen.getByText(name, { selector: 'a' }) as HTMLElement;

const user = userEvent.setup();

beforeEach(() => {
  vi.useFakeTimers({
    shouldAdvanceTime: true,
    // Fast-forward idle tooltip/overlay timers (2500ms tooltip delay etc.)
    advanceTimeDelta: 40,
  });
  window.matchMedia = mockMatchMedia([]);
  document.cookie = 'marigold:sidebar:state=;max-age=0';
});

afterEach(async () => {
  // Flush remaining timers (tooltip delays, modal transitions)
  await vi.runAllTimersAsync();
  vi.useRealTimers();

  // Remove overlay container to prevent React Aria modal/portal state leaking
  // eslint-disable-next-line testing-library/no-node-access
  document.getElementById('storybook-root')?.remove();

  document.body.removeAttribute('aria-hidden');
  document.body.removeAttribute('style');
  document.documentElement.removeAttribute('style');
});

test('renders with sub-components', () => {
  render(<Basic.Component />);

  expect(screen.getByText('Acme Inc.')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument();
  expect(screen.getByText('Settings')).toBeInTheDocument();
  expect(screen.getByText('Footer content')).toBeInTheDocument();
  expect(screen.getByRole('separator')).toBeInTheDocument();
});

test('toggle expand/collapse via toggle button', async () => {
  render(<Basic.Component />);

  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
  expect(trigger).toHaveAttribute('aria-expanded', 'true');

  await user.click(trigger);
  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  await user.click(trigger);
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
});

test('keyboard shortcut Cmd+B toggles sidebar', async () => {
  render(<Basic.Component />);

  const toggle = screen.getByRole('button', { name: 'Toggle navigation' });
  expect(toggle).toHaveAttribute('aria-expanded', 'true');

  await user.keyboard('{Meta>}b{/Meta}');
  expect(toggle).toHaveAttribute('aria-expanded', 'false');

  await user.keyboard('{Meta>}b{/Meta}');
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
});

test('active state with aria-current', () => {
  render(<Basic.Component />);

  const overviewLink = screen.getByRole('link', { name: 'Overview' });
  expect(overviewLink).toHaveAttribute('aria-current', 'page');

  const analyticsLink = screen.getByRole('link', { name: 'Analytics' });
  expect(analyticsLink).not.toHaveAttribute('aria-current');
});

test('useSidebar throws outside provider', () => {
  // Suppress React error boundary output
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

  expect(() => {
    renderHook(() => useSidebar());
  }).toThrow('useSidebar must be used within a <Sidebar.Provider>.');

  spy.mockRestore();
});

test('renders items as links with href', () => {
  render(<Basic.Component />);

  const link = screen.getByRole('link', { name: 'Overview' });
  expect(link).toHaveAttribute('href', '/overview');
});

test('branch items render as links with auto-derived href', () => {
  render(<Basic.Component />);

  // Branch item "Management" should be a link with href from first child
  const managementLink = screen.getByRole('link', { name: /Management/ });
  expect(managementLink).toHaveAttribute('href', '/users');
});

test('sub-panel opens when child is active', () => {
  render(<WithActiveBranch.Component />);

  // Root panel should be in "before" position (not active).
  // Use linkByText because the root panel is inert (invisible to getByRole).
  const rootPanel = closest(linkByText('Overview'), '[data-position]');
  expect(rootPanel).toHaveAttribute('data-position', 'before');

  // Management sub-panel should be active
  const usersLink = screen.getByRole('link', { name: 'Users' });
  const managementPanel = closest(usersLink, '[data-position]');
  expect(managementPanel).toHaveAttribute('data-position', 'active');

  // Back button should be visible in the active panel
  const backButton = screen.getByRole('button', { name: /Back/ });
  expect(backButton).toBeInTheDocument();
});

test('back button returns to root panel', async () => {
  render(<WithActiveBranch.Component />);

  // Management sub-panel is active
  const usersLink = await screen.findByRole('link', { name: 'Users' });
  expect(closest(usersLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click back
  const backButton = await screen.findByRole('button', { name: /Back/ });
  await user.click(backButton);

  // Root panel transitions to active (wait for CSS visibility)
  const overviewLink = await screen.findByRole('link', { name: 'Overview' });
  expect(closest(overviewLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );
});

test('re-entering the same branch after back reopens sub-panel', async () => {
  render(<WithActiveBranch.Component />);

  // Management sub-panel starts active
  const usersLink = await screen.findByRole('link', { name: 'Users' });
  expect(closest(usersLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click back → root panel shown
  const backButton = await screen.findByRole('button', { name: /Back/ });
  await user.click(backButton);

  const overviewLink = await screen.findByRole('link', { name: 'Overview' });
  expect(closest(overviewLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click the Management branch trigger again → sub-panel should reopen
  const managementTrigger = await screen.findByRole('link', {
    name: /Management/,
  });
  await user.click(managementTrigger);

  // Wait for panel transition, then check Users is in the active panel
  await waitFor(() => {
    expect(closest(linkByText('Users'), '[data-position]')).toHaveAttribute(
      'data-position',
      'active'
    );
  });
});

test('navigating between branches via stateful active prop', async () => {
  render(<Complex.Component />);

  // Dashboard is at root, click Tickets branch
  const ticketsTrigger = screen.getByRole('link', { name: 'Tickets' });
  await user.click(ticketsTrigger);

  // Wait for panel transition, then check Tickets sub-panel is active
  const myTicketsLink = await screen.findByRole('link', { name: 'My Tickets' });
  expect(closest(myTicketsLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click back → root
  const backToTickets = await screen.findByRole('button', {
    name: /Back to Tickets/,
  });
  await user.click(backToTickets);

  const dashboardLink = await screen.findByRole('link', { name: 'Dashboard' });
  expect(closest(dashboardLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click Projects → opens projects panel
  await user.click(await screen.findByRole('link', { name: 'Projects' }));

  const activeLink = await screen.findByRole('link', { name: 'Active' });
  expect(closest(activeLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click back from projects → root
  await user.click(
    await screen.findByRole('button', { name: /Back to Projects/ })
  );

  expect(
    closest(
      await screen.findByRole('link', { name: 'Dashboard' }),
      '[data-position]'
    )
  ).toHaveAttribute('data-position', 'active');

  // Click Reports → opens reports panel
  await user.click(await screen.findByRole('link', { name: 'Reports' }));

  expect(
    closest(
      await screen.findByRole('link', { name: 'Ticket Volume' }),
      '[data-position]'
    )
  ).toHaveAttribute('data-position', 'active');
});

test('data-state attribute reflects expanded/collapsed', async () => {
  render(<Basic.Component />);

  const shell = closest(
    screen.getByRole('link', { name: 'Overview' }),
    '[data-state]'
  );
  expect(shell).toHaveAttribute('data-state', 'expanded');

  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
  await user.click(trigger);
  expect(shell).toHaveAttribute('data-state', 'collapsed');

  await user.click(trigger);
  expect(shell).toHaveAttribute('data-state', 'expanded');
});

test('non-active panels have inert attribute', () => {
  render(<WithActiveBranch.Component />);

  // Root panel is in "before" position → should be inert.
  // Use linkByText since inert elements are invisible to getByRole.
  const rootPanel = closest(linkByText('Overview'), '[data-position]');
  expect(rootPanel).toHaveAttribute('inert');

  // Management panel is active → should NOT be inert
  const activePanel = closest(
    screen.getByRole('link', { name: 'Users' }),
    '[data-position]'
  );
  expect(activePanel).not.toHaveAttribute('inert');
});

test('focus moves to active item when drilling into branch with active child', async () => {
  render(<Basic.Component />);

  const managementTrigger = screen.getByRole('link', { name: /Management/ });
  await user.click(managementTrigger);

  // After drilling in, navigate callback sets path to /users, making Users
  // the active item. Focus goes to the active item, not the back button.
  const usersLink = await screen.findByRole('link', { name: 'Users' });
  // Focus is deferred until after panel transition in usePanelFocus — advance timers past the timeout fallback
  await vi.advanceTimersByTimeAsync(400);
  expect(usersLink).toHaveFocus();
});

test('focus returns to branch trigger when going back', async () => {
  render(<WithActiveBranch.Component />);

  const backButton = await screen.findByRole('button', {
    name: /Back to Management/,
  });
  await user.click(backButton);

  // After going back, root panel transitions to active (wait for visibility)
  const managementTrigger = await screen.findByRole('link', {
    name: /Management/,
  });
  await vi.advanceTimersByTimeAsync(400);
  expect(managementTrigger).toHaveFocus();
});

test('toggle writes sidebar state to cookie', async () => {
  render(<Basic.Component />);

  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });

  await user.click(trigger);
  expect(document.cookie).toContain('marigold:sidebar:state=collapsed');

  await user.click(trigger);
  expect(document.cookie).toContain('marigold:sidebar:state=expanded');
});

test('cookie overrides defaultOpen', () => {
  document.cookie = 'marigold:sidebar:state=collapsed;path=/;max-age=604800';

  render(<DefaultCollapsed.Component />);

  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  const shell = closest(
    screen.getByRole('link', { name: 'Overview' }),
    '[data-state]'
  );
  expect(shell).toHaveAttribute('data-state', 'collapsed');
});

test('defaultOpen={false} starts sidebar collapsed', () => {
  render(<DefaultCollapsed.Component />);

  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  const shell = closest(
    screen.getByRole('link', { name: 'Overview' }),
    '[data-state]'
  );
  expect(shell).toHaveAttribute('data-state', 'collapsed');
});

test('controlled mode with open and onOpenChange', async () => {
  render(<Controlled.Component />);

  expect(screen.getByText('Sidebar is open')).toBeInTheDocument();

  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
  await user.click(trigger);
  expect(screen.getByText('Sidebar is closed')).toBeInTheDocument();

  await user.click(trigger);
  expect(screen.getByText('Sidebar is open')).toBeInTheDocument();
});

test('mobile renders sheet overlay', () => {
  window.matchMedia = mockMatchMedia(['(width < 640px)']);
  ensureOverlayContainer();

  render(<Basic.Component />);

  // On mobile, sidebar link is not visible until toggled
  expect(
    screen.queryByRole('link', { name: 'Overview' })
  ).not.toBeInTheDocument();
});

test('mobile toggle opens sheet, close button closes it', async () => {
  const mobileUser = userEvent.setup();
  window.matchMedia = mockMatchMedia(['(width < 640px)']);
  ensureOverlayContainer();

  render(<Basic.Component />);

  // Sidebar link is not visible on mobile until toggled
  expect(
    screen.queryByRole('link', { name: 'Overview' })
  ).not.toBeInTheDocument();

  // Open the mobile sheet
  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
  await mobileUser.click(trigger);
  expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument();

  // Close via close button
  const closeButton = screen.getByRole('button', {
    name: 'Close navigation',
  });
  await mobileUser.click(closeButton);

  // Modal close may be async (transition-based)
  await waitFor(() => {
    expect(
      screen.queryByRole('link', { name: 'Overview' })
    ).not.toBeInTheDocument();
  });
});

test('separator renders as divider element', () => {
  render(<Basic.Component />);

  expect(screen.getByRole('separator')).toBeInTheDocument();
});

test('onPress callback fires on item click', async () => {
  const handlePress = vi.fn();

  render(
    <RouterProvider navigate={() => {}}>
      <MarigoldProvider theme={theme}>
        <Sidebar.Provider>
          <Sidebar>
            <Sidebar.Nav>
              <Sidebar.Item href="/home" onPress={handlePress}>
                Home
              </Sidebar.Item>
            </Sidebar.Nav>
          </Sidebar>
        </Sidebar.Provider>
      </MarigoldProvider>
    </RouterProvider>
  );

  const link = screen.getByRole('link', { name: 'Home' });
  await user.click(link);
  expect(handlePress).toHaveBeenCalledOnce();
});

test('branch item onPress fires when clicking branch trigger', async () => {
  const handlePress = vi.fn();

  render(
    <RouterProvider navigate={() => {}}>
      <MarigoldProvider theme={theme}>
        <Sidebar.Provider>
          <Sidebar>
            <Sidebar.Nav>
              <Sidebar.Item
                id="settings"
                textValue="Settings"
                onPress={handlePress}
              >
                Settings
                <Sidebar.Item href="/general">General</Sidebar.Item>
              </Sidebar.Item>
            </Sidebar.Nav>
          </Sidebar>
        </Sidebar.Provider>
      </MarigoldProvider>
    </RouterProvider>
  );

  const settingsTrigger = screen.getByRole('link', { name: /Settings/ });
  await user.click(settingsTrigger);
  expect(handlePress).toHaveBeenCalledOnce();
});

test('nested branches derive href from deepest first leaf', () => {
  render(
    <RouterProvider navigate={() => {}}>
      <MarigoldProvider theme={theme}>
        <Sidebar.Provider>
          <Sidebar>
            <Sidebar.Nav>
              <Sidebar.Item id="outer" textValue="Outer">
                Outer
                <Sidebar.Item id="inner" textValue="Inner">
                  Inner
                  <Sidebar.Item href="/deep-leaf">Deep Leaf</Sidebar.Item>
                </Sidebar.Item>
              </Sidebar.Item>
            </Sidebar.Nav>
          </Sidebar>
        </Sidebar.Provider>
      </MarigoldProvider>
    </RouterProvider>
  );

  // Outer branch should auto-derive href from the deepest first leaf
  const outerLink = screen.getByRole('link', { name: /Outer/ });
  expect(outerLink).toHaveAttribute('href', '/deep-leaf');
});

test('branch without any leaf hrefs renders without href', () => {
  render(
    <RouterProvider navigate={() => {}}>
      <MarigoldProvider theme={theme}>
        <Sidebar.Provider>
          <Sidebar>
            <Sidebar.Nav>
              <Sidebar.Item id="empty-branch" textValue="Empty">
                Empty
                <Sidebar.Item>No href child</Sidebar.Item>
              </Sidebar.Item>
            </Sidebar.Nav>
          </Sidebar>
        </Sidebar.Provider>
      </MarigoldProvider>
    </RouterProvider>
  );

  // Branch item should render as a button when it has no href
  const trigger = screen.getByRole('button', { name: /Empty/ });
  expect(trigger).not.toHaveAttribute('href');
});

test('group label inside branch renders correctly', () => {
  render(
    <RouterProvider navigate={() => {}}>
      <MarigoldProvider theme={theme}>
        <Sidebar.Provider>
          <Sidebar>
            <Sidebar.Nav>
              <Sidebar.Item id="settings" textValue="Settings">
                Settings
                <Sidebar.GroupLabel>Account</Sidebar.GroupLabel>
                <Sidebar.Item href="/profile" active>
                  Profile
                </Sidebar.Item>
                <Sidebar.Separator />
                <Sidebar.Item href="/security">Security</Sidebar.Item>
              </Sidebar.Item>
            </Sidebar.Nav>
          </Sidebar>
        </Sidebar.Provider>
      </MarigoldProvider>
    </RouterProvider>
  );

  // Sub-panel is active (because /profile is active)
  expect(screen.getByText('Account')).toBeInTheDocument();
  expect(screen.getByText('Profile')).toBeInTheDocument();
  expect(screen.getByRole('separator')).toBeInTheDocument();
});

test('switching branches focuses active item in new branch', async () => {
  render(<Complex.Component />);

  // Click Tickets branch from root (exact match)
  const ticketsTrigger = screen.getByRole('link', { name: 'Tickets' });
  await user.click(ticketsTrigger);

  // Wait for panel visibility transition
  const myTicketsLink = await screen.findByRole('link', { name: 'My Tickets' });
  expect(closest(myTicketsLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click back to root
  const backToTickets = await screen.findByRole('button', {
    name: /Back to Tickets/,
  });
  await user.click(backToTickets);

  // Now click Projects (switches directly to projects branch)
  const projectsTrigger = await screen.findByRole('link', { name: 'Projects' });
  await user.click(projectsTrigger);

  // Navigate callback sets path to /active-projects, making Active the active item
  const activeLink = await screen.findByRole('link', { name: 'Active' });
  expect(closest(activeLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Active item receives focus (not back button) since it has aria-current="page"
  await vi.advanceTimersByTimeAsync(400);
  expect(activeLink).toHaveFocus();
});

test('item with explicit id uses that id as key', () => {
  render(<Basic.Component />);

  const link = screen.getByRole('link', { name: /Management/ });
  expect(link).toHaveAttribute('data-key', 'management');
});

test('item without explicit id gets auto-generated key', () => {
  render(<Basic.Component />);

  const link = screen.getByRole('link', { name: 'Overview' });
  // Auto-generated keys follow the pattern "item-N"
  expect(link).toHaveAttribute('data-key');
  expect(link.getAttribute('data-key')).toMatch(/^item-\d+$/);
});

test('textValue auto-extracted from string children', () => {
  render(
    <RouterProvider navigate={() => {}}>
      <MarigoldProvider theme={theme}>
        <Sidebar.Provider>
          <Sidebar>
            <Sidebar.Nav>
              <Sidebar.Item id="branch">
                My Section
                <Sidebar.Item href="/child" active>
                  Child
                </Sidebar.Item>
              </Sidebar.Item>
            </Sidebar.Nav>
          </Sidebar>
        </Sidebar.Provider>
      </MarigoldProvider>
    </RouterProvider>
  );

  // Back button should show auto-extracted textValue "My Section"
  const backButton = screen.getByRole('button', {
    name: /Back to My Section/,
  });
  expect(backButton).toBeInTheDocument();
});

test('direct branch-to-branch switch via active prop change focuses active item', async () => {
  const DirectBranchSwitch = () => {
    const [currentPath, setCurrentPath] = useState('/users');

    return (
      <RouterProvider navigate={() => {}}>
        <MarigoldProvider theme={theme}>
          <button
            data-testid="switch-to-settings"
            onClick={() => setCurrentPath('/general')}
          >
            Go to Settings
          </button>
          <Sidebar.Provider>
            <Sidebar>
              <Sidebar.Nav>
                <Sidebar.Item id="management" textValue="Management">
                  Management
                  <Sidebar.Item href="/users" active={currentPath === '/users'}>
                    Users
                  </Sidebar.Item>
                </Sidebar.Item>
                <Sidebar.Item id="settings" textValue="Settings">
                  Settings
                  <Sidebar.Item
                    href="/general"
                    active={currentPath === '/general'}
                  >
                    General
                  </Sidebar.Item>
                </Sidebar.Item>
              </Sidebar.Nav>
            </Sidebar>
          </Sidebar.Provider>
        </MarigoldProvider>
      </RouterProvider>
    );
  };

  render(<DirectBranchSwitch />);

  // Management panel is active (because /users is active)
  const usersLink = await screen.findByRole('link', { name: 'Users' });
  expect(closest(usersLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Directly switch active branch from management → settings (no root in between)
  await user.click(screen.getByTestId('switch-to-settings'));

  // Settings panel transitions to active (wait for CSS visibility)
  const generalLink = await screen.findByRole('link', { name: 'General' });
  expect(closest(generalLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Focus should be on the active item (not back button)
  await vi.advanceTimersByTimeAsync(400);
  expect(generalLink).toHaveFocus();
});

test('marker components return null when called directly', () => {
  expect(Sidebar.Item({})).toBeNull();
  expect(Sidebar.Separator()).toBeNull();
  expect(Sidebar.GroupLabel({})).toBeNull();
});

test('buildCollection.getItem returns nodes by key', () => {
  const jsx = [
    <SidebarItem key="home" id="home" href="/home">
      Home
    </SidebarItem>,
    <SidebarSeparator key="sep" />,
    <SidebarItem key="about" id="about" href="/about">
      About
    </SidebarItem>,
  ];

  const collection = buildCollection(jsx);
  const home = collection.getItem('home');
  expect(home).toBeDefined();
  expect(home?.type).toBe('item');

  const about = collection.getItem('about');
  expect(about).toBeDefined();

  // Non-existent key returns undefined
  expect(collection.getItem('nonexistent')).toBeUndefined();
});

test('findActiveBranch returns null when no item is active', () => {
  const jsx = [
    <SidebarItem key="home" id="home" href="/home">
      Home
    </SidebarItem>,
    <SidebarItem key="branch" id="branch" textValue="Branch">
      Branch
      <SidebarItem href="/child">Child</SidebarItem>
    </SidebarItem>,
  ];

  const collection = buildCollection(jsx);
  expect(findActiveBranch(collection)).toBeNull();
});

test('findActiveBranch returns null when active item is at root level', () => {
  const jsx = [
    <SidebarItem key="home" id="home" href="/home" active>
      Home
    </SidebarItem>,
    <SidebarItem key="branch" id="branch" textValue="Branch">
      Branch
      <SidebarItem href="/child">Child</SidebarItem>
    </SidebarItem>,
  ];

  const collection = buildCollection(jsx);
  // Active item is at root, not inside a branch
  expect(findActiveBranch(collection)).toBeNull();
});

// --- Keyboard Navigation Tests ---

test('ArrowDown moves focus to next item', async () => {
  render(<Basic.Component />);

  const overview = screen.getByRole('link', { name: 'Overview' });
  const analytics = screen.getByRole('link', { name: 'Analytics' });

  // Tab into sidebar nav to focus the active item (Overview)
  overview.focus();
  expect(overview).toHaveFocus();

  await user.keyboard('{ArrowDown}');
  expect(analytics).toHaveFocus();
});

test('ArrowUp moves focus to previous item', async () => {
  render(<Basic.Component />);

  const overview = screen.getByRole('link', { name: 'Overview' });
  const analytics = screen.getByRole('link', { name: 'Analytics' });

  analytics.focus();
  expect(analytics).toHaveFocus();

  await user.keyboard('{ArrowUp}');
  expect(overview).toHaveFocus();
});

test('ArrowDown wraps from last item to first', async () => {
  render(<Basic.Component />);

  const security = screen.getByRole('link', { name: 'Security' });
  const overview = screen.getByRole('link', { name: 'Overview' });

  security.focus();
  expect(security).toHaveFocus();

  await user.keyboard('{ArrowDown}');
  expect(overview).toHaveFocus();
});

test('ArrowUp wraps from first item to last', async () => {
  render(<Basic.Component />);

  const overview = screen.getByRole('link', { name: 'Overview' });
  const security = screen.getByRole('link', { name: 'Security' });

  overview.focus();
  expect(overview).toHaveFocus();

  await user.keyboard('{ArrowUp}');
  expect(security).toHaveFocus();
});

test('Home key jumps to first item', async () => {
  render(<Basic.Component />);

  const security = screen.getByRole('link', { name: 'Security' });
  const overview = screen.getByRole('link', { name: 'Overview' });

  security.focus();
  expect(security).toHaveFocus();

  await user.keyboard('{Home}');
  expect(overview).toHaveFocus();
});

test('End key jumps to last item', async () => {
  render(<Basic.Component />);

  const overview = screen.getByRole('link', { name: 'Overview' });
  const security = screen.getByRole('link', { name: 'Security' });

  overview.focus();
  expect(overview).toHaveFocus();

  await user.keyboard('{End}');
  expect(security).toHaveFocus();
});

test('separators and group labels are skipped during arrow navigation', async () => {
  render(<Basic.Component />);

  // Root panel: Overview, Analytics, [separator], Management, [group label "Settings"], General, Security
  const analytics = screen.getByRole('link', { name: 'Analytics' });
  const management = screen.getByRole('link', { name: /Management/ });

  analytics.focus();
  expect(analytics).toHaveFocus();

  // ArrowDown should skip the separator and land on Management
  await user.keyboard('{ArrowDown}');
  expect(management).toHaveFocus();

  // ArrowDown should skip the group label and land on General
  const general = screen.getByRole('link', { name: 'General' });
  await user.keyboard('{ArrowDown}');
  expect(general).toHaveFocus();
});

test('arrow navigation in sub-panel includes back button', async () => {
  render(<WithActiveBranch.Component />);

  // WithActiveBranch starts with /users active, Management panel is active
  const usersLink = screen.getByRole('link', { name: 'Users' });
  const backButton = screen.getByRole('button', { name: /Back to Management/ });

  // Users is the active item, it should be the default focus target
  usersLink.focus();
  expect(usersLink).toHaveFocus();

  // ArrowUp should go to back button (wrapping from first item to last goes to Billing,
  // but going up from Users: Users is after back button in DOM order)
  // Actually, DOM order is: back button, Users, Teams, Billing
  // ArrowUp from Users → back button
  await user.keyboard('{ArrowUp}');
  expect(backButton).toHaveFocus();

  // ArrowDown from back button → Users
  await user.keyboard('{ArrowDown}');
  expect(usersLink).toHaveFocus();
});

test('panel transition focuses active item when one exists (not back button)', async () => {
  const PanelFocusTest = () => {
    const [activePath, setActivePath] = useState<string | null>(null);

    return (
      <RouterProvider navigate={() => {}}>
        <MarigoldProvider theme={theme}>
          <button
            data-testid="activate-child-a"
            onClick={() => setActivePath('/child-a')}
          >
            Activate
          </button>
          <Sidebar.Provider>
            <Sidebar>
              <Sidebar.Nav>
                <Sidebar.Item id="branch" textValue="Branch">
                  Branch
                  <Sidebar.Item
                    href="/child-a"
                    active={activePath === '/child-a'}
                  >
                    Child A
                  </Sidebar.Item>
                  <Sidebar.Item href="/child-b">Child B</Sidebar.Item>
                </Sidebar.Item>
              </Sidebar.Nav>
            </Sidebar>
          </Sidebar.Provider>
        </MarigoldProvider>
      </RouterProvider>
    );
  };

  render(<PanelFocusTest />);

  // Branch trigger is in root panel (active)
  const branchTrigger = screen.getByRole('link', { name: /Branch/ });
  await user.click(branchTrigger);

  // Sub-panel opens (no active child yet) — focus goes to back button
  const backButton = await screen.findByRole('button', {
    name: /Back to Branch/,
  });
  await vi.advanceTimersByTimeAsync(400);
  expect(backButton).toHaveFocus();

  // Go back to root, then activate child and re-enter
  await user.click(backButton);
  await vi.advanceTimersByTimeAsync(400);

  // Activate Child A which will auto-open the branch panel
  await user.click(screen.getByTestId('activate-child-a'));

  // Branch panel opens with Child A active → focus should be on Child A
  const childA = await screen.findByRole('link', { name: 'Child A' });
  await vi.advanceTimersByTimeAsync(400);
  expect(childA).toHaveFocus();
});

test('panel transition falls back to back button when no active item', async () => {
  render(
    <RouterProvider navigate={() => {}}>
      <MarigoldProvider theme={theme}>
        <Sidebar.Provider>
          <Sidebar>
            <Sidebar.Nav>
              <Sidebar.Item id="branch" textValue="Branch">
                Branch
                <Sidebar.Item href="/child-a">Child A</Sidebar.Item>
                <Sidebar.Item href="/child-b">Child B</Sidebar.Item>
              </Sidebar.Item>
            </Sidebar.Nav>
          </Sidebar>
        </Sidebar.Provider>
      </MarigoldProvider>
    </RouterProvider>
  );

  // Click branch trigger — no children have active prop
  const branchTrigger = screen.getByRole('link', { name: /Branch/ });
  await user.click(branchTrigger);

  // Focus falls back to back button since no active item exists
  const backButton = await screen.findByRole('button', {
    name: /Back to Branch/,
  });
  await vi.advanceTimersByTimeAsync(400);
  expect(backButton).toHaveFocus();
});

// --- Roving Tabindex Tests ---

test('only one nav item has tabIndex=0 in the active panel', () => {
  render(<Basic.Component />);

  const links = screen.getAllByRole('link');
  const tabbable = links.filter(l => l.tabIndex === 0);
  const nonTabbable = links.filter(l => l.tabIndex === -1);

  expect(tabbable).toHaveLength(1);
  // The active item (Overview) should be the tab stop
  expect(tabbable[0]).toHaveAttribute('aria-current', 'page');
  expect(nonTabbable.length).toBeGreaterThan(0);
});

test('arrow key updates which item has tabIndex=0', async () => {
  render(<Basic.Component />);

  const overview = screen.getByRole('link', { name: 'Overview' });
  const analytics = screen.getByRole('link', { name: 'Analytics' });

  expect(overview).toHaveAttribute('tabindex', '0');
  expect(analytics).toHaveAttribute('tabindex', '-1');

  overview.focus();
  await user.keyboard('{ArrowDown}');

  expect(analytics).toHaveFocus();
  expect(analytics).toHaveAttribute('tabindex', '0');
  expect(overview).toHaveAttribute('tabindex', '-1');
});

test('back button participates in roving tabindex', async () => {
  render(<WithActiveBranch.Component />);

  const backButton = screen.getByRole('button', { name: /Back to Management/ });
  const usersLink = screen.getByRole('link', { name: 'Users' });

  // Users is active, so it should be the tab stop
  expect(usersLink).toHaveAttribute('tabindex', '0');
  expect(backButton).toHaveAttribute('tabindex', '-1');

  // Arrow up to back button
  usersLink.focus();
  await user.keyboard('{ArrowUp}');

  expect(backButton).toHaveFocus();
  expect(backButton).toHaveAttribute('tabindex', '0');
  expect(usersLink).toHaveAttribute('tabindex', '-1');
});

test('buildCollection handles group labels and separators in index', () => {
  const jsx = [
    <SidebarGroupLabel key="label">Section</SidebarGroupLabel>,
    <SidebarItem key="item" id="item-1" href="/page">
      Page
    </SidebarItem>,
    <SidebarSeparator key="sep" />,
  ];

  const collection = buildCollection(jsx);
  expect(collection.rootNodes).toHaveLength(3);
  expect(collection.rootNodes[0].type).toBe('groupLabel');
  expect(collection.rootNodes[1].type).toBe('item');
  expect(collection.rootNodes[2].type).toBe('separator');

  // All nodes should be accessible via getItem
  expect(collection.getItem('item-1')).toBeDefined();
});
