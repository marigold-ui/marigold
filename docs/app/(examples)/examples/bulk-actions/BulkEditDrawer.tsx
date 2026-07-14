'use client';

import { type Event, eventCategories, eventVenues } from '@/lib/data/events';
import type { EventChanges } from '@/lib/data/events-query';
import { useState } from 'react';
import {
  Button,
  Checkbox,
  Drawer,
  NumberField,
  Select,
  Stack,
  Text,
} from '@marigold/components';
import { Pencil } from '@marigold/icons';
import { useBulkActions } from './hooks/useBulkActions';

// The multi-field bulk edit: an Edit action that opens a Drawer, keeping the
// table and the selected rows visible behind it. The selected records rarely
// agree, so the form is honest about it: a field is pre-filled only when
// every record shares the value, otherwise it stays empty with a "Multiple
// values" placeholder. Venue and category apply implicitly once changed;
// price is gated behind an explicit opt-in because an accidental overwrite is
// expensive.

/** The value shared by all records, or `undefined` when values differ. */
const sharedValue = <K extends keyof Event>(records: Event[], field: K) =>
  records.every(record => record[field] === records[0]?.[field])
    ? records[0]?.[field]
    : undefined;

const BulkEditForm = ({
  affected,
  onApply,
}: {
  affected: Event[];
  onApply: (changes: EventChanges) => void;
}) => {
  const sharedVenue = sharedValue(affected, 'venue');
  const sharedCategory = sharedValue(affected, 'category');
  const sharedPrice = sharedValue(affected, 'price');

  const [venue, setVenue] = useState(sharedVenue ?? null);
  const [category, setCategory] = useState(sharedCategory ?? null);
  const [editPrice, setEditPrice] = useState(false);
  const [price, setPrice] = useState(sharedPrice ?? NaN);

  // Implicit opt-in: a field is only applied when the user changed it.
  const changes: EventChanges = {};
  if (venue !== (sharedVenue ?? null) && venue) changes.venue = String(venue);
  if (category !== (sharedCategory ?? null) && category)
    changes.category = String(category);
  // Explicit opt-in: price only applies while its checkbox is checked.
  if (editPrice && !Number.isNaN(price)) changes.price = price;

  const changedFields = Object.keys(changes);
  const scope = affected.length === 1 ? '1 event' : `${affected.length} events`;

  return (
    <>
      <Drawer.Title>Edit {scope}</Drawer.Title>
      <Drawer.Content>
        <Stack space={4}>
          <Select
            label="Venue"
            // `null` is a real agreement here (drafts without a venue), not a
            // mixed state — say so instead of claiming "Multiple values".
            placeholder={
              sharedVenue === undefined
                ? 'Multiple values'
                : 'No venue assigned'
            }
            value={venue}
            onChange={key => setVenue(String(key))}
          >
            {eventVenues.map(candidate => (
              <Select.Option key={candidate} id={candidate}>
                {candidate}
              </Select.Option>
            ))}
          </Select>
          <Select
            label="Category"
            placeholder="Multiple values"
            value={category}
            onChange={key => setCategory(String(key))}
          >
            {eventCategories.map(candidate => (
              <Select.Option key={candidate} id={candidate}>
                {candidate}
              </Select.Option>
            ))}
          </Select>
          <Stack space={2}>
            <Checkbox
              label="Change ticket price"
              checked={editPrice}
              onChange={setEditPrice}
            />
            <NumberField
              label="Ticket price"
              disabled={!editPrice}
              value={price}
              onChange={setPrice}
              description={
                sharedPrice === undefined
                  ? 'Selected events currently have different prices.'
                  : undefined
              }
              formatOptions={{ style: 'currency', currency: 'EUR' }}
            />
          </Stack>
          <Text fontSize="sm" variant="muted" aria-live="polite">
            {changedFields.length === 0
              ? 'No changes yet. Untouched fields stay as they are.'
              : `Will update ${changedFields.join(' and ')} on all selected events.`}
          </Text>
        </Stack>
      </Drawer.Content>
      <Drawer.Actions>
        <Button slot="close">Cancel</Button>
        <Button
          slot="close"
          variant="primary"
          disabled={changedFields.length === 0}
          onPress={() => onApply(changes)}
        >
          Apply to {scope}
        </Button>
      </Drawer.Actions>
    </>
  );
};

export const BulkEditDrawer = ({
  affected,
  disabled,
}: {
  affected: Event[];
  /** Disabled while a sibling bulk operation runs (see BulkActionBar). */
  disabled?: boolean;
}) => {
  const actions = useBulkActions();

  return (
    <Drawer.Trigger>
      <Button disabled={disabled}>
        <Pencil />
        Edit
      </Button>
      <Drawer size="medium">
        {/* Re-key the form so it derives fresh values per selection. */}
        <BulkEditForm
          key={affected.map(event => event.id).join('-')}
          affected={affected}
          onApply={changes => actions.applyEdit(affected, changes)}
        />
      </Drawer>
    </Drawer.Trigger>
  );
};
