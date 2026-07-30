import { useState } from 'react';
import type { Selection } from '@react-types/shared';
import { Menu } from '@marigold/components';

export default () => {
  const [preferences, setPreferences] = useState<Selection>(
    () => new Set(['newsletter'])
  );
  return (
    <>
      <Menu
        label="Select Your Preference"
        selectionMode="multiple"
        selectedKeys={preferences}
        onSelectionChange={setPreferences}
      >
        <Menu.Item id="newsletter">📧 Subscribe to Newsletter</Menu.Item>
        <Menu.Item id="offers">💸 Receive Special Offers</Menu.Item>
        <Menu.Item id="updates">🔔 Get Product Updates</Menu.Item>
        <Menu.Item id="events">🎉 Event Invitations</Menu.Item>
      </Menu>{' '}
      <pre>Your preferences are : {[...preferences].join(', ')}</pre>
    </>
  );
};
