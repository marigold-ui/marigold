/**
 * Chunker for RAG / Vector Embeddings
 *
 * Splits Markdown files from app/mcp/out/ by headings (H2 ##, H3 ###).
 * Code blocks are never cut in the middle.
 *
 * Output interface per chunk:
 * {
 *   id: string;                  – UUID
 *   textForEmbedding: string;    – context-enriched text (file + heading path + content)
 *   originalText: string;        – raw chunk content
 *   metadata: {
 *     file: string;              – filename without .md
 *     category: string;          – first path segment (e.g. "components", "patterns")
 *   }
 * }
 */
import { randomUUID } from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';

// ─── Paths ───────────────────────────────────────────────────────────────────

const OUT_DIR = path.resolve(import.meta.dirname, '..', 'out');
const OUTPUT_FILE = path.resolve(import.meta.dirname, 'chunks.json');

// ─── Types ───────────────────────────────────────────────────────────────────

interface Chunk {
  id: string;
  textForEmbedding: string;
  originalText: string;
  metadata: {
    file: string;
    category: string;
  };
}

// ─── Heading detection ───────────────────────────────────────────────────────

/** Returns the heading level (1/2/3) and text, or null if not a heading. */
function parseHeading(line: string): { level: number; text: string } | null {
  const m = line.match(/^(#{1,3}) +(.+)$/);
  if (!m) return null;
  return { level: m[1].length, text: m[2].trim() };
}

// ─── Category extraction ──────────────────────────────────────────────────────

function extractCategory(basename: string): string {
  // e.g. "components-form-checkbox-index" → "components"
  // e.g. "getting-started-overview"       → "getting-started"
  const knownMultiWord = ['getting-started', 'hooks-and-utils'];
  for (const prefix of knownMultiWord) {
    if (basename.startsWith(prefix)) return prefix;
  }
  return basename.split('-')[0];
}

// ─── Core: split a single file into chunks ───────────────────────────────────

function chunkFile(filePath: string): Chunk[] {
  const basename = path.basename(filePath, '.md');
  const category = extractCategory(basename);
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n');

  const chunks: Chunk[] = [];

  // Heading context: [h1, h2, h3] – updated as we encounter headings
  let h1 = '';
  let h2 = '';
  let h3 = '';

  // Buffer accumulating lines for the current chunk
  let buffer: string[] = [];
  let inFence = false;
  // The heading level that opened the current buffer window (2 or 3)
  // null means we haven't encountered an H2/H3 yet (the file preamble)
  let openLevel: number | null = null;

  const flush = () => {
    const text = buffer.join('\n').trim();
    if (!text) return;

    // Build heading path (omit empty segments)
    const segments = [h1, h2, h3].filter(Boolean);
    const headingPath = segments.join(' > ');

    const prefix = `[File: ${basename}] ${headingPath}`;
    const textForEmbedding = headingPath
      ? `${prefix}: ${text}`
      : `${prefix}: ${text}`;

    chunks.push({
      id: randomUUID(),
      textForEmbedding,
      originalText: text,
      metadata: { file: basename, category },
    });

    buffer = [];
  };

  for (const line of lines) {
    // Track code fence state
    if (line.trimStart().startsWith('```')) {
      inFence = !inFence;
      buffer.push(line);
      continue;
    }

    // While inside a code block – never cut here
    if (inFence) {
      buffer.push(line);
      continue;
    }

    const heading = parseHeading(line);

    if (heading) {
      if (heading.level === 1) {
        // H1 → flush current buffer, update context, don't open a new chunk yet
        flush();
        h1 = heading.text;
        h2 = '';
        h3 = '';
        openLevel = null;
        // Don't push the H1 line into buffer – it's pure context
        continue;
      }

      if (heading.level === 2) {
        // H2 → flush current chunk, start new one
        flush();
        h2 = heading.text;
        h3 = '';
        openLevel = 2;
        buffer.push(line); // include the heading itself in the chunk text
        continue;
      }

      if (heading.level === 3) {
        if (openLevel === 2) {
          // If we already have H2 content, flush before starting H3 sub-chunk
          flush();
          // Keep H2 heading in context, update H3
          h3 = heading.text;
          openLevel = 3;
          buffer.push(line);
          continue;
        }
        // H3 without prior H2 (unusual) – treat like H2
        flush();
        h3 = heading.text;
        openLevel = 3;
        buffer.push(line);
        continue;
      }
    }

    // Regular content line
    buffer.push(line);
  }

  // Flush whatever is left at end of file
  flush();

  return chunks;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const files = fs
    .readdirSync(OUT_DIR)
    .filter(f => f.endsWith('.md'))
    .sort()
    .map(f => path.join(OUT_DIR, f));

  if (files.length === 0) {
    console.error(`No .md files found in ${OUT_DIR}`);
    console.error('Run: pnpm run build:md-docs first.');
    process.exit(1);
  }

  console.log(`Processing ${files.length} markdown files...`);

  const allChunks: Chunk[] = [];

  for (const file of files) {
    const fileChunks = chunkFile(file);
    allChunks.push(...fileChunks);
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allChunks, null, 2));

  const avgLen = Math.round(
    allChunks.reduce((s, c) => s + c.originalText.length, 0) / allChunks.length
  );

  console.log(`Done.`);
  console.log(`  Files:        ${files.length}`);
  console.log(`  Total chunks: ${allChunks.length}`);
  console.log(
    `  Avg length:   ${avgLen} chars (~${Math.round(avgLen / 4)} tokens)`
  );
  console.log(`  Output:       ${OUTPUT_FILE}`);
}

main();
