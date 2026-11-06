import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockInstance, vi } from 'vitest';
import { Basic, WithButtonLabels } from './Pagination.stories';

let warnMock: MockInstance;

beforeEach(() => {
  warnMock = vi.spyOn(console, 'warn').mockImplementation(() => null);
});

afterEach(() => {
  warnMock.mockRestore();
});

describe('Pagination tests', () => {
  test('renders navigation element with correct page information', () => {
    render(<Basic.Component totalItems={20} pageSize={10} />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Page 1 of 2');
  });

  test('renders correct number of page buttons', () => {
    render(<Basic.Component totalItems={50} pageSize={10} />);

    const pageButtons = screen.getAllByRole('button').filter(button => {
      const label = button.getAttribute('aria-label');
      return (
        label?.startsWith('Page ') &&
        !label?.includes('previous') &&
        !label?.includes('next')
      );
    });

    // 5 pages total
    expect(pageButtons).toHaveLength(5);
  });

  test('first page button is selected on initial render', () => {
    render(<Basic.Component totalItems={20} pageSize={10} />);

    const pageButton1 = screen.getByLabelText('Page 1');
    expect(pageButton1).toHaveAttribute('data-selected', 'true');
  });

  test('renders disabled buttons when no data is available', () => {
    render(<Basic.Component totalItems={0} pageSize={10} />);

    const previousButton = screen.getByLabelText('Previous page');
    const nextButton = screen.getByLabelText('Next page');
    const pageButton = screen.getByLabelText('Page 1');

    // Disabled for assistive tech, but still focusable so focus is never lost
    for (const button of [previousButton, nextButton, pageButton]) {
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).not.toHaveAttribute('disabled');
    }
  });

  test('renders single page button when data fits on one page', () => {
    render(<Basic.Component totalItems={5} pageSize={10} />);

    const pageButtons = screen.getAllByRole('button').filter(button => {
      const label = button.getAttribute('aria-label');
      return (
        label?.startsWith('Page ') &&
        !label?.includes('previous') &&
        !label?.includes('next')
      );
    });

    expect(pageButtons).toHaveLength(1);
  });

  test('has the correct role', () => {
    render(<Basic.Component />);

    const pagination = screen.getByRole('navigation');

    expect(pagination).toBeInTheDocument();
  });

  it.each([
    ['Previous page', 1],
    ['Previous page', 2],
    ['Previous page', 3],
    ['Previous page', 4],
    ['Previous page', 5],
    ['Previous page', 8],
  ])(
    `should focus %s when using tab and default page is Page %i`,
    async (expected, page) => {
      render(
        <Basic.Component totalItems={50} pageSize={10} defaultPage={page} />
      );

      await userEvent.tab();

      expect(screen.getByLabelText(expected)).toHaveFocus();
    }
  );

  test('follows the controlled page prop after mount', () => {
    const { rerender } = render(
      <Basic.Component totalItems={100} pageSize={10} page={3} />
    );

    expect(screen.getByLabelText('Page 3')).toHaveAttribute(
      'data-selected',
      'true'
    );

    // Parent resets the page externally, e.g. when a filter changes
    rerender(<Basic.Component totalItems={100} pageSize={10} page={1} />);

    expect(screen.getByLabelText('Page 1')).toHaveAttribute(
      'data-selected',
      'true'
    );
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'aria-label',
      'Page 1 of 10'
    );
  });

  test('controlled: clicking a page calls onChange but the page prop stays the source of truth', async () => {
    const onChange = vi.fn();
    render(
      <Basic.Component
        totalItems={100}
        pageSize={10}
        page={1}
        onChange={onChange}
      />
    );

    await userEvent.click(screen.getByLabelText('Page 2'));

    expect(onChange).toHaveBeenCalledWith(2);
    // The parent did not update the page prop, so page 1 stays active
    expect(screen.getByLabelText('Page 1')).toHaveAttribute(
      'data-selected',
      'true'
    );
  });

  test('uncontrolled: navigation updates the active page and calls onChange', async () => {
    const onChange = vi.fn();
    render(
      <Basic.Component
        totalItems={100}
        pageSize={10}
        defaultPage={2}
        onChange={onChange}
      />
    );

    await userEvent.click(screen.getByLabelText('Page 4'));

    expect(onChange).toHaveBeenCalledWith(4);
    expect(screen.getByLabelText('Page 4')).toHaveAttribute(
      'data-selected',
      'true'
    );
  });

  test('resets to the first page when pageSize changes', async () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Basic.Component
        totalItems={100}
        pageSize={10}
        defaultPage={5}
        onChange={onChange}
      />
    );

    expect(screen.getByLabelText('Page 5')).toHaveAttribute(
      'data-selected',
      'true'
    );

    rerender(
      <Basic.Component
        totalItems={100}
        pageSize={20}
        defaultPage={5}
        onChange={onChange}
      />
    );

    expect(onChange).toHaveBeenCalledWith(1);
    expect(screen.getByLabelText('Page 1')).toHaveAttribute(
      'data-selected',
      'true'
    );
  });

  test('controlled: a pageSize change reports the reset via onChange(1) while the page prop stays the source of truth', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Basic.Component
        totalItems={100}
        pageSize={10}
        page={3}
        onChange={onChange}
      />
    );

    expect(screen.getByLabelText('Page 3')).toHaveAttribute(
      'data-selected',
      'true'
    );

    rerender(
      <Basic.Component
        totalItems={100}
        pageSize={20}
        page={3}
        onChange={onChange}
      />
    );

    // In controlled mode the reset is requested via onChange(1); the parent owns
    // `page`, so the active page stays 3 until the parent updates the prop.
    expect(onChange).toHaveBeenCalledWith(1);
    expect(screen.getByLabelText('Page 3')).toHaveAttribute(
      'data-selected',
      'true'
    );
  });

  test('ignores presses on the disabled Previous and Next buttons', async () => {
    const onChange = vi.fn();
    render(
      <Basic.Component totalItems={20} pageSize={10} onChange={onChange} />
    );

    await userEvent.click(screen.getByLabelText('Previous page'));
    screen.getByLabelText('Previous page').focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByLabelText('Page 1')).toHaveAttribute(
      'data-selected',
      'true'
    );
  });

  test('ignores presses on Next when there are no pages', async () => {
    const onChange = vi.fn();
    render(
      <Basic.Component totalItems={0} pageSize={10} onChange={onChange} />
    );

    await userEvent.click(screen.getByLabelText('Next page'));
    await userEvent.click(screen.getByLabelText('Page 1'));

    expect(onChange).not.toHaveBeenCalled();
  });

  test('keeps focus on Next when the keyboard reaches the last page', async () => {
    render(<Basic.Component totalItems={30} pageSize={10} />);

    const nextButton = screen.getByLabelText('Next page');
    nextButton.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard('{Enter}');

    expect(screen.getByLabelText('Page 3')).toHaveAttribute(
      'data-selected',
      'true'
    );
    expect(nextButton).toHaveAttribute('aria-disabled', 'true');
    expect(nextButton).toHaveFocus();

    // Pressing again on the last page does nothing and keeps focus
    await userEvent.keyboard('{Enter}');
    expect(screen.getByLabelText('Page 3')).toHaveAttribute(
      'data-selected',
      'true'
    );
    expect(nextButton).toHaveFocus();
  });

  test('advances one page per Space press on Next', async () => {
    const onChange = vi.fn();
    render(
      <Basic.Component totalItems={50} pageSize={10} onChange={onChange} />
    );

    screen.getByLabelText('Next page').focus();
    await userEvent.keyboard(' ');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  test('keeps focus on Previous when the keyboard reaches the first page', async () => {
    render(<Basic.Component totalItems={30} pageSize={10} defaultPage={2} />);

    const previousButton = screen.getByLabelText('Previous page');
    previousButton.focus();
    await userEvent.keyboard('{Enter}');

    expect(screen.getByLabelText('Page 1')).toHaveAttribute(
      'data-selected',
      'true'
    );
    expect(previousButton).toHaveAttribute('aria-disabled', 'true');
    expect(previousButton).toHaveFocus();
  });

  test('moves focus to the current page when the focused page button is removed', async () => {
    const { rerender } = render(
      <Basic.Component totalItems={100} pageSize={10} defaultPage={1} />
    );

    screen.getByLabelText('Page 10').focus();
    expect(screen.getByLabelText('Page 10')).toHaveFocus();

    // e.g. a filter change shrinks the result set
    rerender(<Basic.Component totalItems={50} pageSize={10} defaultPage={1} />);

    expect(screen.queryByLabelText('Page 10')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Page 1')).toHaveFocus();
  });

  test('moves focus to the disabled "1" when the result set becomes empty', async () => {
    const { rerender } = render(
      <Basic.Component totalItems={30} pageSize={10} />
    );

    screen.getByLabelText('Page 3').focus();

    rerender(<Basic.Component totalItems={0} pageSize={10} />);

    const pageButton = screen.getByLabelText('Page 1');
    expect(pageButton).toHaveAttribute('aria-disabled', 'true');
    expect(pageButton).toHaveFocus();
  });

  test('moves focus into the pager when the result set shrinks below the current page', async () => {
    const { rerender } = render(
      <Basic.Component totalItems={100} pageSize={10} page={10} />
    );

    screen.getByLabelText('Page 10').focus();

    // The app has not clamped `page` yet, so page 10 no longer exists
    rerender(<Basic.Component totalItems={50} pageSize={10} page={10} />);

    expect(screen.queryByLabelText('Page 10')).not.toBeInTheDocument();
    expect(document.body).not.toHaveFocus();
    expect(screen.getByLabelText('Next page')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });

  test('does not pull focus back after the user left the pager', async () => {
    const { rerender } = render(
      <>
        <button>Outside</button>
        <Basic.Component totalItems={100} pageSize={10} />
      </>
    );

    screen.getByLabelText('Page 10').focus();
    screen.getByText('Outside').focus();

    rerender(
      <>
        <button>Outside</button>
        <Basic.Component totalItems={50} pageSize={10} />
      </>
    );

    expect(screen.getByText('Outside')).toHaveFocus();
  });

  test('use control labels', async () => {
    render(<WithButtonLabels.Component />);

    const previousButton = screen.getByLabelText('Previous page');
    const nextPageButton = screen.getByLabelText('Next page');

    expect(previousButton).toHaveTextContent('Previous');
    expect(nextPageButton).toHaveTextContent('Next');
  });
});
