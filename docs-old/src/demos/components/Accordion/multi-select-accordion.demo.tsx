import {
  Accordion,
  Inline,
  Text,
  TextField,
  NumberField,
  Stack,
} from '@marigold/components';
import { Parking, SettingDots, Accessible } from '@marigold/icons';

export const MultiSelect = () => {
  const items = [
    {
      key: 'one',
      textValue: 'Parking passes',
      title: (
        <Inline space="medium">
          <Parking />
          <Text fontStyle="bold">Parking passes</Text>
        </Inline>
      ),
      children: (
        <Stack space="medium">
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
      key: 'two',
      textValue: 'Handicapped parking spaces',
      title: (
        <Inline space="medium">
          <Accessible />
          <Text fontStyle="bold">Handicapped parking spaces</Text>
        </Inline>
      ),
      children: (
        <Stack space="medium">
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
      key: 'tree',
      textValue: 'Settings',
      title: (
        <Inline space="medium">
          <SettingDots />
          <Text fontStyle="bold">Settings</Text>
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
    <Accordion selectionMode="multiple" defaultExpandedKeys={['two']}>
      {items.map(item => (
        <Accordion.Item
          key={item.key}
          title={item.title}
          textValue={item.textValue}
        >
          {item.children}
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
