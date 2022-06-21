import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Switch } from './Switch';
import userEvent from '@testing-library/user-event';
const theme = {
  fonts: {
    regular: 'Oswald Regular',
    body: 'Inter',
  },
  spaces: {
    medium: '16px',
    small: '8px',
  },
  sizes: {
    none: 0,
    large: 120,
  },
  components: {
    Switch: {
      base: {
        container: {
          p: 'medium',
        },
        label: {
          fontFamily: 'body',
        },
        track: {
          bg: 'blue',
          '&:checked': {
            bg: 'orange',
          },
          '&:disabled': {
            bg: 'gray',
          },
          '&:focus': {
            borderColor: 'gray',
          },
        },
        thumb: {
          bg: 'white',
          '&:disabled': {
            bg: 'black',
          },
        },
      },
      variant: {
        custom: {
          container: {
            p: 'small',
          },
          track: {
            bg: 'green',
          },
          thumb: {
            bg: 'hotpink',
          },
        },
      },
      size: {
        medium: {
          track: {
            p: 'medium',
          },
        },
      },
    },
  },
};
const getSwitchParts = () => {
  const label = screen.getByText('Label');
  // eslint-disable-next-line testing-library/no-node-access
  const container = label.parentElement;
  // eslint-disable-next-line testing-library/no-node-access
  const track = container.lastChild;
  // eslint-disable-next-line testing-library/no-node-access
  const thumb = track.lastChild;
  const input = screen.getByRole('switch');
  return { label, input, container, track, thumb };
};
test('supports base styling', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Switch, null, 'Label')
    )
  );
  const { label, container, track, thumb } = getSwitchParts();
  expect(label).toHaveStyle('font-family: Inter');
  expect(container).toHaveStyle(`padding: ${theme.spaces.medium}px`);
  expect(track).toHaveStyle('background-color: blue');
  expect(thumb).toHaveStyle('background-color: white');
});
test('supports a custom variant', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Switch, { variant: 'custom' }, 'Label')
    )
  );
  const { container, track, thumb } = getSwitchParts();
  expect(container).toHaveStyle(`padding: ${theme.spaces.small}px`);
  expect(track).toHaveStyle('background-color: green');
  expect(thumb).toHaveStyle('background-color: hotpink');
});
test('supports a size', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Switch, { size: 'medium' }, 'Label')
    )
  );
  const { track } = getSwitchParts();
  expect(track).toHaveStyle(`padding: ${theme.spaces.medium}px`);
});
test('takes full width by default', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Switch, null, 'Label')
    )
  );
  const { container } = getSwitchParts();
  expect(container).toHaveStyle('width: 100%');
});
test('allows to set width via prop', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Switch, { width: 'large' }, 'Label')
    )
  );
  const { container } = getSwitchParts();
  expect(container).toHaveStyle(`width: ${theme.sizes.large}px`);
});
test('supports disabled prop', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Switch, { disabled: true }, 'Label')
    )
  );
  const { input, thumb, track } = getSwitchParts();
  expect(input).toBeDisabled();
  expect(track).toHaveStyle('background-color: gray');
  expect(thumb).toHaveStyle('background-color: black');
});
test('renders hidden <input> element', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Switch, null, 'Label')
    )
  );
  const { input } = getSwitchParts();
  expect(input instanceof HTMLInputElement).toBeTruthy();
});
test('toggle switch per click', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Switch, null, 'Label')
    )
  );
  const { input, track } = getSwitchParts();
  fireEvent.click(input);
  expect(track).toHaveStyle(`background-color: orange`);
  expect(input).toHaveAttribute('aria-checked', 'true');
  fireEvent.click(input);
  expect(track).toHaveStyle(`background-color: blue`);
  expect(input).toHaveAttribute('aria-checked', 'false');
});
test('focus element and toggle switch per keyboard space', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Switch, null, 'Label')
    )
  );
  const { input, track } = getSwitchParts();
  userEvent.tab();
  expect(track).toHaveAttribute('data-focus');
  userEvent.keyboard('{space}');
  expect(track).toHaveStyle(`background-color: orange`);
  expect(input).toHaveAttribute('aria-checked', 'true');
  userEvent.keyboard('{space}');
  expect(track).toHaveStyle(`background-color: blue`);
  expect(input).toHaveAttribute('aria-checked', 'false');
});
test('supports default checked', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Switch, { defaultChecked: true }, 'Label')
    )
  );
  const { input } = getSwitchParts();
  expect(input).toHaveAttribute('aria-checked', 'true');
  fireEvent.click(input);
  expect(input).toHaveAttribute('aria-checked', 'false');
});
test('supports controlled component usage', () => {
  const onChange = jest.fn();
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Switch, { onChange: onChange }, 'Label')
    )
  );
  const { input } = getSwitchParts();
  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(true);
  expect(input).toHaveAttribute('aria-checked', 'true');
  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(false);
  expect(input).toHaveAttribute('aria-checked', 'false');
});
//# sourceMappingURL=Switch.test.js.map
