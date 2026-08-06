// Each file in this example carries its own 'use client' so individual
// components can be copy-pasted into a project without tracing back to where
// the client boundary starts.
'use client';

import { Description, Page, Title } from '@marigold/components';
import { ReportVenues } from './ReportVenues';

const PickPage = () => (
  <Page>
    <Page.Header>
      <Title>Venue report</Title>
      <Description>
        A report owns the venues you pick for it. Build the set in the pick
        dialog. It stays on the report and can be edited anytime.
      </Description>
    </Page.Header>
    <ReportVenues />
  </Page>
);

export default PickPage;
