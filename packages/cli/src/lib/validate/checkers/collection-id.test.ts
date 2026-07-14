import { describe, expect, it } from 'vitest';
import { tmpFile } from '../test-support/tmp.js';
import { validateCollectionId } from './collection-id.js';

describe('validateCollectionId', () => {
  it('flags a statically written collection item without an id', () => {
    const file = tmpFile(
      'cid-no-id.tsx',
      `import { Select } from '@marigold/components';
      const C = () => (
        <Select label="pick">
          <Select.Option>A</Select.Option>
        </Select>
      );`
    );
    const issue = validateCollectionId(file).find(
      i => i.component === 'Select.Option'
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
    expect(issue?.source).toBe('collection-id');
  });

  it('does not flag positional/container sub-components that merely accept a DOM id', () => {
    const file = tmpFile(
      'cid-table-cell.tsx',
      `import { Table } from '@marigold/components';
      const C = () => (
        <Table aria-label="t">
          <Table.Header>
            <Table.Column>Name</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Alice</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );`
    );
    // Table.Cell / Table.Column / Table.Row are NOT keyed collection items —
    // they accept a DOM id but must not be flagged (was the FP source).
    expect(validateCollectionId(file)).toEqual([]);
  });

  it('accepts a collection item with an id', () => {
    const file = tmpFile(
      'cid-id.tsx',
      `import { Select } from '@marigold/components';
      const C = () => (
        <Select label="pick">
          <Select.Option id="a">A</Select.Option>
        </Select>
      );`
    );
    expect(validateCollectionId(file)).toEqual([]);
  });

  it('accepts a collection item carrying a React key (dynamic map)', () => {
    const file = tmpFile(
      'cid-key.tsx',
      `import { Select } from '@marigold/components';
      const data = [{ id: 'a', n: 'A' }];
      const C = () => (
        <Select label="pick">
          {data.map(d => <Select.Option key={d.id}>{d.n}</Select.Option>)}
        </Select>
      );`
    );
    expect(validateCollectionId(file)).toEqual([]);
  });

  it('does not flag items rendered from an items prop (id flows from data)', () => {
    const file = tmpFile(
      'cid-items.tsx',
      `import { Select } from '@marigold/components';
      const data = [{ id: 'a', n: 'A' }];
      const C = () => (
        <Select label="pick" items={data}>
          {(d: any) => <Select.Option>{d.n}</Select.Option>}
        </Select>
      );`
    );
    expect(validateCollectionId(file)).toEqual([]);
  });

  it('does not flag an item with spread props (id may be inside)', () => {
    const file = tmpFile(
      'cid-spread.tsx',
      `import { Select } from '@marigold/components';
      const C = (optProps: any) => (
        <Select label="pick">
          <Select.Option {...optProps}>A</Select.Option>
        </Select>
      );`
    );
    expect(validateCollectionId(file)).toEqual([]);
  });

  it('does not flag a sub-component of a non-collection component', () => {
    const file = tmpFile(
      'cid-non-collection.tsx',
      `import { Dialog } from '@marigold/components';
      const C = () => (
        <Dialog.Trigger>
          <Dialog>
            <Dialog.Title>Hi</Dialog.Title>
          </Dialog>
        </Dialog.Trigger>
      );`
    );
    expect(validateCollectionId(file)).toEqual([]);
  });

  it('does not flag a local component that shares the Select name', () => {
    // A project's own <Select> imported from a local module must not be held
    // to Marigold's keyed-collection-id rule (regression: this was a
    // false-positive warning on non-Marigold components).
    const file = tmpFile(
      'cid-local-select.tsx',
      `import { Select } from './my-select';
      const C = () => (
        <Select label="pick">
          <Select.Option>A</Select.Option>
        </Select>
      );`
    );
    expect(validateCollectionId(file)).toEqual([]);
  });

  it('still flags an aliased Marigold Select.Option without an id', () => {
    const file = tmpFile(
      'cid-alias-select.tsx',
      `import { Select as S } from '@marigold/components';
      const C = () => (
        <S label="pick">
          <S.Option>A</S.Option>
        </S>
      );`
    );
    const issue = validateCollectionId(file).find(
      i => i.component === 'S.Option'
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
  });
});
