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
      group: cva({}),
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
  document.cookie = 'sidebar:state=;max-age=0';
});

test('renders with sub-components', () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Header>Header</Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Section</Sidebar.GroupLabel>
            <Sidebar.Nav aria-label="Main navigation">
              <Sidebar.Item href="/home">Home</Sidebar.Item>
            </Sidebar.Nav>
          </Sidebar.Group>
        </Sidebar.Content>
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
        <Sidebar.Content>Content</Sidebar.Content>
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
        <Sidebar.Content>Content</Sidebar.Content>
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
        <Sidebar.Content>
          <Sidebar.Nav>
            <Sidebar.Item href="/home" active>
              Home
            </Sidebar.Item>
            <Sidebar.Item href="/about">About</Sidebar.Item>
          </Sidebar.Nav>
        </Sidebar.Content>
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
        <Sidebar.Content>
          <Sidebar.Nav>
            <Sidebar.Item href="/home">Home</Sidebar.Item>
          </Sidebar.Nav>
        </Sidebar.Content>
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
        <Sidebar.Content>Content</Sidebar.Content>
      </Sidebar>
      <main>
        <Sidebar.Toggle />
      </main>
    </Sidebar.Provider>
  );

  // On mobile, sidebar content is not visible until toggled
  expect(screen.queryByText('Content')).not.toBeInTheDocument();
});

test('supports right side placement', () => {
  render(
    <Sidebar.Provider side="right">
      <Sidebar>
        <Sidebar.Content>Content</Sidebar.Content>
      </Sidebar>
    </Sidebar.Provider>
  );

  // The sidebar shell is a div with data-side
  const shell = screen.getByText('Content').closest('[data-side]');
  expect(shell).toHaveAttribute('data-side', 'right');
});

test('branch items render as links with auto-derived href', () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Nav>
            <Sidebar.Item href="/home">Home</Sidebar.Item>
            <Sidebar.Item id="settings" textValue="Settings">
              Settings
              <Sidebar.Item href="/general">General</Sidebar.Item>
              <Sidebar.Item href="/security">Security</Sidebar.Item>
            </Sidebar.Item>
          </Sidebar.Nav>
        </Sidebar.Content>
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
        <Sidebar.Content>
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
        </Sidebar.Content>
      </Sidebar>
    </Sidebar.Provider>
  );

  // Root panel should be in "before" position (not active)
  const rootPanel = screen
    .getByRole('link', { name: 'Home' })
    .closest('[data-position]');
  expect(rootPanel).toHaveAttribute('data-position', 'before');

  // Settings sub-panel should be active
  const generalLink = screen.getByRole('link', { name: 'General' });
  const settingsPanel = generalLink.closest('[data-position]');
  expect(settingsPanel).toHaveAttribute('data-position', 'active');

  // Back button should be visible in the active panel
  const backButton = screen.getByRole('button', { name: /Back/ });
  expect(backButton).toBeInTheDocument();
});

test('back button returns to root panel', async () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Content>
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
        </Sidebar.Content>
      </Sidebar>
    </Sidebar.Provider>
  );

  // Settings sub-panel is active
  const generalLink = screen.getByRole('link', { name: 'General' });
  expect(generalLink.closest('[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click back
  const backButton = screen.getByRole('button', { name: /Back/ });
  await user.click(backButton);

  // Root panel should now be active
  const homeLink = screen.getByRole('link', { name: 'Home' });
  expect(homeLink.closest('[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );
});

test('re-entering the same branch after back reopens sub-panel', async () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Content>
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
        </Sidebar.Content>
      </Sidebar>
    </Sidebar.Provider>
  );

  // Settings sub-panel starts active
  const generalLink = screen.getByRole('link', { name: 'General' });
  expect(generalLink.closest('[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click back → root panel shown
  const backButton = screen.getByRole('button', { name: /Back/ });
  await user.click(backButton);

  const homeLink = screen.getByRole('link', { name: 'Home' });
  expect(homeLink.closest('[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click the Settings branch trigger again → sub-panel should reopen
  const settingsTrigger = screen.getByRole('link', { name: /Settings/ });
  await user.click(settingsTrigger);

  expect(generalLink.closest('[data-position]')).toHaveAttribute(
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
            <Sidebar.Content>
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
            </Sidebar.Content>
          </Sidebar>
        </Sidebar.Provider>
      </RouterProvider>
    );
  };

  render(<SidebarWithRouter />);

  // Management sub-panel starts active (because /users is active)
  const usersLink = screen.getByRole('link', { name: 'Users' });
  expect(usersLink.closest('[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click back → root (use specific label since multiple back buttons exist)
  await user.click(screen.getByRole('button', { name: /Back to Management/ }));

  const overviewLink = screen.getByRole('link', { name: 'Overview' });
  expect(overviewLink.closest('[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click Settings → navigates to /general, switches to settings panel
  const settingsTrigger = screen.getByRole('link', { name: /Settings/ });
  await user.click(settingsTrigger);

  const generalLink = screen.getByRole('link', { name: 'General' });
  expect(generalLink.closest('[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click back from settings → root
  await user.click(screen.getByRole('button', { name: /Back to Settings/ }));

  expect(overviewLink.closest('[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );

  // Click Management → navigates to /users, opens management panel
  const managementTrigger = screen.getByRole('link', { name: /Management/ });
  await user.click(managementTrigger);

  expect(usersLink.closest('[data-position]')).toHaveAttribute(
    'data-position',
    'active'
  );
});
