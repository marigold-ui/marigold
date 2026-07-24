import { v18 } from './manifests/v18.js';
import {
  removeJsxProps,
  renameImports,
  renameJsxMembers,
  renameJsxProps,
  reportJsxUsage,
  reportNamespaceImports,
} from './primitives/jsx.js';
import { assertEdited } from './test-helpers.js';
import type { CodemodOutcome } from './types.js';

const warningsOf = (result: CodemodOutcome): string[] =>
  result.kind === 'skipped' ? [] : result.warnings;

describe('rename-jsx-props', () => {
  test('renames Inset spacing props', () => {
    const source = `import { Inset } from '@marigold/components';
export const App = () => (
  <Inset space={4}>
    <Inset spaceX="small" spaceY={2}>content</Inset>
  </Inset>
);
`;
    const result = renameJsxProps(v18).apply(source);

    assertEdited(result);
    expect(result.output).toContain('<Inset p={4}>');
    expect(result.output).toContain('<Inset px="small" py={2}>');
    expect(result.changes).toHaveLength(3);
  });

  test('anchors on the import: other packages and local components stay untouched', () => {
    const source = `import { Inset } from './my-components';
export const App = () => <Inset space={4} />;
`;
    expect(renameJsxProps(v18).apply(source).kind).toBe('unchanged');
  });

  test('follows aliased imports', () => {
    const source = `import { Inset as Spacing } from '@marigold/components';
export const App = () => <Spacing space={4} />;
`;
    const result = renameJsxProps(v18).apply(source);

    assertEdited(result);
    expect(result.output).toContain('<Spacing p={4} />');
  });

  test('wraps acceptedFileType values in an array', () => {
    const source = `import { FileField } from '@marigold/components';
export const A = () => <FileField acceptedFileType="image/png" />;
export const B = ({ types }: { types: string }) => (
  <FileField acceptedFileType={types} />
);
export const C = () => <FileField acceptedFileType={['image/png']} />;
`;
    const result = renameJsxProps(v18).apply(source);

    assertEdited(result);
    expect(result.output).toContain(`acceptedFileTypes={['image/png']} />`);
    expect(result.output).toContain('acceptedFileTypes={[types]}');
    // already an array: renamed but not double-wrapped
    expect(result.output).not.toContain(`{[['image/png']]}`);
  });
});

describe('rename-jsx-members', () => {
  test('renames Tabs.TabPanel to Tabs.Panel on opening and closing tags', () => {
    const source = `import { Tabs } from '@marigold/components';
export const App = () => (
  <Tabs>
    <Tabs.TabPanel id="one">content</Tabs.TabPanel>
  </Tabs>
);
`;
    const result = renameJsxMembers(v18).apply(source);

    assertEdited(result);
    expect(result.output).toContain(
      '<Tabs.Panel id="one">content</Tabs.Panel>'
    );
    expect(result.output).not.toContain('TabPanel');
  });

  test('renames SelectList.Item to SelectList.Option', () => {
    const source = `import { SelectList } from '@marigold/components';
export const App = () => (
  <SelectList>
    <SelectList.Item id="a">A</SelectList.Item>
  </SelectList>
);
`;
    const result = renameJsxMembers(v18).apply(source);

    assertEdited(result);
    expect(result.output).toContain(
      '<SelectList.Option id="a">A</SelectList.Option>'
    );
  });

  test('leaves foreign Tabs alone', () => {
    const source = `import { Tabs } from 'other-lib';
export const App = () => <Tabs.TabPanel>content</Tabs.TabPanel>;
`;
    expect(renameJsxMembers(v18).apply(source).kind).toBe('unchanged');
  });
});

describe('remove-jsx-props', () => {
  test('removes dropped TextField props and keeps the rest intact', () => {
    const source = `import { TextField } from '@marigold/components';
export const App = () => (
  <TextField label="Age" min={0} max={120} required />
);
`;
    const result = removeJsxProps(v18).apply(source);

    assertEdited(result);
    expect(result.output).toContain('<TextField label="Age" required />');
    expect(result.changes[0]).toContain('use NumberField');
  });
});

