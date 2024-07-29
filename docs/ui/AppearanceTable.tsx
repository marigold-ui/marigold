'use client';

import { getAppearance } from '@/lib/utils';
import { Inline, Table, Text, Theme } from '@/ui';

import { useThemeSwitch } from './ThemeSwitch';
import { BlankCanvas } from './icons';

export interface AppearanceTableProps {
  component: keyof Theme['components'];
}

export const AppearanceTable = ({ component }: AppearanceTableProps) => {
  const { current, themes } = useThemeSwitch();

  if (!current) {
    return null;
  }

  const appearances = getAppearance(component, themes[current]);

  if (appearances?.variant?.length === 0 && appearances?.size?.length === 0) {
    return (
      <Inline space={2}>
        <BlankCanvas />
        <Text>Sorry! There are currently no variants and sizes available.</Text>
      </Inline>
    );
  }

  return (
    <Table aria-labelledby="appearance table" variant="hover" stretch>
      <Table.Header>
        <Table.Column key={'property'}>Property</Table.Column>
        <Table.Column key={'type'}>Type</Table.Column>
        <Table.Column key={'description'}>Description</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <code className="before:content-none after:content-none">
              variant
            </code>
          </Table.Cell>
          <Table.Cell>
            <code className="before:content-none after:content-none">
              {appearances.variant ? appearances.variant.join(' | ') : '-'}
            </code>
          </Table.Cell>
          <Table.Cell>The available variants of this component.</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <code className="before:content-none after:content-none">size</code>
          </Table.Cell>
          <Table.Cell>
            <code className="before:content-none after:content-none">
              {appearances.size ? appearances.size.join(' | ') : '-'}
            </code>
          </Table.Cell>
          <Table.Cell>The available sizes of this component.</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
