/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Panel } from './Panel';
import { ControlledCollapsible, WithCollapsible } from './Panel.stories';
import { renderPanel } from './test-utils';

const user = userEvent.setup();

describe('Panel.CollapsibleTrigger', () => {
  test('throws when rendered outside <Panel.Collapsible>', () => {
    const renderOrphan = () =>
      renderPanel(
        <Panel aria-label="Orphan trigger">
          <Panel.CollapsibleTrigger>Orphan</Panel.CollapsibleTrigger>
        </Panel>
      );

    expect(renderOrphan).toThrow(/must be used within a <Panel\.Collapsible>/);
  });

  test('wraps a button with slot="trigger" inside a heading', () => {
    render(<WithCollapsible.Component />);

    const trigger = screen.getByRole('button', { name: /Advanced Options/ });

    expect(trigger).toHaveAttribute('slot', 'trigger');
    expect(trigger.closest('h3')).not.toBeNull();
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

    // No Title ⇒ trigger is at the root headingLevel (default h2).
    const trigger = screen.getByRole('button', { name: 'Advanced settings' });

    expect(trigger.closest('h2')).not.toBeNull();
  });

  test('rotates the chevron when expanded', async () => {
    render(<WithCollapsible.Component />);
    const trigger = screen.getByRole('button', { name: /Advanced Options/ });
    const chevron = trigger.querySelector('svg')!;

    expect(chevron.getAttribute('class') ?? '').not.toContain('rotate-180');

    await user.click(trigger);

    expect(chevron.getAttribute('class') ?? '').toContain('rotate-180');
  });
});
