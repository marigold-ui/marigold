import { useState } from 'react';
import { Menu } from '@marigold/components';

export default () => {
  const [preferences, setPreferences] = useState(['newsletter']);
  return (
    <>
      <Menu
        label="Select Your Preference"
        selectionMode="multiple"
        selectedKeys={preferences}
        onSelectionChange={setPreferences as (keys: any) => void}
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
