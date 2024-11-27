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
    const [basicPage, setBasicPage] = useState(1);

    return (
      <div>
        <h1>Pagination Example</h1>
        <p>Selected Page: {basicPage}</p>
        <Pagination
          page={basicPage}
          totalPages={10}
          onPageChange={setBasicPage}
        />
      </div>
    );
  },
};
