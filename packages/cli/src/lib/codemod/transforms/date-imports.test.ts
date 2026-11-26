import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { assertEdited } from '../test-helpers.js';
import { RE_EXPORTED, dateImports } from './date-imports.js';

describe('date-imports', () => {
  test('moves the import to @marigold/components', () => {
    const source = `import { CalendarDate, parseDate } from '@internationalized/date';

export const d = parseDate('2026-11-26');
`;

    const result = dateImports.apply(source);

    assertEdited(result);
    expect(result.output)
      .toBe(`import { CalendarDate, parseDate } from '@marigold/components';

export const d = parseDate('2026-11-26');
`);
    expect(result.changes).toEqual([
      'moved `CalendarDate`, `parseDate` from @internationalized/date to @marigold/components',
    ]);
  });

  test('merges into an existing @marigold/components import', () => {
    const source = `import { today } from '@internationalized/date';
import { DatePicker } from '@marigold/components';
`;

    const result = dateImports.apply(source);

    assertEdited(result);
    expect(result.output).toBe(
      `import { DatePicker, today } from '@marigold/components';\n`
    );
  });

  test('keeps type-only imports type-only', () => {
    const source = `import type { DateValue } from '@internationalized/date';
import { DatePicker } from '@marigold/components';
`;

    const result = dateImports.apply(source);

    assertEdited(result);
    expect(result.output).toBe(
      `import { DatePicker, type DateValue } from '@marigold/components';\n`
    );
  });

  test('keeps aliases and inline type modifiers', () => {
    const source = `import { parseDate as parse, type DateDuration } from '@internationalized/date';
`;

    const result = dateImports.apply(source);

    assertEdited(result);
    expect(result.output).toBe(
      `import { parseDate as parse, type DateDuration } from '@marigold/components';\n`
    );
  });

  test('leaves names Marigold does not re-export where they are', () => {
    const source = `import { DateFormatter, today } from "@internationalized/date";
`;

    const result = dateImports.apply(source);

    assertEdited(result);
    expect(result.output).toBe(
      `import { today } from '@marigold/components';\nimport { DateFormatter } from "@internationalized/date";\n`
    );
  });

  test('does not touch a file that imports nothing it can move', () => {
    const source = `import { DateFormatter } from '@internationalized/date';\n`;
    expect(dateImports.apply(source).kind).toBe('unchanged');
  });

  test('does not touch a namespace import', () => {
    const source = `import * as date from '@internationalized/date';\n`;
    expect(dateImports.apply(source).kind).toBe('unchanged');
  });

  test('does not touch a file without the package', () => {
    const source = `import { DatePicker } from '@marigold/components';\n`;
    expect(dateImports.apply(source).kind).toBe('unchanged');
  });

  test('moves only what @marigold/components really exports', () => {
    const index = readFileSync(
      fileURLToPath(
        new URL('../../../../../components/src/index.ts', import.meta.url)
      ),
      'utf8'
    );
    const block = (from: string) =>
      [
        ...index.matchAll(
          new RegExp(`export (?:type )?\\{([^}]*)\\} from '${from}';`, 'g')
        ),
      ].flatMap(m =>
        m[1]
          .split(',')
          .map(name => name.trim())
          .filter(Boolean)
      );
    const exported = new Set([
      ...block('@internationalized/date'),
      ...block('react-aria-components').filter(name =>
        ['DateValue', 'TimeValue'].includes(name)
      ),
    ]);

    expect(exported).toEqual(RE_EXPORTED);
  });
});
