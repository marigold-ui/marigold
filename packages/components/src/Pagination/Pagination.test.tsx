import { act, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { Pagination } from './Pagination';

const theme: Theme = {
  name: 'test',
  components: {
    Pagination: {
      navigationButton: cva([
        'border-border-base bg-bg-inverted text-text-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:cursor-none',
        'disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid',
        'outline-outline-focus outline-2 outline-offset-1 focus-visible:outline',
        'h-auto border-none bg-transparent',
        'flex h-8! w-8! items-center justify-center',
        'data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-black data-[selected=true]:font-bold',
        'text-gray-700 hover:bg-gray-100',
      ]),
      pageButton: cva([
        'border-border-base bg-bg-inverted text-text-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:cursor-none',
        'disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid',
        'outline-outline-focus outline-2 outline-offset-1 focus-visible:outline',
        'h-auto border-none bg-transparent',
        'flex h-8! w-8! items-center justify-center',
        'data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-black data-[selected=true]:font-bold',
        'text-gray-700 hover:bg-gray-100',
      ]),
      icon: cva('h-5 w-5'),
    },
  },
};

const { render } = setup({ theme });

let warnMock: jest.SpyInstance;

beforeEach(() => {
  warnMock = jest.spyOn(console, 'warn').mockImplementation();
});

afterEach(() => {
  warnMock.mockRestore();
});

describe('Pagination tests', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<Pagination totalItems={20} pageSize={10} />);

    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    class=""
  >
    <nav
      aria-label="Page 1 of 2"
      class="flex items-center justify-center space-x-2"
    >
      <button
        aria-label="Page previous"
        class="border-border-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid outline-outline-focus outline-2 outline-offset-1 focus-visible:outline h-auto border-none bg-transparent flex h-8! w-8! items-center justify-center data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-black data-[selected=true]:font-bold text-gray-700 hover:bg-gray-100"
        disabled=""
        type="button"
      >
        <svg
          class="flex-none fill-current h-5 w-5"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path
            d="M16.8506 18.0244L10.8394 12L16.8506 5.97563L15 4.125L7.125 12L15 19.875L16.8506 18.0244Z"
          />
        </svg>
      </button>
      <div
        class="flex items-center space-x-2"
      >
        <button
          aria-current="page"
          aria-label="Page 1"
          class="border-border-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid outline-outline-focus outline-2 outline-offset-1 focus-visible:outline h-auto border-none bg-transparent flex h-8! w-8! items-center justify-center data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-black data-[selected=true]:font-bold text-gray-700 hover:bg-gray-100"
          data-selected="true"
          tabindex="0"
          type="button"
        >
          1
        </button>
        <button
          aria-label="Page 2"
          class="border-border-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid outline-outline-focus outline-2 outline-offset-1 focus-visible:outline h-auto border-none bg-transparent flex h-8! w-8! items-center justify-center data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-black data-[selected=true]:font-bold text-gray-700 hover:bg-gray-100"
          data-selected="false"
          tabindex="-1"
          type="button"
        >
          2
        </button>
      </div>
      <button
        aria-label="Page next"
        class="border-border-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid outline-outline-focus outline-2 outline-offset-1 focus-visible:outline h-auto border-none bg-transparent flex h-8! w-8! items-center justify-center data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-black data-[selected=true]:font-bold text-gray-700 hover:bg-gray-100"
        type="button"
      >
        <svg
          class="flex-none fill-current h-5 w-5"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path
            d="M7.125 18.0244L13.1363 12L7.125 5.97563L8.97563 4.125L16.8506 12L8.97563 19.875L7.125 18.0244Z"
          />
        </svg>
      </button>
    </nav>
  </div>
</DocumentFragment>
`);
  });

  test('renders correctly when no data is available', () => {
    const { asFragment } = render(<Pagination totalItems={0} pageSize={10} />);

    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    class=""
  >
    <nav
      aria-label="Page 1 of 0"
      class="flex items-center justify-center space-x-2"
    >
      <button
        aria-label="Page previous"
        class="border-border-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid outline-outline-focus outline-2 outline-offset-1 focus-visible:outline h-auto border-none bg-transparent flex h-8! w-8! items-center justify-center data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-black data-[selected=true]:font-bold text-gray-700 hover:bg-gray-100"
        disabled=""
        type="button"
      >
        <svg
          class="flex-none fill-current h-5 w-5"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path
            d="M16.8506 18.0244L10.8394 12L16.8506 5.97563L15 4.125L7.125 12L15 19.875L16.8506 18.0244Z"
          />
        </svg>
      </button>
      <div
        class="flex items-center space-x-2"
      >
        <button
          aria-label="Page 1"
          class="border-border-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid outline-outline-focus outline-2 outline-offset-1 focus-visible:outline h-auto border-none bg-transparent flex h-8! w-8! items-center justify-center data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-black data-[selected=true]:font-bold text-gray-700 hover:bg-gray-100"
          disabled=""
          tabindex="-1"
          type="button"
        >
          1
        </button>
      </div>
      <button
        aria-label="Page next"
        class="border-border-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid outline-outline-focus outline-2 outline-offset-1 focus-visible:outline h-auto border-none bg-transparent flex h-8! w-8! items-center justify-center data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-black data-[selected=true]:font-bold text-gray-700 hover:bg-gray-100"
        disabled=""
        type="button"
      >
        <svg
          class="flex-none fill-current h-5 w-5"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path
            d="M7.125 18.0244L13.1363 12L7.125 5.97563L8.97563 4.125L16.8506 12L8.97563 19.875L7.125 18.0244Z"
          />
        </svg>
      </button>
    </nav>
  </div>
</DocumentFragment>
`);
  });

  test('uses base classnames', () => {
    render(<Pagination totalItems={10} pageSize={10} />);

    const pagination = screen.getByRole('navigation');
    const button = screen.getAllByRole('button');

    expect(pagination).toHaveClass(
      'flex items-center justify-center space-x-2'
    );
    expect(button[0]).toHaveClass(
      'border-border-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid outline-outline-focus outline-2 outline-offset-1 focus-visible:outline h-auto border-none bg-transparent flex h-8! w-8! items-center justify-center data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-black data-[selected=true]:font-bold text-gray-700 hover:bg-gray-100'
    );
  });

  test('select an item', () => {
    render(<Pagination totalItems={20} pageSize={10} />);

    const page2Button = screen.getByLabelText('Page 2');

    fireEvent.click(page2Button);

    expect(page2Button).toHaveAttribute('data-selected', 'true');
  });

  test('select next page button with next button', () => {
    render(<Pagination totalItems={20} pageSize={10} defaultPage={1} />);

    const page1Button = screen.getByLabelText('Page 1');
    const nextPageButton = page1Button.nextElementSibling as HTMLElement;
    const nextButton = screen.getByLabelText('Page next');

    fireEvent.click(nextButton);

    expect(nextPageButton).toHaveAttribute('data-selected', 'true');
    expect(nextPageButton).toHaveTextContent('2');
  });

  test('select previous page button with previous button', () => {
    render(<Pagination totalItems={100} pageSize={10} defaultPage={5} />);

    const page1Button = screen.getByLabelText('Page 5');
    const previousPageButton =
      page1Button.previousElementSibling as HTMLElement;
    const previousButton = screen.getByLabelText('Page previous');

    fireEvent.click(previousButton);

    expect(previousPageButton).toHaveAttribute('data-selected', 'true');
    expect(previousPageButton).toHaveTextContent('4');
  });

  test('previous button is not selected after click when first page is selected', () => {
    render(<Pagination totalItems={20} pageSize={10} defaultPage={1} />);

    const previousButton = screen.getByLabelText('Page previous');

    fireEvent.click(previousButton);

    expect(previousButton).not.toHaveAttribute('data-selected', 'true');
    expect(previousButton).toHaveAttribute('disabled');
  });

  test('next button is not selected after click when last page is selected', () => {
    render(<Pagination totalItems={20} pageSize={10} defaultPage={2} />);

    const nextButton = screen.getByLabelText('Page next');

    fireEvent.click(nextButton);

    expect(nextButton).not.toHaveAttribute('data-selected', 'true');
    expect(nextButton).toHaveAttribute('disabled');
  });

  test('has the correct role', () => {
    render(<Pagination totalItems={10} pageSize={10} />);

    const pagination = screen.getByRole('navigation');

    expect(pagination).toBeInTheDocument();
  });

  test('use arrow right navigation', () => {
    render(<Pagination totalItems={100} pageSize={10} defaultPage={5} />);

    const pageButton = screen.getByLabelText('Page 5');
    const nextPageButton = pageButton.nextElementSibling as HTMLElement;

    fireEvent.keyDown(pageButton, { key: 'ArrowRight' });

    expect(nextPageButton).toHaveFocus();
    expect(nextPageButton).toHaveAttribute('data-selected', 'false');
    expect(nextPageButton).toHaveTextContent('6');
  });

  test('use arrow left navigation', () => {
    render(<Pagination totalItems={100} pageSize={10} defaultPage={5} />);

    const pageButton = screen.getByLabelText('Page 5');
    const nextPageButton = pageButton.previousElementSibling as HTMLElement;

    fireEvent.keyDown(pageButton, { key: 'ArrowLeft' });

    expect(nextPageButton).toHaveFocus();
    expect(nextPageButton).toHaveAttribute('data-selected', 'false');
    expect(nextPageButton).toHaveTextContent('4');
  });

  test('use arrow end navigation', () => {
    render(<Pagination totalItems={100} pageSize={10} defaultPage={5} />);

    const pageButton = screen.getByLabelText('Page 5');
    const nextPageButton = screen.getByLabelText('Page next');

    fireEvent.keyDown(pageButton, { key: 'End' });

    expect(nextPageButton).toHaveFocus();
    expect(nextPageButton).toHaveTextContent('');
  });

  test('use arrow home navigation', () => {
    render(<Pagination totalItems={100} pageSize={10} defaultPage={9} />);

    const pageButton = screen.getByLabelText('Page 9');
    const previousPageButton = screen.getByLabelText('Page previous');

    fireEvent.keyDown(pageButton, { key: 'Home' });

    expect(previousPageButton).toHaveFocus();
    expect(previousPageButton).toHaveTextContent('');
  });

  test('onChange is called', () => {
    const handleChange = jest.fn();
    render(
      <Pagination
        totalItems={20}
        pageSize={10}
        defaultPage={1}
        onChange={handleChange}
      />
    );

    const page2Button = screen.getByLabelText('Page 2');

    fireEvent.click(page2Button);

    expect(handleChange).toHaveBeenCalledWith(2);
  });

  test('tabbing should select default page', async () => {
    render(<Pagination totalItems={20} pageSize={10} defaultPage={1} />);

    await act(() => userEvent.tab());

    expect(screen.getByLabelText('Page 1')).toHaveFocus();
  });

  it.each([
    ['Page 1', 1],
    ['Page previous', 2],
    ['Page previous', 3],
    ['Page previous', 4],
    ['Page previous', 5],
    ['Page previous', 8],
  ])(
    `should focus %s when using tab and default page is Page %i`,
    async (expected, page) => {
      render(<Pagination totalItems={50} pageSize={10} defaultPage={page} />);

      await act(() => userEvent.tab());

      expect(screen.getByLabelText(expected)).toHaveFocus();
    }
  );

  test('use control labels', () => {
    render(
      <Pagination
        totalItems={100}
        pageSize={10}
        defaultPage={5}
        controlLabels={['Previous', 'Next']}
      />
    );

    const previousButton = screen.getByLabelText('Page previous');
    const nextPageButton = screen.getByLabelText('Page next');

    expect(previousButton).toHaveTextContent('Previous');
    expect(nextPageButton).toHaveTextContent('Next');
  });
});
