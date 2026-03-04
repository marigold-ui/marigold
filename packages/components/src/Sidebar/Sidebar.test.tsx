import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { theme } from '@marigold/theme-rui';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { ensureOverlayContainer, mockMatchMedia } from '../test.utils';
import { useSidebar } from './Context';
import { Sidebar } from './Sidebar';
import {
  Basic,
  Complex,
  Controlled,
  DefaultCollapsed,
  DirectBranchSwitch,
  GroupLabelInBranch,
  NestedBranches,
  WithActiveBranch,
  WithoutHref,
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

const user = userEvent.setup();

beforeEach(() => {
  window.matchMedia = mockMatchMedia([]);
  // Clear cookies
  document.cookie = 'marigold:sidebar:state=;max-age=0';
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

  // Root panel should be in "before" position (not active)
  const rootPanel = closest(
    screen.getByRole('link', { name: 'Overview' }),
    '[data-position]'
  );
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
  const usersLink = screen.getByRole('link', { name: 'Users' });
  expect(closest(usersLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click back
  const backButton = screen.getByRole('button', { name: /Back/ });
  await user.click(backButton);

  // Root panel should now be active
  const overviewLink = screen.getByRole('link', { name: 'Overview' });
  expect(closest(overviewLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );
});

test('re-entering the same branch after back reopens sub-panel', async () => {
  render(<WithActiveBranch.Component />);

  // Management sub-panel starts active
  const usersLink = screen.getByRole('link', { name: 'Users' });
  expect(closest(usersLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click back → root panel shown
  const backButton = screen.getByRole('button', { name: /Back/ });
  await user.click(backButton);

  const overviewLink = screen.getByRole('link', { name: 'Overview' });
  expect(closest(overviewLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click the Management branch trigger again → sub-panel should reopen
  const managementTrigger = screen.getByRole('link', { name: /Management/ });
  await user.click(managementTrigger);

  expect(closest(usersLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );
});

test('navigating between branches via stateful active prop', async () => {
  render(<Complex.Component />);

  // Dashboard is at root, click Tickets branch (exact match to avoid "My Tickets" etc.)
  const ticketsTrigger = screen.getByRole('link', { name: 'Tickets' });
  await user.click(ticketsTrigger);

  const myTicketsLink = screen.getByRole('link', { name: 'My Tickets' });
  expect(closest(myTicketsLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click back → root
  await user.click(screen.getByRole('button', { name: /Back to Tickets/ }));

  const dashboardLink = screen.getByRole('link', { name: 'Dashboard' });
  expect(closest(dashboardLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click Projects → navigates to /active-projects, switches to projects panel
  const projectsTrigger = screen.getByRole('link', { name: 'Projects' });
  await user.click(projectsTrigger);

  const activeLink = screen.getByRole('link', { name: 'Active' });
  expect(closest(activeLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click back from projects → root
  await user.click(screen.getByRole('button', { name: /Back to Projects/ }));

  expect(closest(dashboardLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click Reports → navigates to /ticket-volume, opens reports panel
  const reportsTrigger = screen.getByRole('link', { name: 'Reports' });
  await user.click(reportsTrigger);

  const ticketVolumeLink = screen.getByRole('link', {
    name: 'Ticket Volume',
  });
  expect(closest(ticketVolumeLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );
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

  // Root panel is in "before" position → should be inert
  const rootPanel = closest(
    screen.getByRole('link', { name: 'Overview' }),
    '[data-position]'
  );
  expect(rootPanel).toHaveAttribute('inert');

  // Management panel is active → should NOT be inert
  const activePanel = closest(
    screen.getByRole('link', { name: 'Users' }),
    '[data-position]'
  );
  expect(activePanel).not.toHaveAttribute('inert');
});

test('focus moves to back button when drilling into branch', async () => {
  render(<Basic.Component />);

  const managementTrigger = screen.getByRole('link', { name: /Management/ });
  await user.click(managementTrigger);

  const backButton = screen.getByRole('button', {
    name: /Back to Management/,
  });
  expect(backButton).toHaveFocus();
});

test('focus returns to branch trigger when going back', async () => {
  render(<WithActiveBranch.Component />);

  const backButton = screen.getByRole('button', {
    name: /Back to Management/,
  });
  await user.click(backButton);

  const managementTrigger = screen.getByRole('link', { name: /Management/ });
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
  window.matchMedia = mockMatchMedia(['(width < 640px)']);
  ensureOverlayContainer();

  render(<Basic.Component />);

  // Sidebar link is not visible on mobile until toggled
  expect(
    screen.queryByRole('link', { name: 'Overview' })
  ).not.toBeInTheDocument();

  // Open the mobile sheet
  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
  await user.click(trigger);
  expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument();

  // Close via close button
  const closeButton = screen.getByRole('button', {
    name: 'Close navigation',
  });
  await user.click(closeButton);
  expect(
    screen.queryByRole('link', { name: 'Overview' })
  ).not.toBeInTheDocument();
});

test('separator renders as divider element', () => {
  render(<Basic.Component />);

  expect(screen.getByRole('separator')).toBeInTheDocument();
});

test('onPress callback fires on item click', async () => {
  const handlePress = vi.fn();

  render(
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
  );

  const link = screen.getByRole('link', { name: 'Home' });
  await user.click(link);
  expect(handlePress).toHaveBeenCalledOnce();
});

test('branch item onPress fires when clicking branch trigger', async () => {
  const handlePress = vi.fn();

  render(
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
  );

  const settingsTrigger = screen.getByRole('link', { name: /Settings/ });
  await user.click(settingsTrigger);
  expect(handlePress).toHaveBeenCalledOnce();
});

test('nested branches derive href from deepest first leaf', () => {
  render(<NestedBranches.Component />);

  // Outer branch should auto-derive href from the deepest first leaf
  const outerLink = screen.getByRole('link', { name: /Outer/ });
  expect(outerLink).toHaveAttribute('href', '/deep-leaf');
});

test('branch without any leaf hrefs renders without href', () => {
  render(<WithoutHref.Component />);

  // Branch item should render as a link without href attribute
  const trigger = screen.getByRole('link', { name: /Empty/ });
  expect(trigger).not.toHaveAttribute('href');
});

test('group label inside branch renders correctly', () => {
  render(<GroupLabelInBranch.Component />);

  // Sub-panel is active (because /profile is active)
  expect(screen.getByText('Account')).toBeInTheDocument();
  expect(screen.getByText('Profile')).toBeInTheDocument();
  expect(screen.getByRole('separator')).toBeInTheDocument();
});

test('switching branches directly updates focus to back button', async () => {
  render(<Complex.Component />);

  // Click Tickets branch from root (exact match)
  const ticketsTrigger = screen.getByRole('link', { name: 'Tickets' });
  await user.click(ticketsTrigger);

  const myTicketsLink = screen.getByRole('link', { name: 'My Tickets' });
  expect(closest(myTicketsLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click back to root
  await user.click(screen.getByRole('button', { name: /Back to Tickets/ }));

  // Now click Projects (switches directly to projects branch)
  const projectsTrigger = screen.getByRole('link', { name: 'Projects' });
  await user.click(projectsTrigger);

  const activeLink = screen.getByRole('link', { name: 'Active' });
  expect(closest(activeLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Back button in projects panel should be focused
  const backButton = screen.getByRole('button', { name: /Back to Projects/ });
  expect(backButton).toHaveFocus();
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
  render(<GroupLabelInBranch.Component />);

  // Back button should show auto-extracted textValue "Settings"
  const backButton = screen.getByRole('button', {
    name: /Back to Settings/,
  });
  expect(backButton).toBeInTheDocument();
});

test('direct branch-to-branch switch via active prop change focuses back button', async () => {
  render(<DirectBranchSwitch.Component />);

  // Management panel is active (because /users is active)
  const usersLink = screen.getByRole('link', { name: 'Users' });
  expect(closest(usersLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Directly switch active branch from management → settings (no root in between)
  await user.click(screen.getByTestId('switch-to-settings'));

  // Settings panel should now be active
  const generalLink = screen.getByRole('link', { name: 'General' });
  expect(closest(generalLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Focus should be on the back button (branch-to-branch switch)
  const backButton = screen.getByRole('button', { name: /Back to Settings/ });
  expect(backButton).toHaveFocus();
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
