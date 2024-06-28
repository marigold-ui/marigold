'use client';

import { Card, Inline, Table, Text } from '@/ui';

import tableProps from '../.component-props/index.json';
import { BlankCanvas } from './icons';

export interface PropsTableProps {
  componentFile?: string;
}

interface Prop {
  name: string;
  type: {
    name: string;
  };
  defaultValue: {
    value: any;
  };
  description: string;
}

export const PropsTable = ({ componentFile }: PropsTableProps) => {
  //make the props iterable
  const props =
    componentFile &&
    (Object.entries((tableProps as any)[componentFile]).map(
      element => element[1]
    ) as Prop[]);
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
              {(prop: Prop) => (
                <Table.Row key={prop.name}>
                  <Table.Cell>
                    <code className="before:content-none after:content-none">
                      {prop.name}
                    </code>
                  </Table.Cell>
                  <Table.Cell>
                    <code className="before:content-none after:content-none">
                      {prop.type.name}
                    </code>
                  </Table.Cell>
                  <Table.Cell>
                    <code className="before:content-none after:content-none">
                      {prop.defaultValue ? prop.defaultValue.value : '-'}
                    </code>
                  </Table.Cell>
                  <Table.Cell>{prop.description}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      )}
    </Card>
  );
};
