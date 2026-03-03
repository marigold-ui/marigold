import { renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { vi } from 'vitest';
import type { Theme } from '@marigold/system';
import { cva } from '@marigold/system';
import { RouterProvider } from '../RouterProvider/RouterProvider';
import { setup } from '../test.utils';
import { useSidebar } from './Context';
import { Sidebar } from './Sidebar';
import {
  SidebarGroupLabel,
  SidebarItem,
  SidebarSeparator,
} from './SidebarItem';
import { buildCollection, findActiveBranch } from './collection';

// Testing Library has no API for querying ancestor elements.
// eslint-disable-next-line testing-library/no-node-access
const closest = (el: HTMLElement, sel: string) => el.closest(sel);

let isSmallScreen = false;
const mockMatchMedia = () =>
  vi.fn().mockImplementation(() => {
    return {
      matches: isSmallScreen,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
  });
window.matchMedia = mockMatchMedia();

const theme: Theme = {
  name: 'test',
  components: {
    Sidebar: {
      root: cva({}),
      overlay: cva({}),
      modal: cva({}),
      closeButton: cva({}),
      header: cva({}),
      content: cva({}),
      footer: cva({}),
      toggle: cva({}),
      separator: cva({}),
      groupLabel: cva({}),
      menu: cva({}),
      menuItem: cva({}),
      menuButton: cva({}),
      subNav: cva({}),
      subNavBackButton: cva({}),
    },
    Button: cva({}),
    CloseButton: cva({}),
    Underlay: cva({}),
    Modal: cva({}),
  },
};

const user = userEvent.setup();
const { render } = setup({ theme });

beforeEach(() => {
  isSmallScreen = false;
  window.matchMedia = mockMatchMedia();
  // Clear cookies
  document.cookie = 'marigold:sidebar:state=;max-age=0';
});

test('renders with sub-components', () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Header>Header</Sidebar.Header>

        <Sidebar.Nav aria-label="Main navigation">
          <Sidebar.GroupLabel>Section</Sidebar.GroupLabel>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
        </Sidebar.Nav>

        <Sidebar.Footer>Footer</Sidebar.Footer>
      </Sidebar>
    </Sidebar.Provider>
  );

  expect(
    screen.getByRole('navigation', { name: 'Main navigation' })
  ).toBeInTheDocument();
  expect(screen.getByText('Header')).toBeInTheDocument();
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Footer')).toBeInTheDocument();
  expect(screen.getByText('Section')).toBeInTheDocument();
});

test('toggle expand/collapse via toggle button', async () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
      <main>
        <Sidebar.Toggle />
      </main>
    </Sidebar.Provider>
  );

  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
  expect(trigger).toHaveAttribute('aria-expanded', 'true');

  await user.click(trigger);
  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  await user.click(trigger);
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
});

test('keyboard shortcut Cmd+B toggles sidebar', async () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
      <main>
        <Sidebar.Toggle />
      </main>
    </Sidebar.Provider>
  );

  const toggle = screen.getByRole('button', { name: 'Toggle navigation' });
  expect(toggle).toHaveAttribute('aria-expanded', 'true');

  await user.keyboard('{Meta>}b{/Meta}');
  expect(toggle).toHaveAttribute('aria-expanded', 'false');

  await user.keyboard('{Meta>}b{/Meta}');
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
});

test('active state with aria-current', () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home" active>
            Home
          </Sidebar.Item>
          <Sidebar.Item href="/about">About</Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
    </Sidebar.Provider>
  );

  const homeLink = screen.getByRole('link', { name: 'Home' });
  expect(homeLink).toHaveAttribute('aria-current', 'page');

  const aboutLink = screen.getByRole('link', { name: 'About' });
  expect(aboutLink).not.toHaveAttribute('aria-current');
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
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
    </Sidebar.Provider>
  );

  const link = screen.getByRole('link', { name: 'Home' });
  expect(link).toHaveAttribute('href', '/home');
});

test('mobile renders sheet overlay', () => {
  isSmallScreen = true;
  window.matchMedia = mockMatchMedia();

  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
      <main>
        <Sidebar.Toggle />
      </main>
    </Sidebar.Provider>
  );

  // On mobile, sidebar content is not visible until toggled
  expect(screen.queryByText('Home')).not.toBeInTheDocument();
});

test('branch items render as links with auto-derived href', () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
          <Sidebar.Item id="settings" textValue="Settings">
            Settings
            <Sidebar.Item href="/general">General</Sidebar.Item>
            <Sidebar.Item href="/security">Security</Sidebar.Item>
          </Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
    </Sidebar.Provider>
  );

  // Branch item "Settings" should be a link with href from first child
  const settingsLink = screen.getByRole('link', { name: /Settings/ });
  expect(settingsLink).toHaveAttribute('href', '/general');
});

