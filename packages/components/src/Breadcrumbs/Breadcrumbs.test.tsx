import { screen } from '@testing-library/react';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { Breadcrumb } from './Breadcrumb';
import { Breadcrumbs } from './Breadcrumbs';

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
        <Breadcrumb>Home</Breadcrumb>
        <Breadcrumb>Breadcrumb1</Breadcrumb>
        <Breadcrumb>Breadcrumb2</Breadcrumb>
      </Breadcrumbs>
    </ThemeProvider>
  );

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Breadcrumb1')).toBeInTheDocument();
  expect(screen.getByText('Breadcrumb2')).toBeInTheDocument();
});

test('renders breadcrumb with slash separators', () => {
  render(
    <ThemeProvider theme={theme}>
      <Breadcrumbs separatorType="slash">
        <Breadcrumb>Home</Breadcrumb>
        <Breadcrumb>Breadcrumb1</Breadcrumb>
        <Breadcrumb>Breadcrumb2</Breadcrumb>
      </Breadcrumbs>
    </ThemeProvider>
  );

  const slashes = screen.getAllByText('/');
  expect(slashes.length).toBe(2);
});

test('collapses breadcrumbs when maxVisibleItems is set', () => {
  render(
    <ThemeProvider theme={theme}>
      <Breadcrumbs maxVisibleItems={3}>
        <Breadcrumb>Home</Breadcrumb>
        <Breadcrumb>Breadcrumb1</Breadcrumb>
        <Breadcrumb>Breadcrumb2</Breadcrumb>
        <Breadcrumb>Breadcrumb3</Breadcrumb>
        <Breadcrumb>Breadcrumb4</Breadcrumb>
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
        <Breadcrumb href="https://example.com">Home</Breadcrumb>
        <Breadcrumb>Breadcrumb1</Breadcrumb>
      </Breadcrumbs>
    </ThemeProvider>
  );

  const link = screen.getByText('Home');
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', 'https://example.com');
});

test('accepts a variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Breadcrumbs size="large" variant="default">
        <Breadcrumb>Home</Breadcrumb>
      </Breadcrumbs>
    </ThemeProvider>
  );

  const breadcrumb = screen.getByText('Home');
  expect(breadcrumb.className).toMatchInlineSnapshot(
    `"hover:underline text-foreground"`
  );
});
