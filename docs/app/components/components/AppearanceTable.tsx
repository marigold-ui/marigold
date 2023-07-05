'use client';

import { Card, Inline, Table, Text, Theme, ConfigSchema } from '@/ui';
import { BlankCanvas } from './icons';
import { useThemeSwitch } from './ThemeSwitch';

export interface AppearanceTableProps {
  component: keyof Theme['components'];
}

const getKeys = (schema: ConfigSchema) => {
  return {
    variant: Object.keys(schema.variant),
    size: Object.keys(schema.size),
  };
};

const getKeysFromSlots = (o: {
  [slot: string]: { variants: ConfigSchema };
}) => {
  let v = new Set();
  let s = new Set();

  Object.values(o).forEach(value => {
    v = new Set([...v, ...Object.keys(value.variants?.variant ?? {})]);
    s = new Set([...s, ...Object.keys(value.variants?.size ?? {})]);
  });

  return { variant: [...v], size: [...s] };
};

export const AppearanceTable = ({ component }: AppearanceTableProps) => {
  const { current, themes } = useThemeSwitch();

  if (!current) {
    return null;
  }

  const styles = themes[current].components[component] || {};
  const appearances =
    'variants' in styles
      ? getKeys(styles.variants as ConfigSchema)
      : getKeysFromSlots(styles);

  return (
    <Card px={3} py={4}>
      {appearances.variant.length === 0 && appearances.size.length === 0 ? (
        <Inline>
          <BlankCanvas />
          <Text>
            Sorry! There are currently no variants and sizes available.
          </Text>
        </Inline>
      ) : (
        <Table aria-labelledby="appearance table" variant="propsTable">
          <Table.Header>
            <Table.Column key={'property'}>Property</Table.Column>
            <Table.Column key={'type'}>Type</Table.Column>
            <Table.Column key={'description'}>Description</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <code>variant</code>
              </Table.Cell>
              <Table.Cell>
                <code>
                  {appearances.variant ? appearances.variant.join(' | ') : '-'}
                </code>
              </Table.Cell>
              <Table.Cell>The available variants of this component.</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <code>size</code>
              </Table.Cell>
              <Table.Cell>
                <code>
                  {appearances.size ? appearances.size.join(' | ') : '-'}
                </code>
              </Table.Cell>
              <Table.Cell>The available sizes of this component.</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
    </Card>
  );
};
