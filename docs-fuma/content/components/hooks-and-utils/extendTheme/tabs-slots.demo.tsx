'use client';

import { MarigoldProvider, Tabs } from '@marigold/components';
import { cva, extendTheme, useTheme } from '@marigold/system';

export default () => {
  const currentTheme = useTheme();
  const theme = extendTheme(
    {
      Tabs: {
        tabpanel: cva('text-text-base rounded-md bg-slate-200 p-3'),
      },
    },
    currentTheme
  );

  return (
    <MarigoldProvider theme={theme}>
      <Tabs aria-label="tabs" disabledKeys={['private']}>
        <Tabs.List aria-label="User Preferences">
          <Tabs.Item id="profile">profile</Tabs.Item>
          <Tabs.Item id="notifications">notifications</Tabs.Item>
          <Tabs.Item id="private">private</Tabs.Item>
        </Tabs.List>
        <Tabs.TabPanel id="profile">
          This panel displays your profile settings. You can upload a profile
          picture, write a brief bio to introduce yourself, and update other
          personal details. Show the world who you are and make a memorable
          impression on other platform users.
        </Tabs.TabPanel>
        <Tabs.TabPanel id="notifications">
          Here, you'll find settings related to notifications. Choose how you
          want to be notified about new messages, friend requests, and other
          important updates. Stay connected and up-to-date with the latest
          activities happening on the platform.
        </Tabs.TabPanel>
        <Tabs.TabPanel id="private">
          The Privacy panel provides options to safeguard your personal
          information and control your privacy. Decide who can view your
          profile, set visibility preferences for your posts and photos, and
          manage your data. Enjoy peace of mind knowing that you have full
          control over your privacy on the platform.
        </Tabs.TabPanel>
      </Tabs>{' '}
    </MarigoldProvider>
  );
};
