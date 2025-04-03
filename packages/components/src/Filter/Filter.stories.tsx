import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../Checkbox';
import { Select } from '../Select';
import { Slider } from '../Slider';
import { Filter, useFilters } from './Filter';

const meta = {
  title: 'Components/Filter',
  component: Filter,
  argTypes: {},
  args: {},
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

// Display some resulst and use filter from filter context to filter them
const Results = () => {
  const filterCtx = useFilters();

  return null;
};

export const Basic: Story = {
  render: args => (
    <Filter.Provider {...args}>
      <Filter.Button />
      <Filter>
        <Filter.Title>Aka Drawer Title</Filter.Title>
        <Filter.Content>
          <Slider
            formatOptions={{ style: 'currency', currency: 'EUR' }}
            minValue={10}
            maxValue={140}
            defaultValue={[30, 60]}
            thumbLabels={['min', 'max']}
          >
            Price
          </Slider>
          <Select label="Category">
            <Select.Option id="all">All</Select.Option>
            <Select.Option id="classic">Classic</Select.Option>
            <Select.Option id="rock">Rock</Select.Option>
            <Select.Option id="pop">Pop</Select.Option>
            <Select.Option id="jazz">Jazz</Select.Option>
          </Select>
          <Checkbox.Group label="Amenities">
            <Checkbox value="fast-lane">Fast Lane</Checkbox>
            <Checkbox value="parking">VIP Parking</Checkbox>
          </Checkbox.Group>
        </Filter.Content>
      </Filter>
      <Filter.List />
      <Results />
    </Filter.Provider>
  ),
};
