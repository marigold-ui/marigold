import { fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { SearchField } from './SearchField';

const theme: Theme = {
  name: 'test',
  components: {
    Field: cva(),
    Label: cva('', {
      variants: {
        variant: {
          lime: 'text-lime-600',
        },
        size: {
          small: 'p-1',
        },
      },
    }),
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
      container: cva(),
      input: cva('border-blue-700'),
      icon: cva(),
      action: cva(),
    },
    Underlay: cva(),
    ListBox: {
      container: cva(),
      list: cva(),
      item: cva(),
      section: cva(),
      header: cva(),
    },
  },
};

const { render } = setup({ theme });

describe('Search', () => {
  let onChange = vi.fn();
  let onFocus = vi.fn();
  let onSubmit = vi.fn();
  let onClear = vi.fn();

  afterEach(() => {
    onChange.mockClear();
    onFocus.mockClear();
    onSubmit.mockClear();
    onClear.mockClear();
  });

  test('should be required', () => {
    render(<SearchField required data-testid="test-id" label="search field" />);
    const input = screen.getByRole('searchbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'search');
    expect(input).toBeRequired();
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
    const input = screen.getByRole('searchbox');
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
    const input = screen.getByRole('searchbox');

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
