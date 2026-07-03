import { expect, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Tabs } from './Tabs';

const meta = preview.meta({
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    surface: 'both',
  },
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
  tags: ['component-test'],
  render: args => {
    return (
      <Tabs aria-label="tabs" {...args}>
        <Tabs.List aria-label="Input settings">
          <Tabs.Item id="mouse">Mouse Settings</Tabs.Item>
          <Tabs.Item id="keyboard">Keyboard Settings</Tabs.Item>
          <Tabs.Item id="gamepad">Gamepad Settings</Tabs.Item>
        </Tabs.List>
        <Tabs.Panel id="mouse">
          Adjust the sensitivity, acceleration, and button assignments for your
          mouse.
        </Tabs.Panel>
        <Tabs.Panel id="keyboard">
          Customize the key bindings and input behavior for your keyboard.
        </Tabs.Panel>
        <Tabs.Panel id="gamepad">
          Configure the controls, dead zones, and vibration settings for your
          gamepad.
        </Tabs.Panel>
      </Tabs>
    );
  },
});

Basic.test(
  'Activates a tab on click and shows its panel',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent, step }) => {
    let keyboardTab: HTMLElement;

    await step('Arrange', async () => {
      keyboardTab = await waitFor(
        () => canvas.getAllByRole('tab', { name: 'Keyboard Settings' })[0]
      );
    });

    await step('Act', async () => {
      await userEvent.click(keyboardTab!);
    });

    await step('Assert', async () => {
      await expect(
        canvas.getAllByText(/Customize the key bindings and input behavior/)[0]
      ).toBeVisible();
      const indicator = await waitFor(
        () => canvas.getAllByTestId('tab-indicator')[0]
      );
      await expect(indicator).toBeVisible();
    });
  }
);

export const WithDisabledKeys = meta.story({
  render: args => {
    return (
      <Tabs aria-label="tabs" disabledKeys={['private']} {...args}>
        <Tabs.List aria-label="User Preferences">
          <Tabs.Item id="profile">profile</Tabs.Item>
          <Tabs.Item id="notifications">notifications</Tabs.Item>
          <Tabs.Item id="private">private</Tabs.Item>
        </Tabs.List>
        <Tabs.Panel id="profile">
          This panel displays your profile settings. You can upload a profile
          picture, write a brief bio to introduce yourself, and update other
          personal details. Show the world who you are and make a memorable
          impression on other platform users.
        </Tabs.Panel>
        <Tabs.Panel id="notifications">
          Here, you'll find settings related to notifications. Choose how you
          want to be notified about new messages, friend requests, and other
          important updates. Stay connected and up-to-date with the latest
          activities happening on the platform.
        </Tabs.Panel>
        <Tabs.Panel id="private">
          The Privacy panel provides options to safeguard your personal
          information and control your privacy. Decide who can view your
          profile, set visibility preferences for your posts and photos, and
          manage your data. Enjoy peace of mind knowing that you have full
          control over your privacy on the platform.
        </Tabs.Panel>
      </Tabs>
    );
  },
});

export const WithSelectedTab = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => {
    return (
      <Tabs aria-label="tabs" selectedKey={'settings'} {...args}>
        <Tabs.List aria-label="Navigation">
          <Tabs.Item id="home">Home</Tabs.Item>
          <Tabs.Item id="settings">Settings</Tabs.Item>
          <Tabs.Item id="messages">Messages</Tabs.Item>
        </Tabs.List>
        <Tabs.Panel id="home">
          Welcome to the Home tab! This is where you can find your personalized
          feed, updates from your friends, and recent activity on the platform.
          Stay connected and explore the latest content tailored to your
          interests.
        </Tabs.Panel>
        <Tabs.Panel id="settings">
          You're currently in the Settings tab. Here, you can customize your
          account preferences, manage privacy settings, and update your
          notification preferences. Personalize your experience and make the
          platform work exactly how you want it to.
        </Tabs.Panel>
        <Tabs.Panel id="messages">
          Check out your Messages tab to stay in touch with your contacts. Send
          and receive messages, engage in conversations, and share interesting
          content with your network. Connect with friends, colleagues, and
          like-minded individuals in a private and secure environment.
        </Tabs.Panel>
      </Tabs>
    );
  },
});

export const WithRenderProps = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  tags: ['component-test'],
  render: args => {
    return (
      <Tabs aria-label="tabs" {...args}>
        <Tabs.List aria-label="Account settings">
          <Tabs.Item id="general">
            {({ isSelected }) => (isSelected ? 'General (current)' : 'General')}
          </Tabs.Item>
          <Tabs.Item id="security">
            {({ isSelected }) =>
              isSelected ? 'Security (current)' : 'Security'
            }
          </Tabs.Item>
          <Tabs.Item id="notifications">Notifications</Tabs.Item>
        </Tabs.List>
        <Tabs.Panel id="general">
          Set your display name, email, and default language. These details are
          shown to other users.
        </Tabs.Panel>
        <Tabs.Panel id="security">
          Manage your password, two-factor authentication, and active sessions.
        </Tabs.Panel>
        <Tabs.Panel id="notifications">
          Choose how you receive emails and in-app notifications.
        </Tabs.Panel>
      </Tabs>
    );
  },
});

const OVERFLOW_TABS = [
  'Overview',
  'Activity',
  'Notifications',
  'Integrations',
  'Permissions',
  'Billing',
  'Advanced',
  'Audit log',
];

// Tabs overflowing a phone viewport: the row scrolls instead of wrapping.
// Snapshot skipped (flaky scroll position); the play test covers behavior.
export const Mobile = meta.story({
  tags: ['component-test'],
  globals: {
    viewport: { value: 'extraSmallScreen' },
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  render: args => (
    <Tabs aria-label="tabs" {...args}>
      <Tabs.List aria-label="Workspace settings">
        {OVERFLOW_TABS.map(label => (
          <Tabs.Item key={label} id={label}>
            {label}
          </Tabs.Item>
        ))}
      </Tabs.List>
      {OVERFLOW_TABS.map(label => (
        <Tabs.Panel key={label} id={label}>
          {label} settings panel.
        </Tabs.Panel>
      ))}
    </Tabs>
  ),
  play: async ({ canvas, step }) => {
    let lastTab: HTMLElement;

    await step('Arrange', async () => {
      // Fail loudly if the mobile viewport did not apply, rather than pass a
      // test that never actually overflowed.
      expect(window.innerWidth).toBeLessThan(640);
      lastTab = await waitFor(
        () => canvas.getAllByRole('tab', { name: 'Audit log' })[0]
      );
    });

    await step('Act', async () => {
      await userEvent.click(lastTab!);
    });

    await step('Assert', async () => {
      await expect(
        canvas.getAllByText('Audit log settings panel.')[0]
      ).toBeVisible();
      const indicator = await waitFor(
        () => canvas.getAllByTestId('tab-indicator')[0]
      );
      await expect(indicator).toBeVisible();
    });
  },
});
