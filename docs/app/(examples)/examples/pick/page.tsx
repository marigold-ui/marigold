// Each file in this example carries its own 'use client' so individual
// components can be copy-pasted into a project without tracing back to where
// the client boundary starts.
'use client';

import { Description, Page, Title } from '@marigold/components';
import { ReportVenues } from './ReportVenues';

// The report covers next summer's run, so the availability column always
// refers to dates ahead. Derived from today so the example never goes stale.
const now = new Date();
const season = now.getMonth() < 5 ? now.getFullYear() : now.getFullYear() + 1;

const PickPage = () => (
  <Page>
    <Page.Header>
      <Title>Summer comedy series</Title>
      <Description>
        Venue shortlist for June to August {season}. Availability is for these
        dates.
      </Description>
    </Page.Header>
    <ReportVenues />
  </Page>
);

export default PickPage;