test('sub-panel opens when child is active', () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
          <Sidebar.Item id="settings" textValue="Settings">
            Settings
            <Sidebar.Item href="/general" active>
              General
            </Sidebar.Item>
            <Sidebar.Item href="/security">Security</Sidebar.Item>
          </Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
    </Sidebar.Provider>
  );

  // Root panel should be in "before" position (not active)
  const rootPanel = closest(
    screen.getByRole('link', { name: 'Home' }),
    '[data-position]'
  );
  expect(rootPanel).toHaveAttribute('data-position', 'before');

  // Settings sub-panel should be active
  const generalLink = screen.getByRole('link', { name: 'General' });
  const settingsPanel = closest(generalLink, '[data-position]');
  expect(settingsPanel).toHaveAttribute('data-position', 'active');

  // Back button should be visible in the active panel
  const backButton = screen.getByRole('button', { name: /Back/ });
  expect(backButton).toBeInTheDocument();
});

test('back button returns to root panel', async () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
          <Sidebar.Item id="settings" textValue="Settings">
            Settings
            <Sidebar.Item href="/general" active>
              General
            </Sidebar.Item>
            <Sidebar.Item href="/security">Security</Sidebar.Item>
          </Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
    </Sidebar.Provider>
  );

  // Settings sub-panel is active
  const generalLink = screen.getByRole('link', { name: 'General' });
  expect(closest(generalLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click back
  const backButton = screen.getByRole('button', { name: /Back/ });
  await user.click(backButton);

  // Root panel should now be active
  const homeLink = screen.getByRole('link', { name: 'Home' });
  expect(closest(homeLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );
});

test('re-entering the same branch after back reopens sub-panel', async () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
          <Sidebar.Item id="settings" textValue="Settings">
            Settings
            <Sidebar.Item href="/general" active>
              General
            </Sidebar.Item>
            <Sidebar.Item href="/security">Security</Sidebar.Item>
          </Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
    </Sidebar.Provider>
  );

  // Settings sub-panel starts active
  const generalLink = screen.getByRole('link', { name: 'General' });
  expect(closest(generalLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click back → root panel shown
  const backButton = screen.getByRole('button', { name: /Back/ });
  await user.click(backButton);

  const homeLink = screen.getByRole('link', { name: 'Home' });
  expect(closest(homeLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click the Settings branch trigger again → sub-panel should reopen
  const settingsTrigger = screen.getByRole('link', { name: /Settings/ });
  await user.click(settingsTrigger);

  expect(closest(generalLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );
});

test('navigating between branches via stateful active prop', async () => {
  const SidebarWithRouter = () => {
    const [currentPath, setCurrentPath] = useState('/users');

    return (
      <RouterProvider navigate={setCurrentPath}>
        <Sidebar.Provider>
          <Sidebar>
            <Sidebar.Nav>
              <Sidebar.Item
                href="/overview"
                active={currentPath === '/overview'}
              >
                Overview
              </Sidebar.Item>
              <Sidebar.Item id="management" textValue="Management">
                Management
                <Sidebar.Item href="/users" active={currentPath === '/users'}>
                  Users
                </Sidebar.Item>
                <Sidebar.Item href="/teams" active={currentPath === '/teams'}>
                  Teams
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
      </RouterProvider>
    );
  };

  render(<SidebarWithRouter />);

  // Management sub-panel starts active (because /users is active)
  const usersLink = screen.getByRole('link', { name: 'Users' });
  expect(closest(usersLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click back → root (use specific label since multiple back buttons exist)
  await user.click(screen.getByRole('button', { name: /Back to Management/ }));

  const overviewLink = screen.getByRole('link', { name: 'Overview' });
  expect(closest(overviewLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click Settings → navigates to /general, switches to settings panel
  const settingsTrigger = screen.getByRole('link', { name: /Settings/ });
  await user.click(settingsTrigger);

  const generalLink = screen.getByRole('link', { name: 'General' });
  expect(closest(generalLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click back from settings → root
  await user.click(screen.getByRole('button', { name: /Back to Settings/ }));

  expect(closest(overviewLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click Management → navigates to /users, opens management panel
  const managementTrigger = screen.getByRole('link', { name: /Management/ });
  await user.click(managementTrigger);

  expect(closest(usersLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );
});

test('data-state attribute reflects expanded/collapsed', async () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
      <main>
        <Sidebar.Toggle />
      </main>
    </Sidebar.Provider>
  );

  const shell = closest(screen.getByText('Home'), '[data-state]');
  expect(shell).toHaveAttribute('data-state', 'expanded');

  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
  await user.click(trigger);
  expect(shell).toHaveAttribute('data-state', 'collapsed');

  await user.click(trigger);
  expect(shell).toHaveAttribute('data-state', 'expanded');
});

test('non-active panels have inert attribute', () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
          <Sidebar.Item id="settings" textValue="Settings">
            Settings
            <Sidebar.Item href="/general" active>
              General
            </Sidebar.Item>
          </Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
    </Sidebar.Provider>
  );

  // Root panel is in "before" position → should be inert
  const rootPanel = closest(
    screen.getByRole('link', { name: 'Home' }),
    '[data-position]'
  );
  expect(rootPanel).toHaveAttribute('inert');

  // Settings panel is active → should NOT be inert
  const activePanel = closest(
    screen.getByRole('link', { name: 'General' }),
    '[data-position]'
  );
  expect(activePanel).not.toHaveAttribute('inert');
});

test('focus moves to back button when drilling into branch', async () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
          <Sidebar.Item id="settings" textValue="Settings">
            Settings
            <Sidebar.Item href="/general">General</Sidebar.Item>
          </Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
    </Sidebar.Provider>
  );

  const settingsTrigger = screen.getByRole('link', { name: /Settings/ });
  await user.click(settingsTrigger);

  const backButton = screen.getByRole('button', { name: /Back to Settings/ });
  expect(backButton).toHaveFocus();
});

test('focus returns to branch trigger when going back', async () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
          <Sidebar.Item id="settings" textValue="Settings">
            Settings
            <Sidebar.Item href="/general" active>
              General
            </Sidebar.Item>
          </Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
    </Sidebar.Provider>
  );

  const backButton = screen.getByRole('button', { name: /Back to Settings/ });
  await user.click(backButton);

  const settingsTrigger = screen.getByRole('link', { name: /Settings/ });
  expect(settingsTrigger).toHaveFocus();
});

test('toggle writes sidebar state to cookie', async () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
      <main>
        <Sidebar.Toggle />
      </main>
    </Sidebar.Provider>
  );

  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });

  await user.click(trigger);
  expect(document.cookie).toContain('marigold:sidebar:state=collapsed');

  await user.click(trigger);
  expect(document.cookie).toContain('marigold:sidebar:state=expanded');
});

test('cookie overrides defaultOpen', () => {
  document.cookie = 'marigold:sidebar:state=collapsed;path=/;max-age=604800';

  render(
    <Sidebar.Provider defaultOpen={true}>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
      <main>
        <Sidebar.Toggle />
      </main>
    </Sidebar.Provider>
  );

  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  const shell = closest(screen.getByText('Home'), '[data-state]');
  expect(shell).toHaveAttribute('data-state', 'collapsed');
});

test('defaultOpen={false} starts sidebar collapsed', () => {
  render(
    <Sidebar.Provider defaultOpen={false}>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
      <main>
        <Sidebar.Toggle />
      </main>
    </Sidebar.Provider>
  );

  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  const shell = closest(screen.getByText('Home'), '[data-state]');
  expect(shell).toHaveAttribute('data-state', 'collapsed');
});

test('controlled mode with open and onOpenChange', async () => {
  const Controlled = () => {
    const [open, setOpen] = useState(true);
    return (
      <Sidebar.Provider open={open} onOpenChange={setOpen}>
        <Sidebar>
          <Sidebar.Nav>
            <Sidebar.Item href="/home">Home</Sidebar.Item>
          </Sidebar.Nav>
        </Sidebar>
        <main>
          <Sidebar.Toggle />
          <span data-testid="state">{open ? 'open' : 'closed'}</span>
        </main>
      </Sidebar.Provider>
    );
  };

  render(<Controlled />);

  expect(screen.getByTestId('state')).toHaveTextContent('open');

  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
  await user.click(trigger);
  expect(screen.getByTestId('state')).toHaveTextContent('closed');

  await user.click(trigger);
  expect(screen.getByTestId('state')).toHaveTextContent('open');
});

test('mobile toggle opens sheet, close button closes it', async () => {
  isSmallScreen = true;
  window.matchMedia = mockMatchMedia();

  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
      <main>
        <Sidebar.Toggle />
      </main>
    </Sidebar.Provider>
  );

  // Content is not visible on mobile until toggled
  expect(screen.queryByText('Home')).not.toBeInTheDocument();

  // Open the mobile sheet
  const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
  await user.click(trigger);
  expect(screen.getByText('Home')).toBeInTheDocument();

  // Close via close button
  const closeButton = screen.getByRole('button', {
    name: 'Close navigation',
  });
  await user.click(closeButton);
  expect(screen.queryByText('Home')).not.toBeInTheDocument();
});

