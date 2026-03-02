import { renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import type { Theme } from '@marigold/system';
import { cva } from '@marigold/system';
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
      <Sidebar aria-label="Main navigation">
        <Sidebar.Header>Header</Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Section</Sidebar.GroupLabel>
            <Sidebar.Nav>
              <Sidebar.Item href="/home">Home</Sidebar.Item>
            </Sidebar.Nav>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>Footer</Sidebar.Footer>
      </Sidebar>
    </Sidebar.Provider>
  );

  expect(screen.getByRole('navigation')).toBeInTheDocument();
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

  const trigger = screen.getByRole('button', { name: 'Toggle sidebar' });
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

  const toggle = screen.getByRole('button', { name: 'Toggle sidebar' });
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
            <Sidebar.Item active>Home</Sidebar.Item>
            <Sidebar.Item>About</Sidebar.Item>
          </Sidebar.Nav>
        </Sidebar.Content>
      </Sidebar>
    </Sidebar.Provider>
  );

  const homeButton = screen.getByText('Home');
  expect(homeButton).toHaveAttribute('aria-current', 'page');

  const aboutButton = screen.getByText('About');
  expect(aboutButton).not.toHaveAttribute('aria-current');
});

test('useSidebar throws outside provider', () => {
  // Suppress React error boundary output
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

  expect(() => {
    renderHook(() => useSidebar());
  }).toThrow('useSidebar must be used within a <Sidebar.Provider>.');

  spy.mockRestore();
});

test('renders menu button as link when href is provided', () => {
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

  const link = screen.getByText('Home');
  expect(link.tagName).toBe('A');
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

  const nav = screen.getByRole('navigation');
  expect(nav).toHaveAttribute('data-side', 'right');
});

test('keyboard navigation works within groups', async () => {
  render(
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
            <Sidebar.Nav>
              <Sidebar.Item href="/home">Home</Sidebar.Item>
              <Sidebar.Item href="/about">About</Sidebar.Item>
              <Sidebar.Item href="/contact">Contact</Sidebar.Item>
            </Sidebar.Nav>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar>
    </Sidebar.Provider>
  );

  const home = screen.getByText('Home');
  const about = screen.getByText('About');
  const contact = screen.getByText('Contact');

  // Focus first item
  home.focus();

  // ArrowDown moves to next item
  await user.keyboard('{ArrowDown}');
  expect(about).toHaveFocus();

  // ArrowDown again
  await user.keyboard('{ArrowDown}');
  expect(contact).toHaveFocus();

  // ArrowUp moves back
  await user.keyboard('{ArrowUp}');
  expect(about).toHaveFocus();

  // Home key jumps to first
  await user.keyboard('{Home}');
  expect(home).toHaveFocus();

  // End key jumps to last
  await user.keyboard('{End}');
  expect(contact).toHaveFocus();
});

test('branch items show chevron and navigate to sub-panel', async () => {
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

  // Root panel: Home + Settings trigger
  expect(screen.getByText('Home')).toBeInTheDocument();
  const settingsTrigger = screen.getByRole('button', { name: /Settings/ });
  expect(settingsTrigger).toHaveAttribute('aria-haspopup', 'true');

  // Navigate into settings
  await user.click(settingsTrigger);

  // Sub-panel should show General and Security
  expect(screen.getByText('General')).toBeInTheDocument();
  expect(screen.getByText('Security')).toBeInTheDocument();

  // Back button should be visible
  const backButton = screen.getByRole('button', { name: /Back/ });
  expect(backButton).toBeInTheDocument();

  // Navigate back
  await user.click(backButton);

  // Root panel visible again
  expect(screen.getByText('Home')).toBeInTheDocument();
});
