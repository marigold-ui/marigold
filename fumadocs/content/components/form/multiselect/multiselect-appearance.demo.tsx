import { Multiselect } from '@marigold/components';

const ticketCategories = [
  { value: 'general', label: 'General Admission' },
  { value: 'vip', label: 'VIP Experience' },
  { value: 'backstage', label: 'Backstage Pass' },
  { value: 'early', label: 'Early Bird Special' },
];

export default () => (
  <div className="h-[200px] w-full">
    <Multiselect
      label="Ticket Categories"
      items={ticketCategories}
      placeholder="Select categories..."
      isOptionDisabled={(item: { value: string }) => item.value === 'backstage'}
    />
  </div>
);
