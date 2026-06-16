import { Select, VisuallyHidden } from '@marigold/components';

export default () => (
  <Select
    aria-label="Status"
    selectionMode="multiple"
    placeholder="Status"
    width={36}
    // Show the dimension label and a count, never the individual values, so the
    // trigger stays compact and the values live in the applied-filter tags. The
    // placeholder shows the bare label ("Status") while nothing is selected;
    // `count` reflects the real selection even with static options.
    //
    // Accessibility: the visible "Status (n)" is aria-hidden and a
    // VisuallyHidden summary gives screen readers an unambiguous "n selected"
    // instead of a bare, unitless count. The dimension label itself comes from
    // `aria-label`, so the summary only needs to add the count.
    renderValue={(_items, { count }) => (
      <>
        <span aria-hidden="true">{`Status (${count})`}</span>
        <VisuallyHidden>{`${count} selected`}</VisuallyHidden>
      </>
    )}
  >
    <Select.Option id="active">Active</Select.Option>
    <Select.Option id="draft">Draft</Select.Option>
    <Select.Option id="archived">Archived</Select.Option>
    <Select.Option id="scheduled">Scheduled</Select.Option>
  </Select>
);
