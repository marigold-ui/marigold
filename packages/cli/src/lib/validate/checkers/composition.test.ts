import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadMarigoldRegistry } from '../helpers/components.js';
import { tmpFile } from '../test-support/tmp.js';
import { validateComposition } from './composition.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = (name: string): string =>
  path.join(__dirname, '..', 'examples', name);

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

  it('does not flag a local component that shares a Marigold compound name', () => {
    const file = tmpFile(
      'cv-local-sidebar.tsx',
      `import { Sidebar } from './my-sidebar';
      const C = () => <Sidebar />;`
    );
    const issues = validateComposition(file);
    expect(issues.find(i => i.component === 'Sidebar')).toBeUndefined();
  });

  it('still flags an aliased Marigold compound used without sub-components', () => {
    // `{ Dialog as D }` must be checked against its real name (Dialog); the
    // reported component keeps the alias as written.
    const file = tmpFile(
      'cv-alias-dialog.tsx',
      `import { Dialog as D } from '@marigold/components';
      const C = () => <D><p>bare</p></D>;`
    );
    const issues = validateComposition(file);
    const issue = issues.find(i => i.component === 'D');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error');
    expect(issue?.message).toContain('without any of its sub-components');
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

  it('does not double-count sub-components from a nested same-name compound', () => {
    // A confirm Dialog nested inside another Dialog's content is realistic
    // (e.g. "discard unsaved changes?"). Its own Title/Content/Actions must
    // not be misattributed to the outer Dialog's counts as duplicates.
    const file = tmpFile(
      'cv-nested-same-name.tsx',
      `import { Dialog } from '@marigold/components';
      const C = () => (
        <Dialog>
          <Dialog.Title>Settings</Dialog.Title>
          <Dialog.Content>
            <Dialog>
              <Dialog.Title>Discard changes?</Dialog.Title>
              <Dialog.Content>You have unsaved changes.</Dialog.Content>
              <Dialog.Actions><button>Discard</button></Dialog.Actions>
            </Dialog>
          </Dialog.Content>
          <Dialog.Actions><button>OK</button></Dialog.Actions>
        </Dialog>
      );`
    );
    const issues = validateComposition(file);
    const duplicateWarning = issues.find(
      i => i.component === 'Dialog' && i.severity === 'warning'
    );
    expect(duplicateWarning).toBeUndefined();
  });

  it('does not borrow the outer instance ancestor slot for an empty nested instance of the same compound', () => {
    // The inner Dialog's ancestor chain passes through the outer's own
    // <Dialog.Content>, which belongs to the outer instance. If it were
    // borrowed by ancestor-climbing, this empty inner Dialog would escape the
    // empty-compound error.
    const file = tmpFile(
      'cv-nested-ancestor.tsx',
      `import { Dialog } from '@marigold/components';
      const C = () => (
        <Dialog>
          <Dialog.Content>
            <Dialog><p>bare</p></Dialog>
          </Dialog.Content>
        </Dialog>
      );`
    );
    const issues = validateComposition(file);
    const emptyErrors = issues.filter(
      i =>
        i.component === 'Dialog' &&
        i.message.includes('without any of its sub-components')
    );
    expect(emptyErrors).toHaveLength(1);
  });

  it('does not emit false warnings when children are dynamic', () => {
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

  it('does not emit false warnings when dynamic children are wrapped in a fragment', () => {
    // `hasOpaqueDynamicChild` also recognizes an expression wrapped in a
    // fragment (`<>{children}</>`), whose children are otherwise statically
    // empty of any `<Table.X>` tag — without it the empty-compound error would
    // fire on genuinely dynamic content.
    const file = tmpFile(
      'cv-dynamic-fragment.tsx',
      `import { Table } from '@marigold/components';
      const C = ({ children }: { children: React.ReactNode }) => (
        <Table aria-label="t">
          <>{children}</>
        </Table>
      );`
    );
    const issues = validateComposition(file);
    expect(issues.filter(i => i.component === 'Table')).toEqual([]);
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
    // <FileField multiple /> renders <FileField.Item> internally per file, so
    // the bare element is canonical usage.
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
    // Tooltip's only sub-component is the inverse wrapper Trigger, which takes
    // <Tooltip> as content — so a bare <Tooltip> holding text is canonical.
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

  it('does not flag a compound whose sub-components are delegated to a custom child', () => {
    // A project's own <DialogBody> might render <Dialog.Content>/
    // <Dialog.Title> internally — this static check cannot see into it, so
    // it must not be flagged as a deterministic error.
    const file = tmpFile(
      'cv-custom-child.tsx',
      `import { Dialog } from '@marigold/components';
      const DialogBody = () => (
        <>
          <Dialog.Title>Settings</Dialog.Title>
          <Dialog.Content>…</Dialog.Content>
        </>
      );
      const C = () => (
        <Dialog>
          <DialogBody />
        </Dialog>
      );`
    );
    const dialogError = validateComposition(file).find(
      i => i.component === 'Dialog' && i.severity === 'error'
    );
    expect(dialogError).toBeUndefined();
  });

  it('does not flag a compound whose sub-components are delegated via a dotted custom child', () => {
    // Same unresolved-delegate pattern, but through a dotted tag: the root of
    // the access ("UI") is what must be checked against the resolver.
    const file = tmpFile(
      'cv-dotted-custom-child.tsx',
      `import { Dialog } from '@marigold/components';
      const UI = {
        Header: () => <Dialog.Title>Settings</Dialog.Title>,
      };
      const C = () => (
        <Dialog>
          <UI.Header />
        </Dialog>
      );`
    );
    const dialogError = validateComposition(file).find(
      i => i.component === 'Dialog' && i.severity === 'error'
    );
    expect(dialogError).toBeUndefined();
  });

  it('still errors on a compound whose only child is a known Marigold component', () => {
    // A known Marigold component (Button) never renders another compound's
    // sub-components internally, so its presence must not suppress a
    // genuine finding the way an unresolved custom component does.
    const file = tmpFile(
      'cv-known-component-child.tsx',
      `import { Dialog, Button } from '@marigold/components';
      const C = () => (
        <Dialog>
          <Button>Close</Button>
        </Dialog>
      );`
    );
    const dialogError = validateComposition(file).find(
      i => i.component === 'Dialog' && i.severity === 'error'
    );
    expect(dialogError).toBeDefined();
  });

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

describe('collection classification (contract)', () => {
  // Pins the classification against the real schema, so a change in the
  // component types or the derivation surfaces here instead of silently
  // flipping duplicate warnings on or off.
  it('derives the collection flag from the items prop for the known compounds', () => {
    const reg = loadMarigoldRegistry();
    const derived = [...reg.entries()]
      .filter(([, info]) => info.subComponents.length > 0 && info.collection)
      .map(([name]) => name)
      .sort();
    // Every collection compound carries `items` on itself or a sub-component.
    // Tag is intentionally included: two <Tag.Group>s on a page are legitimate.
    expect(derived).toEqual([
      'ActionMenu',
      'Autocomplete',
      'Breadcrumbs',
      'ComboBox',
      'ListBox',
      'Menu',
      'Select',
      'SelectList',
      'Table',
      'Tabs',
      'Tag',
      'TagField',
    ]);
  });

  it('keeps duplicate warnings alive for singleton-slot compounds', () => {
    const reg = loadMarigoldRegistry();
    for (const name of [
      'Dialog',
      'Drawer',
      'SectionMessage',
      'ContextualHelp',
    ]) {
      expect(reg.get(name)?.collection).toBe(false);
    }
  });
});
