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
      key: 'one',
      textValue: 'Parking passes',
      title: (
        <Inline space={2}>
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
      key: 'two',
      textValue: 'Handicapped parking spaces',
      title: (
        <Inline space={2}>
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
      key: 'tree',
      textValue: 'Settings',
      title: (
        <Inline space={2}>
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
