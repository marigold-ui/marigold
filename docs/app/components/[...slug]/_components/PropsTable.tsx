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
        <Table aria-label="Table with component props" variant="propsTable">
          <Table.Header>
            <Table.Column key="property">
              Property {<a href="http://www.google.com">huhu</a>}
            </Table.Column>
            <Table.Column key="type">Type</Table.Column>
            <Table.Column key="default">Default</Table.Column>
            <Table.Column key="description">Description</Table.Column>
          </Table.Header>
          <Table.Body items={props}>
            {item => (
              <Table.Row key={item.property}>
                <Table.Cell>
                  <code>{item.property}</code>
                </Table.Cell>
                <Table.Cell>
                  <code>{item.type}</code>
                </Table.Cell>
                <Table.Cell>
                  <code>{item.default}</code>
                </Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      )}
    </Card>
  );
};
