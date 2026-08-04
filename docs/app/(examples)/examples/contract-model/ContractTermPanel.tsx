'use client';

import { type CalendarDate, parseDate } from '@internationalized/date';
import { useState } from 'react';
import {
  Columns,
  DatePicker,
  Description,
  Headline,
  Inline,
  NumberField,
  Panel,
  Stack,
  Switch,
  Text,
  Title,
} from '@marigold/components';

/**
 * The contract term of a subscription: a fixed first period, then an
 * indefinite one that runs until it is cancelled.
 *
 * This replaces a `<Card>` inside a `<Container>` inside a bordered `<div>` —
 * three nested surfaces for what is one topic. Here it is **one Panel with two
 * sub-groups**, each a `<Headline level={3} size="level-5">` over a `<Stack>`.
 * The Panel already draws the boundary; the headings do the grouping, and no
 * border has to be invented for either of them.
 *
 * The second sub-group is derived, read-only output rather than input. It does
 * not need its own surface to say so — it is text where the other group has
 * fields, and that difference is already legible.
 */
export const ContractTermPanel = () => {
  const [start, setStart] = useState<CalendarDate>(() =>
    parseDate('2026-09-01')
  );
  const [autoEnd, setAutoEnd] = useState(true);
  const [months, setMonths] = useState(12);
  const [manualEnd, setManualEnd] = useState<CalendarDate>(() =>
    parseDate('2027-08-31')
  );
  const [noticeDate, setNoticeDate] = useState<CalendarDate>(() =>
    parseDate('2027-05-31')
  );

  // With the switch on, the end of the fixed term follows start + months.
  const end = autoEnd ? start.add({ months }).subtract({ days: 1 }) : manualEnd;
  const indefiniteStart = end.add({ days: 1 });

  const formatDate = (date: CalendarDate) =>
    new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(
      date.toDate('UTC')
    );

  return (
    <Panel size="form">
      <Panel.Header>
        <Title>Contract term</Title>
        <Description>
          How long customers are committed, and when they have to cancel by.
        </Description>
      </Panel.Header>
      <Panel.Content>
        <Stack space="group">
          <Stack space="regular">
            <Headline level={3} size="level-5">
              Fixed term
            </Headline>
            <Text variant="muted" fontSize="sm">
              A fixed term may not exceed 24 months.
            </Text>

            <DatePicker
              label="Start of fixed term"
              description="The first day the contract is in force."
              value={start}
              onChange={value => value && setStart(value as CalendarDate)}
              width="fit"
              required
            />

            <Switch
              label="Calculate the end date"
              description="Derives the end from the start date and a number of months."
              selected={autoEnd}
              onChange={setAutoEnd}
            />

            <Inline space="related" alignY="top">
              {autoEnd && (
                <NumberField
                  label="Months"
                  description="1 to 24"
                  value={months}
                  onChange={setMonths}
                  minValue={1}
                  maxValue={24}
                  width={32}
                  required
                />
              )}
              <DatePicker
                label="End of fixed term"
                description={
                  autoEnd ? 'Derived from the start date.' : 'Set manually.'
                }
                value={end}
                onChange={value => value && setManualEnd(value as CalendarDate)}
                disabled={autoEnd}
                minValue={start}
                maxValue={start.add({ months: 24 })}
                width="fit"
                required
              />
            </Inline>

            <DatePicker
              label="Cancel by"
              description="After this date the contract rolls into the indefinite term."
              value={noticeDate}
              onChange={value => value && setNoticeDate(value as CalendarDate)}
              minValue={start}
              maxValue={end}
              width="fit"
              required
            />
          </Stack>

          <Stack space="regular">
            <Headline level={3} size="level-5">
              Indefinite term
            </Headline>
            <Text variant="muted" fontSize="sm">
              Once the fixed term ends the contract continues indefinitely. Both
              values below follow from the fixed term and cannot be set here.
            </Text>
            {/*
              Derived values as key/value rows, not as a nested Card. The same
              two-column shape the wizard's review step uses, so read-only
              summaries look the same wherever they appear.
            */}
            <Stack space="related">
              <Columns columns={[1, 1]} space="related">
                <Text variant="muted">Starts</Text>
                <Text weight="semibold">{formatDate(indefiniteStart)}</Text>
              </Columns>
              <Columns columns={[1, 1]} space="related">
                <Text variant="muted">Notice period</Text>
                <Text weight="semibold">1 month</Text>
              </Columns>
            </Stack>
          </Stack>
        </Stack>
      </Panel.Content>
    </Panel>
  );
};
