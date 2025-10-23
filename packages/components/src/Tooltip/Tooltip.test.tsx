import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { Button } from '../Button/Button';
import { setup } from '../test.utils';
import { Tooltip } from './Tooltip';

const user = userEvent.setup();
const theme: Theme = {
  name: 'test',
  components: {
    Button: cva(''),
    Tooltip: {
      container: cva('text-body bg-green-500', {
        variants: {
          variant: {
            lime: 'bg-lime-300',
          },
          size: {
            medium: 'p-5',
          },
        },
      }),
      arrow: cva('border-gray-700', {
        variants: {
          variant: {
            lime: 'border-lime-400',
          },
        },
      }),
    },
  },
};

const { render } = setup({ theme });

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

  // TODO: split into two tests
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

test('allows to change tooltip placement', async () => {
  // Note: There is no real way to test this without actually rendering the tooltip
  render(
    <Tooltip.Trigger>
      <Button>Button!</Button>
      <Tooltip placement="bottom">Look at this tooltip!</Tooltip>
    </Tooltip.Trigger>
  );

  await user.tab();

  const tooltip = screen.queryByRole('tooltip');
  await waitFor(() => {
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
  expect(tooltip.className).toMatchInlineSnapshot(
    `"group/tooltip text-body bg-green-500"`
  );
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
  expect(tooltip.className).toMatchInlineSnapshot(
    `"group/tooltip text-body bg-lime-300 p-5"`
  );
});

test('sets placement as data attribute for styling', () => {
  render(
    <ThemeProvider theme={theme}>
      <Tooltip.Trigger open>
        <Button>Button!</Button>
        <Tooltip placement="left">Look at this tooltip!</Tooltip>
      </Tooltip.Trigger>
    </ThemeProvider>
  );

  const tooltip = screen.getByRole('tooltip');
  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() => expect(tooltip).toHaveAttribute('data-placement', 'left'));
});
