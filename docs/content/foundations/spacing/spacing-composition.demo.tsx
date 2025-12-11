import { venues } from '@/lib/data/venues';
import { Card, Columns } from '@marigold/components';

const VenueCard = ({ id }: { id: (typeof venues)[number]['id'] }) => {
  const venue = venues.find(venue => venue.id === id);

  return (
    <Card p={0}>
      <img className="overflow-hidden" src={venue?.image} alt={venue?.name} />
    </Card>
  );
};

export default () => {
  return (
    <Columns columns={[1, 1, 1]} space="group">
      <VenueCard id="1" />
      <VenueCard id="2" />
      <VenueCard id="3" />
    </Columns>
  );
};
