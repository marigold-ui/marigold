/* eslint-disable testing-library/no-node-access */
import { screen } from '@testing-library/react';
import { Panel } from './Panel';
import { renderPanel } from './test-utils';

describe('Panel.Content', () => {
  test('renders children and picks up horizontal panel padding by default', () => {
    renderPanel(
      <Panel aria-label="Content">
        <Panel.Content>
          <span data-testid="child">child</span>
        </Panel.Content>
      </Panel>
    );

    const wrapper = screen.getByTestId('child').parentElement!;

    expect(wrapper.className).toContain('px-(--panel-px)');
  });

  test('`bleed` opts out of the horizontal padding', () => {
    renderPanel(
      <Panel aria-label="Bleed">
        <Panel.Content>
          <span data-testid="padded">Padded</span>
        </Panel.Content>
        <Panel.Content bleed>
          <span data-testid="bleeding">Edge to edge</span>
        </Panel.Content>
      </Panel>
    );

    const padded = screen.getByTestId('padded').parentElement!;
    const bleeding = screen.getByTestId('bleeding').parentElement!;

    expect(padded.className).toContain('px-(--panel-px)');
    expect(bleeding.className).not.toContain('px-(--panel-px)');
  });
});
