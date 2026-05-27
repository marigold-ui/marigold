import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateComposition } from './composition.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = (name: string): string =>
  path.join(__dirname, '..', '__fixtures__', name);

const tmpFile = (name: string, content: string): string => {
  const p = path.join(os.tmpdir(), name);
  fs.writeFileSync(p, content);
  return p;
};

describe('validateComposition', () => {
  it('returns no issues for a valid Dialog with all sub-components', () => {
    const issues = validateComposition(fixture('valid-dialog.tsx'));
    expect(issues).toEqual([]);
  });

  it('returns error when Dialog has zero sub-components', () => {
    const file = tmpFile(
      'cv-dialog-empty.tsx',
      `import { Dialog } from '@marigold/components';
      const C = () => <Dialog><p>bare</p></Dialog>;`
    );
    const issues = validateComposition(file);
    const dialogIssue = issues.find(i => i.component === 'Dialog');
    expect(dialogIssue).toBeDefined();
    expect(dialogIssue?.severity).toBe('error');
    expect(dialogIssue?.message).toContain('without any of its sub-components');
  });

  it('returns warning when Dialog is missing some sub-components', () => {
    const issues = validateComposition(fixture('invalid-dialog.tsx'));
    const dialogIssue = issues.find(i => i.component === 'Dialog');
    expect(dialogIssue).toBeDefined();
    expect(dialogIssue?.severity).toBe('warning');
    expect(dialogIssue?.message).toContain('missing sub-components');
  });

  it('counts Dialog.Trigger as a parent wrapper (ancestor check)', () => {
    const issues = validateComposition(fixture('valid-dialog.tsx'));
    const triggerMissing = issues.find(
      i => i.component === 'Dialog' && i.message.includes('Trigger')
    );
    expect(triggerMissing).toBeUndefined();
  });

  it('returns error when Select has no sub-components', () => {
    const issues = validateComposition(fixture('invalid-select.tsx'));
    const selectIssue = issues.find(i => i.component === 'Select');
    expect(selectIssue).toBeDefined();
    expect(selectIssue?.severity).toBe('error');
  });

  it('returns no errors for Select with Option children', () => {
    const file = tmpFile(
      'cv-select-valid.tsx',
      `import { Select } from '@marigold/components';
      const C = () => (
        <Select label="pick">
          <Select.Option id="a">A</Select.Option>
          <Select.Option id="b">B</Select.Option>
        </Select>
      );`
    );
    const issues = validateComposition(file);
    const selectError = issues.find(
      i => i.component === 'Select' && i.severity === 'error'
    );
    expect(selectError).toBeUndefined();
  });

  it('returns warning when Tabs is missing TabPanel', () => {
    const issues = validateComposition(fixture('invalid-tabs.tsx'));
    const tabsIssue = issues.find(i => i.component === 'Tabs');
    expect(tabsIssue).toBeDefined();
    expect(tabsIssue?.severity).toBe('warning');
    expect(tabsIssue?.message).toContain('TabPanel');
  });

  it('finds sub-components inside render function children', () => {
    const file = tmpFile(
      'cv-render-fn.tsx',
      `import { Dialog } from '@marigold/components';
      const C = () => (
        <Dialog>
          {({ close }) => (
            <>
              <Dialog.Title>Hi</Dialog.Title>
              <Dialog.Content>content</Dialog.Content>
              <Dialog.Actions>
                <button onClick={close}>close</button>
              </Dialog.Actions>
            </>
          )}
        </Dialog>
      );`
    );
    const issues = validateComposition(file);
    const dialogIssue = issues.find(
      i => i.component === 'Dialog' && i.severity === 'error'
    );
    expect(dialogIssue).toBeUndefined();
  });

  it('does not validate nested different compound components as one', () => {
    const file = tmpFile(
      'cv-nested.tsx',
      `import { Dialog, Tabs } from '@marigold/components';
      const C = () => (
        <Dialog>
          <Dialog.Title>Settings</Dialog.Title>
          <Dialog.Content>
            <Tabs>
              <Tabs.List>
                <Tabs.Item id="a">A</Tabs.Item>
                <Tabs.Item id="b">B</Tabs.Item>
              </Tabs.List>
              <Tabs.TabPanel id="a">Panel A</Tabs.TabPanel>
              <Tabs.TabPanel id="b">Panel B</Tabs.TabPanel>
            </Tabs>
          </Dialog.Content>
          <Dialog.Actions><button>OK</button></Dialog.Actions>
        </Dialog>
      );`
    );
    const issues = validateComposition(file);
    const tabsAsDialogChild = issues.find(
      i => i.component === 'Dialog' && i.message.includes('Tabs')
    );
    expect(tabsAsDialogChild).toBeUndefined();
  });

  it('emits warnings for missing sub-components when children are dynamic', () => {
    const file = tmpFile(
      'cv-dynamic.tsx',
      `import { Dialog } from '@marigold/components';
      const C = ({ children }: { children: React.ReactNode }) => (
        <Dialog>{children}</Dialog>
      );`
    );
    const issues = validateComposition(file);
    const dialogIssues = issues.filter(i => i.component === 'Dialog');
    expect(dialogIssues.length).toBeGreaterThan(0);
    for (const issue of dialogIssues) {
      expect(issue.severity).toBe('warning');
      expect(issue.details?.dynamicChildren).toBe(true);
    }
  });

  it('returns no issues for non-compound components', () => {
    const issues = validateComposition(fixture('valid-button.tsx'));
    expect(issues).toEqual([]);
  });

  it('throws for a non-existent file', () => {
    expect(() => validateComposition('/non/existent/file.tsx')).toThrow(
      'Could not read file'
    );
  });

  it('includes location info on issues', () => {
    const issues = validateComposition(fixture('invalid-select.tsx'));
    const issue = issues.find(i => i.component === 'Select');
    expect(issue?.location).toBeDefined();
    expect(issue?.location?.line).toBeGreaterThan(0);
    expect(issue?.location?.column).toBeGreaterThan(0);
  });

  it('includes expected and found details', () => {
    const issues = validateComposition(fixture('invalid-select.tsx'));
    const issue = issues.find(i => i.component === 'Select');
    expect(issue?.details).toHaveProperty('expected');
    expect(issue?.details).toHaveProperty('found');
  });

  it('all issues have type technical', () => {
    const issues = validateComposition(fixture('invalid-dialog.tsx'));
    for (const issue of issues) {
      expect(issue.type).toBe('technical');
    }
  });

  it('warns about duplicate sub-components', () => {
    const file = tmpFile(
      'cv-duplicate-sub.tsx',
      `import { Dialog } from '@marigold/components';
const C = () => (
  <Dialog>
    <Dialog.Title>A</Dialog.Title>
    <Dialog.Title>B</Dialog.Title>
    <Dialog.Content>C</Dialog.Content>
    <Dialog.Actions>D</Dialog.Actions>
  </Dialog>
);`
    );
    const issues = validateComposition(file);
    const dupIssue = issues.find(
      i =>
        i.component === 'Dialog' &&
        i.message.includes('Dialog.Title') &&
        i.message.includes('2 times')
    );
    expect(dupIssue).toBeDefined();
    expect(dupIssue?.severity).toBe('warning');
    expect(dupIssue?.details?.count).toBe(2);
    expect(dupIssue?.details?.subComponent).toBe('Title');
  });

  it('flags self-closing compound component as error', () => {
    const file = tmpFile(
      'cv-self-closing.tsx',
      `import { Dialog } from '@marigold/components';
const C = () => <Dialog />;`
    );
    const issues = validateComposition(file);
    const dialogIssue = issues.find(
      i =>
        i.component === 'Dialog' &&
        i.severity === 'error' &&
        i.message.includes('without any of its sub-components')
    );
    expect(dialogIssue).toBeDefined();
    expect(dialogIssue?.severity).toBe('error');
  });

  it('treats Table.Section as optional per-component config', () => {
    const file = tmpFile(
      'cv-table-no-section.tsx',
      `import { Table } from '@marigold/components';
const C = () => (
  <Table aria-label="test">
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
    const issues = validateComposition(file);
    const sectionError = issues.find(
      i => i.component === 'Table' && i.message.includes('Section')
    );
    expect(sectionError).toBeUndefined();
  });
});
