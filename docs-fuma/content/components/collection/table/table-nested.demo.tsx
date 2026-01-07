'use client';

import { Table } from '@marigold/components';

export default () => (
  <Table aria-label="Example table for nested columns" stretch variant="grid">
    <Table.Header>
      <Table.Column title="Name" align="center">
        <Table.Column isRowHeader>First Name</Table.Column>
        <Table.Column isRowHeader>Last Name</Table.Column>
      </Table.Column>
      <Table.Column title="Information" align="center">
        <Table.Column>Birthday</Table.Column>
        <Table.Column align="right" width={5}>
          Age
        </Table.Column>
      </Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Sam</Table.Cell>
        <Table.Cell>Smith</Table.Cell>
        <Table.Cell>May 3</Table.Cell>
        <Table.Cell>36</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Julia</Table.Cell>
        <Table.Cell>Jones</Table.Cell>
        <Table.Cell>February 10</Table.Cell>
        <Table.Cell>24</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Peter</Table.Cell>
        <Table.Cell>Parker</Table.Cell>
        <Table.Cell>September 7</Table.Cell>
        <Table.Cell>28</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Bruce</Table.Cell>
        <Table.Cell>Wayne</Table.Cell>
        <Table.Cell>December 18</Table.Cell>
        <Table.Cell>32</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);
