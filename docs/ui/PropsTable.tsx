import componentProps from '@/registry/props.json';
import { Card, Inline, Table, Text } from '@/ui';

import { BlankCanvas } from './icons';

// Helper
// ---------------
const parseType = (val: string) =>
  // Remove "()" when the type is wrapped im them (this is done by prettier)
  val.replace(/^\((.*)\)$/, '$1');

// Types
// ---------------
export interface PropsTableProps {
  component?: string;
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

// Component
// ---------------
export const PropsTable = ({ component }: PropsTableProps) => {
  //make the props iterable
  const props =
    component &&
    (Object.entries((componentProps as any)[component]).map(
      element => element[1]
    ) as Prop[]);

  if (!props) {
    return (
      <Inline space={2}>
        <BlankCanvas />
        <Text>Sorry! There are currently no props available.</Text>
      </Inline>
    );
  }

  return (
    <Table aria-label="Table with component props" variant="hover" stretch>
      <Table.Header>
        <Table.Column key="property" width="1/6">
          Property
        </Table.Column>
        <Table.Column key="type" width="2/6">
          Type
        </Table.Column>
        <Table.Column key="default" width="1/6">
          Default
        </Table.Column>
        <Table.Column key="description" width="2/6">
          Description
        </Table.Column>
      </Table.Header>
      <Table.Body>
        {props.map(prop => (
          <Table.Row key={prop.name}>
            <Table.Cell>
              <code className="before:content-none after:content-none">
                {prop.name}
              </code>
            </Table.Cell>
            <Table.Cell>
              <code className="before:content-none after:content-none">
                {parseType(prop.type.name)}
              </code>
            </Table.Cell>
            <Table.Cell>
              <code className="before:content-none after:content-none">
                {prop.defaultValue ? prop.defaultValue.value : '-'}
              </code>
            </Table.Cell>
            <Table.Cell>{prop.description}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
