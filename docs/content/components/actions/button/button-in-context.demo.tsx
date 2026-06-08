import {
  Button,
  Description,
  SelectList,
  Stack,
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
        <div className="col-start-2 row-span-2 min-w-0">
          <Stack space="tight">
            <TextValue>{venue.name}</TextValue>
            <Description>{venue.capacity}</Description>
          </Stack>
        </div>
        <div className="col-start-3 row-span-2 flex items-center justify-end self-center">
          <Tooltip.Trigger>
            <Button
              aria-label={`Details about ${venue.name}`}
              onPress={() => alert(`Open details for ${venue.name}`)}
            >
              <Info />
            </Button>
            <Tooltip>Venue details</Tooltip>
          </Tooltip.Trigger>
        </div>
      </SelectList.Option>
    ))}
  </SelectList>
);
