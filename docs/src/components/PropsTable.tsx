import { Box, Table } from '@marigold/components';

export interface PropsTableProps {
  props: { [key: string]: string }[];
}

export const PropsTable = ({ props }: PropsTableProps) => {
  return (
    <Box
      css={{ overflow: ['scroll', 'unset'], whiteSpace: ['nowrap', 'unset'] }}
    >
      <Table aria-label="Table with component props" variant="propsTable">
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
    </Box>
  );
};