test('separator renders as divider element', () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
          <Sidebar.Separator />
          <Sidebar.Item href="/about">About</Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
    </Sidebar.Provider>
  );

  expect(screen.getByRole('separator')).toBeInTheDocument();
});

test('onPress callback fires on item click', async () => {
  const handlePress = vi.fn();

  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/home" onPress={handlePress}>
            Home
          </Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
    </Sidebar.Provider>
  );

  const link = screen.getByRole('link', { name: 'Home' });
  await user.click(link);
  expect(handlePress).toHaveBeenCalledOnce();
});

test('dynamic items via items prop and render function', () => {
  const navItems = [
    { id: '1', label: 'Dashboard', url: '/dashboard' },
    { id: '2', label: 'Profile', url: '/profile' },
    { id: '3', label: 'Settings', url: '/settings' },
  ];

  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav items={navItems}>
          {item => (
            <Sidebar.Item key={item.id} href={item.url}>
              {item.label}
            </Sidebar.Item>
          )}
        </Sidebar.Nav>
      </Sidebar>
    </Sidebar.Provider>
  );

  for (const item of navItems) {
    const link = screen.getByRole('link', { name: item.label });
    expect(link).toHaveAttribute('href', item.url);
  }
});

test('nested branches derive href from deepest first leaf', () => {
  render(
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
  );

  // Outer branch should auto-derive href from the deepest first leaf
  const outerLink = screen.getByRole('link', { name: /Outer/ });
  expect(outerLink).toHaveAttribute('href', '/deep-leaf');
});

