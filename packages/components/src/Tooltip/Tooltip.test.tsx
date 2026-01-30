import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { Button } from '../Button/Button';
import { setup } from '../test.utils';
import { Tooltip } from './Tooltip';

// Note: Tooltip is an overlay component that renders into a portal.
// It requires ThemeProvider directly due to portal rendering behavior.

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

beforeEach(async () => {
  // by firing an event at the beginning of each test, we can put ourselves into
  // keyboard modality for the test
  await user.keyboard('{Tab}');
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

test('shows tooltip on focus', async () => {
  render(
    <Tooltip.Trigger>
      <Button>Button!</Button>
      <Tooltip data-testid="tooltip">Look at this tooltip!</Tooltip>
    </Tooltip.Trigger>
  );

  // Use tab to focus, which properly triggers keyboard modality
  await user.tab();

  await waitFor(() => {
    expect(screen.queryByTestId('tooltip')).toBeVisible();
  });

  // Tab away to blur
  await user.tab();

  await waitFor(() => {
    expect(screen.queryByText('Look at this tooltip!')).toBeNull();
  });
});

test('shows tooltip on hover', async () => {
  render(
    <Tooltip.Trigger delay={0}>
      <Button>Button!</Button>
      <Tooltip>Look at this tooltip!</Tooltip>
    </Tooltip.Trigger>
  );
  // Switch to "mouse mode"
  await user.click(document.body);

  const button = screen.getByText('Button!');

  await user.hover(button);
  await waitFor(() => expect(screen.getByRole('tooltip')).toBeVisible());

  await user.unhover(button);
  await waitFor(() =>
    expect(screen.queryByText('Look at this tooltip!')).toBeNull()
  );
});

test('can be disabled', async () => {
  render(
    <Tooltip.Trigger disabled>
      <Button>Button!</Button>
      <Tooltip>Look at this tooltip!</Tooltip>
    </Tooltip.Trigger>
  );

  // Tab to the button to focus it
  await user.tab();

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

test('sets placement as data attribute for styling', async () => {
  render(
    <ThemeProvider theme={theme}>
      <Tooltip.Trigger open>
        <Button>Button!</Button>
        <Tooltip placement="left">Look at this tooltip!</Tooltip>
      </Tooltip.Trigger>
    </ThemeProvider>
  );

  const tooltip = screen.getByRole('tooltip');
  await waitFor(() =>
    expect(tooltip).toHaveAttribute('data-placement', 'left')
  );
});
