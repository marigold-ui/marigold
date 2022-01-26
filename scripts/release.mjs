#!/usr/bin/env zx

// Set available globals for eslint
/* global $, question, chalk, fs, globby, os, path, minimist */

const log = console.log;
const space = () => log('');
const step = (icon, msg) => log(chalk.white.bold(`${icon}  ${msg}`));
const exit = (msg, detail) => {
  space();
  log(chalk.red(`🚨 ${chalk.bold.underline('ERROR')}:`, chalk.bold(msg)));
  if (detail) {
    log(chalk.red(`   ${detail.replace(/\n/gm, '\n   ')}`));
  }
  // process.exit(1);
};
const brand = chalk.hex('#fa8005'); // orange color

/**
 * - Check if there are uncommitted changes
 * - run all release steps
 */
log(brand.bold('┌───────────────────────────────────┐'));
log(brand.bold('│                                   │ '));
log(brand.bold('│   🏵  Preparing a new release!     │ '));
log(brand.bold('│                                   │ '));
log(brand.bold('└───────────────────────────────────┘'));
space();

step('🧼', 'Checking git status ...');
const branch = $`git branch --show-current`;
if (branch !== 'main') {
  exit(
    `You are not on the main branch.`,
    `Please switch to the ${chalk.underline('main')} branch before releasing.`
  );
}
const clean = $`git status --untracked-files=no --porcelain`;
if (clean !== '') {
  exit(
    'There are uncommitted changes.',
    'Please commit or stash them before releasing.'
  );
}

step('🔒', 'Checking npm status ...');
try {
  $`npm whoami`;
} catch {
  exit(
    'You are not logged in to npm.',
    'Please log via "npm login" in before releasing.'
  );
}

step('🐈', 'Checking for auth token ...');
if (!process.env.GITHUB_TOKEN) {
  exit(
    'No GITHUB_TOKEN found.',
    'Please create a GitHub personal access token at https://github.com/settings/tokens/new and\nadd it as the GITHUB_TOKEN environment variable.'
  );
}

step('📦', 'Checking package status...');
await $`yarn changeset status`.pipe(process.stdout);

space();
log(chalk.bold('Please review the changeset.'));
const asw = await question(chalk.bold('Do you want to continue? [yes/no]'), {
  choices: ['yes', 'no'],
});

if (asw !== 'yes') {
  log(chalk.yellow('Aborted by user.'));
  process.exit(0);
}

step('🍾', 'Bumping versions & generating changelog...');
await $`yarn changeset version`.pipe(process.stdout);
