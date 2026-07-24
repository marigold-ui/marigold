import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Copy, Download, Pencil, Trash2 } from '@marigold/icons';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Description } from '../Description/Description';
import { LinkButton } from '../LinkButton/LinkButton';
import { ActionMenu } from '../Menu/ActionMenu';
import { Panel } from '../Panel/Panel';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Title } from '../Title/Title';
import { Page } from './Page';
import { usePageFocus } from './usePageFocus';

const meta = preview.meta({
  title: 'Components/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    surface: false,
  },
  argTypes: {
    space: {
      control: { type: 'select' },
      options: ['collapsed', 'tight', 'related', 'regular', 'group', 'section'],
      description: 'Vertical rhythm between the page header and the sections.',
    },
  },
  args: {
    children: undefined,
  } as const,
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => (
    <Page {...args}>
      <Page.Header>
        <Title>Billing</Title>
        <Description>Manage your plan and invoices.</Description>
        <Button variant="primary">Upgrade plan</Button>
      </Page.Header>
      <Panel>
        <Panel.Header>
          <Title>Current plan</Title>
          <Description>You are on the Team plan.</Description>
        </Panel.Header>
        <Panel.Content>
          <Text>Renews on the 1st of every month.</Text>
        </Panel.Content>
      </Panel>
    </Page>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const main = canvas.getByRole('main');
    await expect(main).toBeInTheDocument();

    // Page.Header title is the page h1; Panel.Header title is h2.
    const h1 = canvas.getByRole('heading', { level: 1, name: 'Billing' });
    await expect(h1).toBeInTheDocument();
    await expect(
      canvas.getByRole('heading', { level: 2, name: 'Current plan' })
    ).toBeInTheDocument();

    // The main landmark is named by the page title.
    await expect(main).toHaveAttribute('aria-labelledby', h1.id);

    // Description renders as a paragraph.
    const description = canvas.getByText('Manage your plan and invoices.');
    await expect(description.tagName).toBe('P');

    // Primary page action is a slot-aware Button.
    await expect(
      canvas.getByRole('button', { name: 'Upgrade plan' })
    ).toBeInTheDocument();
  },
});

/**
 * `<Page.Header>` accepts the same action components as `<Panel.Header>`.
 * Wrap the actions in a `<ButtonGroup>` whenever the header holds more than
 * one — two buttons, or a button beside an overflow `<ActionMenu>`. A lone
 * action needs no group and sits in the header on its own.
 *
 * Pick the element by what the action does. An action that acts in place is a
 * `<Button variant="primary">` (a `<button>`). An action that navigates,
 * like a "Create" that opens a new page, is a `<LinkButton variant="primary">`
 * (an `<a>`) that looks identical but behaves like a link. This story shows the
 * common arrangements.
 *
 * Each example is its own `<Page>`, so the canvas intentionally renders several
 * `<main>` landmarks. The duplicate-main accessibility rule is turned off for
 * this showcase only.
 */
