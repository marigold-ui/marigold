/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import { BasicComponent } from './Multiselect2';

const meta = {
  title: 'Components/Multiselect',
  argTypes: {},
  args: {
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
  },
} satisfies Meta;

export default meta;

export const Basic: StoryObj<any> = {
  render: () => <BasicComponent />,
};
