#!/usr/bin/env npx tsx

/**
 * Converts MDX documentation to clean Markdown for MCP servers.
 *
 * Usage: pnpm build:mcp
 * Output: docs/app/mcp/output/*.md
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { getAllMdxFiles, parseMdxToMarkdown } from './parser';

const CONTENT_DIR = path.resolve(__dirname, '../../content');
const PROPS_JSON = path.resolve(__dirname, '../../.registry/props.json');
const OUTPUT_DIR = path.resolve(__dirname, './output');

interface BuildStats {
  total: number;
  success: number;
  failed: number;
  errors: string[];
}

async function build(): Promise<void> {
  console.log('🚀 Starting MCP documentation build...\n');
  console.log(`📁 Content directory: ${CONTENT_DIR}`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`📄 Props JSON: ${PROPS_JSON}\n`);

  const stats: BuildStats = { total: 0, success: 0, failed: 0, errors: [] };

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const mdxFiles = await getAllMdxFiles(CONTENT_DIR);
  stats.total = mdxFiles.length;
  console.log(`📝 Found ${mdxFiles.length} MDX files\n`);

  for (const filePath of mdxFiles) {
    try {
      const result = await parseMdxToMarkdown({
        filePath,
        contentDir: CONTENT_DIR,
        propsJsonPath: PROPS_JSON,
      });

      const outputPath = path.join(
        OUTPUT_DIR,
        result.slug.replace(/\//g, '-') + '.md'
      );

      await fs.writeFile(outputPath, result.markdown, 'utf-8');
      console.log(`✅ ${filePath} -> ${path.basename(outputPath)}`);
      stats.success++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`❌ ${filePath}: ${msg}`);
      stats.failed++;
      stats.errors.push(`${filePath}: ${msg}`);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Build Summary');
  console.log('='.repeat(50));
  console.log(`Total files:    ${stats.total}`);
  console.log(`✅ Success:     ${stats.success}`);
  console.log(`❌ Failed:      ${stats.failed}`);

  if (stats.errors.length > 0) {
    console.log('\n⚠️ Errors:');
    stats.errors.forEach(e => console.log(`   - ${e}`));
  }

  console.log('\n✨ Build complete!\n');

  // Create index
  await createIndex(mdxFiles);
}

async function createIndex(files: string[]): Promise<void> {
  const index = files.map(f => {
    const slug = f
      .replace('.mdx', '')
      .split('/')
      .filter((p, i, arr) => i !== arr.length - 1 || p !== arr[i - 1])
      .join('/');

    return {
      file: f,
      slug,
      outputFile: slug.replace(/\//g, '-') + '.md',
    };
  });

  const indexPath = path.join(OUTPUT_DIR, '_index.json');
  await fs.writeFile(indexPath, JSON.stringify(index, null, 2), 'utf-8');
  console.log(`📇 Created index: ${indexPath}`);
}

build().catch(err => {
  console.error('💥 Build failed:', err);
  process.exit(1);
});
