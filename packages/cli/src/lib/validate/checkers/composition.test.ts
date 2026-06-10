import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateComposition } from './composition.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = (name: string): string =>
  path.join(__dirname, '..', 'examples', name);

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

  it('does not flag partially-missing sub-components (too often optional)', () => {
    // invalid-dialog has a Dialog (with a Trigger ancestor) but no Title/Content.
    // Those slots are optional in practice, so a partial-missing warning would
    // be a false positive — only a completely empty compound is an error.
    const issues = validateComposition(fixture('invalid-dialog.tsx'));
    const missingWarning = issues.find(
      i =>
        i.component === 'Dialog' && i.message.includes('missing sub-components')
    );
    expect(missingWarning).toBeUndefined();
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

  it('does not flag missing items on collection compounds', () => {
    // Tabs is a collection compound (exposes Item/TabPanel). Collections repeat
    // their items by design and their requirements are not statically
    // enforceable, so a "missing TabPanel" warning would be a false positive.
    const issues = validateComposition(fixture('invalid-tabs.tsx'));
    const tabsWarning = issues.find(
      i => i.component === 'Tabs' && i.message.includes('missing')
    );
    expect(tabsWarning).toBeUndefined();
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

  it('does not emit false warnings when children are dynamic', () => {
    // The contents of {children} cannot be analyzed statically, so a compound
    // with only dynamic children must not be flagged as empty or incomplete.
    const file = tmpFile(
      'cv-dynamic.tsx',
      `import { Dialog } from '@marigold/components';
      const C = ({ children }: { children: React.ReactNode }) => (
        <Dialog>{children}</Dialog>
      );`
    );
    const issues = validateComposition(file);
    expect(issues.filter(i => i.component === 'Dialog')).toEqual([]);
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

  it('does not flag self-populating compounds used standalone', () => {
    // <FileField multiple /> renders <FileField.Item> internally per selected
    // file; the bare element is the canonical usage. Flagging it as "used
    // without sub-components" is a false positive that only penalises code
    // using the richer component.
    const file = tmpFile(
      'cv-filefield.tsx',
      `import { FileField } from '@marigold/components';
const C = () => <FileField label="Select files" multiple />;`
    );
    const issues = validateComposition(file);
    const fileFieldError = issues.find(
      i =>
        i.component === 'FileField' &&
        i.message.includes('without any of its sub-components')
    );
    expect(fileFieldError).toBeUndefined();
  });

  it('does not flag a bare Checkbox (Checkbox.Group is a parent wrapper, not a child slot)', () => {
    // Checkbox exposes Checkbox.Group, but Group is an INVERSE compound: the
    // group wraps <Checkbox> children, it is not a required child of Checkbox.
    // A bare <Checkbox> inside a <CheckboxGroup> is canonical usage.
    const file = tmpFile(
      'cv-checkbox-group.tsx',
      `import { CheckboxGroup, Checkbox } from '@marigold/components';
const C = () => (
  <CheckboxGroup label="Prefs">
    <Checkbox value="a" label="A" />
    <Checkbox value="b" label="B" />
  </CheckboxGroup>
);`
    );
    const issues = validateComposition(file);
    const checkboxError = issues.find(
      i =>
        i.component === 'Checkbox' &&
        i.message.includes('without any of its sub-components')
    );
    expect(checkboxError).toBeUndefined();
  });

  it('does not flag a standalone Checkbox', () => {
    const file = tmpFile(
      'cv-checkbox-standalone.tsx',
      `import { Checkbox } from '@marigold/components';
const C = () => <Checkbox value="a" label="Accept" />;`
    );
    const issues = validateComposition(file);
    const checkboxError = issues.find(
      i =>
        i.component === 'Checkbox' &&
        i.message.includes('without any of its sub-components')
    );
    expect(checkboxError).toBeUndefined();
  });

  it('does not flag a Tooltip wrapped in a standalone TooltipTrigger', () => {
    // Tooltip's only sub-component is Trigger, which is an inverse wrapper:
    // <TooltipTrigger> takes <Tooltip> as content. The bare <Tooltip> holding
    // text is canonical, so requiring <Tooltip.Trigger> as a child is a false
    // positive.
    const file = tmpFile(
      'cv-tooltip-trigger.tsx',
      `import { TooltipTrigger, Tooltip, Button } from '@marigold/components';
const C = () => (
  <TooltipTrigger>
    <Button>Info</Button>
    <Tooltip>Aggregate of all team members.</Tooltip>
  </TooltipTrigger>
);`
    );
    const issues = validateComposition(file);
    const tooltipError = issues.find(
      i =>
        i.component === 'Tooltip' &&
        i.message.includes('without any of its sub-components')
    );
    expect(tooltipError).toBeUndefined();
  });

  it('does not flag a SectionMessage with plain text children', () => {
    // SectionMessage renders its content from the `children` prop; Title and
    // Content are optional structure. A bare message is valid usage.
    const file = tmpFile(
      'cv-sectionmessage.tsx',
      `import { SectionMessage } from '@marigold/components';
const C = () => (
  <SectionMessage variant="info">Sprint 14 ends in 3 days.</SectionMessage>
);`
    );
    const issues = validateComposition(file);
    const smError = issues.find(
      i =>
        i.component === 'SectionMessage' &&
        i.message.includes('without any of its sub-components')
    );
    expect(smError).toBeUndefined();
  });

  // Finding #2: opaque dynamic children suppress the empty-compound error.
  it('does not flag a compound with a non-iteration call child {renderContent()}', () => {
    const file = tmpFile(
      'cv-render-call.tsx',
      `import { Dialog } from '@marigold/components';
      const renderContent = () => null;
      const C = () => <Dialog>{renderContent()}</Dialog>;`
    );
    const issues = validateComposition(file);
    expect(issues.filter(i => i.component === 'Dialog')).toEqual([]);
  });

  it('does not flag a compound with {props.children}', () => {
    const file = tmpFile(
      'cv-props-children.tsx',
      `import { Dialog } from '@marigold/components';
      const C = (props: { children: React.ReactNode }) => (
        <Dialog>{props.children}</Dialog>
      );`
    );
    const issues = validateComposition(file);
    expect(issues.filter(i => i.component === 'Dialog')).toEqual([]);
  });

  it('does not flag a compound with a conditional element child', () => {
    const file = tmpFile(
      'cv-conditional.tsx',
      `import { Dialog } from '@marigold/components';
      const C = ({ cond }: { cond: boolean }) => (
        <Dialog>
          {cond ? <Dialog.Content>a</Dialog.Content> : <Dialog.Title>b</Dialog.Title>}
        </Dialog>
      );`
    );
    const issues = validateComposition(file);
    expect(issues.filter(i => i.component === 'Dialog')).toEqual([]);
  });

  it('still errors on a compound with only a static non-sub child', () => {
    const file = tmpFile(
      'cv-static-bare.tsx',
      `import { Dialog } from '@marigold/components';
      const C = () => <Dialog><p>bare</p></Dialog>;`
    );
    const issues = validateComposition(file);
    const dialogError = issues.find(
      i => i.component === 'Dialog' && i.severity === 'error'
    );
    expect(dialogError).toBeDefined();
  });

  // Finding #3: spread guard suppresses the empty-compound error.
  it('does not flag a self-closing compound with spread attributes', () => {
    const file = tmpFile(
      'cv-spread-attr.tsx',
      `import { Dialog } from '@marigold/components';
      const C = (dialogProps: any) => <Dialog {...dialogProps} />;`
    );
    const issues = validateComposition(file);
    const dialogError = issues.find(
      i =>
        i.component === 'Dialog' &&
        i.message.includes('without any of its sub-components')
    );
    expect(dialogError).toBeUndefined();
  });

  it('does not flag a non-self-closing compound with a spread attribute', () => {
    const file = tmpFile(
      'cv-spread-attr-open.tsx',
      `import { Dialog } from '@marigold/components';
      const C = (dialogProps: any) => (
        <Dialog {...dialogProps}><p>bare</p></Dialog>
      );`
    );
    const issues = validateComposition(file);
    const dialogError = issues.find(
      i =>
        i.component === 'Dialog' &&
        i.message.includes('without any of its sub-components')
    );
    expect(dialogError).toBeUndefined();
  });

  it('does not warn about repeated sub-components on toolbar compounds', () => {
    // An ActionBar is a toolbar of N action buttons; repeating
    // <ActionBar.Button> is correct usage, not a duplicate-slot mistake.
    const file = tmpFile(
      'cv-actionbar.tsx',
      `import { ActionBar } from '@marigold/components';
const C = () => (
  <ActionBar>
    <ActionBar.Button>Edit</ActionBar.Button>
    <ActionBar.Button>Copy</ActionBar.Button>
    <ActionBar.Button>Delete</ActionBar.Button>
  </ActionBar>
);`
    );
    const issues = validateComposition(file);
    const dupWarning = issues.find(
      i => i.component === 'ActionBar' && i.message.includes('times')
    );
    expect(dupWarning).toBeUndefined();
  });
});
