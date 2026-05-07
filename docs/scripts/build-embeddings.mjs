#!/usr/bin/env zx
import { $, chalk } from 'zx';

console.log(chalk.blue('Chunking docs...'));
await $`pnpm tsx lib/markdown/etl/chunker.ts`;

console.log(chalk.blue('Building embeddings...'));
await $`pnpm tsx lib/markdown/etl/embedder.ts`;
