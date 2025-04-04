import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../Checkbox';
import { Select } from '../Select';
import { Slider } from '../Slider';
import { Tag } from '../TagGroup';
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
  console.log(filterCtx);
  return null;
};

export const Compound: Story = {
  render: args => (
    <Filter.Provider {...args}>
      <Filter.Button />
      <Filter>
        {({ filter }) => (
          <>
            <Filter.Title>Aka Drawer Title</Filter.Title>
            <Filter.Content>
              <Slider
                formatOptions={{ style: 'currency', currency: 'EUR' }}
                minValue={10}
                maxValue={140}
                value={filter.something}
                onChange={filter.somethingChange()}
                thumbLabels={['min', 'max']}
              >
                Price
              </Slider>
              <Select
                label="Category"
                selectedKey={filter.other}
                onChange={filter.otherChange()}
              >
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
          </>
        )}
      </Filter>
      <Filter.List />
      <Results />
    </Filter.Provider>
  ),
};

/**
 * Use `nuqs` to have loose coupling between the elements
 */
const AppliedFilters = () => {
  const { filters } = useFilters();
  return (
    <Tag.Group variant="filter">
      {filters => <Tag>filter.blabla</Tag>}
    </Tag.Group>
  );
};

const FilterConfiguration = () => {
  {
    /* uses `useFilters` hook to "bind" the form to the URL */
  }
  const { filters } = useFilters();

  return (
    <Drawer.Trigger>
      <Button>Configure Filter</Button>
      <Drawer>
        <Drawer.Title>Filter</Drawer.Title>
        <Drawer.Content>
          <Stack space={8}>
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
          </Stack>
        </Drawer.Content>
        <Drawer.Actions>
          <Button slot="close">Close</Button>
          <Button variant="primary">Apply</Button>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  );
};

export const Hooks: Story = {
  render: () => (
    <div>
      {/* somwhere on the page doesn't matter */}
      <AppliedFilters />
      {/* somwhere on the page doesn't matter */}
      <FilterConfiguration />
      {/* somwhere on the page doesn't matter */}
      <Results />
    </div>
  ),
};
