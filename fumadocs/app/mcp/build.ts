import fs from 'node:fs/promises';
import path from 'node:path';
import { getAllMdxFiles, parseMdxToMarkdown } from './parser';

const CONTENT_DIR = path.resolve(__dirname, '../../content');
const OUTPUT_DIR = path.resolve(__dirname, './output');

interface BuildStats {
  total: number;
  success: number;
  failed: number;
  errors: string[];
}

async function build(): Promise<void> {
  console.log('Starting Markdown documentation build...');
  console.log(`Content: ${CONTENT_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}`);

  const stats: BuildStats = { total: 0, success: 0, failed: 0, errors: [] };

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const mdxFiles = await getAllMdxFiles(CONTENT_DIR);
  stats.total = mdxFiles.length;
  console.log(`Processing ${mdxFiles.length} files...\n`);

  for (const filePath of mdxFiles) {
    try {
      const result = await parseMdxToMarkdown({
        filePath,
        contentDir: CONTENT_DIR,
      });

      const outputPath = path.join(
        OUTPUT_DIR,
        result.slug.replace(/\//g, '-') + '.md'
      );

      await fs.writeFile(outputPath, result.markdown, 'utf-8');
      stats.success++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[FAIL] ${filePath}: ${msg}`);
      stats.failed++;
      stats.errors.push(`${filePath}: ${msg}`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('Build Summary');
  console.log('='.repeat(50));
  console.log(`Total:   ${stats.total}`);
  console.log(`Success: ${stats.success}`);
  console.log(`Failed:  ${stats.failed}`);

  if (stats.errors.length > 0) {
    console.log('\nErrors:');
    stats.errors.forEach(e => console.log(`  ${e}`));
  }

  console.log('\nBuild complete.\n');
}

build().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
