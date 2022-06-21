import React, { useState } from 'react';
import { Stack } from '../Stack';
import { Table } from './Table';
export default {
  title: 'Components/Table',
  argTypes: {
    selectionMode: {
      control: {
        type: 'select',
      },
      options: ['none', 'single', 'multiple'],
      description: 'selection mode',
      defaultValue: 'none',
    },
    focusMode: {
      control: {
        type: 'select',
      },
      options: ['row', 'cell'],
      description: 'Focus Mode with Keyboard',
      defaultValue: 'row',
    },
    stretch: {
      control: {
        type: 'boolean',
      },
      description: 'Stretch to fill the container',
    },
  },
};
export const Basic = args =>
  React.createElement(
    Table,
    { 'aria-label': 'Table with selection', ...args },
    React.createElement(
      Table.Header,
      null,
      React.createElement(Table.Column, null, 'Name'),
      React.createElement(Table.Column, null, 'Firstname'),
      React.createElement(Table.Column, null, 'House'),
      React.createElement(Table.Column, null, 'Year of birth')
    ),
    React.createElement(
      Table.Body,
      null,
      React.createElement(
        Table.Row,
        { key: 1 },
        React.createElement(Table.Cell, null, 'Potter'),
        React.createElement(Table.Cell, null, 'Harry'),
        React.createElement(Table.Cell, null, 'Gryffindor'),
        React.createElement(Table.Cell, null, '1980')
      ),
      React.createElement(
        Table.Row,
        { key: 2 },
        React.createElement(Table.Cell, null, 'Malfoy'),
        React.createElement(Table.Cell, null, 'Draco'),
        React.createElement(Table.Cell, null, 'Slytherin'),
        React.createElement(Table.Cell, null, '1980')
      ),
      React.createElement(
        Table.Row,
        { key: 3 },
        React.createElement(Table.Cell, null, 'Diggory'),
        React.createElement(Table.Cell, null, 'Cedric'),
        React.createElement(Table.Cell, null, 'Hufflepuff'),
        React.createElement(Table.Cell, null, '1977')
      ),
      React.createElement(
        Table.Row,
        { key: 4 },
        React.createElement(Table.Cell, null, 'Lovegood'),
        React.createElement(Table.Cell, null, 'Luna'),
        React.createElement(Table.Cell, null, 'Ravenclaw'),
        React.createElement(Table.Cell, null, '1981')
      )
    )
  );
export const ControlledTable = args => {
  const columns = [
    { name: 'Name', key: 'name' },
    { name: 'Firstname', key: 'firstname' },
    { name: 'House', key: 'house' },
    { name: 'Year of birth', key: 'year' },
  ];
  const rows = [
    {
      id: '1',
      name: 'Potter',
      firstname: 'Harry',
      house: 'Gryffindor',
      year: '1980',
    },
    {
      id: '2',
      name: 'Malfoy',
      firstname: 'Draco',
      house: 'Slytherin',
      year: '1980',
    },
    {
      id: '3',
      name: 'Diggory',
      firstname: 'Cedric',
      house: 'Hufflepuff',
      year: '1977',
    },
    {
      id: '4',
      name: 'Lovegood',
      firstname: 'Luna',
      house: 'Ravenclaw',
      year: '1981',
    },
  ];
  const [selectedKeys, setSelectedKeys] = React.useState(new Set());
  return React.createElement(
    Stack,
    { space: 'small' },
    React.createElement(
      Table,
      {
        'aria-label': 'Example dynamic collection table',
        ...args,
        onSelectionChange: key => setSelectedKeys(new Set(key)),
      },
      React.createElement(Table.Header, { columns: columns }, column =>
        React.createElement(Table.Column, null, column.name)
      ),
      React.createElement(Table.Body, { items: rows }, item =>
        React.createElement(Table.Row, null, columnKey =>
          React.createElement(Table.Cell, null, item[columnKey])
        )
      )
    ),
    React.createElement('div', null, 'Selected rows: ', selectedKeys)
  );
};
// https://react-spectrum.adobe.com/react-aria/useTable.html#nested-columns
export const NestedColumns = () =>
  React.createElement(
    Table,
    { 'aria-label': 'Example table for nested columns' },
    React.createElement(
      Table.Header,
      null,
      React.createElement(
        Table.Column,
        { title: 'Name' },
        React.createElement(Table.Column, { isRowHeader: true }, 'First Name'),
        React.createElement(Table.Column, { isRowHeader: true }, 'Last Name')
      ),
      React.createElement(
        Table.Column,
        { title: 'Information' },
        React.createElement(Table.Column, null, 'Age'),
        React.createElement(Table.Column, null, 'Birthday')
      )
    ),
    React.createElement(
      Table.Body,
      null,
      React.createElement(
        Table.Row,
        null,
        React.createElement(Table.Cell, null, 'Sam'),
        React.createElement(Table.Cell, null, 'Smith'),
        React.createElement(Table.Cell, null, '36'),
        React.createElement(Table.Cell, null, 'May 3')
      ),
      React.createElement(
        Table.Row,
        null,
        React.createElement(Table.Cell, null, 'Julia'),
        React.createElement(Table.Cell, null, 'Jones'),
        React.createElement(Table.Cell, null, '24'),
        React.createElement(Table.Cell, null, 'February 10')
      ),
      React.createElement(
        Table.Row,
        null,
        React.createElement(Table.Cell, null, 'Peter'),
        React.createElement(Table.Cell, null, 'Parker'),
        React.createElement(Table.Cell, null, '28'),
        React.createElement(Table.Cell, null, 'September 7')
      ),
      React.createElement(
        Table.Row,
        null,
        React.createElement(Table.Cell, null, 'Bruce'),
        React.createElement(Table.Cell, null, 'Wayne'),
        React.createElement(Table.Cell, null, '32'),
        React.createElement(Table.Cell, null, 'December 18')
      )
    )
  );
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
export const Sorting = () => {
  const [list, setList] = useState(data);
  const [descriptor, setDescriptor] = useState({});
  const sort = ({ column, direction }) => {
    const result = list.sort((a, b) => {
      const first = a[column];
      const second = b[column];
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
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Table,
      {
        'aria-label': 'Example table with client side sorting',
        sortDescriptor: descriptor,
        onSortChange: sort,
      },
      React.createElement(
        Table.Header,
        null,
        React.createElement(
          Table.Column,
          { key: 'name', allowsSorting: true },
          'Name'
        ),
        React.createElement(
          Table.Column,
          { key: 'height', allowsSorting: true },
          'Height'
        ),
        React.createElement(
          Table.Column,
          { key: 'mass', allowsSorting: true },
          'Mass'
        ),
        React.createElement(
          Table.Column,
          { key: 'birth_year', allowsSorting: true },
          'Birth Year'
        )
      ),
      React.createElement(Table.Body, { items: list }, item =>
        React.createElement(Table.Row, { key: item.name }, columnKey =>
          React.createElement(Table.Cell, null, item[columnKey])
        )
      )
    ),
    React.createElement('br', null),
    React.createElement(
      'pre',
      null,
      'Sort: ',
      descriptor.column,
      ' / ',
      descriptor.direction
    )
  );
};
//# sourceMappingURL=Table.stories.js.map
