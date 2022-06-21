import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useStateProps } from './useStateProps';
test('returns state attributes', () => {
  const { result } = renderHook(() =>
    useStateProps({
      hover: true,
      focus: true,
      focusVisible: true,
      active: true,
      visited: true,
      disabled: true,
      readOnly: true,
      checked: true,
      indeterminate: true,
      error: true,
      selected: true,
      expanded: true,
    })
  );
  expect(result.current).toMatchInlineSnapshot(`
    {
      "data-active": "",
      "data-checked": "",
      "data-disabled": "",
      "data-error": "",
      "data-expanded": "",
      "data-focus": "",
      "data-focus-visible": "",
      "data-hover": "",
      "data-indeterminate": "",
      "data-read-only": "",
      "data-selected": "",
      "data-visited": "",
    }
  `);
});
test('return only set states', () => {
  const { result } = renderHook(() =>
    useStateProps({
      hover: false,
      focus: true,
      active: false,
      visited: true,
      disabled: false,
    })
  );
  expect(result.current).toMatchInlineSnapshot(`
    {
      "data-focus": "",
      "data-visited": "",
    }
  `);
});
test('works with empty object', () => {
  const { result } = renderHook(() => useStateProps({}));
  expect(result.current).toMatchInlineSnapshot(`{}`);
});
test('works with components', () => {
  const Component = ({ disabled }) => {
    const stateProps = useStateProps({ disabled });
    return React.createElement('div', {
      'data-testid': 'component',
      ...stateProps,
    });
  };
  const { rerender } = render(React.createElement(Component, null));
  let element = screen.getByTestId('component');
  expect(element).not.toHaveAttribute('data-disabled', '');
  rerender(React.createElement(Component, { disabled: true }));
  expect(element).toHaveAttribute('data-disabled', '');
});
//# sourceMappingURL=useStateProps.test.js.map