export const Actions = meta.story({
  tags: ['component-test'],
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'landmark-no-duplicate-main', enabled: false }],
      },
    },
  },
  render: () => (
    <Stack space="section">
      {/* No actions */}
      <Page>
        <Page.Header>
          <Title>No actions</Title>
          <Description>A header with only a title and description.</Description>
        </Page.Header>
      </Page>

      {/* A single primary button that acts in place (renders a <button>) */}
      <Page>
        <Page.Header>
          <Title>Single primary action</Title>
          <Description>The page's primary call to action.</Description>
          <Button variant="primary">Upgrade plan</Button>
        </Page.Header>
      </Page>

      {/* A navigating primary action (renders an <a>, styled the same) */}
      <Page>
        <Page.Header>
          <Title>Navigating primary action</Title>
          <Description>A "Create" action that opens its own page.</Description>
          <LinkButton variant="primary" href="/events/new">
            Create event
          </LinkButton>
        </Page.Header>
      </Page>

      {/* Two buttons, one of them primary, grouped in a ButtonGroup */}
      <Page>
        <Page.Header>
          <Title>Primary and secondary</Title>
          <Description>Group multiple buttons in a ButtonGroup.</Description>
          <ButtonGroup aria-label="Plan actions">
            <Button variant="primary">Upgrade plan</Button>
            <Button variant="secondary">Compare plans</Button>
          </ButtonGroup>
        </Page.Header>
      </Page>

      {/* An overflow menu on its own */}
      <Page>
        <Page.Header>
          <Title>Overflow menu</Title>
          <Description>Collect actions in an ActionMenu.</Description>
          <ActionMenu size="icon" aria-label="Plan actions">
            <ActionMenu.Item id="edit">
              <Pencil />
              Edit plan
            </ActionMenu.Item>
            <ActionMenu.Item id="duplicate">
              <Copy />
              Duplicate plan
            </ActionMenu.Item>
            <ActionMenu.Item id="export">
              <Download />
              Export invoices
            </ActionMenu.Item>
            <ActionMenu.Item id="cancel" variant="destructive">
              <Trash2 />
              Cancel plan
            </ActionMenu.Item>
          </ActionMenu>
        </Page.Header>
      </Page>

      {/* A primary button with an overflow menu to its right */}
      <Page>
        <Page.Header>
          <Title>Primary action with overflow</Title>
          <Description>A button beside an overflow menu.</Description>
          <ButtonGroup aria-label="Plan actions">
            <Button variant="primary">Upgrade plan</Button>
            <ActionMenu size="icon" aria-label="More plan actions">
              <ActionMenu.Item id="duplicate">
                <Copy />
                Duplicate plan
              </ActionMenu.Item>
              <ActionMenu.Item id="export">
                <Download />
                Export invoices
              </ActionMenu.Item>
              <ActionMenu.Item id="cancel" variant="destructive">
                <Trash2 />
                Cancel plan
              </ActionMenu.Item>
            </ActionMenu>
          </ButtonGroup>
        </Page.Header>
      </Page>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The no-actions header renders with just its heading.
    await expect(
      canvas.getByRole('heading', { level: 1, name: 'No actions' })
    ).toBeInTheDocument();

    // The primary action appears in the single, grouped, and overflow examples.
    await expect(
      canvas.getAllByRole('button', { name: 'Upgrade plan' })
    ).toHaveLength(3);

    // The navigating primary is a real link (an <a>), not a button.
    const createLink = canvas.getByRole('link', { name: 'Create event' });
    await expect(createLink).toBeInTheDocument();
    await expect(createLink.tagName).toBe('A');
    await expect(createLink).toHaveAttribute('href', '/events/new');

    // The secondary button renders alongside the primary inside the group.
    await expect(
      canvas.getByRole('button', { name: 'Compare plans' })
    ).toBeInTheDocument();

    // Each overflow menu renders as its own trigger button.
    await expect(
      canvas.getByRole('button', { name: 'Plan actions' })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'More plan actions' })
    ).toBeInTheDocument();
  },
});

/**
 * Use the optional `<Page.Content>` wrapper when the rhythm between sections
 * should differ from the header-to-content gap.
 */
export const WithContent = meta.story({
  render: args => (
    <Page {...args}>
      <Page.Header>
        <Title>Settings</Title>
        <Description>Workspace-wide configuration.</Description>
      </Page.Header>
      <Page.Content space="regular">
        <Panel>
          <Panel.Header>
            <Title>Profile</Title>
          </Panel.Header>
          <Panel.Content>
            <Text>Profile settings.</Text>
          </Panel.Content>
        </Panel>
        <Panel>
          <Panel.Header>
            <Title>Security</Title>
          </Panel.Header>
          <Panel.Content>
            <Text>Security settings.</Text>
          </Panel.Content>
        </Panel>
      </Page.Content>
    </Page>
  ),
});

/**
 * A page that has only a title, with no description or actions, can skip
 * `<Page.Header>` and drop a bare `<Title>` directly inside `<Page>`. The title
 * still becomes the page `<h1>` and names the `<main>` landmark, exactly as it
 * does inside the header. As soon as the page needs a description or actions,
 * reach for `<Page.Header>` so it can arrange them in the grid.
 */
export const TitleOnly = meta.story({
  tags: ['component-test'],
  render: () => (
    <Page>
      <Title>Reports</Title>
      <Panel>
        <Panel.Header>
          <Title>Summary</Title>
        </Panel.Header>
        <Panel.Content>
          <Text>No page header on this screen.</Text>
        </Panel.Content>
      </Panel>
    </Page>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const main = canvas.getByRole('main');

    // The bare title becomes the page h1 even without <Page.Header>.
    const h1 = canvas.getByRole('heading', { level: 1, name: 'Reports' });
    await expect(h1).toBeInTheDocument();

    // ...and still names the main landmark.
    await expect(main).toHaveAttribute('aria-labelledby', h1.id);

    // The heading outline below it is unaffected: the panel keeps its h2.
    await expect(
      canvas.getByRole('heading', { level: 2, name: 'Summary' })
    ).toBeInTheDocument();
  },
});

/**
 * Without a `<Title>`, the page must be given an `aria-label` so the `<main>`
 * landmark still has an accessible name.
 */
export const WithoutTitle = meta.story({
  render: () => (
    <Page aria-label="Reports">
      <Panel aria-label="Summary">
        <Panel.Content>
          <Text>No header on this page.</Text>
        </Panel.Content>
      </Panel>
    </Page>
  ),
});

