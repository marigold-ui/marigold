import React, { ReactNode } from 'react';
import { Table } from '@marigold/components';

export interface PropsTableProps {
  props: { [key: string]: any };
}

export const PropsTable = ({ props }: PropsTableProps) => {
  return (
    <Table aria-label="Table with component props">
      <Table.Header>
        <Table.Column>Property</Table.Column>
        <Table.Column>Type</Table.Column>
        <Table.Column>Default</Table.Column>
        <Table.Column>Description</Table.Column>
      </Table.Header>
      <Table.Body>
        {props.map((element: { props: string }) => (
          <Table.Row key={element.property}>
            <Table.Cell>{element.property}</Table.Cell>
            <Table.Cell>{element.type}</Table.Cell>
            <Table.Cell>{element.default}</Table.Cell>
            <Table.Cell>{element.description}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
