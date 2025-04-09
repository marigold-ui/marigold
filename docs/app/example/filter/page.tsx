import { venueTypes } from '@/lib/data/venues';
import { parseAsJson, useQueryState } from 'nuqs';
import { z } from 'zod';

const schema = z.object({
  type: z.enum(venueTypes),
  capacity: z.number(),
  price: z.number(),
});

const useFilters = () => useQueryState('filter', parseAsJson(schema.parse));

const FilterPage = () => {
  const [] = useFilters();

  return <div>hello</div>;
};

export default FilterPage;
