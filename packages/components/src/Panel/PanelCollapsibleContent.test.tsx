/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { theme } from '@marigold/theme-rui';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { Panel } from './Panel';
import { CollapsibleDefaultExpanded, WithCollapsible } from './Panel.stories';

const user = userEvent.setup();

describe('Panel.CollapsibleContent', () => {
  test('hides its body from AT when collapsed and exposes it when expanded', async () => {
    render(<WithCollapsible.Component />);
    const trigger = screen.getByRole('button', { name: /Advanced Options/ });
    const body = screen.getByLabelText('Custom URL Slug');

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(body).not.toBeVisible();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(body).toBeVisible();
  });

  test('`bleed` drops the horizontal panel padding while keeping the vertical padding', () => {
    render(
      <MarigoldProvider theme={theme}>
        <Panel aria-label="Bleed collapse">
          <Panel.Collapsible defaultExpanded>
            <Panel.CollapsibleTrigger>Toggle</Panel.CollapsibleTrigger>
            <Panel.CollapsibleContent bleed>
              <span data-testid="inner">Edge to edge</span>
            </Panel.CollapsibleContent>
          </Panel.Collapsible>
        </Panel>
      </MarigoldProvider>
    );

    const inner = screen.getByTestId('inner').parentElement!;

    expect(inner.className).not.toContain('px-(--panel-px)');
    expect(inner.className).toContain('pt-(--panel-py)');
    expect(inner.className).toContain('pb-(--panel-py)');
  });

  test('applies the horizontal panel padding by default', () => {
    render(<CollapsibleDefaultExpanded.Component />);

    const body = screen.getByText(
      /Email, SMS, and push notifications/
    ).parentElement!;

    expect(body.className).toContain('px-(--panel-px)');
  });
});