describe('rename-imports', () => {
  test('renames the import and every usage directly when safe', () => {
    const source = `import { Pickup, Clock } from '@marigold/icons';
const icon = Pickup;
export const App = () => <Pickup size={48} color="gray-100" />;
`;
    const result = renameImports(v18).apply(source);

    assertEdited(result);
    expect(result.output).toContain(
      `import { Store, Clock } from '@marigold/icons';`
    );
    expect(result.output).toContain('const icon = Store;');
    expect(result.output).toContain('<Store size={48} color="gray-100" />');
    expect(result.changes[0]).toContain('import + 2 usages');
  });

  test('does not touch member accesses or object keys with the old name', () => {
    const source = `import { Pickup } from '@marigold/icons';
const config = { Pickup: 1, render: () => <Pickup /> };
export const x = config.Pickup;
`;
    const result = renameImports(v18).apply(source);

    assertEdited(result);
    expect(result.output).toContain('{ Pickup: 1,');
    expect(result.output).toContain('config.Pickup');
    expect(result.output).toContain('<Store />');
  });

  test('does not touch JSX member properties with the old name', () => {
    const source = `import { Pickup } from '@marigold/icons';
const Icons = { Pickup: () => null };
export const App = () => (
  <div>
    <Icons.Pickup />
    <Pickup />
  </div>
);
`;
    const result = renameImports(v18).apply(source);

    assertEdited(result);
    expect(result.output).toContain(`import { Store } from '@marigold/icons';`);
    expect(result.output).toContain('<Icons.Pickup />');
    expect(result.output).toContain('<Store />');
  });

  test('falls back to an alias when the old name is re-exported', () => {
    const source = `import { Pickup } from '@marigold/icons';
export { Pickup };
export const App = () => <Pickup />;
`;
    const result = renameImports(v18).apply(source);

    assertEdited(result);
    expect(result.output).toContain(
      `import { Store as Pickup } from '@marigold/icons';`
    );
    expect(result.output).toContain('export { Pickup };');
    expect(result.output).toContain('<Pickup />');
    expect(result.changes[0]).toContain('re-exported from this file');
  });

  test('rewrites re-exports from the package, keeping the public name', () => {
    const source = `export { Pickup } from '@marigold/icons';
export { Email as MailIcon } from '@marigold/icons';
`;
    const result = renameImports(v18).apply(source);

    assertEdited(result);
    expect(result.output).toContain(
      `export { Store as Pickup } from '@marigold/icons';`
    );
    expect(result.output).toContain(
      `export { Mail as MailIcon } from '@marigold/icons';`
    );
  });

  test('falls back to an alias when the new name already exists in the file', () => {
    const source = `import { Pickup } from '@marigold/icons';
import { Store } from './my-store';
export const App = () => <Pickup />;
`;
    const result = renameImports(v18).apply(source);

    assertEdited(result);
    expect(result.output).toContain(
      `import { Store as Pickup } from '@marigold/icons';`
    );
    expect(result.output).toContain('<Pickup />');
    expect(result.changes[0]).toContain('already used in this file');
  });

  test('falls back to an alias when the old name is shadowed or shorthand', () => {
    const source = `import { Pickup } from '@marigold/icons';
export const options = { Pickup };
`;
    const result = renameImports(v18).apply(source);

    assertEdited(result);
    expect(result.output).toContain(
      `import { Store as Pickup } from '@marigold/icons';`
    );
    expect(result.output).toContain('{ Pickup }');
  });

  test('only swaps the imported name when already aliased', () => {
    const source = `import { Email as MailIcon } from '@marigold/icons';
export const App = () => <MailIcon />;
`;
    const result = renameImports(v18).apply(source);

    assertEdited(result);
    expect(result.output).toContain(
      `import { Mail as MailIcon } from '@marigold/icons';`
    );
    expect(result.output).toContain('<MailIcon />');
  });

  test('follows the official mapping, not lookalike names', () => {
    // the TS suggestion for CircleChecked is CircleCheck — the official
    // mapping says CircleDot (it was a radio indicator)
    const source = `import { CircleChecked } from '@marigold/icons';
export const App = () => <CircleChecked />;
`;
    const result = renameImports(v18).apply(source);

    assertEdited(result);
    expect(result.output).toContain(
      `import { CircleDot } from '@marigold/icons';`
    );
    expect(result.output).toContain('<CircleDot />');
  });

  test('leaves kept exports and other packages alone', () => {
    const source = `import { Clock, Search, Stadium } from '@marigold/icons';
import { Email } from 'other-icons';
export const App = () => <Clock />;
`;
    expect(renameImports(v18).apply(source).kind).toBe('unchanged');
  });

  test('is idempotent: renamed and aliased output is not rewritten again', () => {
    const direct = `import { Store } from '@marigold/icons';
export const App = () => <Store />;
`;
    const aliased = `import { Store as Pickup } from '@marigold/icons';
export const App = () => <Pickup />;
`;
    const reexported = `export { Store as Pickup } from '@marigold/icons';
`;
    expect(renameImports(v18).apply(direct).kind).toBe('unchanged');
    expect(renameImports(v18).apply(aliased).kind).toBe('unchanged');
    expect(renameImports(v18).apply(reexported).kind).toBe('unchanged');
  });
});

