/**
 * Chunker for RAG / Vector Embeddings
 *
 * Splits Markdown docs into H2-level sections for semantic search.
 * Oversized sections are split further at H3 boundaries.
 * Code blocks are stripped from embedding text but kept in originalText.
 *
 * Usage:
 *   node --experimental-strip-types docs/app/mcp/etl/chunker.ts
 *   node --experimental-strip-types docs/app/mcp/etl/chunker.ts --file components-collection-table-index
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

const OUT_DIR = path.resolve(import.meta.dirname, '..', 'out');
const OUTPUT_FILE = path.resolve(import.meta.dirname, 'chunks.json');
const MAX_EMBEDDING_CHARS = 24_000; // ~6000 tokens, safely under Titan's 8192
const MIN_CHUNK_CHARS = 100;

interface Chunk {
  id: number;
  textForEmbedding: string;
  originalText: string;
  metadata: { file: string; category: string; heading: string };
}

interface Section {
  heading: string;
  lines: string[];
}

function parseHeading(line: string): { level: number; text: string } | null {
  const m = line.match(/^(#{1,3}) +(.+)$/);
  if (!m) return null;
  return { level: m[1].length, text: m[2].trim() };
}

function extractCategory(basename: string): string {
  const knownMultiWord = ['getting-started', 'hooks-and-utils'];
  for (const prefix of knownMultiWord) {
    if (basename.startsWith(prefix)) return prefix;
  }
  return basename.split('-')[0];
}

function stripCodeBlocks(text: string): string {
  const out: string[] = [];
  let inFence = false;
  for (const line of text.split('\n')) {
    if (line.trimStart().startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (!inFence) out.push(line);
  }
  return out
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Single-pass parse: extracts H1, subtitle (first italic line after H1),
 * and all H2-level sections.
 */
function parseFile(content: string): {
  h1: string;
  subtitle: string;
  sections: Section[];
} {
  let h1 = '';
  let subtitle = '';
  const sections: Section[] = [];
  let current: Section = { heading: '', lines: [] };
  let inFence = false;

  for (const line of content.split('\n')) {
    if (line.trimStart().startsWith('```')) {
      inFence = !inFence;
      current.lines.push(line);
      continue;
    }
    if (inFence) {
      current.lines.push(line);
      continue;
    }

    const heading = parseHeading(line);
    if (heading?.level === 1) {
      h1 = heading.text;
      continue;
    }

    // Capture the first italic line (e.g. `*Buttons allow users to trigger actions.*`)
    if (!subtitle && !heading && line.startsWith('*') && line.endsWith('*')) {
      subtitle = line.slice(1, -1);
      continue;
    }

    if (heading?.level === 2) {
      sections.push(current);
      current = { heading: heading.text, lines: [line] };
      continue;
    }
    current.lines.push(line);
  }
  sections.push(current);
  return { h1, subtitle, sections };
}

function splitAtH3(section: Section): Section[] {
  const sub: Section[] = [];
  let current: Section = { heading: section.heading, lines: [] };
  let inFence = false;

  for (const line of section.lines) {
    if (line.trimStart().startsWith('```')) {
      inFence = !inFence;
      current.lines.push(line);
      continue;
    }
    if (inFence) {
      current.lines.push(line);
      continue;
    }

    const heading = parseHeading(line);
    if (heading?.level === 3) {
      sub.push(current);
      current = {
        heading: `${section.heading} > ${heading.text}`,
        lines: [line],
      };
      continue;
    }
    current.lines.push(line);
  }
  sub.push(current);
  return sub;
}

function mergeSections(sections: Section[]): Section[] {
  const merged: Section[] = [];
  for (const section of sections) {
    const text = section.lines.join('\n').trim();
    if (!text) continue;
    const prev = merged.at(-1);
    if (prev && text.length < MIN_CHUNK_CHARS) {
      prev.lines.push('', ...section.lines);
      if (section.heading) {
        prev.heading = prev.heading
          ? `${prev.heading} / ${section.heading}`
          : section.heading;
      }
    } else {
      merged.push({ ...section, lines: [...section.lines] });
    }
  }
  return merged;
}

