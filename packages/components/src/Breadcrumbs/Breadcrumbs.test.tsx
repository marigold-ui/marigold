import { screen } from '@testing-library/react';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbsItem } from './BreadcrumbsItem';

const theme: Theme = {
  name: 'test',
  components: {
    Breadcrumbs: {
      container: cva('flex flex-wrap items-center gap-2', {
        variants: {
          variant: {
            default: 'text-foreground',
          },
          size: {
            small: 'text-xs gap-1',
            default: 'text-sm gap-2',
            large: 'text-base gap-3',
          },
        },
      }),
      item: cva('inline-flex items-center gap-1 whitespace-nowrap'),
      link: cva('hover:underline text-foreground'),
      current: cva('font-medium'),
      ellipsisButton: cva('inline-flex items-center px-2 py-1 cursor-pointer'),
      ellipsisList: cva(
        'absolute z-10 mt-2 min-w-max rounded border bg-white p-1 text-sm shadow'
      ),
      ellipsisItem: cva('px-3 py-1 hover:bg-gray-100'),
    },
  },
};

const { render } = setup({ theme });

test('renders breadcrumb items correctly', () => {
  render(
    <ThemeProvider theme={theme}>
      <Breadcrumbs>
        <BreadcrumbsItem>Home</BreadcrumbsItem>
        <BreadcrumbsItem>Breadcrumb1</BreadcrumbsItem>
        <BreadcrumbsItem>Breadcrumb2</BreadcrumbsItem>
      </Breadcrumbs>
    </ThemeProvider>
  );

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Breadcrumb1')).toBeInTheDocument();
  expect(screen.getByText('Breadcrumb2')).toBeInTheDocument();
});

test('collapses breadcrumbs for too many items', () => {
  render(
    <ThemeProvider theme={theme}>
      <Breadcrumbs maxVisibleItems={3}>
        <BreadcrumbsItem>Home</BreadcrumbsItem>
        <BreadcrumbsItem>Breadcrumb1</BreadcrumbsItem>
        <BreadcrumbsItem>Breadcrumb2</BreadcrumbsItem>
        <BreadcrumbsItem>Breadcrumb3</BreadcrumbsItem>
        <BreadcrumbsItem>Breadcrumb4</BreadcrumbsItem>
      </Breadcrumbs>
    </ThemeProvider>
  );

  const ellipsis = screen.getByText('...');
  expect(ellipsis).toBeInTheDocument();

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Breadcrumb4')).toBeInTheDocument();
});

test('handles dynamic children correctly with links', () => {
  render(
    <ThemeProvider theme={theme}>
      <Breadcrumbs>
        <BreadcrumbsItem href="https://example.com">Home</BreadcrumbsItem>
        <BreadcrumbsItem>Breadcrumb1</BreadcrumbsItem>
      </Breadcrumbs>
    </ThemeProvider>
  );

  const link = screen.getByText('Home');
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', 'https://example.com');
});

test('ignores null, undefined, and boolean children', () => {
  render(
    <ThemeProvider theme={theme}>
      <Breadcrumbs>
        {null}
        {undefined}
        {false}
        <BreadcrumbsItem>Visible</BreadcrumbsItem>
      </Breadcrumbs>
    </ThemeProvider>
  );
  expect(screen.getByText('Visible')).toBeInTheDocument();
});

test('renders custom React element as breadcrumb', () => {
  render(
    <ThemeProvider theme={theme}>
      <Breadcrumbs>
        <BreadcrumbsItem>
          <span data-testid="custom">Custom</span>
        </BreadcrumbsItem>
      </Breadcrumbs>
    </ThemeProvider>
  );
  expect(screen.getByTestId('custom')).toBeInTheDocument();
  expect(screen.getByText('Custom')).toBeInTheDocument();
});

test('renders chevron separators', () => {
  render(
    <ThemeProvider theme={theme}>
      <Breadcrumbs separatorType="chevron">
        <BreadcrumbsItem>Home</BreadcrumbsItem>
        <BreadcrumbsItem>Breadcrumb1</BreadcrumbsItem>
        <BreadcrumbsItem>Breadcrumb2</BreadcrumbsItem>
      </Breadcrumbs>
    </ThemeProvider>
  );
  const chevrons = document.querySelectorAll('svg[aria-hidden="true"]');
  expect(chevrons.length).toBe(2);
});

test('renders slash separators', () => {
  render(
    <ThemeProvider theme={theme}>
      <Breadcrumbs separatorType="slash">
        <BreadcrumbsItem>Home</BreadcrumbsItem>
        <BreadcrumbsItem>Breadcrumb1</BreadcrumbsItem>
        <BreadcrumbsItem>Breadcrumb2</BreadcrumbsItem>
      </Breadcrumbs>
    </ThemeProvider>
  );
  const slashes = screen.getAllByText('/');
  expect(slashes.length).toBe(2);
});

test('collapses breadcrumbs with links for too many items', () => {
  render(
    <ThemeProvider theme={theme}>
      <Breadcrumbs maxVisibleItems={3}>
        <BreadcrumbsItem href="/home">Home</BreadcrumbsItem>
        <BreadcrumbsItem href="/b1">Breadcrumb1</BreadcrumbsItem>
        <BreadcrumbsItem href="/b2">Breadcrumb2</BreadcrumbsItem>
        <BreadcrumbsItem href="/b3">Breadcrumb3</BreadcrumbsItem>
        <BreadcrumbsItem href="/b4">Breadcrumb4</BreadcrumbsItem>
      </Breadcrumbs>
    </ThemeProvider>
  );
  const ellipsis = screen.getByText('...');
  expect(ellipsis).toBeInTheDocument();
  expect(screen.getByText('Home')).toHaveAttribute('href', '/home');
  expect(screen.getByText('Breadcrumb4')).toHaveAttribute('href', '/b4');
});
