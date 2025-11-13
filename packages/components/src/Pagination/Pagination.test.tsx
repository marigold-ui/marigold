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
          class="h-screen p-6"
        >
          <div
            id="overlay-container"
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
                class="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:util-focus-ring outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-hover hover:text-hover-foreground cursor-pointer disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground h-9 py-2 gap-1 px-2.5 has-[+_[hidden]]:mr-0"
                data-react-aria-pressable="true"
                disabled=""
                type="button"
              >
                <svg
                  class="shrink-0 h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m15 18-6-6 6-6"
                  />
                </svg>
              </button>
              <div
                class="flex items-center justify-center space-x-2"
              >
                <button
                  aria-current="page"
                  aria-label="Page 1"
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:util-focus-ring outline-none disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-hover hover:text-hover-foreground cursor-pointer bg-background size-9 data-[selected=true]:border data-[selected=true]:border-input data-[selected=true]:shadow-xs"
                  data-react-aria-pressable="true"
                  data-selected="true"
                  tabindex="0"
                  type="button"
                >
                  1
                </button>
                <button
                  aria-label="Page 2"
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:util-focus-ring outline-none disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-hover hover:text-hover-foreground cursor-pointer bg-background size-9 data-[selected=true]:border data-[selected=true]:border-input data-[selected=true]:shadow-xs"
                  data-react-aria-pressable="true"
                  data-selected="false"
                  tabindex="-1"
                  type="button"
                >
                  2
                </button>
              </div>
              <button
                aria-label="Page next"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:util-focus-ring outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-hover hover:text-hover-foreground cursor-pointer disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground h-9 py-2 gap-1 px-2.5 has-[+_[hidden]]:mr-0"
                data-react-aria-pressable="true"
                tabindex="0"
                type="button"
              >
                <svg
                  class="shrink-0 h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m9 18 6-6-6-6"
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
          class="h-screen p-6"
        >
          <div
            id="overlay-container"
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
                class="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:util-focus-ring outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-hover hover:text-hover-foreground cursor-pointer disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground h-9 py-2 gap-1 px-2.5 has-[+_[hidden]]:mr-0"
                data-react-aria-pressable="true"
                disabled=""
                type="button"
              >
                <svg
                  class="shrink-0 h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m15 18-6-6 6-6"
                  />
                </svg>
              </button>
              <div
                class="flex items-center justify-center space-x-2"
              >
                <button
                  aria-label="Page 1"
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:util-focus-ring outline-none disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-hover hover:text-hover-foreground cursor-pointer bg-background size-9 data-[selected=true]:border data-[selected=true]:border-input data-[selected=true]:shadow-xs"
                  data-react-aria-pressable="true"
                  disabled=""
                  tabindex="-1"
                  type="button"
                >
                  1
                </button>
              </div>
              <button
                aria-label="Page next"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:util-focus-ring outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-hover hover:text-hover-foreground cursor-pointer disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground h-9 py-2 gap-1 px-2.5 has-[+_[hidden]]:mr-0"
                data-react-aria-pressable="true"
                disabled=""
                type="button"
              >
                <svg
                  class="shrink-0 h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m9 18 6-6-6-6"
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
