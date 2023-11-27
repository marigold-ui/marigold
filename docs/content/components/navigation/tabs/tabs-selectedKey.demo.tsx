import { Tabs } from '@marigold/components';

export default () => (
  <Tabs aria-label="tabs" selectedKey={'settings'}>
    <Tabs.List aria-label="Navigation">
      <Tabs.Item id="home">Home</Tabs.Item>
      <Tabs.Item id="settings">Settings</Tabs.Item>
      <Tabs.Item id="messages">Messages</Tabs.Item>
    </Tabs.List>
    <Tabs.TabPanel id="home">
      Welcome to the Home tab! This is where you can find your personalized
      feed, updates from your friends, and recent activity on the platform. Stay
      connected and explore the latest content tailored to your interests.
    </Tabs.TabPanel>
    <Tabs.TabPanel id="settings">
      You're currently in the Settings tab. Here, you can customize your account
      preferences, manage privacy settings, and update your notification
      preferences. Personalize your experience and make the platform work
      exactly how you want it to.
    </Tabs.TabPanel>
    <Tabs.TabPanel id="messages">
      Check out your Messages tab to stay in touch with your contacts. Send and
      receive messages, engage in conversations, and share interesting content
      with your network. Connect with friends, colleagues, and like-minded
      individuals in a private and secure environment.
    </Tabs.TabPanel>
  </Tabs>
);
