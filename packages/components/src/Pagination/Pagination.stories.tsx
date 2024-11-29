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
  render: args => {
    return <Pagination {...args} totalPages={10} page={5} />;
  },
};

export const Controlled: Story = {
  render: args => {
    const [basicPage, setBasicPage] = useState(1);

    return (
      <div>
        <h1>Pagination Example</h1>
        <p>Selected Page: {basicPage}</p>
        <Pagination
          {...args}
          page={basicPage}
          totalPages={10}
          onChange={setBasicPage}
        />
      </div>
    );
  },
};

export const OnePage: Story = {
  render: args => {
    return <Pagination {...args} totalPages={1} />;
  },
};

export const OneHundredPages: Story = {
  render: args => {
    return <Pagination {...args} totalPages={100} defaultPage={93} />;
  },
};
