/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import { Multiselect } from './Multiselect';

const meta = {
  title: 'Components/Multiselect',
  argTypes: {},
  args: {
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
  },
} satisfies Meta;

export default meta;

export const Basic: StoryObj<typeof Multiselect> = {
  render: () => {
    return (
      <>
        <Multiselect>
          <h1>anything </h1>
        </Multiselect>
      </>
    );
  },
};
