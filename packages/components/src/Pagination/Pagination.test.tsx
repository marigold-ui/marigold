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

  test('renders previous and next buttons', () => {
    render(<Basic.Component totalItems={20} pageSize={10} />);

    const previousButton = screen.getByLabelText('Previous page');
    const nextButton = screen.getByLabelText('Next page');

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
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

    expect(previousButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
    expect(pageButton).toBeDisabled();
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
    ['Page 1', 1],
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

  test('use control labels', async () => {
    render(<WithButtonLabels.Component />);

    const previousButton = screen.getByLabelText('Previous page');
    const nextPageButton = screen.getByLabelText('Next page');

    expect(previousButton).toHaveTextContent('Previous');
    expect(nextPageButton).toHaveTextContent('Next');
  });
});
