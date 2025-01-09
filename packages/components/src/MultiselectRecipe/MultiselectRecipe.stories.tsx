/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import { MultiselectRecipe } from './Multiselect';

const meta = {
  title: 'Components/MultiselectRecipe',
  argTypes: {},
  args: {
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
  },
} satisfies Meta;

export default meta;

export const Basic: StoryObj<typeof MultiselectRecipe> = {
  render: () => {
    return (
      <>
        <MultiselectRecipe
          label="Animals"
          // disabledKeys={['snake']}
          defaultSelectedKeys={['cat', 'dog']}
        >
          <MultiselectRecipe.Item id="red-panda">
            Red Panda
          </MultiselectRecipe.Item>
          <MultiselectRecipe.Item id="cat">Cat</MultiselectRecipe.Item>
          <MultiselectRecipe.Item id="dog">Dog</MultiselectRecipe.Item>
          <MultiselectRecipe.Item id="aardvark">
            Aardvark
          </MultiselectRecipe.Item>
          <MultiselectRecipe.Item id="kangaroo">
            Kangaroo
          </MultiselectRecipe.Item>
          <MultiselectRecipe.Item id="snake">Snake</MultiselectRecipe.Item>
          <MultiselectRecipe.Item id="vegan">Vegan</MultiselectRecipe.Item>
          <MultiselectRecipe.Item id="margrita">
            Margrita
          </MultiselectRecipe.Item>
        </MultiselectRecipe>
      </>
    );
  },
};
