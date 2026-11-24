/**
 * Chunker for RAG / Vector Embeddings
 *
 * Splits MDX docs into Markdown chunks by H2/H3 headings. Code blocks are
 * never cut. Each chunk emits:
 *   - textForEmbedding: context-enriched text (file + page title + heading + body)
 *   - originalText:     raw chunk body
 *   - metadata:         { file, heading }
 *
 * IDs are assigned sequentially after flattening (see bottom of file).
 */
import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAllMdxFiles, parseMdxToMarkdown } from '../parser';
import { fit, splitAt } from './split';

const __dirname = dirname(fileURLToPath(import.meta.url));

const CONTENT_DIR = resolve(__dirname, '..', '..', '..', 'content');
const OUTPUT_FILE = resolve(__dirname, 'chunks.json');
function chunkMarkdown(markdown: string, basename: string) {
  const h1 = markdown.match(/^# +(.+)$/m)?.[1]?.trim() ?? '';
  const subtitle = markdown.match(/^\*([^*\n]+)\*$/m)?.[1] ?? '';
  const ctx = subtitle ? `${h1} — ${subtitle}` : h1;

  return splitAt(markdown, 2).flatMap(({ heading: h2, body }) => {
    const headingPath = [h1, h2].filter(Boolean).join(' > ');
    return fit(headingPath, body).map(({ heading, text }) => ({
      textForEmbedding: [`[${basename}] ${heading}`, ctx || null, text]
        .filter(Boolean)
        .join('\n\n'),
      originalText: text,
      metadata: { file: basename, heading },
    }));
  });
}

async function main() {
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
  await writeFile(OUTPUT_FILE, JSON.stringify(chunks, null, 2));

  const avg = Math.round(
    chunks.reduce((s, c) => s + c.textForEmbedding.length, 0) / chunks.length
  );
  const max = Math.max(...chunks.map(c => c.textForEmbedding.length));
  console.log(
    `${filteredFiles.length} files → ${chunks.length} chunks — avg ${avg}c max ${max}c → ${OUTPUT_FILE}`
  );
}

main();
