import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Basic } from './SearchField.stories';

const user = userEvent.setup();

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
    render(
      <Basic.Component required data-testid="test-id" label="search field" />
    );
    const input = screen.getByRole('searchbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'search');
    expect(input).toBeRequired();
  });

  test('the icon is null', () => {
    render(
      <Basic.Component required data-testid="test-id" label="search field" />
    );
    const input = screen.queryByTestId('test-id');
    expect(input).toBeInTheDocument();
    expect(screen.queryByTestId('searchicon')).toBeNull();
  });

  test('Name should support error message', () => {
    render(<Basic.Component label="search field" data-testid="test-id" />);
    const error = screen.queryByText('Something went wrong');
    expect(error).not.toBeInTheDocument();
  });

  test('Should support aria label', () => {
    render(
      <Basic.Component
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
      <Basic.Component
        excludeFromTabOrder
        label="search field"
        data-testid="test-id"
      />
    );
    const input = screen.getByRole('searchbox');

    expect(input).toHaveAttribute('tabIndex', '-1');
  });

  test('Should not handle change when field is disalbed', async () => {
    render(
      <Basic.Component
        onChange={onChange}
        label="search field"
        data-testid="test-id"
      />
    );
    const input = screen.getByRole('searchbox');
    await user.click(input);
    await user.keyboard('{Enter}');
    expect(onChange).toBeCalledTimes(0);
  });
});
