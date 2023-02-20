import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { Button } from '../Button';
import { Tooltip } from './Tooltip';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();
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
    <Tooltip.Trigger>
      <Button>Button!</Button>
      <Tooltip>Look at this tooltip!</Tooltip>
    </Tooltip.Trigger>
  );

  expect(screen.queryByText('Look at this tooltip!')).toBeNull();
});

test('shows tooltip on focus', () => {
  render(
    <Tooltip.Trigger>
      <Button>Button!</Button>
      <Tooltip data-testid="tooltip">Look at this tooltip!</Tooltip>
    </Tooltip.Trigger>
  );

  const button = screen.getByText('Button!');
  fireEvent.focus(button);

  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() => {
    expect(screen.queryByTestId('tooltip')).toBeVisible();
  });

  fireEvent.blur(button);

  expect(screen.queryByText('Look at this tooltip!')).toBeNull();
});

test('shows tooltip on hover', () => {
  render(
    <Tooltip.Trigger delay={0}>
      <Button>Button!</Button>
      <Tooltip>Look at this tooltip!</Tooltip>
    </Tooltip.Trigger>
  );
  // Switch to "mouse mode"
  fireEvent.mouseDown(document.body);
  fireEvent.mouseUp(document.body);

  const button = screen.getByText('Button!');

  fireEvent.mouseEnter(button);
  fireEvent.mouseMove(button);
  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() => expect(screen.getByRole('tooltip')).toBeVisible());

  fireEvent.mouseLeave(button);
  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() => expect(screen.queryByText('Look at this tooltip!')).toBeNull());
});

test('can be disabled', () => {
  render(
    <Tooltip.Trigger disabled>
      <Button>Button!</Button>
      <Tooltip>Look at this tooltip!</Tooltip>
    </Tooltip.Trigger>
  );

  const button = screen.getByText('Button!');
  fireEvent.focus(button);

  expect(screen.queryByText('Look at this tooltip!')).toBeNull();
});

test('can be opened programatically', () => {
  render(
    <Tooltip.Trigger open>
      <Button>Button!</Button>
      <Tooltip>Look at this tooltip!</Tooltip>
    </Tooltip.Trigger>
  );
  expect(screen.queryByText('Look at this tooltip!')).toBeVisible();
});

test('allows to change tooltip placement', () => {
  // Note: There is no real way to test this without actually rendering the tooltip
  render(
    <Tooltip.Trigger placement="bottom">
      <Button>Button!</Button>
      <Tooltip>Look at this tooltip!</Tooltip>
    </Tooltip.Trigger>
  );

  user.tab();
  const tooltip = screen.queryByRole('tooltip');
  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() => {
    expect(tooltip).toBeVisible();
  });
});

test('styled via "Tooltip" from theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Tooltip.Trigger open>
        <Button>Button!</Button>
        <Tooltip>Look at this tooltip!</Tooltip>
      </Tooltip.Trigger>
    </ThemeProvider>
  );

  const tooltip = screen.getByRole('tooltip');
  expect(tooltip).toHaveStyle({
    fontSize: theme.fontSizes['small-1'],
    backgroundColor: theme.colors.green,
  });
});

test('accepts variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Tooltip.Trigger open>
        <Button>Button!</Button>
        <Tooltip variant="lime" size="medium">
          Look at this tooltip!
        </Tooltip>
      </Tooltip.Trigger>
    </ThemeProvider>
  );

  const tooltip = screen.getByRole('tooltip');
  expect(tooltip).toHaveStyle({
    fontSize: theme.fontSizes['medium-1'],
    backgroundColor: theme.colors.lime,
  });
});

test('sets placement as data attribute for styling', () => {
  render(
    <ThemeProvider theme={theme}>
      <Tooltip.Trigger open placement="left">
        <Button>Button!</Button>
        <Tooltip>Look at this tooltip!</Tooltip>
      </Tooltip.Trigger>
    </ThemeProvider>
  );

  const tooltip = screen.getByRole('tooltip');
  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() => expect(tooltip).toHaveAttribute('data-placement', 'left'));
});
