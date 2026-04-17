/* eslint-disable testing-library/no-node-access */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Text } from '../Text/Text';
import { Panel } from './Panel';
import { renderPanel } from './test-utils';

const user = userEvent.setup();

describe('Panel.CollapsibleContent', () => {
  test('hides its body from AT when collapsed and exposes it when expanded', async () => {
    renderPanel(
      <Panel aria-label="Collapsed">
        <Panel.Collapsible>
          <Panel.CollapsibleTrigger>Toggle</Panel.CollapsibleTrigger>
          <Panel.CollapsibleContent>
            <span data-testid="body">Body</span>
          </Panel.CollapsibleContent>
        </Panel.Collapsible>
      </Panel>
    );
    const trigger = screen.getByRole('button', { name: 'Toggle' });
    const body = screen.getByTestId('body');

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(body).not.toBeVisible();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(body).toBeVisible();
  });

  test('`bleed` drops the horizontal panel padding while keeping the vertical padding', () => {
    renderPanel(
      <Panel aria-label="Bleed collapse">
        <Panel.Collapsible defaultExpanded>
          <Panel.CollapsibleTrigger>Toggle</Panel.CollapsibleTrigger>
          <Panel.CollapsibleContent bleed>
            <span data-testid="inner">Edge to edge</span>
          </Panel.CollapsibleContent>
        </Panel.Collapsible>
      </Panel>
    );

    const inner = screen.getByTestId('inner').parentElement!;

    expect(inner.className).not.toContain('px-(--panel-px)');
    expect(inner.className).toContain('pt-(--panel-py)');
    expect(inner.className).toContain('pb-(--panel-py)');
  });

  test('applies the horizontal panel padding by default', () => {
    renderPanel(
      <Panel aria-label="Default collapse">
        <Panel.Collapsible defaultExpanded>
          <Panel.CollapsibleTrigger>Toggle</Panel.CollapsibleTrigger>
          <Panel.CollapsibleContent>
            <Text>Body</Text>
          </Panel.CollapsibleContent>
        </Panel.Collapsible>
      </Panel>
    );

    const body = screen.getByText('Body').parentElement!;

    expect(body.className).toContain('px-(--panel-px)');
  });
});
