'use client';

import { Table } from '@marigold/components';

export const SpacingTokensTable = () => (
  <Table aria-label="spacing tokens" stretch>
    <Table.Header>
      <Table.Column key="token">Token</Table.Column>
      <Table.Column key="value">Value</Table.Column>
      <Table.Column key="description">Description</Table.Column>
      <Table.Column key="components">Relevant components</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row key="container">
        <Table.Cell>
          <code>container</code>
        </Table.Cell>
        <Table.Cell>50rem (800px)</Table.Cell>
        <Table.Cell>Used width or max-width for the form container.</Table.Cell>
        <Table.Cell>
          <code>&lt;div&gt;</code>, <code>&lt;Form&gt;</code>
        </Table.Cell>
      </Table.Row>
      <Table.Row key="section">
        <Table.Cell>
          <code>section</code>
        </Table.Cell>
        <Table.Cell>3.5rem (56px)</Table.Cell>
        <Table.Cell>
          Used for creating space between different form sections.
        </Table.Cell>
        <Table.Cell>
          <code>&lt;Stack&gt;</code>
        </Table.Cell>
      </Table.Row>
      <Table.Row key="fieldY">
        <Table.Cell>
          <code>fieldY</code>
        </Table.Cell>
        <Table.Cell>2rem (32px)</Table.Cell>
        <Table.Cell>
          Used for creating vertical space between individual form fields in a
          section.
        </Table.Cell>
        <Table.Cell>
          <code>&lt;Stack&gt;</code>
        </Table.Cell>
      </Table.Row>
      <Table.Row key="fieldX">
        <Table.Cell>
          <code>fieldX</code>
        </Table.Cell>
        <Table.Cell>1.25rem (20px)</Table.Cell>
        <Table.Cell>
          Used for creating horizontal space between individual form fields in a
          section.
        </Table.Cell>
        <Table.Cell>
          <code>&lt;Inline&gt;</code>
        </Table.Cell>
      </Table.Row>
      <Table.Row key="group">
        <Table.Cell>
          <code>group</code>
        </Table.Cell>
        <Table.Cell>1rem (16px)</Table.Cell>
        <Table.Cell>
          Used for grouping related fields (address components, date/time
          fields) or multiple accordion sections together.
        </Table.Cell>
        <Table.Cell>
          <code>&lt;Stack&gt;</code>, <code>&lt;Inset&gt;</code>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);
