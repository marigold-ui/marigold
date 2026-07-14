import { describe, expect, it } from 'vitest';
import { tmpFile } from '../test-support/tmp.js';
import { validateTableUsage } from './table-usage.js';

describe('validateTableUsage — rowHeader (W3)', () => {
  it('flags a Table whose static columns have no rowHeader', () => {
    const file = tmpFile(
      'tu-no-rowheader.tsx',
      `import { Table } from '@marigold/components';
      const C = () => (
        <Table aria-label="t">
          <Table.Header>
            <Table.Column>Name</Table.Column>
            <Table.Column>Status</Table.Column>
          </Table.Header>
          <Table.Body><Table.Row><Table.Cell>a</Table.Cell><Table.Cell>b</Table.Cell></Table.Row></Table.Body>
        </Table>
      );`
    );
    const issue = validateTableUsage(file).find(
      i => i.component === 'Table' && i.details?.missingRowHeader === true
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
  });

  it('accepts a Table with a rowHeader column', () => {
    const file = tmpFile(
      'tu-rowheader.tsx',
      `import { Table } from '@marigold/components';
      const C = () => (
        <Table aria-label="t">
          <Table.Header>
            <Table.Column rowHeader>Name</Table.Column>
            <Table.Column>Status</Table.Column>
          </Table.Header>
          <Table.Body><Table.Row><Table.Cell>a</Table.Cell><Table.Cell>b</Table.Cell></Table.Row></Table.Body>
        </Table>
      );`
    );
    expect(
      validateTableUsage(file).filter(i => i.details?.missingRowHeader)
    ).toEqual([]);
  });

  it('does not flag a local component that shares the Table name', () => {
    // A project's own <Table> imported from a local module must not be held
    // to the rowHeader rule (regression: this was a false-positive warning
    // on non-Marigold components).
    const file = tmpFile(
      'tu-local-table.tsx',
      `import { Table } from './my-table';
      const C = () => (
        <Table aria-label="t">
          <Table.Header>
            <Table.Column>Name</Table.Column>
          </Table.Header>
        </Table>
      );`
    );
    expect(
      validateTableUsage(file).filter(i => i.details?.missingRowHeader)
    ).toEqual([]);
  });

  it('still flags an aliased Marigold Table whose columns have no rowHeader', () => {
    const file = tmpFile(
      'tu-alias-table.tsx',
      `import { Table as T } from '@marigold/components';
      const C = () => (
        <T aria-label="t">
          <T.Header>
            <T.Column>Name</T.Column>
            <T.Column>Status</T.Column>
          </T.Header>
          <T.Body><T.Row><T.Cell>a</T.Cell><T.Cell>b</T.Cell></T.Row></T.Body>
        </T>
      );`
    );
    const issue = validateTableUsage(file).find(
      i => i.details?.missingRowHeader === true
    );
    expect(issue).toBeDefined();
  });

  it('does not flag dynamically generated columns', () => {
    const file = tmpFile(
      'tu-dynamic-cols.tsx',
      `import { Table } from '@marigold/components';
      const cols = ['Name', 'Status'];
      const C = () => (
        <Table aria-label="t">
          <Table.Header>
            {cols.map(c => <Table.Column key={c}>{c}</Table.Column>)}
          </Table.Header>
          <Table.Body><Table.Row><Table.Cell>a</Table.Cell></Table.Row></Table.Body>
        </Table>
      );`
    );
    expect(
      validateTableUsage(file).filter(i => i.details?.missingRowHeader)
    ).toEqual([]);
  });
});

describe('validateTableUsage — Table misuse (W8/W9)', () => {
  it('flags a form field nested inside a Table', () => {
    const file = tmpFile(
      'tu-field.tsx',
      `import { Table, TextField } from '@marigold/components';
      const C = () => (
        <Table aria-label="t">
          <Table.Body>
            <Table.Row>
              <Table.Cell><TextField label="x" value="" onChange={() => {}} /></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );`
    );
    const issue = validateTableUsage(file).find(
      i => i.component === 'TextField'
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
    expect(issue?.details?.insideTable).toBe(true);
  });

  it('flags a SearchField nested inside a Table', () => {
    const file = tmpFile(
      'tu-search.tsx',
      `import { Table, SearchField } from '@marigold/components';
      const C = () => (
        <Table aria-label="t">
          <Table.Body>
            <Table.Row><Table.Cell><SearchField label="s" /></Table.Cell></Table.Row>
          </Table.Body>
        </Table>
      );`
    );
    const issue = validateTableUsage(file).find(
      i => i.component === 'SearchField'
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
  });

  it('does not flag a form field outside any Table', () => {
    const file = tmpFile(
      'tu-field-ok.tsx',
      `import { Stack, TextField, SearchField } from '@marigold/components';
      const C = () => (
        <Stack space="regular">
          <SearchField label="s" />
          <TextField label="x" value="" onChange={() => {}} />
        </Stack>
      );`
    );
    expect(validateTableUsage(file)).toEqual([]);
  });

  it('does not flag a local component that shares the TextField name inside a local Table', () => {
    // Neither the field nor its ancestor table is a real Marigold import —
    // regression: the field-in-table rule used to match both by bare name.
    const file = tmpFile(
      'tu-local-field.tsx',
      `import { Table } from './my-table';
      import { TextField } from './my-textfield';
      const C = () => (
        <Table>
          <TextField label="x" value="" onChange={() => {}} />
        </Table>
      );`
    );
    expect(validateTableUsage(file)).toEqual([]);
  });

  it('still flags an aliased Marigold TextField nested inside an aliased Marigold Table', () => {
    const file = tmpFile(
      'tu-alias-field.tsx',
      `import { Table as T, TextField as TF } from '@marigold/components';
      const C = () => (
        <T aria-label="t">
          <T.Body>
            <T.Row><T.Cell><TF label="x" value="" onChange={() => {}} /></T.Cell></T.Row>
          </T.Body>
        </T>
      );`
    );
    const issue = validateTableUsage(file).find(i => i.component === 'TF');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
    expect(issue?.details?.insideTable).toBe(true);
  });
});
