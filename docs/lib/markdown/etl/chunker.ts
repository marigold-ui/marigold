import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAllMdxFiles, parseMdxToMarkdown } from '../parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CONTENT_DIR = path.resolve(__dirname, '..', '..', '..', 'content');
const OUTPUT_FILE = path.resolve(__dirname, 'chunks.json');
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

function chunkMarkdown(markdown: string, basename: string) {
  const h1 = markdown.match(/^# +(.+)$/m)?.[1]?.trim() ?? '';
  const subtitle = markdown.match(/^\*([^*\n]+)\*$/m)?.[1] ?? '';
  const ctx = subtitle ? `${h1} — ${subtitle}` : h1;

  return splitAt(markdown, 2).flatMap(({ heading: h2, body }) => {
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

const filteredFiles = await getAllMdxFiles(CONTENT_DIR);

if (!filteredFiles.length) {
  console.error(`No .mdx files in ${CONTENT_DIR}`);
  process.exit(1);
}

const allChunks = await Promise.all(
  filteredFiles.map(async filePath => {
    const { markdown, slug } = await parseMdxToMarkdown({
      filePath,
      contentDir: CONTENT_DIR,
    });
    const basename = slug.replace(/\//g, '-');
    return chunkMarkdown(markdown, basename);
  })
);

const chunks = allChunks.flat().map((c, i) => ({ id: i + 1, ...c }));
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(chunks, null, 2));

const avg = Math.round(
  chunks.reduce((s, c) => s + c.textForEmbedding.length, 0) / chunks.length
);
const max = Math.max(...chunks.map(c => c.textForEmbedding.length));
console.log(
  `${filteredFiles.length} files → ${chunks.length} chunks — avg ${avg}c max ${max}c → ${OUTPUT_FILE}`
);
