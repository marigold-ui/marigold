'use client';

import { getAppearance } from '@/lib/utils';
import { Table, Theme } from '@/ui';

export interface AppearanceTableProps {
  component: keyof Theme['components'];
}

export const AppearanceTable = ({ component }: AppearanceTableProps) => {
  const appearances = getAppearance(component);

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
              {appearances.variant.length
                ? appearances.variant.join(' | ')
                : '-'}
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
              {appearances.size.length ? appearances.size.join(' | ') : '-'}
            </code>
          </Table.Cell>
          <Table.Cell>The available sizes of this component.</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
