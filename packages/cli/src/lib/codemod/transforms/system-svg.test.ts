import { assertEdited, warningsOf } from '../test-helpers.js';
import { systemSvg } from './system-svg.js';

describe('system-svg', () => {
  test('replaces <SVG> with <svg> and drops the import', () => {
    const source = `import { SVG } from '@marigold/system';

export const Logo = () => (
  <SVG viewBox="0 0 24 24">
    <path d="M0 0" />
  </SVG>
);
`;

    const result = systemSvg.apply(source);

    assertEdited(result);
    expect(result.output).toBe(`
export const Logo = () => (
  <svg width={24} height={24} className="flex-none fill-current" viewBox="0 0 24 24">
    <path d="M0 0" />
  </svg>
);
`);
    expect(result.warnings).toEqual([]);
  });

  test('keeps the other names in the import', () => {
    const source = `import { cn, SVG } from '@marigold/system';

export const A = () => <SVG viewBox="0 0 24 24" />;
`;

    const result = systemSvg.apply(source);

    assertEdited(result);
    expect(result.output).toContain("import { cn } from '@marigold/system';");
  });

  test('turns size into width and height', () => {
    const result = systemSvg.apply(
      `import { SVG } from '@marigold/system';\nconst a = <SVG size={32} />;\n`
    );

    assertEdited(result);
    expect(result.output).toContain(
      '<svg className="flex-none fill-current" width={32} height={32} />'
    );
  });

  test('keeps an explicit width and only adds the missing height', () => {
    const result = systemSvg.apply(
      `import { SVG } from '@marigold/system';\nconst a = <SVG width={10} size="30" />;\n`
    );

    assertEdited(result);
    expect(result.output).toContain('width={10} height="30" />');
    expect(result.output).not.toContain('width="30"');
  });

  test('turns a color token into a text class', () => {
    const result = systemSvg.apply(
      `import { SVG } from '@marigold/system';\nconst a = <SVG color="destructive-accent" viewBox="0 0 24 24" />;\n`
    );

    assertEdited(result);
    expect(result.output).toContain(
      'className="flex-none fill-current text-destructive-accent"'
    );
    expect(result.output).not.toContain('color=');
  });

  test.each([
    ['currentColor', 'className="flex-none fill-current"'],
    ['#ef4444', 'className="flex-none fill-current text-[#ef4444]"'],
  ])('maps color="%s"', (color, expected) => {
    const result = systemSvg.apply(
      `import { SVG } from '@marigold/system';\nconst a = <SVG color="${color}" />;\n`
    );

    assertEdited(result);
    expect(result.output).toContain(expected);
  });

  test.each([
    ['red', 'text-[var(--color-red,red)]'],
    ['orange', 'text-[var(--color-orange,orange)]'],
    ['Gray', 'text-[var(--color-Gray,Gray)]'],
    ['black', 'text-black'],
    ['white', 'text-white'],
  ])('keeps the CSS fallback for the named color "%s"', (color, expected) => {
    const result = systemSvg.apply(
      `import { SVG } from '@marigold/system';\nconst a = <SVG color="${color}" />;\n`
    );

    assertEdited(result);
    expect(result.output).toContain(
      `className="flex-none fill-current ${expected}"`
    );
  });

  test('warns when color competes with a text color class', () => {
    const result = systemSvg.apply(
      `import { SVG } from '@marigold/system';\nconst a = <SVG color="info-accent" className="text-gray-500" />;\n`
    );

    assertEdited(result);
    expect(result.output).toContain(
      'className="flex-none fill-current text-info-accent text-gray-500"'
    );
    expect(result.warnings).toEqual([expect.stringContaining('text-gray-500')]);
  });

  test('does not warn about text classes that are not colors', () => {
    const result = systemSvg.apply(
      `import { SVG } from '@marigold/system';\nconst a = <SVG color="info-accent" className="text-sm md:text-lg/6 text-center" />;\n`
    );

    assertEdited(result);
    expect(result.warnings).toEqual([]);
  });

  test('leaves out base classes the consumer already decides', () => {
    const result = systemSvg.apply(
      `import { SVG } from '@marigold/system';\nconst a = <SVG size={24} className="size-4 shrink-0" stroke="#ef4444" fill="none" />;\n`
    );

    assertEdited(result);
    expect(result.output).toContain(
      '<svg width={24} height={24} className="fill-current size-4 shrink-0" stroke="#ef4444" fill="none" />'
    );
  });

  test('keeps an aliased import name out of the output', () => {
    const result = systemSvg.apply(
      `import { SVG as Icon } from '@marigold/system';\nconst a = <Icon />;\n`
    );

    assertEdited(result);
    expect(result.output).toBe(
      'const a = <svg width={24} height={24} className="flex-none fill-current" />;\n'
    );
  });

  test('warns about spread props but still rewrites', () => {
    const source = `import { SVG } from '@marigold/system';

export const SVGIcon = (props: any) => (
  <SVG {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" />
);
`;

    const result = systemSvg.apply(source);

    assertEdited(result);
    expect(result.output).toContain('<svg width={24} height={24} className=');
    expect(result.warnings).toEqual([
      expect.stringMatching(
        /spread props.*`className`.*flex-none fill-current/
      ),
    ]);
  });

  test('moves a dynamic color to style and warns', () => {
    const result = systemSvg.apply(
      `import { SVG } from '@marigold/system';\nconst a = <SVG color={tone} />;\n`
    );

    assertEdited(result);
    expect(result.output).toContain('style={{ color: tone }}');
    expect(result.warnings).toEqual([
      expect.stringContaining('not a string literal'),
    ]);
  });

  test('prefixes a dynamic className and warns', () => {
    const result = systemSvg.apply(
      `import { SVG } from '@marigold/system';\nconst a = <SVG className={cls} />;\n`
    );

    assertEdited(result);
    expect(result.output).toContain(
      'className={`flex-none fill-current ${cls}`}'
    );
    expect(warningsOf(result)).toEqual([expect.stringContaining('twMerge')]);
  });

  test('keeps the import when SVG is used as a value', () => {
    const result = systemSvg.apply(
      `import { SVG } from '@marigold/system';\nconst Icon = SVG;\nconst a = <SVG />;\n`
    );

    assertEdited(result);
    expect(result.output).toContain("import { SVG } from '@marigold/system';");
    expect(result.output).toContain('<svg ');
    expect(result.warnings).toEqual([
      expect.stringContaining('used as a value'),
    ]);
  });

  test.each([
    ['an object key', 'const m = { SVG: 1 };'],
    ['a member property', 'const i = icons.SVG;'],
    ['an optional member property', 'const i = icons?.SVG;'],
  ])('does not count %s as a use of the import', (_, line) => {
    const result = systemSvg.apply(
      `import { SVG } from '@marigold/system';\n${line}\nconst a = <SVG />;\n`
    );

    assertEdited(result);
    expect(result.output).not.toContain('import { SVG }');
    expect(result.warnings).toEqual([]);
  });

  test('still counts a shorthand property as a use of the import', () => {
    const result = systemSvg.apply(
      `import { SVG } from '@marigold/system';\nconst m = { SVG };\nconst a = <SVG />;\n`
    );

    assertEdited(result);
    expect(result.output).toContain("import { SVG } from '@marigold/system';");
    expect(result.warnings).toEqual([
      expect.stringContaining('used as a value'),
    ]);
  });

  test.each([
    [
      'a re-export',
      "export { SVG } from '@marigold/system';",
      'export { SVG }',
    ],
    ['a barrel', "export * from '@marigold/system';", 'export *'],
    [
      'the props type',
      "import type { SVGProps } from '@marigold/system';",
      'SVGProps',
    ],
    [
      'namespace access',
      "import * as system from '@marigold/system';\nconst a = <system.SVG />;",
      'system.SVG',
    ],
  ])('reports %s without changing it', (_, source, mention) => {
    const result = systemSvg.apply(`${source}\n`);

    expect(result.kind).toBe('unchanged');
    expect(warningsOf(result)).toEqual([expect.stringContaining(mention)]);
  });

  test('leaves files without SVG from @marigold/system alone', () => {
    expect(
      systemSvg.apply(`import { SVG } from './local';\nconst a = <SVG />;\n`)
    ).toEqual({ kind: 'unchanged', warnings: [] });
  });
});
