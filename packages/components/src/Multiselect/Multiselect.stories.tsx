/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import { Multiselect2 } from './Multiselect2';

const meta = {
  title: 'Components/Multiselect',
  argTypes: {},
  args: {
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
  },
} satisfies Meta;

export default meta;

const drinks = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const Basic: StoryObj<any> = {
  render: () => (
    <Multiselect2 label="Label" placeholder="Enter value" items={drinks} />
  ),
};
