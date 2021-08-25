import React from 'react';
import { render, screen } from '@testing-library/react';
import { useStyles, ThemeProvider } from '@marigold/system';
import { ActionGroup } from './ActionGroup';

const theme = {
  actionGroup: {
    default: {
      p: '8px',
    },
    custom: {
      p: '12px',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <ActionGroup title="actionGroup" />
    </ThemeProvider>
  );
  const actionGroup = screen.getByTitle(/actionGroup/);

  expect(actionGroup).toHaveStyle(`padding: 8px;`);
});

test('supports other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <ActionGroup variant="custom" title="actionGroup" />
    </ThemeProvider>
  );
  const actionGroup = screen.getByTitle(/actionGroup/);

  expect(actionGroup).toHaveStyle(`padding: 12px;`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <ActionGroup title="actionGroup" />
    </ThemeProvider>
  );
  const actionGroup = screen.getByTitle(/actionGroup/);

  expect(actionGroup instanceof HTMLDivElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  const TestComponent: React.FC = ({ children, ...props }) => {
    const classNames = useStyles({ css: { fontSize: '8px' } });
    return (
      <ActionGroup className={classNames} {...props}>
        {children}
      </ActionGroup>
    );
  };

  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <TestComponent>text</TestComponent>
    </ThemeProvider>
  );
  const testelem = getByText('text');
  const text = getComputedStyle(testelem);

  expect(text.fontSize).toEqual('8px');
});
