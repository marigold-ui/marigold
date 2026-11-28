// Each file in this example carries its own 'use client' so individual
// components can be copy-pasted into a project without tracing back to where
// the client boundary starts.
'use client';

import { CalendarDate } from '@internationalized/date';
import {
  Button,
  Checkbox,
  DateRangePicker,
  Description,
  Inline,
  Page,
  Panel,
  Stack,
  TextField,
  Title,
} from '@marigold/components';
import { Download } from '@marigold/icons';
import { ReportVenues } from './ReportVenues';

// The report covers the current quarter, worked out while rendering so the
// page never shows a period that has gone stale.
const currentQuarter = () => {
  const now = new Date();
  const year = now.getFullYear();
  const quarter = Math.floor(now.getMonth() / 3) + 1;
  const start = new CalendarDate(year, (quarter - 1) * 3 + 1, 1);
  const end = start.add({ months: 3 }).subtract({ days: 1 });
  return { name: `Q${quarter} ${year} venue report`, start, end };
};

// Scaffolding: the report around the pick. Static, so it stays out of the way
// of the pattern, which lives in ReportVenues and PickVenuesDialog.
const PickPage = () => {
  const period = currentQuarter();

  return (
    <Page>
      <Page.Header>
        <Title>{period.name}</Title>
        <Description>
          Booking activity and day rates for the venues in this report.
        </Description>
        <Button>
          <Download />
          Export CSV
        </Button>
      </Page.Header>
      <Panel>
        <Panel.Header>
          <Title>Report settings</Title>
        </Panel.Header>
        <Panel.Content>
          <Stack space="regular">
            <Inline space="regular" alignY="input">
              <TextField
                label="Report name"
                defaultValue={period.name}
                width={72}
              />
              <DateRangePicker
                label="Period"
                defaultValue={{ start: period.start, end: period.end }}
              />
            </Inline>
            <Checkbox label="Compare with previous period" />
          </Stack>
        </Panel.Content>
      </Panel>
      <ReportVenues />
    </Page>
  );
};

export default PickPage;
