import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateField, DateFieldProps } from './DateField';

const meta = {
  title: 'Components/DateField',
} satisfies Meta<DateFieldProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    return <DateField readonly label="date field" />;
  },
};
