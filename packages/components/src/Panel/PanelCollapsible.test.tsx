import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Text } from '../Text/Text';
import { Panel } from './Panel';
import { WithCollapsible, WithMultipleCollapsibles } from './Panel.stories';
import { renderPanel } from './test-utils';

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
    const changes: boolean[] = [];
    const Controlled = () => {
      const [expanded, setExpanded] = useState(false);
      return (
        <Panel aria-label="Controlled">
          <Panel.Collapsible
            expanded={expanded}
            onExpandedChange={value => {
              changes.push(value);
              setExpanded(value);
            }}
          >
            <Panel.CollapsibleTrigger>Controlled</Panel.CollapsibleTrigger>
            <Panel.CollapsibleContent>
              <Text>Body</Text>
            </Panel.CollapsibleContent>
          </Panel.Collapsible>
        </Panel>
      );
    };

    renderPanel(<Controlled />);
    const trigger = screen.getByRole('button', { name: 'Controlled' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    expect(changes).toEqual([true]);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await user.click(trigger);

    expect(changes).toEqual([true, false]);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('supports `defaultExpanded` for uncontrolled initial state', () => {
    renderPanel(
      <Panel aria-label="Prefilled">
        <Panel.Collapsible defaultExpanded>
          <Panel.CollapsibleTrigger>Toggle</Panel.CollapsibleTrigger>
          <Panel.CollapsibleContent>
            <Text>Body</Text>
          </Panel.CollapsibleContent>
        </Panel.Collapsible>
      </Panel>
    );

    const trigger = screen.getByRole('button', { name: 'Toggle' });

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  test('forwards `disabled` to the trigger', () => {
    renderPanel(
      <Panel aria-label="Disabled">
        <Panel.Collapsible disabled>
          <Panel.CollapsibleTrigger>Toggle</Panel.CollapsibleTrigger>
          <Panel.CollapsibleContent>
            <Text>Body</Text>
          </Panel.CollapsibleContent>
        </Panel.Collapsible>
      </Panel>
    );

    const trigger = screen.getByRole('button', { name: 'Toggle' });

    expect(trigger).toBeDisabled();
  });

  test('fires `onExpandedChange` in uncontrolled mode', async () => {
    const changes: boolean[] = [];
    renderPanel(
      <Panel aria-label="Uncontrolled notify">
        <Panel.Collapsible onExpandedChange={value => changes.push(value)}>
          <Panel.CollapsibleTrigger>Toggle</Panel.CollapsibleTrigger>
          <Panel.CollapsibleContent>
            <Text>Body</Text>
          </Panel.CollapsibleContent>
        </Panel.Collapsible>
      </Panel>
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
