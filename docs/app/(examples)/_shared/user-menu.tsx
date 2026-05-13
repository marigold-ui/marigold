'use client';

import { ActionMenu, Menu } from '@marigold/components';

export const UserMenu = () => (
  <ActionMenu aria-label="User menu" variant="ghost">
    <Menu.Section title="Account">
      <Menu.Item id="profile" textValue="Profile">
        Profile
      </Menu.Item>
      <Menu.Item id="settings" textValue="Settings">
        Settings
      </Menu.Item>
      <Menu.Item id="sign-out" textValue="Sign out">
        Sign out
      </Menu.Item>
    </Menu.Section>
  </ActionMenu>
);
