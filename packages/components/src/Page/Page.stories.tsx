import { expect, within } from 'storybook/test';
import preview from '.storybook/preview';
import { ActionButton } from '../ActionButton/ActionButton';
import { Description } from '../Description/Description';
import { Panel } from '../Panel/Panel';
import { Text } from '../Text/Text';
import { Title } from '../Title/Title';
import { Page } from './Page';

const meta = preview.meta({
  title: 'Components/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
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
