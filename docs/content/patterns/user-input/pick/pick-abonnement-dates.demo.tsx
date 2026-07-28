import { useState } from 'react';
import type { Key } from '@react-types/shared';
import {
  Button,
  Description,
  Panel,
  SectionMessage,
  SelectList,
  Stack,
  Text,
  TextValue,
} from '@marigold/components';

interface Concert {
  id: string;
  date: string;
  name: string;
  venue: string;
  soldOut?: boolean;
}

// One record per concert date. A season subscription is assembled from a few
// of these, so each date is a record the pick collects, not a filter criterion.
const concerts: Concert[] = [
  {
    id: 'oct-04',
    date: 'Sat 4 Oct',
    name: 'Opening Night: Brahms',
    venue: 'Grosser Saal, 7:30pm',
  },
  {
    id: 'oct-25',
    date: 'Sat 25 Oct',
    name: 'Schubert Quartet',
    venue: 'Kammermusiksaal, 8:00pm',
    soldOut: true,
  },
  {
    id: 'nov-15',
    date: 'Sat 15 Nov',
    name: 'Baroque by Candlelight',
    venue: 'Grosser Saal, 7:30pm',
  },
  {
    id: 'dec-06',
    date: 'Sat 6 Dec',
    name: 'Advent Choral',
    venue: 'Grosser Saal, 6:00pm',
  },
  {
    id: 'jan-17',
    date: 'Sat 17 Jan',
    name: 'New Year Strauss',
    venue: 'Grosser Saal, 7:30pm',
  },
  {
    id: 'feb-07',
    date: 'Sat 7 Feb',
    name: 'Mahler Symphony No. 4',
    venue: 'Grosser Saal, 8:00pm',
    soldOut: true,
  },
  {
    id: 'mar-14',
    date: 'Sat 14 Mar',
    name: 'Beethoven & Bartók',
    venue: 'Kammermusiksaal, 8:00pm',
  },
  {
    id: 'apr-18',
    date: 'Sat 18 Apr',
    name: 'Season Finale: Mozart Requiem',
    venue: 'Grosser Saal, 7:30pm',
  },
];

export default () => {
  const [selected, setSelected] = useState<Set<Key>>(() => new Set());
  const [subscribed, setSubscribed] = useState<Concert[] | null>(null);
  // Keep the commit active. An empty press reveals a message instead of committing.
  const [attemptedEmpty, setAttemptedEmpty] = useState(false);

  const count = selected.size;
  const chosen = concerts.filter(concert => selected.has(concert.id));

  return (
    <Panel aria-label="Season subscription">
      <Panel.Content>
        <Stack space={4}>
          {/* An empty press reveals this instead of committing. It announces
              itself to assistive tech and clears once a concert is chosen. */}
          <SectionMessage variant="error" open={attemptedEmpty && count === 0}>
            <SectionMessage.Title>No concerts chosen yet</SectionMessage.Title>
            <SectionMessage.Content>
              Choose at least one concert for your season pass.
            </SectionMessage.Content>
          </SectionMessage>

          {/* The whole pick lives on the page: no dialog, just the list and
              the commit. The list stays in a stretching Stack so it
              fills the panel; sold-out dates carry `disabled` so they can never
              be added; and changing the selection hides any earlier
              confirmation until the user commits again. */}
          <SelectList
            label="Choose your concerts"
            description="Add concerts to your season subscription. Sold-out dates can't be added."
            selectionMode="multiple"
            items={concerts}
            selectedKeys={selected}
            onChange={keys => {
              setSelected(new Set(keys));
              setSubscribed(null);
            }}
          >
            {(concert: Concert) => (
              <SelectList.Option
                id={concert.id}
                textValue={`${concert.date}, ${concert.name}`}
                disabled={concert.soldOut}
              >
                <TextValue>
                  {concert.date} · {concert.name}
                </TextValue>
                <Description>
                  {concert.soldOut
                    ? `${concert.venue} · Sold out`
                    : concert.venue}
                </Description>
              </SelectList.Option>
            )}
          </SelectList>

          {/* The count, the commit, and the result form a left-aligned group so
              they keep their natural width while the list above fills the
              panel. */}
          <Stack space={3} alignX="left">
            {/* The count and the shortfall stay in view next to the commit, so
                the minimum reads as a rule the user is working toward. */}
            <Text variant="muted" fontSize="sm">
              {count === 0
                ? 'No concerts chosen yet.'
                : `${count} concert${count === 1 ? '' : 's'} in your season pass.`}
            </Text>

            {/* Verb-only commit that stays active. The count lives in the line
                above, not in the label, and an empty press surfaces the message
                at the top of the panel. */}
            <Button
              variant="primary"
              onPress={() => {
                if (count === 0) {
                  setAttemptedEmpty(true);
                  return;
                }
                setSubscribed(chosen);
              }}
            >
              Add to subscription
            </Button>

            {subscribed && (
              <Text>
                Season pass ({subscribed.length}):{' '}
                {subscribed.map(concert => concert.date).join(', ')}
              </Text>
            )}
          </Stack>
        </Stack>
      </Panel.Content>
    </Panel>
  );
};
