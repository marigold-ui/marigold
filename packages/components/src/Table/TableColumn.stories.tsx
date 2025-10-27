import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'storybook/preview-api';
import { SortDescriptor } from '@react-types/shared';
import { Table } from './Table';

const meta = {
  title: 'Components/Table',
  argTypes: {
    align: {
      control: {
        type: 'select',
      },
      options: ['right', 'left', 'center'],
      description: 'Specifies the alignment of the table columns.',
    },
    allowsSorting: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the column allows sorting',
    },
    title: {
      control: {
        type: 'text',
      },
      description:
        'Rendered contents of the column if children contains child columns.',
    },
    width: {
      control: {
        type: 'number',
      },
      description: 'Width of the column.',
    },
  },
  args: {
    align: 'right',
    width: 20,
  },
} satisfies Meta<typeof Table.Column>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlignedTableColumn: Story = {
  render: args => {
    const data = [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        birth_year: '19BBY',
      },
      {
        name: 'C-3PO',
        height: '167',
        mass: '75',
        birth_year: '112BBY',
      },
      {
        name: 'R2-D2',
        height: '96',
        mass: '32',
        birth_year: '33BBY',
      },
      {
        name: 'Darth Vader',
        height: '202',
        mass: '136',
        birth_year: '41.9BBY',
      },
      {
        name: 'Leia Organa',
        height: '150',
        mass: '49',
        birth_year: '19BBY',
      },
      {
        name: 'Owen Lars',
        height: '178',
        mass: '120',
        birth_year: '52BBY',
      },
      {
        name: 'Beru Whitesun lars',
        height: '165',
        mass: '75',
        birth_year: '47BBY',
      },
      {
        name: 'R5-D4',
        height: '97',
        mass: '32',
        birth_year: 'unknown',
      },
      {
        name: 'Biggs Darklighter',
        height: '183',
        mass: '84',
        birth_year: '24BBY',
      },
      {
        name: 'Obi-Wan Kenobi',
        height: '182',
        mass: '77',
        birth_year: '57BBY',
      },
    ];
    const [list, setList] = useState(data);
    const [descriptor, setDescriptor] = useState<SortDescriptor>({
      column: '',
      direction: 'ascending',
    });
    const sort = ({ column, direction }: SortDescriptor) => {
      const result = list.sort((a: any, b: any) => {
        const first = a[column!];
        const second = b[column!];
        let cmp =
          (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
        if (direction === 'descending') {
          cmp *= -1;
        }
        return cmp;
      });
      setDescriptor({ column, direction });
      setList(result);
    };

    return (
      <>
        <Table
          aria-label="Example table with client side sorting"
          sortDescriptor={descriptor}
          onSortChange={sort}
          selectionMode="multiple"
        >
          <Table.Header>
            <Table.Column key="name" allowsSorting>
              Name
            </Table.Column>
            <Table.Column key="height" allowsSorting>
              Height
            </Table.Column>
            <Table.Column {...args} key="mass">
              Mass
            </Table.Column>
            <Table.Column align="right" key="birth_year" allowsSorting>
              Birth Year
            </Table.Column>
          </Table.Header>
          <Table.Body items={list}>
            {item => (
              <Table.Row key={item.name}>
                {columnKey => (
                  <Table.Cell>{(item as any)[columnKey]}</Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <br />
        <pre>
          Sort: {descriptor.column} / {descriptor.direction}
        </pre>
      </>
    );
  },
};
