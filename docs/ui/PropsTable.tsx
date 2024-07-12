import componentProps from '@/registry/props.json';
import { Card, Inline, Table, Text } from '@/ui';

import { BlankCanvas } from './icons';

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

export const PropsTable = ({ component }: PropsTableProps) => {
  //make the props iterable
  const props =
    component &&
    (Object.entries((componentProps as any)[component]).map(
      element => element[1]
    ) as Prop[]);
  return (
    <Card px={0} py={2}>
      {!props ? (
        <Inline space={2}>
          <BlankCanvas />
          <Text>Sorry! There are currently no props available.</Text>
        </Inline>
      ) : (
        <div className="scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent scrollbar-thumb-rounded-full overflow-auto">
          <Table aria-label="Table with component props" variant="hover">
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
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </Card>
  );
};
