import { expect, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Copy, Download, Pencil, Trash2 } from '@marigold/icons';
import { ActionButton } from '../ActionButton/ActionButton';
import { ActionGroup } from '../ActionGroup/ActionGroup';
import { Description } from '../Description/Description';
import { LinkButton } from '../LinkButton/LinkButton';
import { ActionMenu } from '../Menu/ActionMenu';
import { Panel } from '../Panel/Panel';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Title } from '../Title/Title';
import { Page } from './Page';

const meta = preview.meta({
  title: 'Components/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    surface: false,
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: () => (
    <Page>
      <Page.Header>
        <Title>Billing</Title>
        <Description>Manage your plan and invoices.</Description>
        <ActionButton variant="primary">Upgrade plan</ActionButton>
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

    // Primary page action is a slot-aware ActionButton.
    await expect(
      canvas.getByRole('button', { name: 'Upgrade plan' })
    ).toBeInTheDocument();
  },
});

/**
 * `<Page.Header>` accepts the same action components as `<Panel.Header>`. A
 * single action sits in the header on its own. Group several buttons in an
 * `<ActionGroup>`, and collect overflow in an `<ActionMenu>`.
 *
 * Pick the element by what the action does. An action that acts in place is an
 * `<ActionButton variant="primary">` (a `<button>`). An action that navigates,
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
          <ActionButton variant="primary">Upgrade plan</ActionButton>
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

      {/* Two buttons, one of them primary, grouped in an ActionGroup */}
      <Page>
        <Page.Header>
          <Title>Primary and secondary</Title>
          <Description>Group multiple buttons in an ActionGroup.</Description>
          <ActionGroup aria-label="Plan actions">
            <ActionButton>Compare plans</ActionButton>
            <ActionButton variant="primary">Upgrade plan</ActionButton>
          </ActionGroup>
        </Page.Header>
      </Page>

      {/* An overflow menu on its own */}
      <Page>
        <Page.Header>
          <Title>Overflow menu</Title>
          <Description>Collect actions in an ActionMenu.</Description>
          <ActionMenu aria-label="Plan actions">
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
          <ActionGroup aria-label="Plan actions">
            <ActionButton variant="primary">Upgrade plan</ActionButton>
            <ActionMenu aria-label="More plan actions">
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
          </ActionGroup>
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
  render: () => (
    <Page space="section">
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
