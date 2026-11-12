import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  type MigrateCommandOptions,
  detectMigration,
  runMigrate,
  runMigrateCommand,
} from './migrate.js';

const prompts = vi.hoisted(() => ({
  confirm: vi.fn(),
  multiselect: vi.fn(),
  isCancel: vi.fn<(value: unknown) => boolean>(() => false),
}));
vi.mock('@clack/prompts', () => prompts);

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

// a consumer package.json declaring @marigold/components, optionally migrated
const consumerPackageJson = (version: string, migrated?: string): string =>
  JSON.stringify({
    dependencies: { '@marigold/components': version },
    ...(migrated && { marigold: { migrated } }),
  });

describe('detectMigration', () => {
  const setupRepo = (
    version: string,
    {
      installed = true,
      migrated,
    }: { installed?: boolean; migrated?: string } = {}
  ): string => {
    const root = mkdtempSync(path.join(os.tmpdir(), 'marigold-detect-'));
    if (installed) {
      const pkgDir = path.join(root, 'node_modules', '@marigold', 'components');
      mkdirSync(pkgDir, { recursive: true });
      writeFileSync(
        path.join(pkgDir, 'package.json'),
        JSON.stringify({ name: '@marigold/components', version })
      );
    }
    if (!installed || migrated) {
      writeFileSync(
        path.join(root, 'package.json'),
        consumerPackageJson(version, migrated)
      );
    }
    // the migration target usually sits far below the repo root
    const target = path.join(root, 'src', 'theme');
    mkdirSync(target, { recursive: true });
    return target;
  };

  test('walks up to node_modules and holds back migrations for a major not installed yet', () => {
    const detected = detectMigration(setupRepo('17.9.1'));

    expect(detected).toEqual({
      installed: '17.9.1',
      source: 'node_modules',
      migrated: null,
      versions: [],
      awaitingUpgrade: ['v18', 'v19'],
    });
  });

  test('falls back to the declared range when nothing is installed', () => {
    const detected = detectMigration(
      setupRepo('^17.0.0', { installed: false })
    );

    expect(detected).toEqual({
      installed: '17.0.0',
      source: 'package.json',
      migrated: null,
      versions: [],
      awaitingUpgrade: ['v18', 'v19'],
    });
  });

  test('proposes the migration for the installed major (upgrade first, then migrate)', () => {
    const detected = detectMigration(setupRepo('18.0.0-beta.4'));

    expect(detected).toMatchObject({
      versions: ['v18'],
      awaitingUpgrade: ['v19'],
    });
  });

  test('proposes every pending migration without a marker', () => {
    const detected = detectMigration(setupRepo('19.0.0'));

    expect(detected).toMatchObject({
      migrated: null,
      versions: ['v18', 'v19'],
      awaitingUpgrade: [],
    });
  });

  test('skips migrations at or below the marker', () => {
    const detected = detectMigration(setupRepo('19.0.0', { migrated: 'v18' }));

    expect(detected).toMatchObject({
      migrated: 'v18',
      versions: ['v19'],
      awaitingUpgrade: [],
    });
  });

  test('proposes nothing once the installed major is migrated', () => {
    const detected = detectMigration(setupRepo('19.0.0', { migrated: 'v19' }));

    expect(detected).toMatchObject({
      migrated: 'v19',
      versions: [],
      awaitingUpgrade: [],
    });
  });

  test('holds back the next migration until its major is installed', () => {
    const detected = detectMigration(setupRepo('18.3.0', { migrated: 'v18' }));

    expect(detected).toMatchObject({
      migrated: 'v18',
      versions: [],
      awaitingUpgrade: ['v19'],
    });
  });

  test('fails on a malformed marker instead of guessing', () => {
    const target = setupRepo('19.0.0', { migrated: '19' });

    expect(() => detectMigration(target)).toThrow(
      /expected a migration like "v19"/
    );
  });

  test('returns null when no @marigold/components exists anywhere', () => {
    const root = mkdtempSync(path.join(os.tmpdir(), 'marigold-detect-'));

    expect(detectMigration(root)).toBeNull();
  });
});

