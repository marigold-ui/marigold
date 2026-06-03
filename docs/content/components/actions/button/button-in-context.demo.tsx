import {
  Button,
  Description,
  SelectList,
  TextValue,
  Tooltip,
} from '@marigold/components';
import { Info } from '@marigold/icons';

const venues = [
  {
    id: 'main-hall',
    name: 'Main Hall',
    capacity: '1,200 seats',
  },
  {
    id: 'studio',
    name: 'Studio',
    capacity: '180 seats',
  },
  {
    id: 'garden',
    name: 'Garden Stage',
    capacity: 'Up to 500 standing',
  },
];

export default () => (
  <SelectList
    aria-label="Choose a venue"
    selectionMode="single"
    defaultSelectedKeys={['main-hall']}
  >
    {venues.map(venue => (
      <SelectList.Option key={venue.id} id={venue.id} textValue={venue.name}>
        <TextValue>{venue.name}</TextValue>
        <Description>{venue.capacity}</Description>
        {/* The nested Button inherits its size and visual weight from
            SelectList, so no `variant` or `size` is needed at the call site. */}
        <Tooltip.Trigger>
          <Button
            aria-label={`Details about ${venue.name}`}
            onPress={() => alert(`Open details for ${venue.name}`)}
          >
            <Info />
          </Button>
          <Tooltip>Venue details</Tooltip>
        </Tooltip.Trigger>
      </SelectList.Option>
    ))}
  </SelectList>
);
