import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { theme } from '@marigold/theme-rui';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { Text } from '../Text/Text';
import { Panel } from './Panel';
import {
  CollapsibleDefaultExpanded,
  CollapsibleDisabled,
  ControlledCollapsible,
  WithCollapsible,
  WithMultipleCollapsibles,
} from './Panel.stories';

const user = userEvent.setup();

describe('Panel.Collapsible', () => {
  test('toggles aria-expanded on click (uncontrolled)', async () => {
    render(<WithCollapsible.Component />);
    const trigger = screen.getByRole('button', { name: /Advanced Options/ });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('respects the controlled `expanded` + `onExpandedChange` flow', async () => {
    render(<ControlledCollapsible.Component />);
    const trigger = screen.getByRole('button', { name: 'Advanced settings' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

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

  test('fires `onExpandedChange` in uncontrolled mode', async () => {
    const changes: boolean[] = [];
    render(
      <MarigoldProvider theme={theme}>
        <Panel aria-label="Uncontrolled notify">
          <Panel.Collapsible onExpandedChange={value => changes.push(value)}>
            <Panel.CollapsibleHeader>
              <Panel.CollapsibleTitle>Toggle</Panel.CollapsibleTitle>
            </Panel.CollapsibleHeader>
            <Panel.CollapsibleContent>
              <Text>Body</Text>
            </Panel.CollapsibleContent>
          </Panel.Collapsible>
        </Panel>
      </MarigoldProvider>
    );
    const trigger = screen.getByRole('button', { name: 'Toggle' });

    await user.click(trigger);

    expect(changes).toEqual([true]);
  });

  test('multiple Collapsibles maintain independent expansion state', async () => {
    render(<WithMultipleCollapsibles.Component />);
    const address = screen.getByRole('button', { name: 'Address' });
    const accessibility = screen.getByRole('button', {
      name: 'Accessibility',
    });

    await user.click(address);

    expect(address).toHaveAttribute('aria-expanded', 'true');
    expect(accessibility).toHaveAttribute('aria-expanded', 'false');

    await user.click(accessibility);

    expect(address).toHaveAttribute('aria-expanded', 'true');
    expect(accessibility).toHaveAttribute('aria-expanded', 'true');
  });
});