function chunkFile(filePath: string): Chunk[] {
  const basename = path.basename(filePath, '.md');
  const category = extractCategory(basename);
  const {
    h1,
    subtitle,
    sections: h2Sections,
  } = parseFile(fs.readFileSync(filePath, 'utf-8'));

  const sections: Section[] = [];
  for (const section of h2Sections) {
    if (
      stripCodeBlocks(section.lines.join('\n')).length > MAX_EMBEDDING_CHARS
    ) {
      sections.push(...splitAtH3(section));
    } else {
      sections.push(section);
    }
  }

  // Minimal context prefix: "Table — Display and interact with structured data..."
  const contextPrefix = subtitle ? `${h1} — ${subtitle}` : h1;

  return mergeSections(sections)
    .map(section => {
      const fullText = section.lines.join('\n').trim();
      if (!fullText) return null;

      const headingPath = [h1, section.heading].filter(Boolean).join(' > ');
      const isIntro = section.heading === '';

      const textForEmbedding = [
        `[${basename}] ${headingPath}`,
        isIntro ? null : contextPrefix,
        stripCodeBlocks(fullText),
      ]
        .filter(Boolean)
        .join('\n\n');

      return {
        id: -1, // assigned in main()
        textForEmbedding,
        originalText: fullText,
        metadata: { file: basename, category, heading: headingPath },
      } satisfies Chunk;
    })
    .filter((c): c is Chunk => c !== null);
}

function main() {
  const fileArg =
    process.argv.find(a => a.startsWith('--file='))?.slice(7) ??
    (process.argv.includes('--file')
      ? process.argv[process.argv.indexOf('--file') + 1]
      : undefined);

  let files: string[];
  if (fileArg) {
    const target = path.join(
      OUT_DIR,
      fileArg.endsWith('.md') ? fileArg : `${fileArg}.md`
    );
    if (!fs.existsSync(target)) {
      console.error(`File not found: ${target}`);
      process.exit(1);
    }
    files = [target];
    console.log(`Processing single file: ${path.basename(target)}`);
  } else {
    files = fs
      .readdirSync(OUT_DIR)
      .filter(f => f.endsWith('.md'))
      .sort()
      .map(f => path.join(OUT_DIR, f));
  }

  if (files.length === 0) {
    console.error(`No .md files found in ${OUT_DIR}`);
    process.exit(1);
  }
  console.log(`Processing ${files.length} file(s)…\n`);

  const allChunks: Chunk[] = [];
  let oversized = 0;

  for (const file of files) {
    for (const chunk of chunkFile(file)) {
      if (chunk.textForEmbedding.length > MAX_EMBEDDING_CHARS) {
        oversized++;
        console.warn(
          `  ⚠ Oversized (${chunk.textForEmbedding.length} chars): ${chunk.metadata.heading}`
        );
      }
      allChunks.push(chunk);
    }
  }

  allChunks.forEach((c, i) => {
    c.id = i + 1;
  });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allChunks, null, 2));

  const avg = Math.round(
    allChunks.reduce((s, c) => s + c.textForEmbedding.length, 0) /
      allChunks.length
  );
  const max = Math.max(...allChunks.map(c => c.textForEmbedding.length));
  console.log(`Done.`);
  console.log(`  Files: ${files.length}  Chunks: ${allChunks.length}`);
  console.log(
    `  Avg: ${avg} chars (~${Math.round(avg / 4)} tok)  Max: ${max} chars (~${Math.round(max / 4)} tok)`
  );
  if (oversized) console.log(`  ⚠ Oversized: ${oversized}`);
  console.log(`  Output: ${OUTPUT_FILE}`);
}

main();
