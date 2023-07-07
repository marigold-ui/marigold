import { within, fireEvent, screen, act } from '@testing-library/react';
// import Checkmark from '@spectrum-icons/workflow/Checkmark';
import React, { ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import { SearchField } from './SearchField';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';

let testId = 'test-id';
let inputText = 'blah';

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

function renderComponent(Component, props) {
  return render(
    <Component aria-label="the label" {...props} data-testid={testId} />
  );
}

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

  test('should clearn button be null', () => {
    render(<SearchField data-testid="test-id" label="search field" />);
    const input = screen.queryByTestId('test-id');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'search');
    expect(input).toHaveAttribute('aria-required', true);

    const clearButton = screen.queryByRole('button');
    expect(clearButton).toBeNull();
  });

  test('the icon is null', () => {
    render(<SearchField required data-testid="test-id" label="search field" />);
    const element = screen.queryByTestId('test-id');
    expect(element).toBeInTheDocument();
    expect(screen.queryByTestId('searchicon')).toBeNull();
  });

  // test("", () => {
  //     render(
  //         <SearchField value='hello' data-testid='test-id' label='search field' />
  //     );
  //     const input = screen.queryByTestId('test-id');

  // });
});
