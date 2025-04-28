import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MockInstance, vi } from 'vitest';
import * as stories from './Pagination.stories';

const { Basic, WithButtonLabels } = composeStories(stories);

let warnMock: MockInstance;

beforeEach(() => {
  warnMock = vi.spyOn(console, 'warn').mockImplementation(() => null);
});

afterEach(() => {
  warnMock.mockRestore();
});

describe('Pagination tests', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<Basic totalItems={20} pageSize={10} />);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="font-body text-text-base text-[13px] leading-normal bg-bg-surface"
        >
          <div
            class="h-screen p-6"
          >
            <nav
              aria-label="Page 1 of 2"
              class="flex items-center justify-center space-x-2"
            >
              <span
                data-focus-scope-start="true"
                hidden=""
              />
              <button
                aria-label="Page previous"
                class="border-border-base text-text-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid outline-outline-focus focus:outline-2 focus:outline-offset-1 h-auto border-none bg-transparent flex h-8! w-8 items-center justify-center wrap data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-text-base data-[selected=true]:font-bold hover:bg-gray-100"
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
                  class="border-border-base text-text-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid outline-outline-focus focus:outline-2 focus:outline-offset-1 h-auto border-none bg-transparent flex h-8! w-8 items-center justify-center wrap data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-text-base data-[selected=true]:font-bold hover:bg-gray-100"
                  data-selected="true"
                  tabindex="0"
                  type="button"
                >
                  1
                </button>
                <button
                  aria-label="Page 2"
                  class="border-border-base text-text-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid outline-outline-focus focus:outline-2 focus:outline-offset-1 h-auto border-none bg-transparent flex h-8! w-8 items-center justify-center wrap data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-text-base data-[selected=true]:font-bold hover:bg-gray-100"
                  data-selected="false"
                  tabindex="-1"
                  type="button"
                >
                  2
                </button>
              </div>
              <button
                aria-label="Page next"
                class="border-border-base text-text-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid outline-outline-focus focus:outline-2 focus:outline-offset-1 h-auto border-none bg-transparent flex h-8! w-8 items-center justify-center wrap data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-text-base data-[selected=true]:font-bold hover:bg-gray-100"
                tabindex="0"
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
              <span
                data-focus-scope-end="true"
                hidden=""
              />
            </nav>
          </div>
        </div>
      </DocumentFragment>
    `);
  });

  test('renders correctly when no data is available', () => {
    const { asFragment } = render(<Basic totalItems={0} pageSize={10} />);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="font-body text-text-base text-[13px] leading-normal bg-bg-surface"
        >
          <div
            class="h-screen p-6"
          >
            <nav
              aria-label="Page 1 of 0"
              class="flex items-center justify-center space-x-2"
            >
              <span
                data-focus-scope-start="true"
                hidden=""
              />
              <button
                aria-label="Page previous"
                class="border-border-base text-text-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid outline-outline-focus focus:outline-2 focus:outline-offset-1 h-auto border-none bg-transparent flex h-8! w-8 items-center justify-center wrap data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-text-base data-[selected=true]:font-bold hover:bg-gray-100"
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
                  class="border-border-base text-text-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid outline-outline-focus focus:outline-2 focus:outline-offset-1 h-auto border-none bg-transparent flex h-8! w-8 items-center justify-center wrap data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-text-base data-[selected=true]:font-bold hover:bg-gray-100"
                  disabled=""
                  tabindex="-1"
                  type="button"
                >
                  1
                </button>
              </div>
              <button
                aria-label="Page next"
                class="border-border-base text-text-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid outline-outline-focus focus:outline-2 focus:outline-offset-1 h-auto border-none bg-transparent flex h-8! w-8 items-center justify-center wrap data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-text-base data-[selected=true]:font-bold hover:bg-gray-100"
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
              <span
                data-focus-scope-end="true"
                hidden=""
              />
            </nav>
          </div>
        </div>
      </DocumentFragment>
    `);
  });

  test('uses base classnames', () => {
    render(<Basic />);
    const pagination = screen.getByRole('navigation');
    const button = screen.getAllByRole('button');

    expect(pagination).toHaveClass(
      'flex items-center justify-center space-x-2'
    );
    expect(button[0]).toHaveClass(
      'border-border-base text-text-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed disabled:border disabled:border-solid outline-outline-focus focus:outline-2 focus:outline-offset-1 h-auto border-none bg-transparent flex h-8! w-8 items-center justify-center wrap data-[selected=true]:border-0 data-[selected=true]:border-b-2 data-[selected=true]:border-solid data-[selected=true]:border-b-border-selected data-[selected=true]:bg-none data-[selected=true]:text-text-base data-[selected=true]:font-bold hover:bg-gray-100'
    );
  });

  test('has the correct role', () => {
    render(<Basic />);

    const pagination = screen.getByRole('navigation');

    expect(pagination).toBeInTheDocument();
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
      render(<Basic totalItems={50} pageSize={10} defaultPage={page} />);

      await userEvent.tab();

      expect(screen.getByLabelText(expected)).toHaveFocus();
    }
  );

  test('use control labels', async () => {
    render(<WithButtonLabels />);

    const previousButton = screen.getByLabelText('Page previous');
    const nextPageButton = screen.getByLabelText('Page next');

    expect(previousButton).toHaveTextContent('Previous');
    expect(nextPageButton).toHaveTextContent('Next');
  });
});
