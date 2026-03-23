import * as fs from 'node:fs';
import * as path from 'node:path';

const OUT_DIR = path.resolve(import.meta.dirname, '..', 'out');
const OUTPUT_FILE = path.resolve(import.meta.dirname, 'chunks.json');
const MAX_CHARS = 10_000;
const MIN_CHARS = 150;

/** Split markdown at headings of a given level */
function splitAt(
  text: string,
  level: number
): { heading: string; body: string }[] {
  const marker = '#'.repeat(level) + ' ';
  const result: { heading: string; body: string }[] = [];
  let h = '',
    lines: string[] = [],
    fence = false;

  const flush = () => {
    const body = lines.join('\n').trim();
    if (body || h) result.push({ heading: h, body });
    lines = [];
  };

  for (const line of text.split('\n')) {
    if (line.trimStart().startsWith('```')) fence = !fence;
    if (!fence && line.startsWith(marker) && line[level] !== '#') {
      flush();
      h = line.slice(marker.length).trim();
    } else {
      lines.push(line);
    }
  }
  flush();
  return result;
}

/** Recursively split until each chunk fits MAX_CHARS */
function fit(
  heading: string,
  text: string,
  level = 3
): { heading: string; text: string }[] {
  if (text.length <= MAX_CHARS) return [{ heading, text }];

  if (level <= 3) {
    const parts = splitAt(text, level);
    if (parts.length > 1)
      return parts.flatMap(p =>
        fit(
          p.heading ? `${heading} > ${p.heading}` : heading,
          p.body,
          level + 1
        )
      );
    return fit(heading, text, level + 1);
  }

  // Paragraph fallback
  const out: { heading: string; text: string }[] = [];
  let acc = '',
    n = 1;
  for (const p of text.split(/\n{2,}/)) {
    if (acc && `${acc}\n\n${p}`.length > MAX_CHARS) {
      out.push({
        heading: n > 1 ? `${heading} [${n}]` : heading,
        text: acc,
      });
      acc = p;
      n++;
    } else {
      acc = acc ? `${acc}\n\n${p}` : p;
    }
  }
  if (acc.trim())
    out.push({
      heading: n > 1 ? `${heading} [${n}]` : heading,
      text: acc.trim(),
    });
  return out;
}

function chunkFile(filePath: string) {
  const basename = path.basename(filePath, '.md');
  const content = fs.readFileSync(filePath, 'utf-8');
  const h1 = content.match(/^# +(.+)$/m)?.[1]?.trim() ?? '';
  const subtitle = content.match(/^\*([^*\n]+)\*$/m)?.[1] ?? '';
  const ctx = subtitle ? `${h1} — ${subtitle}` : h1;

  return splitAt(content, 2).flatMap(({ heading: h2, body }) => {
    const headingPath = [h1, h2].filter(Boolean).join(' > ');
    return fit(headingPath, body)
      .filter(c => c.text.length >= MIN_CHARS)
      .map(({ heading, text }) => ({
        textForEmbedding: [`[${basename}] ${heading}`, h2 ? ctx : null, text]
          .filter(Boolean)
          .join('\n\n'),
        originalText: text,
        metadata: { file: basename, heading },
      }));
  });
}

// ─── CLI ─────────────────────────────────────────────────────────────────────

const fileArg =
  process.argv.find(a => a.startsWith('--file='))?.slice(7) ??
  (process.argv.includes('--file')
    ? process.argv[process.argv.indexOf('--file') + 1]
    : undefined);

const files = fileArg
  ? [path.join(OUT_DIR, fileArg.endsWith('.md') ? fileArg : `${fileArg}.md`)]
  : fs
      .readdirSync(OUT_DIR)
      .filter(f => f.endsWith('.md'))
      .sort()
      .map(f => path.join(OUT_DIR, f));

if (!files.length || (fileArg && !fs.existsSync(files[0]))) {
  console.error(
    fileArg ? `Not found: ${files[0]}` : `No .md files in ${OUT_DIR}`
  );
  process.exit(1);
}

const chunks = files.flatMap(chunkFile).map((c, i) => ({ id: i + 1, ...c }));
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(chunks, null, 2));

const avg = Math.round(
  chunks.reduce((s, c) => s + c.textForEmbedding.length, 0) / chunks.length
);
const max = Math.max(...chunks.map(c => c.textForEmbedding.length));
console.log(
  `${files.length} files → ${chunks.length} chunks — avg ${avg}c max ${max}c → ${OUTPUT_FILE}`
);
