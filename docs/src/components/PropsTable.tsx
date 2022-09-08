import { Box, Table } from '@marigold/components';
import { BlankCanvas } from './BlankCanvas';

export interface PropsTableProps {
  props?: { [key: string]: string }[];
}

export const PropsTable = ({ props }: PropsTableProps) => {
  console.log(props);
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
        {props ? (
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
        ) : (
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <BlankCanvas />
              </Table.Cell>
              <Table.Cell>{'-'}</Table.Cell>
              <Table.Cell>{'-'}</Table.Cell>
              <Table.Cell>
                Sorry! There are currently no props availible.
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        )}
      </Table>
    </Box>
  );
};
