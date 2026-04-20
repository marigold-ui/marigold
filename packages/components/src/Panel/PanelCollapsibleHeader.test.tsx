/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { theme } from '@marigold/theme-rui';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { Panel } from './Panel';

describe('Panel.CollapsibleHeader', () => {
  test('throws when rendered outside <Panel.Collapsible>', () => {
    const renderOrphan = () =>
      render(
        <MarigoldProvider theme={theme}>
          <Panel aria-label="Orphan header">
            <Panel.CollapsibleHeader>
              <Panel.CollapsibleTitle>Orphan</Panel.CollapsibleTitle>
            </Panel.CollapsibleHeader>
          </Panel>
        </MarigoldProvider>
      );

    expect(renderOrphan).toThrow(/must be used within a <Panel\.Collapsible>/);
  });

  test('renders the trigger button inside a heading', () => {
    render(
      <MarigoldProvider theme={theme}>
        <Panel aria-label="Titled collapsible">
          <Panel.Collapsible>
            <Panel.CollapsibleHeader>
              <Panel.CollapsibleTitle>Advanced</Panel.CollapsibleTitle>
            </Panel.CollapsibleHeader>
            <Panel.CollapsibleContent>Body</Panel.CollapsibleContent>
          </Panel.Collapsible>
        </Panel>
      </MarigoldProvider>
    );

    const button = screen.getByRole('button', { name: 'Advanced' });

    expect(button).toHaveAttribute('slot', 'trigger');
    expect(button.closest('h2')).not.toBeNull();
  });

  test('places title and description inside the button so clicks anywhere in the header toggle', () => {
    render(
      <MarigoldProvider theme={theme}>
        <Panel aria-label="Grouped collapsible">
          <Panel.Collapsible>
            <Panel.CollapsibleHeader>
              <Panel.CollapsibleTitle>Advanced</Panel.CollapsibleTitle>
              <Panel.CollapsibleDescription>
                Tune optional settings.
              </Panel.CollapsibleDescription>
            </Panel.CollapsibleHeader>
            <Panel.CollapsibleContent>Body</Panel.CollapsibleContent>
          </Panel.Collapsible>
        </Panel>
      </MarigoldProvider>
    );

    const button = screen.getByRole('button');
    const description = screen.getByText(/Tune optional settings/);

    expect(button).toContainElement(description);
  });

  test('wires the accessible name to the title and the description via aria-describedby', () => {
    render(
      <MarigoldProvider theme={theme}>
        <Panel aria-label="Described collapsible">
          <Panel.Collapsible>
            <Panel.CollapsibleHeader>
              <Panel.CollapsibleTitle>Billing</Panel.CollapsibleTitle>
              <Panel.CollapsibleDescription>
                Manage payment methods and invoices.
              </Panel.CollapsibleDescription>
            </Panel.CollapsibleHeader>
            <Panel.CollapsibleContent>Body</Panel.CollapsibleContent>
          </Panel.Collapsible>
        </Panel>
      </MarigoldProvider>
    );

    const button = screen.getByRole('button', { name: 'Billing' });
    const title = screen.getByText('Billing');
    const description = screen.getByText(/Manage payment methods/);

    expect(button.getAttribute('aria-labelledby')).toBe(title.id);
    expect(button.getAttribute('aria-describedby')).toBe(description.id);
  });

  test('omits aria-describedby when no description is present', () => {
    render(
      <MarigoldProvider theme={theme}>
        <Panel aria-label="Title-only">
          <Panel.Collapsible>
            <Panel.CollapsibleHeader>
              <Panel.CollapsibleTitle>Only title</Panel.CollapsibleTitle>
            </Panel.CollapsibleHeader>
            <Panel.CollapsibleContent>Body</Panel.CollapsibleContent>
          </Panel.Collapsible>
        </Panel>
      </MarigoldProvider>
    );

    const button = screen.getByRole('button', { name: 'Only title' });

    expect(button).not.toHaveAttribute('aria-describedby');
  });
});
