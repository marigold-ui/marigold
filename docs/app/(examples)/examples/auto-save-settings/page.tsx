'use client';

import { Description, Page, Title } from '@marigold/components';
import { Notifications } from './notifications';
import { Privacy } from './privacy';

const AutoSaveSettingsPage = () => (
  <Page>
    <Page.Header>
      <Title>Account preferences</Title>
      <Description>
        Manage how Riverside notifies you and shares your activity. Changes save
        automatically.
      </Description>
    </Page.Header>
    <Notifications />
    <Privacy />
  </Page>
);

export default AutoSaveSettingsPage;
