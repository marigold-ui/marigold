import {
  Accordion,
  Inline,
  FieldGroup,
  Columns,
  Text,
  TextField,
  NumberField,
} from '@marigold/components';
import { Parking, SettingDots, Accessible } from '@marigold/icons';

export const MultiSelect = () => {
  const items = [
    {
      key: 'one',
      title: (
        <Inline space="medium">
          <Parking />
          <Text fontStyle="bold">Parking passes</Text>
        </Inline>
      ),
      children: (
        <FieldGroup labelWidth="medium">
          <Columns columns={[2, 2]} space="medium">
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
          </Columns>
        </FieldGroup>
      ),
    },
    {
      key: 'two',
      title: (
        <Inline space="medium">
          <Accessible />
          <Text fontStyle="bold">Handicapped parking spaces</Text>
        </Inline>
      ),
      children: (
        <Inline space="medium">
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
        </Inline>
      ),
    },
    {
      key: 'tree',
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
        <Accordion.Item key={item.key} title={item.title}>
          <FieldGroup labelWidth="medium">{item.children}</FieldGroup>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
