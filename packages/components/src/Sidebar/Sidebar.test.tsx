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
import {
  panelPosition,
  useLastDistinctValue,
  useRovingItem,
} from './useSidebarNav';

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

test('toggle button collapses expanded sidebar', async () => {
  render(<Basic.Component />);
  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });

  await user.click(trigger);

  expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('toggle button re-expands collapsed sidebar', async () => {
  render(<DefaultCollapsed.Component />);
  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });

  await user.click(trigger);

  expect(trigger).toHaveAttribute('aria-expanded', 'true');
});

test('keyboard shortcut Cmd+B collapses sidebar', async () => {
  render(<Basic.Component />);
  const toggle = screen.getByRole('button', { name: 'Toggle navigation' });

  await user.keyboard('{Meta>}b{/Meta}');

  expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('keyboard shortcut Cmd+B expands sidebar', async () => {
  render(<Basic.Component />);
  const toggle = screen.getByRole('button', { name: 'Toggle navigation' });
  await user.keyboard('{Meta>}b{/Meta}');

  await user.keyboard('{Meta>}b{/Meta}');

  expect(toggle).toHaveAttribute('aria-expanded', 'true');
});

test('active state with aria-current', () => {
  render(<Basic.Component />);

  const overviewLink = screen.getByRole('link', { name: 'Overview' });
  const analyticsLink = screen.getByRole('link', { name: 'Analytics' });
  expect(overviewLink).toHaveAttribute('aria-current', 'page');
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

  const managementLink = screen.getByRole('link', { name: /Management/ });
  expect(managementLink).toHaveAttribute('href', '/users');
});

test('sub-panel opens when child is active', () => {
  render(<WithActiveBranch.Component />);

  const rootPanel = closest(linkByText('Overview'), '[data-position]');
  const usersLink = screen.getByRole('link', { name: 'Users' });
  const managementPanel = closest(usersLink, '[data-position]');
  const backButton = screen.getByRole('button', { name: /Back/ });

  expect(rootPanel).toHaveAttribute('data-position', 'before');
  expect(managementPanel).toHaveAttribute('data-position', 'active');
  expect(backButton).toBeInTheDocument();
});

test('back button returns to root panel', async () => {
  render(<WithActiveBranch.Component />);
  const backButton = await screen.findByRole('button', { name: /Back/ });

  await user.click(backButton);

  const overviewLink = await screen.findByRole('link', { name: 'Overview' });
  expect(closest(overviewLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );
});

test('re-entering the same branch after back reopens sub-panel', async () => {
  render(<WithActiveBranch.Component />);

  // Go back to root
  const backButton = await screen.findByRole('button', { name: /Back/ });
  await user.click(backButton);
  await screen.findByRole('link', { name: 'Overview' });

  // Re-enter the Management branch
  const managementTrigger = await screen.findByRole('link', {
    name: /Management/,
  });
  await user.click(managementTrigger);

  await waitFor(() => {
    expect(closest(linkByText('Users'), '[data-position]')).toHaveAttribute(
      'data-position',
      'active'
    );
  });
});

test('navigating between branches via stateful active prop', async () => {
  render(<Complex.Component />);

  // Navigate into Tickets branch
  await user.click(screen.getByRole('link', { name: 'Tickets' }));

  const myTicketsLink = await screen.findByRole('link', { name: 'My Tickets' });
  expect(closest(myTicketsLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Back to root
  await user.click(
    await screen.findByRole('button', { name: /Back to Tickets/ })
  );

  const dashboardLink = await screen.findByRole('link', { name: 'Dashboard' });
  expect(closest(dashboardLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Navigate into Projects branch
  await user.click(await screen.findByRole('link', { name: 'Projects' }));

  const activeLink = await screen.findByRole('link', { name: 'Active' });
  expect(closest(activeLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Back to root
  await user.click(
    await screen.findByRole('button', { name: /Back to Projects/ })
  );

  const dashboardLink2 = await screen.findByRole('link', { name: 'Dashboard' });
  expect(closest(dashboardLink2, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Navigate into Reports branch
  await user.click(await screen.findByRole('link', { name: 'Reports' }));

  const ticketVolume = await screen.findByRole('link', {
    name: 'Ticket Volume',
  });
  expect(closest(ticketVolume, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );
});

test('data-state attribute reflects collapsed after toggle', async () => {
  render(<Basic.Component />);
  const shell = closest(
    screen.getByRole('link', { name: 'Overview' }),
    '[data-state]'
  );
  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });

  await user.click(trigger);

  expect(shell).toHaveAttribute('data-state', 'collapsed');
});

test('data-state attribute reflects expanded after toggle', async () => {
  render(<DefaultCollapsed.Component />);
  const shell = closest(
    screen.getByRole('link', { name: 'Overview' }),
    '[data-state]'
  );
  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });

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

test('toggle writes collapsed state to cookie', async () => {
  render(<Basic.Component />);
  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });

  await user.click(trigger);

  expect(document.cookie).toContain('marigold:sidebar:state=collapsed');
});

test('toggle writes expanded state to cookie', async () => {
  render(<DefaultCollapsed.Component />);
  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });

  await user.click(trigger);

  expect(document.cookie).toContain('marigold:sidebar:state=expanded');
});

test('cookie overrides defaultOpen', () => {
  document.cookie = 'marigold:sidebar:state=collapsed;path=/;max-age=604800';

  render(<DefaultCollapsed.Component />);
  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
  const shell = closest(
    screen.getByRole('link', { name: 'Overview' }),
    '[data-state]'
  );

  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(shell).toHaveAttribute('data-state', 'collapsed');
});

test('defaultOpen={false} starts sidebar collapsed', () => {
  render(<DefaultCollapsed.Component />);

  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
  const shell = closest(
    screen.getByRole('link', { name: 'Overview' }),
    '[data-state]'
  );

  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(shell).toHaveAttribute('data-state', 'collapsed');
});

test('controlled mode toggles via onOpenChange', async () => {
  render(<Controlled.Component />);
  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });

  await user.click(trigger);

  expect(screen.getByText('Sidebar is closed')).toBeInTheDocument();
});

test('controlled mode re-opens via onOpenChange', async () => {
  render(<Controlled.Component />);
  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
  await user.click(trigger);

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

test('mobile closes sheet when leaf nav item is clicked', async () => {
  const mobileUser = userEvent.setup();
  window.matchMedia = mockMatchMedia(['(width < 640px)']);
  ensureOverlayContainer();

  render(<Basic.Component />);

  // Open the mobile sheet
  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
  await mobileUser.click(trigger);
  expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument();

  // Click a leaf nav item
  await mobileUser.click(screen.getByRole('link', { name: 'Overview' }));

  // Modal should close
  await waitFor(() => {
    expect(
      screen.queryByRole('link', { name: 'Overview' })
    ).not.toBeInTheDocument();
  });
});

test('mobile keeps sheet open when branch item is clicked', async () => {
  const mobileUser = userEvent.setup();
  window.matchMedia = mockMatchMedia(['(width < 640px)']);
  ensureOverlayContainer();

  render(<Basic.Component />);

  // Open the mobile sheet
  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
  await mobileUser.click(trigger);

  // Click a branch item — should NOT close the modal, should open sub-panel
  await mobileUser.click(screen.getByRole('link', { name: 'Management' }));

  // Sub-panel should be visible (modal still open)
  expect(linkByText('Users')).toBeInTheDocument();
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

  const outerLink = screen.getByRole('link', { name: /Outer/ });

  // Outer branch should auto-derive href from the deepest first leaf
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

  const trigger = screen.getByRole('button', { name: /Empty/ });

  // Branch item should render as a button when it has no href
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

  // Navigate into Tickets, then back to root
  await user.click(screen.getByRole('link', { name: 'Tickets' }));
  await screen.findByRole('link', { name: 'My Tickets' });
  await user.click(
    await screen.findByRole('button', { name: /Back to Tickets/ })
  );

  // Switch to Projects branch
  const projectsTrigger = await screen.findByRole('link', { name: 'Projects' });
  await user.click(projectsTrigger);

  // Active item receives focus (not back button) since it has aria-current="page"
  const activeLink = await screen.findByRole('link', { name: 'Active' });
  await vi.advanceTimersByTimeAsync(400);

  expect(closest(activeLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );
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
  expect(collection.getItem('item-1')).toBeDefined();
});

// --- collection.ts edge-case tests ---

test('buildCollection skips unrecognized children', () => {
  const jsx = [
    <SidebarItem key="a" id="a" href="/a">
      A
    </SidebarItem>,
    <div key="unknown">I am not a sidebar element</div>,
    <SidebarItem key="b" id="b" href="/b">
      B
    </SidebarItem>,
  ];

  const collection = buildCollection(jsx);

  expect(collection.rootNodes).toHaveLength(2);
  expect(collection.rootNodes[0].key).toBe('a');
  expect(collection.rootNodes[1].key).toBe('b');
});

test('buildCollection extracts textValue from non-string children as empty', () => {
  const jsx = [
    <SidebarItem key="icon-item" id="icon-item">
      {/* Only non-string children: icon element + nested SidebarItem */}
      <span>Icon</span>
      <SidebarItem href="/child" active>
        Child
      </SidebarItem>
    </SidebarItem>,
  ];

  const collection = buildCollection(jsx);
  const node = collection.getItem('icon-item');

  expect(node).toBeDefined();
  // textValue should be empty since there are no direct string children
  expect(node?.type === 'item' && node.textValue).toBe('');
});

test('findActiveBranch finds deeply nested active item', () => {
  const jsx = [
    <SidebarItem key="root-branch" id="root-branch" textValue="Root Branch">
      Root Branch
      <SidebarItem id="mid-branch" textValue="Mid Branch">
        Mid Branch
        <SidebarItem href="/deep" active>
          Deep Leaf
        </SidebarItem>
      </SidebarItem>
    </SidebarItem>,
  ];

  const collection = buildCollection(jsx);

  expect(findActiveBranch(collection)).toBe('root-branch');
});

test('firstLeafHref returns undefined when branch has no leaf hrefs', () => {
  const jsx = [
    <SidebarItem key="empty" id="empty" textValue="Empty">
      Empty
      <SidebarItem>No href</SidebarItem>
    </SidebarItem>,
  ];

  const collection = buildCollection(jsx);
  const node = collection.getItem('empty');

  // Branch node should have undefined href since no leaf has an href
  expect(node?.type === 'item' && node.href).toBeUndefined();
});

// --- panelPosition utility tests ---

test('panelPosition returns active for root when stack is empty', () => {
  expect(panelPosition('root', [])).toBe('active');
});

test('panelPosition returns before for root when stack has entries', () => {
  expect(panelPosition('root', ['branch-a'])).toBe('before');
});

test('panelPosition returns active for key at top of stack', () => {
  expect(panelPosition('branch-a', ['branch-a'])).toBe('active');
});

test('panelPosition returns before for key earlier in stack', () => {
  expect(panelPosition('branch-a', ['branch-a', 'branch-b'])).toBe('before');
});

test('panelPosition returns after for key not in stack', () => {
  expect(panelPosition('branch-c', ['branch-a'])).toBe('after');
});

// --- useRovingItem error outside provider ---

test('useRovingItem throws outside RovingTabIndexProvider', () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

  expect(() => {
    renderHook(() => useRovingItem('some-key'));
  }).toThrow('useRovingItem must be used within a RovingTabIndexProvider');

  spy.mockRestore();
});

// --- useLastDistinctValue hook ---

test('useLastDistinctValue returns undefined on first render', () => {
  const { result } = renderHook(() => useLastDistinctValue('a'));

  expect(result.current).toBeUndefined();
});

test('useLastDistinctValue returns previous value after change', () => {
  const { result, rerender } = renderHook(
    ({ value }) => useLastDistinctValue(value),
    { initialProps: { value: 'a' } }
  );

  expect(result.current).toBeUndefined();

  rerender({ value: 'b' });

  expect(result.current).toBe('a');
});

// --- Ctrl+B keyboard shortcut (non-meta, ctrlKey) ---

test('keyboard shortcut Ctrl+B toggles sidebar', async () => {
  render(<Basic.Component />);
  const toggle = screen.getByRole('button', { name: 'Toggle navigation' });

  await user.keyboard('{Control>}b{/Control}');

  expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
