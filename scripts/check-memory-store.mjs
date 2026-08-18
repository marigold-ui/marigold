#!/usr/bin/env node
/**
 * Structural guard for the `.memory/` store (see .memory/README.md).
 *
 * The store is prose, and no check can verify that an ADR's *reasoning* is sound. What a
 * check can do is catch the mechanical failures that make the store quietly untrustworthy:
 *
 * 1. **Duplicate ADR numbers.** This is the one that motivated the script. Two branches
 *    each add `0003-<their-own-slug>.md`; the filenames differ, so git merges both without
 *    a conflict, and `ADR-0003` now names two different decisions. Every review comment
 *    citing it becomes ambiguous. `.memory/README.md` argues that one-decision-per-file
 *    makes the store merge-safe — that holds for *contradiction*, not for *ID collision*,
 *    and this check closes the gap.
 * 2. **`id` disagreeing with the filename**, usually from a copy of 0000-template.md whose
 *    frontmatter was never filled in.
 * 3. **A supersede chain pointing at nothing.** `superseded-by ADR-0009` where no ADR-0009
 *    exists reads as "this was replaced" while hiding what replaced it.
 * 4. **Rotted `applies_to` globs.** The field is a discovery index — the way to find which
 *    records govern a path. A glob matching zero files after a directory move silently
 *    stops surfacing its record, and nothing else would ever tell you.
 * 5. **Duplicate or misordered glossary terms.** Two `### Foo` entries is the CONTEXT.md
 *    equivalent of failure 1, with the same clean-merge cause.
 *
 * Everything here is deliberately structural. Nothing in this script asserts that any
 * decision was followed — the records stay advisory, as `.memory/README.md` says.
 *
 * Run locally: `pnpm check:memory`
 */
import { globSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const memory = resolve(root, '.memory');
const adrDir = resolve(memory, 'adr');

const errors = [];
const warnings = [];

const LINE_CEILING = 200;
const STATUS_PATTERN = /^(accepted|superseded-by ADR-\d{4})$/;

/** Minimal frontmatter reader: flat `key: value` plus `- item` lists. Enough for ADRs. */
const readFrontmatter = source => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const data = {};
  let listKey = null;

  for (const raw of match[1].split(/\r?\n/)) {
    const item = raw.match(/^\s+-\s*(.+)$/);
    if (item && listKey) {
      data[listKey].push(item[1].trim().replace(/^['"]|['"]$/g, ''));
      continue;
    }

    const pair = raw.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!pair) continue;

    const [, key, rest] = pair;
    // Strip trailing `# …` comments, as on the `status` line in 0000-template.md.
    const value = rest.replace(/\s+#.*$/, '').trim();

    if (value === '') {
      listKey = key;
      data[key] = [];
    } else {
      listKey = null;
      data[key] = value.replace(/^['"]|['"]$/g, '');
    }
  }

  return data;
};

// ---------------------------------------------------------------------------
// ADRs
// ---------------------------------------------------------------------------

const adrFiles = readdirSync(adrDir)
  .filter(name => name.endsWith('.md') && name !== '0000-template.md')
  .sort();

const byNumber = new Map();
const records = [];

for (const name of adrFiles) {
  const where = `.memory/adr/${name}`;

  const nameMatch = name.match(/^(\d{4})-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/);
  if (!nameMatch) {
    errors.push(
      `${where}: filename must be NNNN-kebab-case-slug.md (four digits, lowercase slug).`
    );
    continue;
  }

  const number = nameMatch[1];
  const source = readFileSync(resolve(adrDir, name), 'utf8');
  const front = readFrontmatter(source);

  if (!front) {
    errors.push(`${where}: missing frontmatter block.`);
    continue;
  }

  // 1. Duplicate numbers — the silent-merge case.
  if (byNumber.has(number)) {
    errors.push(
      `ADR-${number} is claimed by two records: ${byNumber.get(number)} and ${name}. ` +
        'Two branches most likely took the same next number; renumber the later one to the ' +
        'next free slot and update its `id`, its `# NNNN.` heading, and any links to it.'
    );
  } else {
    byNumber.set(number, name);
  }

  // 2. id must agree with the filename.
  if (front.id !== `ADR-${number}`) {
    errors.push(
      `${where}: id is \`${front.id ?? '(missing)'}\` but the filename says ADR-${number}.`
    );
  }

  if (!STATUS_PATTERN.test(front.status ?? '')) {
    errors.push(
      `${where}: status is \`${front.status ?? '(missing)'}\`; allowed values are ` +
        '`accepted` or `superseded-by ADR-NNNN`.'
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(front.date ?? '')) {
    errors.push(
      `${where}: date is \`${front.date ?? '(missing)'}\`; expected YYYY-MM-DD.`
    );
  }

  // 4. applies_to must be present and every glob must still match something.
  const globs = Array.isArray(front.applies_to) ? front.applies_to : [];
  if (globs.length === 0) {
    errors.push(
      `${where}: applies_to is missing or empty. It is how someone working in a path finds ` +
        'the records that govern it — see the ADR conventions in .memory/README.md.'
    );
  }

  for (const glob of globs) {
    if (globSync(glob, { cwd: root }).length === 0) {
      errors.push(
        `${where}: applies_to glob \`${glob}\` matches no files. It has probably rotted ` +
          'past a rename or move, which means the record no longer surfaces for the code it governs.'
      );
    }
  }

  const lines = source.split(/\r?\n/).length;
  if (lines > LINE_CEILING) {
    warnings.push(
      `${where}: ${lines} lines, over the ~${LINE_CEILING}-line ceiling. It competes for ` +
        'context with the code an agent actually needs to read.'
    );
  }

  records.push({ name, number, front, source });
}

// 6. Every citation of another record must be a link that carries the slug.
//    A bare `ADR-0001` survives a renumber by silently re-pointing at whichever record
//    later takes that number — a citation that is *wrong* rather than dead, which no
//    number-only check can detect. Requiring `[ADR-0001](0001-the-slug.md)` moves the
//    identity into the filename, so the same renumber leaves a target that does not exist.
for (const { name, source } of records) {
  const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---/, '');
  const where = `.memory/adr/${name}`;

  for (const [, cited, target] of body.matchAll(
    /\[ADR-(\d{4})\]\(([^)]+)\)/g
  )) {
    if (!adrFiles.includes(target)) {
      errors.push(
        `${where}: cites ADR-${cited} as \`${target}\`, which is not a record in this directory. ` +
          'If something was renumbered, its slug moved too.'
      );
    } else if (!target.startsWith(`${cited}-`)) {
      errors.push(
        `${where}: cites ADR-${cited} but links to \`${target}\`. The number and the file disagree.`
      );
    }
  }

  const bare = body.replace(/\[ADR-\d{4}\]\([^)]+\)/g, '');
  for (const [mention] of bare.matchAll(/ADR-\d{4}/g)) {
    errors.push(
      `${where}: mentions ${mention} without linking it. Cite records as ` +
        '`[ADR-NNNN](NNNN-slug.md)` — a bare number silently re-points at a different record after a renumber.'
    );
  }
}

// 3. Supersede chains must resolve.
for (const { name, front } of records) {
  const target = /^superseded-by (ADR-(\d{4}))$/.exec(front.status ?? '');
  if (target && !byNumber.has(target[2])) {
    errors.push(
      `.memory/adr/${name}: status points at ${target[1]}, which does not exist. ` +
        'A dangling supersede says the record was replaced without saying by what.'
    );
  }
}

// ---------------------------------------------------------------------------
// Glossary
// ---------------------------------------------------------------------------

const glossarySource = readFileSync(resolve(memory, 'CONTEXT.md'), 'utf8');
// Strip HTML comments first — CONTEXT.md documents its entry shape with a sample `### Term`.
const glossaryBody = glossarySource.replace(/<!--[\s\S]*?-->/g, '');
const terms = [...glossaryBody.matchAll(/^###\s+(.+?)\s*$/gm)].map(m => m[1]);

const seenTerms = new Map();
for (const term of terms) {
  const key = term.toLowerCase();
  if (seenTerms.has(key)) {
    errors.push(
      `.memory/CONTEXT.md: "${term}" is defined twice. Two definitions of one term merge ` +
        'cleanly and cannot both be true — keep one entry per term and correct it in place.'
    );
  } else {
    seenTerms.set(key, term);
  }
}

const sorted = [...terms].sort((a, b) =>
  a.toLowerCase().localeCompare(b.toLowerCase())
);
const firstOutOfOrder = terms.findIndex((term, i) => term !== sorted[i]);
if (firstOutOfOrder !== -1) {
  errors.push(
    `.memory/CONTEXT.md: entries are not alphabetical — "${terms[firstOutOfOrder]}" should ` +
      `be "${sorted[firstOutOfOrder]}". Order is what makes a term findable without reading the file.`
  );
}

const glossaryLines = glossarySource.split(/\r?\n/).length;
if (glossaryLines > LINE_CEILING) {
  warnings.push(
    `.memory/CONTEXT.md: ${glossaryLines} lines, over the ~${LINE_CEILING}-line ceiling. ` +
      'Time to split it — see .memory/README.md.'
  );
}

// ---------------------------------------------------------------------------

for (const w of warnings) console.warn(`⚠️  ${w}\n`);

if (errors.length > 0) {
  console.error('❌ .memory store check failed:\n');
  for (const e of errors) console.error(`  • ${e}\n`);
  console.error('Conventions: .memory/README.md');
  process.exit(1);
}

console.log(
  `✅ .memory store check passed: ${records.length} ADR(s), ${terms.length} glossary term(s).`
);
