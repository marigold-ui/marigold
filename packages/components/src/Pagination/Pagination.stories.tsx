import { useState } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {},
  args: {},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const totalItems = 100; // Total number of items
    const pageSize = 10; // Items per page
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <div>
        <h1>Pagination Example</h1>
        <p>Selected Page: {currentPage}</p>
        <Pagination
          totalItems={totalItems}
          pageSize={pageSize}
          onChange={setCurrentPage}
        />
      </div>
    );
  },
};
