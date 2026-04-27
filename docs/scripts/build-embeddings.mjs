#!/usr/bin/env zx
import { $, chalk } from 'zx';

if (
  !process.env.AWS_BEDROCK_ACCESS_KEY_ID ||
  !process.env.AWS_BEDROCK_SECRET_ACCESS_KEY
) {
  console.error(
    chalk.red(
      'Missing AWS credentials: AWS_BEDROCK_ACCESS_KEY_ID and AWS_BEDROCK_SECRET_ACCESS_KEY must be set.'
    )
  );
  process.exit(1);
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error(
    chalk.red(
      'Missing BLOB_READ_WRITE_TOKEN: embeddings must be uploadable to Vercel Blob.'
    )
  );
  process.exit(1);
}

console.log(chalk.blue('Chunking docs...'));
await $`pnpm tsx lib/markdown/etl/chunker.ts`;

console.log(chalk.blue('Building embeddings...'));
await $`pnpm tsx lib/markdown/etl/embedder.ts`;
