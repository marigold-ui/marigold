'use client';

import { Button, Inline, Split, Tabs } from '@marigold/components';
import { Logout } from '@marigold/icons';
import { Logo } from './Logo';

export default () => (
  <>
    {/* Container */}
    <div className="border-border w-full border-b pt-2 pl-2">
      <Inline space={12}>
        {/* Logo area */}
        <div className="py-2">
          <Logo />
        </div>
        {/* Navigation links */}
        <div className="self-end *:-mb-px">
          <Tabs selectedKey={'home'}>
            <Tabs.List aria-label="Navigation">
              <Tabs.Item id="home" href="https://www.marigold-ui.io">
                Home
              </Tabs.Item>
              <Tabs.Item id="settings" href="https://www.reservix.de">
                Settings
              </Tabs.Item>
              <Tabs.Item id="messages" href="https://www.reservix.net">
                Messages
              </Tabs.Item>
            </Tabs.List>
          </Tabs>
        </div>
        {/* Spacer */}
        <Split />
        {/* Action area */}
        <Inline space={2} alignY="center">
          <Button variant="ghost">
            <Logout size={16} /> Logout
          </Button>
        </Inline>
      </Inline>
    </div>
  </>
);
