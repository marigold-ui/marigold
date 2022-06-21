import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Button } from '../Button';
import { Tooltip } from './Tooltip';
const theme = {
  fontSizes: {
    'small-1': '12px',
    'medium-1': '16px',
  },
  colors: {
    green: '#69db7c',
    lime: '#94d82d',
  },
  components: {
    Tooltip: {
      base: {
        container: {
          fontSize: 'small-1',
          bg: 'green',
        },
        arrow: {
          borderTopColor: 'green',
        },
      },
      variant: {
        lime: {
          container: {
            bg: 'lime',
          },
        },
      },
      size: {
        medium: {
          container: {
            fontSize: 'medium-1',
          },
        },
      },
    },
  },
};
beforeEach(() => {
  // by firing an event at the beginning of each test, we can put ourselves into
  // keyboard modality for the test
  fireEvent.keyDown(document.body, { key: 'Tab' });
  fireEvent.keyUp(document.body, { key: 'Tab' });
});
test('does not render tooltip by default', () => {
  render(
    React.createElement(
      Tooltip.Trigger,
      null,
      React.createElement(Button, null, 'Button!'),
      React.createElement(Tooltip, null, 'Look at this tooltip!')
    )
  );
  expect(screen.queryByText('Look at this tooltip!')).toBeNull();
});
test('shows tooltip on focus', () => {
  render(
    React.createElement(
      Tooltip.Trigger,
      null,
      React.createElement(Button, null, 'Button!'),
      React.createElement(Tooltip, null, 'Look at this tooltip!')
    )
  );
  const button = screen.getByText('Button!');
  fireEvent.focus(button);
  expect(screen.getByRole('tooltip')).toBeVisible();
  fireEvent.blur(button);
  expect(screen.queryByText('Look at this tooltip!')).toBeNull();
});
test('shows tooltip on hover', async () => {
  render(
    React.createElement(
      Tooltip.Trigger,
      { delay: 0 },
      React.createElement(Button, null, 'Button!'),
      React.createElement(Tooltip, null, 'Look at this tooltip!')
    )
  );
  // Switch to "mouse mode"
  fireEvent.mouseDown(document.body);
  fireEvent.mouseUp(document.body);
  const button = screen.getByText('Button!');
  fireEvent.mouseEnter(button);
  fireEvent.mouseMove(button);
  expect(screen.getByRole('tooltip')).toBeVisible();
  fireEvent.mouseLeave(button);
  await waitFor(() =>
    expect(screen.queryByText('Look at this tooltip!')).toBeNull()
  );
});
test('can be disabled', () => {
  render(
    React.createElement(
      Tooltip.Trigger,
      { disabled: true },
      React.createElement(Button, null, 'Button!'),
      React.createElement(Tooltip, null, 'Look at this tooltip!')
    )
  );
  const button = screen.getByText('Button!');
  fireEvent.focus(button);
  expect(screen.queryByText('Look at this tooltip!')).toBeNull();
});
test('can be opened programatically', () => {
  render(
    React.createElement(
      Tooltip.Trigger,
      { open: true },
      React.createElement(Button, null, 'Button!'),
      React.createElement(Tooltip, null, 'Look at this tooltip!')
    )
  );
  expect(screen.queryByText('Look at this tooltip!')).toBeVisible();
});
test('allows to change tooltip placement', () => {
  // Note: There is no real way to test this without actually rendering the tooltip
  render(
    React.createElement(
      Tooltip.Trigger,
      { placement: 'bottom' },
      React.createElement(Button, null, 'Button!'),
      React.createElement(Tooltip, null, 'Look at this tooltip!')
    )
  );
  const button = screen.getByText('Button!');
  fireEvent.focus(button);
  expect(screen.getByRole('tooltip')).toBeVisible();
});
test('styled via "Tooltip" from theme', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Tooltip.Trigger,
        { open: true },
        React.createElement(Button, null, 'Button!'),
        React.createElement(Tooltip, null, 'Look at this tooltip!')
      )
    )
  );
  const tooltip = screen.getByRole('tooltip');
  expect(tooltip).toHaveStyle({
    fontSize: theme.fontSizes['small-1'],
    backgroundColor: theme.colors.green,
  });
});
test('accepts variant and size', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Tooltip.Trigger,
        { open: true },
        React.createElement(Button, null, 'Button!'),
        React.createElement(
          Tooltip,
          { variant: 'lime', size: 'medium' },
          'Look at this tooltip!'
        )
      )
    )
  );
  const tooltip = screen.getByRole('tooltip');
  expect(tooltip).toHaveStyle({
    fontSize: theme.fontSizes['medium-1'],
    backgroundColor: theme.colors.lime,
  });
});
test('sets placement as data attribute for styling', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Tooltip.Trigger,
        { open: true, placement: 'left' },
        React.createElement(Button, null, 'Button!'),
        React.createElement(Tooltip, null, 'Look at this tooltip!')
      )
    )
  );
  const tooltip = screen.getByRole('tooltip');
  expect(tooltip).toHaveAttribute('data-placement', 'left');
});
//# sourceMappingURL=Tooltip.test.js.map
