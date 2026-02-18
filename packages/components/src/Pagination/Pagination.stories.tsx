import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Inline } from '../Inline/Inline';
import { Select } from '../Select/Select';
import { Split } from '../Split/Split';
import { Stack } from '../Stack/Stack';
import { Table } from '../Table/Table';
import { Text } from '../Text/Text';
import { Pagination, PaginationProps } from './Pagination';

const meta = preview.meta({
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    totalItems: {
      control: {
        type: 'number',
      },
      description: 'The number of total items.',
    },
    pageSize: {
      control: {
        type: 'number',
      },
      description: 'The number of items per page.',
    },
    controlLabels: {
      control: 'object',
      description: 'Labels for the pagination controls.',
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: 'e.g. ["Previous", "Next"]' },
      },
    },
    defaultPage: {
      control: {
        type: 'number',
      },
      description: 'The initial page. (uncontrolled)',
    },
  },
  args: {
    totalItems: 100,
    pageSize: 10,
    defaultPage: undefined,
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Select an item from pagination', async () => {
      const pageButton = canvas.getByLabelText('Page 2');

      await userEvent.click(pageButton);

      await expect(pageButton).toHaveAttribute('data-selected', 'true');
    });

    await step('Click on the next button', async () => {
      const nextButton = canvas.getByLabelText('Page next');

      await userEvent.click(nextButton);

      await expect(canvas.getByLabelText('Page 3')).toHaveAttribute(
        'data-selected',
        'true'
      );
    });

    await step('Click on the previous button', async () => {
      const prevButton = canvas.getByLabelText('Page previous');

      await userEvent.click(prevButton);

      await expect(canvas.getByLabelText('Page 2')).toHaveAttribute(
        'data-selected',
        'true'
      );
    });

    await step('use arrow right navigation', async () => {
      const pageButton = canvas.getByLabelText('Page 2');
      const nextPageButton = pageButton.nextElementSibling as HTMLElement;

      await userEvent.tab();
      await userEvent.keyboard('{ArrowRight}');

      await expect(nextPageButton).toHaveFocus();
      await expect(nextPageButton).toHaveTextContent('3');
    });

    await step('use arrow left navigation', async () => {
      const pageButton = canvas.getByLabelText('Page 3');
      const nextPageButton = pageButton.previousElementSibling as HTMLElement;

      await userEvent.keyboard('{ArrowLeft}');

      await expect(nextPageButton).toHaveFocus();
      await expect(nextPageButton).toHaveTextContent('2');
    });

    await step('blur to unfocus pagination', async () => {
      const pageButton = canvas.getByLabelText('Page 2');

      pageButton.blur();

      await expect(pageButton).not.toHaveFocus();
      await expect(pageButton).toHaveAttribute('data-selected', 'true');
    });
  },
});

export const Controlled = meta.story({
  render: ({ totalItems, pageSize, ...rest }: Partial<PaginationProps>) => {
    const [basicPage, setBasicPage] = useState(1);

    return (
      <div>
        <h1>Pagination Example</h1>
        <p>Selected Page: {basicPage}</p>
        <Pagination
          {...rest}
          totalItems={totalItems!}
          pageSize={pageSize!}
          page={basicPage}
          onChange={setBasicPage}
        />
      </div>
    );
  },
});

export const OnePage = meta.story({
  parameters: {
    controls: { exclude: ['totalItems', 'pageSize'] },
  },
  args: {
    totalItems: 10,
    pageSize: 10,
  },
});

export const OneHundredPages = meta.story({
  args: {
    totalItems: 1000,
    defaultPage: 93,
  },
});

export const NoData = meta.story({
  parameters: {
    controls: { exclude: ['totalItems', 'pageSize'] },
  },
  args: {
    totalItems: 0,
    pageSize: 10,
  },
});

export const FullScreenSize = meta.story({
  render: ({ pageSize, ...rest }: Partial<PaginationProps>) => (
    <div className="w-[900px]">
      <Inline alignY="center">
        <Text fontSize="sm">Showing "visible results" of "total results"</Text>
        <Split />
        <Pagination
          {...rest}
          totalItems={1000}
          defaultPage={93}
          pageSize={pageSize!}
        />
        <Split />
        <Select
          width={40}
          aria-label="Page size"
          defaultValue="10"
          label="Results per page"
        >
          <Select.Option id="10">10</Select.Option>
          <Select.Option id="20">20</Select.Option>
          <Select.Option id="30">30</Select.Option>
        </Select>
      </Inline>
    </div>
  ),
});

export const WithTable = meta.story({
  parameters: {
    controls: { exclude: ['totalItems', 'pageSize'] },
  },
  render: args => {
    interface User {
      id: number;
      name: string;
      email: string;
      role: string;
      status: 'active' | 'inactive';
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const mockData: User[] = Array.from({ length: 55 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? 'Admin' : 'User',
      status: i % 4 === 0 ? 'inactive' : 'active',
    }));

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, mockData.length);
    const currentData = mockData.slice(startIndex, endIndex);

    return (
      <Stack space={4}>
        <Table aria-label="label" {...args}>
          <Table.Header>
            <Table.Column>ID</Table.Column>
            <Table.Column rowHeader>Name</Table.Column>
            <Table.Column>Email</Table.Column>
            <Table.Column>Role</Table.Column>
            <Table.Column>Status</Table.Column>
          </Table.Header>
          <Table.Body items={currentData}>
            {item => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>{item.role}</Table.Cell>
                <Table.Cell>{item.status}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <Inline alignY="center" alignX="between">
          <Text fontSize="sm">
            Showing {startIndex + 1} - {endIndex} of {mockData.length}
          </Text>
          <Pagination
            {...args}
            totalItems={mockData.length}
            pageSize={pageSize}
            page={currentPage}
            onChange={setCurrentPage}
          />
          <Inline alignY="center" space={4}>
            <Text fontSize="sm">Results per page</Text>
            <Select
              width={'fit'}
              value={pageSize.toString()}
              onChange={val => setPageSize(parseInt(`${val}`))}
            >
              <Select.Option id="10">10</Select.Option>
              <Select.Option id="20">20</Select.Option>
              <Select.Option id="30">30</Select.Option>
            </Select>
          </Inline>
        </Inline>
      </Stack>
    );
  },
});

export const WithButtonLabels = meta.story({
  parameters: {
    controls: { exclude: ['totalItems', 'pageSize'] },
  },
  args: {
    totalItems: 100,
    defaultPage: 5,
    controlLabels: ['Previous', 'Next'],
  },
});

export const DisabledPreviousButton = meta.story({
  tags: ['component-test'],
  args: {
    defaultPage: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const previousButton = canvas.getByLabelText('Page previous');

    await userEvent.click(previousButton);

    await expect(previousButton).not.toHaveAttribute('data-selected', 'true');
    await expect(previousButton).toHaveAttribute('disabled');
  },
});

export const DisabledNextButton = meta.story({
  tags: ['component-test'],
  args: {
    defaultPage: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nextButton = canvas.getByLabelText('Page next');

    await userEvent.click(nextButton);

    await expect(nextButton).not.toHaveAttribute('data-selected', 'true');
    await expect(nextButton).toHaveAttribute('disabled');
  },
});

export const UseOnChange = meta.story({
  tags: ['component-test'],
  args: {
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const page2Button = canvas.getByLabelText('Page 2');

    await userEvent.click(page2Button);

    await expect(args.onChange).toHaveBeenCalledWith(2);
  },
});
