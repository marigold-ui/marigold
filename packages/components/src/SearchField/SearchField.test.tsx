import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { SearchField } from './SearchField';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';

const theme: Theme = {
  name: 'test',
  components: {
    Field: cva(),
    Label: {
      container: cva('', {
        variants: {
          variant: {
            lime: 'text-lime-600',
          },
          size: {
            small: 'p-1',
          },
        },
      }),
      indicator: cva(''),
    },
    HelpText: {
      container: cva('', {
        variants: {
          variant: {
            lime: 'text-lime-600',
          },
          size: {
            small: 'p-2',
          },
        },
      }),
      icon: cva(''),
    },
    Input: {
      input: cva('border-blue-700'),
      icon: cva(),
      action: cva(),
    },
    Underlay: cva(),
    ListBox: {
      container: cva(),
      list: cva(),
      option: cva(),
      section: cva(),
      sectionTitle: cva(),
    },
  },
};

const { render } = setup({ theme });

describe('Search', () => {
  let onChange = jest.fn();
  let onFocus = jest.fn();
  let onSubmit = jest.fn();
  let onClear = jest.fn();

  afterEach(() => {
    onChange.mockClear();
    onFocus.mockClear();
    onSubmit.mockClear();
    onClear.mockClear();
  });

  test('should be required', () => {
    render(<SearchField required data-testid="test-id" label="search field" />);
    const input = screen.queryByTestId('test-id');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'search');
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  test('the icon is null', () => {
    render(<SearchField required data-testid="test-id" label="search field" />);
    const input = screen.queryByTestId('test-id');
    expect(input).toBeInTheDocument();
    expect(screen.queryByTestId('searchicon')).toBeNull();
  });

  test('Name should support error message', () => {
    render(<SearchField label="search field" data-testid="test-id" />);
    const error = screen.queryByText('Something went wrong');
    expect(error).not.toBeInTheDocument();
  });

  test('Should support aria label', () => {
    render(
      <SearchField
        excludeFromTabOrder
        aria-label="search field"
        data-testid="test-id"
      />
    );
    const input = screen.queryByTestId('test-id');
    expect(input).toHaveAttribute('aria-label', 'search field');
  });

  test('should support excludeFromTabOrder', () => {
    render(
      <SearchField
        excludeFromTabOrder
        label="search field"
        data-testid="test-id"
      />
    );
    const input = screen.queryByTestId('test-id');
    expect(input).toHaveAttribute('tabIndex', '-1');
  });

  test('Should not handle change when field is disalbed', () => {
    render(
      <SearchField
        onChange={onChange}
        label="search field"
        data-testid="test-id"
      />
    );
    const input = screen.queryByTestId('test-id');
    fireEvent.keyDown(input as any, { key: 'Enter', code: 13, charCode: 13 });
    expect(onChange).toBeCalledTimes(0);
  });
});
