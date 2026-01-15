import { useState } from 'react';
import { Key } from '@react-types/shared';
import { Accordion, TextField } from '@marigold/components';

export default () => {
  let [expandedKeys, setExpandedKeys] = useState<Set<Key>>(
    new Set(['personal'])
  );

  return (
    <>
      <Accordion expandedKeys={expandedKeys} onExpandedChange={setExpandedKeys}>
        <Accordion.Item id="personal">
          <Accordion.Header>Personal Information</Accordion.Header>
          <Accordion.Content>
            <TextField type="text" label="Name" />
            <TextField type="email" label="Email" />
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item id="billing">
          <Accordion.Header>Billing Details</Accordion.Header>
          <Accordion.Content>
            <TextField type="text" label="Card Number" />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <div style={{ marginTop: '20px' }}>You have expanded: {expandedKeys}</div>
    </>
  );
};