/**
 * Invalid usage: with neither a `<Title>` nor an `aria-label`, the `<main>`
 * landmark has no accessible name. `<Page>` warns about this in development.
 * Always provide one of the two (this story exists to document the warning).
 */
export const Unlabelled = meta.story({
  render: () => (
    <Page>
      <Panel aria-label="Summary">
        <Panel.Content>
          <Text>No title and no aria-label.</Text>
        </Panel.Content>
      </Panel>
    </Page>
  ),
});

/**
 * When there is no `<Title>`, a caller can still name the `<main>` landmark by
 * passing their own `aria-labelledby` (or `aria-label`). Marigold preserves a
 * caller-supplied `aria-labelledby` instead of overwriting it.
 */
export const ExternalLabel = meta.story({
  render: () => (
    <>
      <h2 id="external-heading">Reports</h2>
      <Page aria-labelledby="external-heading">
        <Panel aria-label="Summary">
          <Panel.Content>
            <Text>Named by an external heading.</Text>
          </Panel.Content>
        </Panel>
      </Page>
    </>
  ),
});

// A component that persists across "routes": it calls `usePageFocus` with the
// current route key so a route change moves focus to the page heading. It lives
// inside `<Page>` (the hook reads the page context) and renders nothing.
const RouteFocus = ({ routeKey }: { routeKey: string }) => {
  usePageFocus(routeKey);
  return null;
};

const ROUTES: Record<string, string> = {
  '/billing': 'Billing',
  '/team': 'Team members',
};

const RouteFocusHarness = () => {
  const [route, setRoute] = useState('/billing');

  return (
    <>
      <nav aria-label="Demo navigation" style={{ display: 'flex', gap: 8 }}>
        {Object.entries(ROUTES).map(([path, label]) => (
          <Button key={path} onPress={() => setRoute(path)}>
            {`Open ${label}`}
          </Button>
        ))}
      </nav>
      <Page>
        <RouteFocus routeKey={route} />
        <Page.Header>
          <Title>{ROUTES[route]}</Title>
          <Description>You are viewing {ROUTES[route]}.</Description>
        </Page.Header>
        <Panel>
          <Panel.Content>
            <Text>Route: {route}</Text>
          </Panel.Content>
        </Panel>
      </Page>
    </>
  );
};

/**
 * `usePageFocus` moves focus to the page `<h1>` on a route change, the standard
 * SPA technique for announcing navigation to screen-reader and keyboard users.
 * The router is the source of the route signal — pass the current pathname to
 * the hook from a component that persists across navigations (here, a small
 * harness swaps the "route" via the nav buttons). The initial mount is skipped,
 * so first paint never steals focus.
 */
export const FocusOnRouteChange = meta.story({
  tags: ['component-test'],
  render: () => <RouteFocusHarness />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // On first paint the initial heading must not be focused.
    const billingHeading = canvas.getByRole('heading', {
      level: 1,
      name: 'Billing',
    });
    await expect(billingHeading).not.toHaveFocus();

    // Navigating to another "route" moves focus to the new page heading.
    await userEvent.click(
      canvas.getByRole('button', { name: 'Open Team members' })
    );

    const teamHeading = canvas.getByRole('heading', {
      level: 1,
      name: 'Team members',
    });
    await expect(teamHeading).toHaveFocus();
    // The heading is made programmatically focusable, not tabbable.
    await expect(teamHeading).toHaveAttribute('tabindex', '-1');
  },
});

/**
 * When the page has no `<Title>` (named instead by an `aria-label`), there is no
 * `<h1>` to move to, so `usePageFocus` is a no-op on route change: it never
 * throws and never moves focus.
 */
const NoHeadingFocusHarness = () => {
  const [route, setRoute] = useState('/billing');

  return (
    <>
      <nav aria-label="Demo navigation" style={{ display: 'flex', gap: 8 }}>
        <Button onPress={() => setRoute('/team')}>Change route</Button>
      </nav>
      <Page aria-label={ROUTES[route]}>
        <RouteFocus routeKey={route} />
        <Panel aria-label="Summary">
          <Panel.Content>
            <Text>Route: {route}</Text>
          </Panel.Content>
        </Panel>
      </Page>
    </>
  );
};

export const FocusWithoutHeading = meta.story({
  tags: ['component-test'],
  render: () => <NoHeadingFocusHarness />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const changeRoute = canvas.getByRole('button', { name: 'Change route' });
    await userEvent.click(changeRoute);

    // No heading exists to receive focus, and focus is left where it was.
    await expect(canvas.queryByRole('heading', { level: 1 })).toBeNull();
    await expect(changeRoute).toHaveFocus();
  },
});
