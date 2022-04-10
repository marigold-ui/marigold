import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useStateProps } from './useStateProps';

test('returns state attributes', () => {
  const { result } = renderHook(() =>
    useStateProps({
      hover: true,
      focus: true,
      active: true,
      visited: true,
      disabled: true,
      readOnly: true,
      checked: true,
      indeterminate: true,
      invalid: true,
    })
  );

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data-active": "",
      "data-checked": "",
      "data-disabled": "",
      "data-focus": "",
      "data-hover": "",
      "data-indeterminate": "",
      "data-invalid": "",
      "data-readonly": "",
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

test('works with components', () => {
  const Component = ({ disabled }: { disabled?: boolean }) => {
    const stateProps = useStateProps({ disabled });

    return <div data-testid="component" {...stateProps} />;
  };

  const { rerender } = render(<Component />);

  let element = screen.getByTestId('component');
  expect(element).not.toHaveAttribute('data-disabled', '');

  rerender(<Component disabled />);
  expect(element).toHaveAttribute('data-disabled', '');
});