test('branch without any leaf hrefs renders without href', () => {
  render(
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
  );

  // Branch item should render as a link without href attribute
  const trigger = screen.getByRole('link', { name: /Empty/ });
  expect(trigger).not.toHaveAttribute('href');
});

test('switching branches directly updates focus to back button', async () => {
  const SidebarWithBranchSwitch = () => {
    const [currentPath, setCurrentPath] = useState('/users');

    return (
      <RouterProvider navigate={setCurrentPath}>
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
      </RouterProvider>
    );
  };

  render(<SidebarWithBranchSwitch />);

  // Management panel is active (because /users is active)
  const usersLink = screen.getByRole('link', { name: 'Users' });
  expect(closest(usersLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click Settings trigger from root → navigates to /general
  // First go back to root
  await user.click(screen.getByRole('button', { name: /Back to Management/ }));

  // Now click Settings (switches directly to settings branch)
  const settingsTrigger = screen.getByRole('link', { name: /Settings/ });
  await user.click(settingsTrigger);

  const generalLink = screen.getByRole('link', { name: 'General' });
  expect(closest(generalLink, '[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Back button in settings panel should be focused
  const backButton = screen.getByRole('button', { name: /Back to Settings/ });
  expect(backButton).toHaveFocus();
});

test('group label inside branch renders correctly', () => {
  render(
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
  );

  // Sub-panel is active (because /profile is active)
  expect(screen.getByText('Account')).toBeInTheDocument();
  expect(screen.getByText('Profile')).toBeInTheDocument();
  expect(screen.getByRole('separator')).toBeInTheDocument();
});

test('marker components return null when called directly', () => {
  expect(Sidebar.Item({})).toBeNull();
  expect(Sidebar.Separator()).toBeNull();
  expect(Sidebar.GroupLabel({})).toBeNull();
});

test('item with explicit id uses that id as key', async () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item id="custom-id" href="/page">
            Custom ID Item
          </Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
    </Sidebar.Provider>
  );

  const link = screen.getByRole('link', { name: 'Custom ID Item' });
  expect(link).toHaveAttribute('data-key', 'custom-id');
});

test('item without explicit id gets auto-generated key', () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Nav>
          <Sidebar.Item href="/page">Auto ID Item</Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
    </Sidebar.Provider>
  );

  const link = screen.getByRole('link', { name: 'Auto ID Item' });
  // Auto-generated keys follow the pattern "item-N"
  expect(link).toHaveAttribute('data-key');
  expect(link.getAttribute('data-key')).toMatch(/^item-\d+$/);
});

test('textValue auto-extracted from string children', () => {
  render(
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
  );

  // Back button should show auto-extracted textValue "My Section"
  const backButton = screen.getByRole('button', {
    name: /Back to My Section/,
  });
  expect(backButton).toBeInTheDocument();
});

test('direct branch-to-branch switch via active prop change focuses back button', async () => {
  // This tests the case where openBranch changes from one non-null value
  // to another non-null value (lines 223-225 in SidebarNav.tsx)
  const SidebarWithDirectSwitch = () => {
    const [currentPath, setCurrentPath] = useState('/users');

    return (
      <>
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
      </>
    );
  };

  render(<SidebarWithDirectSwitch />);

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

test('branch item onPress fires when clicking branch trigger', async () => {
  const handlePress = vi.fn();

  render(
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
  );

  const settingsTrigger = screen.getByRole('link', { name: /Settings/ });
  await user.click(settingsTrigger);
  expect(handlePress).toHaveBeenCalledOnce();
});

// collection.ts unit tests
// ---------------
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
