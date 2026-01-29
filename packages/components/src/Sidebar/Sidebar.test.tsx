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
    };
  });
window.matchMedia = mockMatchMedia();

const theme: Theme = {
  name: 'test',
  components: {
    Sidebar: {
      root: cva(),
      closeButton: cva(),
      header: cva(),
      content: cva(),
      footer: cva(),
      toggle: cva(),
      group: cva(),
      groupLabel: cva(),
      menu: cva(),
      menuItem: cva(),
      menuButton: cva(),
    },
    Button: cva(),
    CloseButton: cva(),
    Underlay: cva(),
    Modal: cva(),
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
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>Home</Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
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
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton active>Home</Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>About</Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
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
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton href="/home">Home</Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
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
