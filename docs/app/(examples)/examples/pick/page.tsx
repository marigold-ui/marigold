// Each file in this example carries its own 'use client' so individual
// components can be copy-pasted into a project without tracing back to where
// the client boundary starts.
'use client';

import { Description, Page, Title } from '@marigold/components';
import { ReportVenues } from './ReportVenues';

const PickPage = () => (
  <Page>
    <Page.Header>
      <Title>Summer comedy series</Title>
      <Description>
        Venue shortlist for June to August of the coming season. Availability is
        for these dates.
      </Description>
    </Page.Header>
    <ReportVenues />
  </Page>
);

export default PickPage;