describe('report-namespace-imports', () => {
  test('warns on namespace imports of migration-affected packages', () => {
    const source = `import * as Icons from '@marigold/icons';
export const App = () => <Icons.Pickup />;
`;
    const warnings = warningsOf(reportNamespaceImports(v18).apply(source));

    expect(warnings).toEqual([
      expect.stringContaining(
        "`import * as Icons from '@marigold/icons'`: the codemods cannot follow namespace imports"
      ),
    ]);
  });

  test('stays silent for unaffected packages', () => {
    const source = `import * as path from 'node:path';
export const join = path.join;
`;
    expect(warningsOf(reportNamespaceImports(v18).apply(source))).toEqual([]);
  });
});

describe('report-jsx-usage', () => {
  test('warns on removed components when imported', () => {
    const source = `import { Multiselect } from '@marigold/components';
export const App = () => <Multiselect items={[]} />;
`;
    const warnings = warningsOf(reportJsxUsage(v18).apply(source));
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('TagField');
  });

  test('warns on value-conditional props only for the named value', () => {
    const source = `import { Select } from '@marigold/components';
export const A = () => <Select width="fit" />;
export const B = () => <Select width="full" />;
`;
    const warnings = warningsOf(reportJsxUsage(v18).apply(source));
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('width="fit"');
  });

  test('warns when a conditional value cannot be verified statically', () => {
    const source = `import { Switch } from '@marigold/components';
export const App = ({ size }: { size: string }) => <Switch size={size} />;
`;
    const warnings = warningsOf(reportJsxUsage(v18).apply(source));
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('variant="settings"');
  });

  test('warns on removed one-sided Card paddings', () => {
    const source = `import { Card } from '@marigold/components';
export const App = () => <Card stretch pt={2} pb={0}>content</Card>;
`;
    const warnings = warningsOf(reportJsxUsage(v18).apply(source));
    expect(warnings).toHaveLength(2);
    expect(warnings[0]).toContain('only p/px/py remain');
  });

  test('warns on the changed SelectList onChange signature', () => {
    const source = `import { SelectList } from '@marigold/components';
export const App = () => <SelectList onChange={() => {}} />;
`;
    const warnings = warningsOf(reportJsxUsage(v18).apply(source));
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('Selection set');
  });

  test('warns on Tooltip open regardless of value', () => {
    const source = `import { Tooltip } from '@marigold/components';
export const App = () => <Tooltip open>hint</Tooltip>;
`;
    const warnings = warningsOf(reportJsxUsage(v18).apply(source));
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('Tooltip.Trigger');
  });
});
