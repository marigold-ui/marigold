/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from '@storybook/addons';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { SortDescriptor } from '@react-types/shared';

import { Table } from './Table';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableColumnHeader } from './TableColumnHeader';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

const meta = {
  title: 'Components/Table new',
  argTypes: {
    selectionMode: {
      control: {
        type: 'select',
      },
      options: ['none', 'single', 'multiple'],
      description: 'selection mode',
    },

    stretch: {
      control: {
        type: 'boolean',
      },
      description: 'Stretch to fill the container',
    },
    variant: {
      control: {
        type: 'text',
      },
      description: 'variant for the table: for example: compact',
    },
  },
  args: {},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Table aria-label="Table with selection" {...args}>
      <TableHeader>
        <TableColumnHeader isRowHeader>Name</TableColumnHeader>
        <TableColumnHeader>Firstname</TableColumnHeader>
        <TableColumnHeader>House</TableColumnHeader>
        <TableColumnHeader>Year of birth</TableColumnHeader>
      </TableHeader>
      <TableBody>
        <TableRow key={1}>
          <TableCell>Potter</TableCell>
          <TableCell>Harry</TableCell>
          <TableCell>Gryffindor</TableCell>
          <TableCell>1980</TableCell>
        </TableRow>
        <TableRow key={2}>
          <TableCell>Malfoy</TableCell>
          <TableCell>Draco</TableCell>
          <TableCell>Slytherin</TableCell>
          <TableCell>1980</TableCell>
        </TableRow>
        <TableRow key={3}>
          <TableCell>Diggory</TableCell>
          <TableCell>Cedric</TableCell>
          <TableCell>Hufflepuff</TableCell>
          <TableCell>1977</TableCell>
        </TableRow>
        <TableRow key={4}>
          <TableCell>Lovegood</TableCell>
          <TableCell>Luna</TableCell>
          <TableCell>Ravenclaw</TableCell>
          <TableCell>1981</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Sorting: Story = {
  render: () => {
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
    const [descriptor, setDescriptor] = useState<SortDescriptor>({});
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
          <TableHeader>
            <TableColumnHeader isRowHeader key="name" allowsSorting>
              Name
            </TableColumnHeader>
            <TableColumnHeader key="height" allowsSorting>
              Height
            </TableColumnHeader>
            <TableColumnHeader key="mass" allowsSorting>
              Mass
            </TableColumnHeader>
            <TableColumnHeader key="birth_year" allowsSorting>
              Birth Year
            </TableColumnHeader>
          </TableHeader>
          <TableBody items={list}>
            {item => (
              <TableRow id={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.height}</TableCell>
                <TableCell>{item.mass}</TableCell>
                <TableCell>{item.birth_year}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <br />
        <pre>
          Sort: {descriptor.column} / {descriptor.direction}
        </pre>
      </>
    );
  },
};

export const EmptyState: Story = {
  render: () => (
    <Table aria-label="Search results">
      <TableHeader>
        <TableColumnHeader isRowHeader>Name</TableColumnHeader>
        <TableColumnHeader>Type</TableColumnHeader>
        <TableColumnHeader>Date Modified</TableColumnHeader>
      </TableHeader>
      <TableBody renderEmptyState={() => 'No results found.'}>{[]}</TableBody>
    </Table>
  ),
};
