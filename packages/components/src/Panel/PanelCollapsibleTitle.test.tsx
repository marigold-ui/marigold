/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { theme } from '@marigold/theme-rui';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { Panel } from './Panel';
import { ControlledCollapsible, WithCollapsible } from './Panel.stories';

const user = userEvent.setup();

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

  test('morph caret reflects the expanded state', async () => {
    render(<WithCollapsible.Component />);
    const trigger = screen.getByRole('button', { name: /Advanced Options/ });
    const caretPath = trigger.querySelector('svg path')!;
    const initial = (caretPath as SVGPathElement).style.getPropertyValue('d');

    await user.click(trigger);

    const expanded = (caretPath as SVGPathElement).style.getPropertyValue('d');
    expect(expanded).not.toBe(initial);
  });
});
