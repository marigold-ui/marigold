/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { theme } from '@marigold/theme-rui';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { Panel } from './Panel';
import {
  CollapsibleBleed,
  CollapsibleDefaultExpanded,
  CollapsibleDisabled,
  ControlledCollapsible,
  WithCollapsible,
} from './Panel.stories';

describe('Panel.Collapsible', () => {
  test('supports `defaultExpanded` for uncontrolled initial state', () => {
    render(<CollapsibleDefaultExpanded.Component />);

    const trigger = screen.getByRole('button', { name: 'Channels' });

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  test('forwards `disabled` to the trigger', () => {
    render(<CollapsibleDisabled.Component />);

    const trigger = screen.getByRole('button', { name: 'Payment methods' });

    expect(trigger).toBeDisabled();
  });
});

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

  test('renders the trigger button inside a heading with slot="trigger"', () => {
    render(<WithCollapsible.Component />);

    const button = screen.getByRole('button', { name: /Advanced Options/ });

    expect(button).toHaveAttribute('slot', 'trigger');
    expect(button.closest('h3')).not.toBeNull();
  });

  test('places title and description inside the button so clicks anywhere in the header toggle', () => {
    render(<WithCollapsible.Component />);

    const button = screen.getByRole('button', { name: /Advanced Options/ });
    const description = screen.getByText(/Fine-tune URL slugs/);

    expect(button).toContainElement(description);
  });

  test('wires the accessible name to the title and the description via aria-describedby', () => {
    render(<WithCollapsible.Component />);

    const button = screen.getByRole('button', { name: /Advanced Options/ });
    const title = screen.getByText('Advanced Options');
    const description = screen.getByText(/Fine-tune URL slugs/);

    expect(button.getAttribute('aria-labelledby')).toBe(title.id);
    expect(button.getAttribute('aria-describedby')).toBe(description.id);
  });

  test('omits aria-describedby when no description is present', () => {
    render(<ControlledCollapsible.Component />);

    const button = screen.getByRole('button', { name: 'Advanced settings' });

    expect(button).not.toHaveAttribute('aria-describedby');
  });
});

describe('Panel.CollapsibleTitle', () => {
  test('throws when rendered outside <Panel.CollapsibleHeader>', () => {
    const renderOrphan = () =>
      render(
        <MarigoldProvider theme={theme}>
          <Panel aria-label="Orphan title">
            <Panel.Collapsible>
              <Panel.CollapsibleTitle>Orphan</Panel.CollapsibleTitle>
            </Panel.Collapsible>
          </Panel>
        </MarigoldProvider>
      );

    expect(renderOrphan).toThrow(
      /must be used within a <Panel\.CollapsibleHeader>/
    );
  });

  test('renders one level below the Title by default (h2 ⇒ h3)', () => {
    render(<WithCollapsible.Component />);

    const trigger = screen.getByRole('button', { name: /Advanced Options/ });

    expect(trigger.closest('h3')).not.toBeNull();
  });

  test('renders one level below the configured headingLevel (h3 ⇒ h4)', () => {
    render(<WithCollapsible.Component headingLevel={3} />);

    const trigger = screen.getByRole('button', { name: /Advanced Options/ });

    expect(trigger.closest('h4')).not.toBeNull();
  });

  test('clamps at h6 when Panel headingLevel is already 6', () => {
    render(<WithCollapsible.Component headingLevel={6} />);

    const trigger = screen.getByRole('button', { name: /Advanced Options/ });

    expect(trigger.closest('h6')).not.toBeNull();
  });

  test('renders at the root headingLevel when no Title is present', () => {
    render(<ControlledCollapsible.Component />);

    const trigger = screen.getByRole('button', { name: 'Advanced settings' });

    expect(trigger.closest('h2')).not.toBeNull();
  });
});

describe('Panel.CollapsibleContent', () => {
  test('applies the horizontal panel padding by default', () => {
    render(<CollapsibleDefaultExpanded.Component />);

    const body = screen.getByText(
      /Email, SMS, and push notifications/
    ).parentElement!;

    expect(body.className).toContain('px-(--panel-px)');
  });

  test('`bleed` drops the horizontal panel padding while keeping the vertical padding', () => {
    render(<CollapsibleBleed.Component />);

    const body = screen.getByText('Edge to edge').parentElement!;

    expect(body.className).not.toContain('px-(--panel-px)');
    expect(body.className).toContain('pt-(--panel-py)');
    expect(body.className).toContain('pb-(--panel-py)');
  });
});
