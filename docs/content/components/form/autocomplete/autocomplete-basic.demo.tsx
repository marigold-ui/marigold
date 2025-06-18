import { Autocomplete } from '@marigold/components';

export default () => {
  return (
    <Autocomplete
      label="Search support tickets:"
      description="Type to search your recent support tickets"
    >
      <Autocomplete.Option id="ticket-1001">
        [#1001] Login issues
      </Autocomplete.Option>
      <Autocomplete.Option id="ticket-1002">
        [#1002] Payment failed
      </Autocomplete.Option>
      <Autocomplete.Option id="ticket-1003">
        [#1003] Account verification
      </Autocomplete.Option>
      <Autocomplete.Option id="ticket-1004">
        [#1004] Feature request
      </Autocomplete.Option>
      <Autocomplete.Option id="ticket-1005">
        [#1005] Password reset
      </Autocomplete.Option>
      <Autocomplete.Option id="ticket-1006">
        [#1006] API integration
      </Autocomplete.Option>
      <Autocomplete.Option id="ticket-1007">
        [#1007] Billing inquiry
      </Autocomplete.Option>
      <Autocomplete.Option id="ticket-1008">
        [#1008] Mobile app crash
      </Autocomplete.Option>
    </Autocomplete>
  );
};
