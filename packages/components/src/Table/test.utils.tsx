import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { theme } from '@marigold/theme-rui';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { Table } from './Table';

/**
 * Probes for a row's accessible name, shared by the `Table.Cell` and
 * `Table.EditableCell` suites. A row is named by its `rowHeader` cell and
 * `textValue` never renders as an attribute, so typing at the table is the only
 * way to observe any of it.
 */
export const rowNamed = (name: RegExp) => screen.getByRole('row', { name });

/**
 * Render fresh per test: react-aria coalesces keystrokes for about a second, so
 * a leftover buffer bleeds into the next assertion.
 */
export const typeFromTheFirstRow = async (key: string) => {
  const [, firstBodyRow] = screen.getAllByRole('row');
  firstBodyRow.focus();
  await userEvent.keyboard(key);
};

/** A minimal table whose first column is the row header. */
export const GuestTable = ({ children }: { children: ReactNode }) => (
  <MarigoldProvider theme={theme}>
    <Table aria-label="Guests" selectionMode="single">
      <Table.Header>
        <Table.Column rowHeader>Guest</Table.Column>
        <Table.Column>Seat</Table.Column>
      </Table.Header>
      <Table.Body>{children}</Table.Body>
    </Table>
  </MarigoldProvider>
);
