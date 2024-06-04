'use client';

import { Card, Inline, Table, Text } from '@/ui';

import { BlankCanvas } from './icons';

export interface PropsTableProps {
  props?: { [key: string]: string }[];
}
export const PropsTable = ({ props }: PropsTableProps) => {
  return (
    <Card px={3} py={4}>
      {!props ? (
        <Inline space={2}>
          <BlankCanvas />
          <Text>Sorry! There are currently no props available.</Text>
        </Inline>
      ) : (
        <div className="overflow-auto">
          <Table aria-label="Table with component props" variant="hover">
            <Table.Header>
              <Table.Column key="property">Property</Table.Column>
              <Table.Column key="type">Type</Table.Column>
              <Table.Column key="default">Default</Table.Column>
              <Table.Column key="description">Description</Table.Column>
            </Table.Header>
            <Table.Body items={props}>
              {item => (
                <Table.Row key={item.property}>
                  <Table.Cell>
                    <code className="before:content-none after:content-none">
                      {item.property}
                    </code>
                  </Table.Cell>
                  <Table.Cell>
                    <code className="before:content-none after:content-none">
                      {item.type}
                    </code>
                  </Table.Cell>
                  <Table.Cell>
                    <code className="before:content-none after:content-none">
                      {item.default ? item.default : '-'}
                    </code>
                  </Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      )}
    </Card>
  );
};
