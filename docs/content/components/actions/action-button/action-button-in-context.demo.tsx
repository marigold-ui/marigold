import { ActionButton, SelectList, Text, Tooltip } from '@marigold/components';
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
        <Text slot="label">{venue.name}</Text>
        <Text slot="description">{venue.capacity}</Text>
        {/* The nested ActionButton inherits its size and visual weight from
            SelectList — no `variant` or `size` needed at the call site. */}
        <Tooltip.Trigger>
          <ActionButton
            aria-label={`Details about ${venue.name}`}
            onPress={() => alert(`Open details for ${venue.name}`)}
          >
            <Info />
          </ActionButton>
          <Tooltip>Venue details</Tooltip>
        </Tooltip.Trigger>
      </SelectList.Option>
    ))}
  </SelectList>
);
