import { Badge, Inline, Select, VisuallyHidden } from '@marigold/components';

export default () => (
  <Select
    aria-label="Status"
    selectionMode="multiple"
    placeholder="Status"
    width={36}
    // Show the dimension label and a count, never the individual values, so the
    // trigger stays compact and the chosen values live in the applied-filter
    // tags. `count` reflects the real selection even with static options.
    renderValue={(_items, { count }) => (
      <>
        {/* Visible label and count badge, hidden from assistive tech, which */}
        {/* instead hears the dimension (aria-label) plus the summary below. */}
        <Inline space={2} alignY="center" aria-hidden="true">
          <span>Status</span>
          <Badge>{count}</Badge> {/* [!code highlight] */}
        </Inline>
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