describe('runMigrate', () => {
  test('rejects unknown migration versions', () => {
    expect(() =>
      runMigrate({ version: 'v99', targetPath: '.', dryRun: true })
    ).toThrow(/Unknown migration 'v99'/);
  });

  test('dry run reports changes without writing anything', () => {
    const root = setupFixture();
    const cardPath = path.join(root, 'theme', 'components', 'Card.styles.ts');
    const before = readFileSync(cardPath, 'utf8');

    const { output } = runMigrate({
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

  test('applies edits, scaffolds required components, updates the barrel', () => {
    const root = setupFixture();
    const components = path.join(root, 'theme', 'components');

    const { output } = runMigrate({
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

  test('is idempotent: a second run changes nothing', () => {
    const root = setupFixture();
    runMigrate({ version: 'v18', targetPath: root, dryRun: false });
    const components = path.join(root, 'theme', 'components');
    const snapshot = ['Card.styles.ts', 'Switch.styles.ts', 'index.ts'].map(f =>
      readFileSync(path.join(components, f), 'utf8')
    );

    const { output } = runMigrate({
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

  test('reports when no Marigold imports are found', () => {
    const root = mkdtempSync(path.join(os.tmpdir(), 'marigold-migrate-'));
    writeFileSync(path.join(root, 'app.ts'), `export const x = 1;\n`);

    const { output } = runMigrate({
      version: 'v18',
      targetPath: root,
      dryRun: true,
    });

    expect(output).toContain('No files importing');
  });

  test('applies safe application-code codemods alongside theme codemods', () => {
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

    const { output } = runMigrate({
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

  test('v19 slots the Popover theme and swaps the ComboBox value props in one run', () => {
    const root = setupFixture();
    const components = path.join(root, 'theme', 'components');
    writeFileSync(
      path.join(components, 'Popover.styles.ts'),
      `import { cva, ThemeComponent } from '@marigold/system';

export const Popover: ThemeComponent<'Popover'> = cva({
    base: ['bg-white rounded-md shadow-md']
});
`
    );
    const appFile = path.join(root, 'app', 'Search.tsx');
    mkdirSync(path.dirname(appFile), { recursive: true });
    writeFileSync(
      appFile,
      `import { ComboBox } from '@marigold/components';

export const Search = () => (
  <ComboBox value={text} onChange={setText} selectedKey={key} label="Animals" />
);
`
    );

    runMigrate({ version: 'v19', targetPath: root, dryRun: false });

    const popover = readFileSync(
      path.join(components, 'Popover.styles.ts'),
      'utf8'
    );
    expect(popover).toContain('container: cva({');
    expect(popover).toContain('bg-white rounded-md shadow-md');
    expect(popover).toContain('body: cva({}),');
    expect(readFileSync(appFile, 'utf8')).toContain(
      '<ComboBox inputValue={text} onInputChange={setText} value={key} label="Animals" />'
    );
  });

  test('scans .jsx and .js application files too', () => {
    const root = mkdtempSync(path.join(os.tmpdir(), 'marigold-migrate-'));
    const appFile = path.join(root, 'App.jsx');
    writeFileSync(
      appFile,
      `import { Pickup } from '@marigold/icons';
export const App = () => <Pickup />;
`
    );

    runMigrate({ version: 'v18', targetPath: root, dryRun: false });

    expect(readFileSync(appFile, 'utf8')).toContain('<Store />');
  });

  test('reports a file-level parse error once, not per codemod', () => {
    const root = mkdtempSync(path.join(os.tmpdir(), 'marigold-migrate-'));
    writeFileSync(
      path.join(root, 'broken.tsx'),
      `import { Inset } from '@marigold/components';
const = broken(;
`
    );

    const { output } = runMigrate({
      version: 'v18',
      targetPath: root,
      dryRun: true,
    });

    expect(output.match(/parse error/g)).toHaveLength(1);
  });

  test('returns a pre-analysis summary of the changes that fired', () => {
    const root = setupFixture();

    const { summary } = runMigrate({
      version: 'v18',
      targetPath: root,
      dryRun: true,
    });

    expect(summary).toEqual([
      {
        name: 'restructure-to-slots',
        description: expect.stringContaining('slot objects'),
        files: 1,
        changes: expect.any(Number),
      },
      {
        name: 'swap-exact-classes',
        description: expect.stringContaining('baseline'),
        files: 1,
        changes: 1,
      },
      // fires for the fixture Switch's one slot that is new in v18, `label`;
      // the Card restructure stubs its own new slots
      {
        name: 'stub-missing-slots',
        description: expect.stringContaining('stub new theme slots'),
        files: 1,
        changes: 1,
      },
      {
        name: 'scaffold-components',
        description: expect.stringContaining('create theme styles'),
        files: 2, // BooleanField.styles.ts + the barrel index export
        changes: 2,
      },
    ]);
  });

  test('only applies the selected changes; everything else stays untouched', () => {
    const root = setupFixture();
    const components = path.join(root, 'theme', 'components');
    const cardBefore = readFileSync(
      path.join(components, 'Card.styles.ts'),
      'utf8'
    );

    runMigrate({
      version: 'v18',
      targetPath: root,
      dryRun: false,
      only: ['swap-exact-classes'],
    });

    expect(readFileSync(path.join(components, 'Card.styles.ts'), 'utf8')).toBe(
      cardBefore
    );
    expect(
      readFileSync(path.join(components, 'Switch.styles.ts'), 'utf8')
    ).toContain(`'grid gap-x-2 items-center'`);
    expect(existsSync(path.join(components, 'BooleanField.styles.ts'))).toBe(
      false
    );
  });

  test('rejects unknown names in only', () => {
    const root = setupFixture();

    expect(() =>
      runMigrate({
        version: 'v18',
        targetPath: root,
        dryRun: true,
        only: ['swap-exact-clases'],
      })
    ).toThrow(/Unknown change\(s\): swap-exact-clases/);
  });

  test('reports token findings in CSS files and component internals', () => {
    const root = setupFixture();
    writeFileSync(
      path.join(root, 'theme', 'tokens.css'),
      `:root { --color-brand: #f80; }
.help { color: var(--color-muted-foreground); }
`
    );
    writeFileSync(
      path.join(root, 'List.tsx'),
      `import { SelectList } from '@marigold/components';
export const List = () => <SelectList aria-label="x" />;
`
    );

    const { output } = runMigrate({
      version: 'v18',
      targetPath: root,
      dryRun: true,
    });

    expect(output).toContain('`muted-foreground` token was renamed');
    expect(output).not.toContain('`--color-brand`'); // defined by the consumer
    expect(output).toContain('SelectList: its v18 implementation hardcodes');
  });

  test('does not warn about added tokens when the consumer uses theme-rui', () => {
    const root = setupFixture();
    writeFileSync(
      path.join(root, 'setup.ts'),
      `import '@marigold/theme-rui/styles.css';
`
    );
    writeFileSync(
      path.join(root, 'List.tsx'),
      `import { SelectList } from '@marigold/components';
export const List = () => <SelectList aria-label="x" />;
`
    );

    const { output } = runMigrate({
      version: 'v18',
      targetPath: root,
      dryRun: true,
    });

    expect(output).not.toContain('hardcodes');
  });
});

describe('runMigrateCommand', () => {
  // a fixture whose Marigold version is discoverable, so the command can be
  // driven through detection + confirmation instead of an explicit version
  const setupDetectable = (version: string, migrated?: string): string => {
    const root = setupFixture();
    writeFileSync(
      path.join(root, 'package.json'),
      consumerPackageJson(version, migrated)
    );
    return root;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    prompts.isCancel.mockReturnValue(false);
  });

  // drives the command, non-interactive and applying by default
  const migrate = async (
    options: Omit<MigrateCommandOptions, 'write' | 'dryRun'> & {
      dryRun?: boolean;
    }
  ) => {
    const lines: string[] = [];
    const code = await runMigrateCommand({
      dryRun: false,
      interactive: false,
      ...options,
      write: output => lines.push(output),
    });
    return { code, lines, output: lines.join('\n') };
  };

  const acceptAll = async ({ initialValues }: { initialValues: string[] }) =>
    initialValues;

  test('runs the explicitly named migration without prompting', async () => {
    const root = setupFixture();
    const written: string[] = [];

    const code = await runMigrateCommand({
      version: 'v18',
      targetPath: root,
      dryRun: true,
      write: output => written.push(output),
      interactive: false,
    });

    expect(code).toBe(0);
    expect(written.join('\n')).toContain('marigold migrate v18 (dry run)');
    expect(prompts.confirm).not.toHaveBeenCalled();
  });

  test('refuses a named migration at or below the marker', async () => {
    const root = setupDetectable('19.0.0', 'v19');
    const cardPath = path.join(root, 'theme', 'components', 'Card.styles.ts');
    const before = readFileSync(cardPath, 'utf8');

    const { code, output } = await migrate({
      version: 'v18',
      targetPath: root,
    });

    expect(code).toBe(0);
    expect(output).toContain(
      'v18 is already applied (last applied: v19), so nothing was run'
    );
    expect(output).toContain(`marigold migrate v18 ${root} --only <names>`);
    expect(readFileSync(cardPath, 'utf8')).toBe(before);
  });

  test('dry-runs a recorded migration and says applying would be refused', async () => {
    // migrated, selection-only: combobox-value-props would fire on it again
    const root = setupDetectable('19.0.0', 'v19');
    const appFile = path.join(root, 'app', 'Search.tsx');
    mkdirSync(path.dirname(appFile), { recursive: true });
    const source = `import { ComboBox } from '@marigold/components';\nexport const Search = () => <ComboBox value={key} label="Animals" />;\n`;
    writeFileSync(appFile, source);

    const { code, output } = await migrate({
      version: 'v19',
      targetPath: root,
      dryRun: true,
    });

    expect(code).toBe(0);
    expect(output).toContain(
      'v19 is already applied (last applied: v19). This dry run shows what a re-run would change.'
    );
    expect(output).toContain('marigold migrate v19 (dry run)');
    expect(output).toContain('ComboBox: renamed `value` to `inputValue`');
    expect(readFileSync(appFile, 'utf8')).toBe(source);
  });

  test('runs an applied migration when --only names the changes', async () => {
    const root = setupDetectable('19.0.0', 'v19');

    const { code, output } = await migrate({
      version: 'v18',
      targetPath: root,
      dryRun: true,
      only: ['swap-exact-classes'],
    });

    expect(code).toBe(0);
    expect(output).not.toContain('already applied');
    expect(output).toContain('marigold migrate v18 (dry run)');
  });

  test('warns but runs a named migration for a major that is not installed', async () => {
    const root = setupDetectable('18.0.0');

    const { code, output } = await migrate({
      version: 'v19',
      targetPath: root,
      dryRun: true,
    });

    expect(code).toBe(0);
    expect(output).toContain(
      'Warning: v19 targets @marigold/components 19, but 18.0.0 is installed'
    );
    expect(output).toContain('marigold migrate v19 (dry run)');
  });

  test('refuses to auto-detect without a terminal to confirm in', async () => {
    const root = setupDetectable('18.0.0');

    const run = runMigrateCommand({
      targetPath: root,
      dryRun: true,
      write: () => {},
      interactive: false,
    });

    await expect(run).rejects.toThrow(/Non-interactive session/);
  });

  test('reports a migrated target as up to date', async () => {
    const root = setupDetectable('19.0.0', 'v19');

    const { code, output } = await migrate({
      targetPath: root,
      dryRun: true,
      interactive: true,
    });

    expect(code).toBe(0);
    expect(output).toContain('(last applied: v19) — already up to date');
    expect(prompts.confirm).not.toHaveBeenCalled();
  });

  test('says to upgrade first when the next migration is for a newer major', async () => {
    const root = setupDetectable('18.3.0', 'v18');

    const { code, output } = await migrate({
      targetPath: root,
      dryRun: true,
      interactive: true,
    });

    expect(code).toBe(0);
    expect(output).toContain(
      'the v19 migration needs @marigold/components 19 installed first'
    );
    expect(output).not.toContain('already up to date');
    expect(prompts.confirm).not.toHaveBeenCalled();
  });

  test('fails when the target has no Marigold at all', async () => {
    const root = setupFixture();

    const run = runMigrateCommand({
      targetPath: root,
      dryRun: true,
      write: () => {},
      interactive: true,
    });

    await expect(run).rejects.toThrow(/Could not find @marigold\/components/);
  });

  test('aborts with 130 when the detected migration is declined', async () => {
    const root = setupDetectable('18.0.0');
    const written: string[] = [];
    prompts.confirm.mockResolvedValue(false);

    const code = await runMigrateCommand({
      targetPath: root,
      dryRun: false,
      write: output => written.push(output),
      interactive: true,
    });

    expect(code).toBe(130);
    expect(written).toEqual(['Aborted — nothing changed.']);
  });

  test('applies only the changes left selected in the multiselect', async () => {
    const root = setupDetectable('18.0.0');
    const components = path.join(root, 'theme', 'components');
    const cardBefore = readFileSync(
      path.join(components, 'Card.styles.ts'),
      'utf8'
    );
    prompts.confirm.mockResolvedValue(true);
    prompts.multiselect.mockResolvedValue(['swap-exact-classes']);

    await runMigrateCommand({
      targetPath: root,
      dryRun: false,
      write: () => {},
      interactive: true,
    });

    expect(readFileSync(path.join(components, 'Card.styles.ts'), 'utf8')).toBe(
      cardBefore
    );
    expect(
      readFileSync(path.join(components, 'Switch.styles.ts'), 'utf8')
    ).toContain(`'grid gap-x-2 items-center'`);
  });

  describe('applied-migrations marker', () => {
    const marker = (root: string): unknown =>
      JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'))
        .marigold;

    test('records a real run in the declaring package.json', async () => {
      const root = setupDetectable('18.0.0');

      const { output } = await migrate({ version: 'v18', targetPath: root });

      expect(marker(root)).toEqual({ migrated: 'v18' });
      expect(output).toContain('Recorded v18 as applied in');
    });

    test('never records a dry run', async () => {
      const root = setupDetectable('18.0.0');

      await migrate({ version: 'v18', targetPath: root, dryRun: true });

      expect(marker(root)).toBeUndefined();
    });

    test('records the last migration of a multi-version run', async () => {
      const root = setupDetectable('19.0.0');
      prompts.confirm.mockResolvedValue(true);
      prompts.multiselect.mockImplementation(acceptAll);

      await migrate({ targetPath: root, interactive: true });

      expect(marker(root)).toEqual({ migrated: 'v19' });
    });

    test('records a partial run and names what was skipped', async () => {
      const root = setupDetectable('18.0.0');

      const { lines } = await migrate({
        version: 'v18',
        targetPath: root,
        only: ['swap-exact-classes'],
      });

      const skippedLine = lines.find(line =>
        line.startsWith('Skipped in v18:')
      );
      expect(skippedLine).toBeDefined();
      expect(skippedLine).toContain(`marigold migrate v18 ${root} --only `);
      expect(skippedLine).not.toContain('swap-exact-classes');
      expect(marker(root)).toEqual({ migrated: 'v18' });
    });

    test('lists nothing as skipped when every fired change ran', async () => {
      const root = setupDetectable('18.0.0');
      prompts.confirm.mockResolvedValue(true);
      prompts.multiselect.mockImplementation(acceptAll);

      const { lines } = await migrate({ targetPath: root, interactive: true });

      expect(lines.some(line => line.startsWith('Skipped in'))).toBe(false);
    });

    test('lists nothing as skipped when completing a recorded migration', async () => {
      // migrated, selection-only: combobox-value-props would fire on it again
      const root = setupDetectable('19.0.0', 'v19');
      const appFile = path.join(root, 'app', 'Search.tsx');
      mkdirSync(path.dirname(appFile), { recursive: true });
      writeFileSync(
        appFile,
        `import { ComboBox } from '@marigold/components';\nexport const Search = () => <ComboBox value={key} label="Animals" />;\n`
      );

      const { lines } = await migrate({
        version: 'v19',
        targetPath: root,
        only: ['restructure-to-slots'],
      });

      expect(lines.some(line => line.startsWith('Skipped in'))).toBe(false);
      expect(readFileSync(appFile, 'utf8')).toContain(
        '<ComboBox value={key} label="Animals" />'
      );
    });

    test('never lowers the marker on an --only run of an older migration', async () => {
      const root = setupDetectable('19.0.0', 'v19');

      await migrate({
        version: 'v18',
        targetPath: root,
        only: ['swap-exact-classes'],
      });

      expect(marker(root)).toEqual({ migrated: 'v19' });
    });

    test('stops with exit 1 when the marker cannot be written', async () => {
      const root = setupDetectable('19.0.0');
      // reads as "no marker", but writeMarker refuses to overwrite it
      writeFileSync(
        path.join(root, 'package.json'),
        JSON.stringify({
          dependencies: { '@marigold/components': '19.0.0' },
          marigold: 'something else',
        })
      );
      prompts.confirm.mockResolvedValue(true);
      prompts.multiselect.mockImplementation(acceptAll);

      const { code, output } = await migrate({
        targetPath: root,
        interactive: true,
      });

      expect(code).toBe(1);
      expect(output).toContain(
        'Warning: the v18 changes were applied but could not be recorded in'
      );
      expect(output).toContain(
        'Add "marigold": { "migrated": "v18" } to it by hand'
      );
      expect(prompts.multiselect).toHaveBeenCalledTimes(1);
    });

    test('names what already ran when a later migration is aborted', async () => {
      const root = setupDetectable('19.0.0');
      // gives v19 a change to offer, so its multiselect is shown
      const appFile = path.join(root, 'app', 'Search.tsx');
      mkdirSync(path.dirname(appFile), { recursive: true });
      writeFileSync(
        appFile,
        `import { ComboBox } from '@marigold/components';\nexport const Search = () => <ComboBox value={text} label="Animals" />;\n`
      );
      const cancel = Symbol('cancel');
      prompts.confirm.mockResolvedValue(true);
      prompts.multiselect
        .mockImplementationOnce(acceptAll)
        .mockResolvedValueOnce(cancel);
      prompts.isCancel.mockImplementation(value => value === cancel);

      const { code, lines } = await migrate({
        targetPath: root,
        interactive: true,
      });

      expect(code).toBe(130);
      expect(lines.at(-1)).toBe(
        'Aborted — v19 not applied. Already applied and recorded: v18.'
      );
      expect(marker(root)).toEqual({ migrated: 'v18' });
    });

    test('refuses to apply where no package.json declares @marigold/components', async () => {
      const root = setupFixture();
      const cardPath = path.join(root, 'theme', 'components', 'Card.styles.ts');
      const before = readFileSync(cardPath, 'utf8');

      const run = migrate({ version: 'v18', targetPath: root });

      await expect(run).rejects.toThrow(
        /no package.json at or above it declares @marigold\/components/
      );
      expect(readFileSync(cardPath, 'utf8')).toBe(before);
    });

    test('refuses to apply a named migration to a subfolder of the package', async () => {
      const root = setupDetectable('18.0.0');
      const cardPath = path.join(root, 'theme', 'components', 'Card.styles.ts');
      const before = readFileSync(cardPath, 'utf8');

      const run = migrate({
        version: 'v18',
        targetPath: path.join(root, 'theme'),
      });

      await expect(run).rejects.toThrow(
        `Run it on the package instead: marigold migrate v18 ${root}.`
      );
      expect(readFileSync(cardPath, 'utf8')).toBe(before);
      expect(marker(root)).toBeUndefined();
    });

    test('refuses a detected migration on a subfolder before confirming', async () => {
      const root = setupDetectable('18.0.0');

      const run = migrate({
        targetPath: path.join(root, 'theme'),
        interactive: true,
      });

      await expect(run).rejects.toThrow(/migrations are recorded per package/);
      expect(prompts.confirm).not.toHaveBeenCalled();
    });

    test('reports on a subfolder in a dry run', async () => {
      const root = setupDetectable('18.0.0');

      const { code, output } = await migrate({
        version: 'v18',
        targetPath: path.join(root, 'theme'),
        dryRun: true,
      });

      expect(code).toBe(0);
      expect(output).toContain('marigold migrate v18 (dry run)');
    });
  });

  test('offers every change that fired, described, for selection', async () => {
    const root = setupDetectable('18.0.0');
    prompts.confirm.mockResolvedValue(true);
    prompts.multiselect.mockResolvedValue([]);

    await runMigrateCommand({
      targetPath: root,
      dryRun: false,
      write: () => {},
      interactive: true,
    });

    expect(prompts.multiselect).toHaveBeenCalledWith(
      expect.objectContaining({
        options: [
          expect.objectContaining({ value: 'restructure-to-slots' }),
          expect.objectContaining({ value: 'swap-exact-classes' }),
          expect.objectContaining({ value: 'stub-missing-slots' }),
          expect.objectContaining({ value: 'scaffold-components' }),
        ],
      })
    );
  });
});
