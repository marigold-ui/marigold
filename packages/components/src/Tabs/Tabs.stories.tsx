import preview from '../../../../storybook/.storybook/preview';
import { Tabs } from './Tabs';

const meta = preview.meta({
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable all the tabs',
    },
    selectedKey: {
      control: { type: 'text' },
      description: 'Select the active tab',
    },
    keyboardActivation: {
      defaultValue: 'automatic',
      control: { type: 'radio' },
      options: ['automatic', 'manual'],
      description:
        'Select whether tabs are activated automatically on focus or manually.',
    },
  },
});

export const Basic = meta.story({
  render: args => {
    return (
      <Tabs aria-label="tabs" {...args}>
        <Tabs.List aria-label="Input settings">
          <Tabs.Item id="mouse">Mouse Settings</Tabs.Item>
          <Tabs.Item id="keyboard">Keyboard Settings</Tabs.Item>
          <Tabs.Item id="gamepad">Gamepad Settings</Tabs.Item>
        </Tabs.List>
        <Tabs.TabPanel id="mouse">
          Adjust the sensitivity, acceleration, and button assignments for your
          mouse.
        </Tabs.TabPanel>
        <Tabs.TabPanel id="keyboard">
          Customize the key bindings and input behavior for your keyboard.
        </Tabs.TabPanel>
        <Tabs.TabPanel id="gamepad">
          Configure the controls, dead zones, and vibration settings for your
          gamepad.
        </Tabs.TabPanel>
      </Tabs>
    );
  },
});

export const WithDisabledKeys = meta.story({
  render: args => {
    return (
      <Tabs aria-label="tabs" disabledKeys={['private']} {...args}>
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
      </Tabs>
    );
  },
});

export const WithSelectedTab = meta.story({
  render: args => {
    return (
      <Tabs aria-label="tabs" selectedKey={'settings'} {...args}>
        <Tabs.List aria-label="Navigation">
          <Tabs.Item id="home">Home</Tabs.Item>
          <Tabs.Item id="settings">Settings</Tabs.Item>
          <Tabs.Item id="messages">Messages</Tabs.Item>
        </Tabs.List>
        <Tabs.TabPanel id="home">
          Welcome to the Home tab! This is where you can find your personalized
          feed, updates from your friends, and recent activity on the platform.
          Stay connected and explore the latest content tailored to your
          interests.
        </Tabs.TabPanel>
        <Tabs.TabPanel id="settings">
          You're currently in the Settings tab. Here, you can customize your
          account preferences, manage privacy settings, and update your
          notification preferences. Personalize your experience and make the
          platform work exactly how you want it to.
        </Tabs.TabPanel>
        <Tabs.TabPanel id="messages">
          Check out your Messages tab to stay in touch with your contacts. Send
          and receive messages, engage in conversations, and share interesting
          content with your network. Connect with friends, colleagues, and
          like-minded individuals in a private and secure environment.
        </Tabs.TabPanel>
      </Tabs>
    );
  },
});
