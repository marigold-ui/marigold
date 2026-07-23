import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { runMigrate } from './migrate.js';

// End-to-end run against a miniature portal-shaped theme tree: standalone
// theme, 4-space indent, one style file per component, barrel index.

const CARD = `import { cva, ThemeComponent } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = cva({
    base: ['bg-white rounded-xs'],
    variants: {
        variant: {
            default: 'p-2'
        }
    }
});
`;

const SWITCH = `import { cva, ThemeComponent } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
    container: cva({
        base: 'disabled:cursor-not-allowed disabled:text-disabled-foreground'
    }),
    track: cva({ base: 'flex h-6 w-10' }),
    thumb: cva({ base: 'block size-5' })
};
`;

const INDEX = `export * from './Card.styles';
export * from './Switch.styles';
`;

const setupFixture = (): string => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'marigold-migrate-'));
  const components = path.join(root, 'theme', 'components');
  mkdirSync(components, { recursive: true });
  writeFileSync(path.join(components, 'Card.styles.ts'), CARD);
  writeFileSync(path.join(components, 'Switch.styles.ts'), SWITCH);
  writeFileSync(path.join(components, 'index.ts'), INDEX);
  // decoy that must be ignored: no @marigold/system import
  writeFileSync(
    path.join(root, 'theme', 'unrelated.ts'),
    `export const x = 1;\n`
  );
  return root;
};

describe('runMigrate', () => {
  test('rejects unknown migration versions', () => {
    expect(() =>
      runMigrate({ version: 'v99', targetPath: '.', dryRun: true })
    ).toThrow(/Unknown migration 'v99'/);
  });

  test('dry run reports changes without writing anything', async () => {
    const root = setupFixture();
    const cardPath = path.join(root, 'theme', 'components', 'Card.styles.ts');
    const before = readFileSync(cardPath, 'utf8');

    const { output } = await runMigrate({
      version: 'v18',
      targetPath: root,
      dryRun: true,
    });

    expect(output).toContain('(dry run)');
    expect(output).toContain('Card: moved existing styles into');
    expect(output).toContain('Switch.container: swapped baseline styles');
    expect(output).toContain('would create 1 file(s)');
    expect(readFileSync(cardPath, 'utf8')).toBe(before);
    expect(
      existsSync(
        path.join(root, 'theme', 'components', 'BooleanField.styles.ts')
      )
    ).toBe(false);
  });

  test('applies edits, scaffolds required components, updates the barrel', async () => {
    const root = setupFixture();
    const components = path.join(root, 'theme', 'components');

    const { output } = await runMigrate({
      version: 'v18',
      targetPath: root,
      dryRun: false,
    });

    const card = readFileSync(path.join(components, 'Card.styles.ts'), 'utf8');
    expect(card).toContain('container: cva({');
    expect(card).toContain('media: cva({}),');

    const switchSource = readFileSync(
      path.join(components, 'Switch.styles.ts'),
      'utf8'
    );
    expect(switchSource).toContain(`'grid gap-x-2 items-center'`);

    const scaffold = readFileSync(
      path.join(components, 'BooleanField.styles.ts'),
      'utf8'
    );
    expect(scaffold).toContain(`ThemeComponent<'BooleanField'>`);

    const index = readFileSync(path.join(components, 'index.ts'), 'utf8');
    expect(index).toContain(`export * from './BooleanField.styles';`);

    expect(output).toContain('created');
    expect(output).toContain('Run your typechecker');
  });

  test('is idempotent: a second run changes nothing', async () => {
    const root = setupFixture();
    await runMigrate({ version: 'v18', targetPath: root, dryRun: false });
    const components = path.join(root, 'theme', 'components');
    const snapshot = ['Card.styles.ts', 'Switch.styles.ts', 'index.ts'].map(f =>
      readFileSync(path.join(components, f), 'utf8')
    );

    const { output } = await runMigrate({
      version: 'v18',
      targetPath: root,
      dryRun: false,
    });

    expect(
      ['Card.styles.ts', 'Switch.styles.ts', 'index.ts'].map(f =>
        readFileSync(path.join(components, f), 'utf8')
      )
    ).toEqual(snapshot);
    expect(output).toContain('Edited 0 file(s)');
  });

  test('reports when no Marigold imports are found', async () => {
    const root = mkdtempSync(path.join(os.tmpdir(), 'marigold-migrate-'));
    writeFileSync(path.join(root, 'app.ts'), `export const x = 1;\n`);

    const { output } = await runMigrate({
      version: 'v18',
      targetPath: root,
      dryRun: true,
    });

    expect(output).toContain('No files importing');
  });

  test('applies safe application-code codemods alongside theme codemods', async () => {
    const root = setupFixture();
    const appFile = path.join(root, 'app', 'Profile.tsx');
    mkdirSync(path.dirname(appFile), { recursive: true });
    writeFileSync(
      appFile,
      `import { Inset, Tabs, TextField, Tooltip } from '@marigold/components';

export const Profile = () => (
  <Inset space={4}>
    <Tabs>
      <Tabs.TabPanel id="a">
        <TextField label="Age" min={0} />
        <Tooltip open>hint</Tooltip>
      </Tabs.TabPanel>
    </Tabs>
  </Inset>
);
`
    );

    const { output } = await runMigrate({
      version: 'v18',
      targetPath: root,
      dryRun: false,
    });

    const app = readFileSync(appFile, 'utf8');
    expect(app).toContain('<Inset p={4}>');
    expect(app).toContain('<Tabs.Panel id="a">');
    expect(app).toContain('</Tabs.Panel>');
    expect(app).toContain('<TextField label="Age" />');
    expect(app).toContain('<Tooltip open>'); // warning only, never edited
    expect(output).toContain('Tooltip[open]');
  });
});
