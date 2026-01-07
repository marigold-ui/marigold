'use client';

import {
  Accordion,
  Inline,
  NumberField,
  Stack,
  Text,
  TextField,
} from '@marigold/components';
import { Accessible, Parking, SettingDots } from '@marigold/icons';

export default () => {
  const items = [
    {
      id: 'one',
      key: 'one',
      textValue: 'Parking passes',
      title: (
        <Inline space={2} alignY="center">
          <Parking />
          <Text fontStyle="normal">Parking passes</Text>
        </Inline>
      ),
      children: (
        <Stack space={2}>
          <TextField
            label="Parking Slots"
            description="Available parking passes"
          />
          <NumberField
            label="Costs"
            description="Amount in euros"
            defaultValue={5}
            formatOptions={{
              style: 'currency',
              currency: 'EUR',
            }}
          />
        </Stack>
      ),
    },
    {
      id: 'two',
      key: 'two',
      textValue: 'Handicapped parking spaces',
      title: (
        <Inline space={2} alignY="center">
          <Accessible />
          <Text fontStyle="normal">Handicapped parking spaces</Text>
        </Inline>
      ),
      children: (
        <Stack space={2}>
          <TextField
            label="Parking Slots"
            description="Available parking passes"
          />
          <NumberField
            label="Costs"
            description="Amount in euros"
            defaultValue={5}
            formatOptions={{
              style: 'currency',
              currency: 'EUR',
            }}
          />
        </Stack>
      ),
    },
    {
      id: 'tree',
      key: 'tree',
      textValue: 'Settings',
      title: (
        <Inline space={2} alignY="center">
          <SettingDots />
          <Text fontStyle="normal">Settings</Text>
        </Inline>
      ),
      children: (
        <TextField
          label="Parking Stations"
          description="Available parking stations"
        />
      ),
    },
  ];

  return (
    <Accordion allowsMultipleExpanded defaultExpandedKeys={['two']}>
      {items.map(item => (
        <Accordion.Item id={item.id} key={item.key}>
          <Accordion.Header>{item.title} </Accordion.Header>
          <Accordion.Content>{item.children}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
