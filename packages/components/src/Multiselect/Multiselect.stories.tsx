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
        <Multiselect
          label="Animals"
          // disabledKeys={['snake']}
          defaultSelectedKeys={['cat', 'dog']}
        >
          <Multiselect.Item id="red-panda">Red Panda</Multiselect.Item>
          <Multiselect.Item id="cat">Cat</Multiselect.Item>
          <Multiselect.Item id="dog">Dog</Multiselect.Item>
          <Multiselect.Item id="aardvark">Aardvark</Multiselect.Item>
          <Multiselect.Item id="kangaroo">Kangaroo</Multiselect.Item>
          <Multiselect.Item id="snake">Snake</Multiselect.Item>
          <Multiselect.Item id="vegan">Vegan</Multiselect.Item>
          <Multiselect.Item id="margrita">Margrita</Multiselect.Item>
        </Multiselect>
      </>
    );
  },
};
