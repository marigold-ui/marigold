import { amenitiesOptions } from '@/lib/data/venues';
import { Select } from '@marigold/components';

export default () => (
  <Select label="Amenities" width={72} selectionMode="multiple">
    {amenitiesOptions.map(option => (
      <Select.Option key={option} id={option}>
        {option}
      </Select.Option>
    ))}
  </Select>
);
