#!/usr/bin/env node

import degit from 'degit';
import pc from 'picocolors';
import prompts from 'prompts';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CLEANUP_FILES = [
  'copy-vendor.js',
  'renovate.json',
  '.bolt',
  'pnpm-lock.yaml',
  'pnpm-workspace.yaml',
];

async function main() {
  let projectName = process.argv[2];

  if (!projectName) {
    const response = await prompts({
      type: 'text',
      name: 'projectName',
      message: 'Project name:',
      validate: value =>
        value.length === 0 ? 'Project name is required' : true,
    });

    projectName = response.projectName;

    if (!projectName) {
      console.log(pc.red('Project name is required.'));
      process.exit(1);
    }
  }

  // Validate project name
  if (!/^[a-zA-Z0-9._-]+$/.test(projectName)) {
    console.log(
      pc.red(
        'Invalid project name. Use only letters, numbers, hyphens, dots, and underscores.'
      )
    );
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    console.log(pc.red(`Directory "${projectName}" already exists.`));
    process.exit(1);
  }

  console.log(
    pc.cyan(`\nScaffolding Marigold app in ${pc.bold(targetDir)}...\n`)
  );

  // Clone template
  const emitter = degit('marigold-ui/starter', { cache: false, force: true });
  await emitter.clone(targetDir);

  // Clean up files that shouldn't be in the scaffolded project
  for (const file of CLEANUP_FILES) {
    fs.rmSync(path.join(targetDir, file), { recursive: true, force: true });
  }

  // Update package.json
  const pkgPath = path.join(targetDir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  pkg.name = projectName;
  delete pkg.repository;
  delete pkg.homepage;
  delete pkg.packageManager;
  delete pkg.scripts?.['copy-styles'];
  if (pkg.scripts?.dev?.includes('copy-styles')) {
    pkg.scripts.dev = 'vite';
  }
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

  // Detect package manager and install dependencies
  const userAgent = process.env.npm_config_user_agent || '';
  let pm = 'pnpm';

  if (userAgent.startsWith('npm')) {
    pm = 'npm';
  } else if (userAgent.startsWith('yarn')) {
    pm = 'yarn';
  }

  // Check if pnpm is available when it's the default
  if (pm === 'pnpm') {
    try {
      execSync('pnpm --version', { stdio: 'ignore' });
    } catch {
      pm = 'npm';
    }
  }

  console.log(pc.cyan(`Installing dependencies with ${pm}...\n`));

  try {
    execSync(`${pm} install`, { cwd: targetDir, stdio: 'inherit' });
  } catch {
    console.log(
      pc.yellow(
        '\nDependency installation failed. You can install them manually.'
      )
    );
  }

  console.log(pc.green('\n✔ Marigold app created successfully!\n'));
  console.log('Next steps:\n');
  console.log(`  ${pc.cyan(`cd ${projectName}`)}`);
  console.log(`  ${pc.cyan(`${pm} dev`)}\n`);
}

main().catch(err => {
  console.error(pc.red('Error:'), err.message);
  process.exit(1);
});
