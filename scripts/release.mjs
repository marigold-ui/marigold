#!/usr/bin/env zx

// Set available globals for eslint
/* global $, cd, question, chalk */

// Helper
// ---------------
const log = console.log;
const space = () => log('');
const brand = chalk.hex('#fa8005'); // orange color
const trim = val => `${val}`.trim();
const step = (icon, msg) => log(chalk.white.bold(`${icon}  ${msg}`));

const option = async msg => {
  space();
  const asw = await question(chalk.bold(`${msg} [yes/no]`), {
    choices: ['yes', 'no'],
  });
  if (asw !== 'yes') {
    log(chalk.yellow('Aborted by user.'));
    process.exit(0);
  }
};

const exit = (msg, detail) => {
  space();
  log(chalk.red(`🚨 ${chalk.bold.underline('ERROR')}:`, chalk.bold(msg)));
  if (detail) {
    log(chalk.red(`   ${detail.replace(/\n/gm, '\n   ')}`));
  }
  process.exit(1);
};

// Scripts
// ---------------
log(brand.bold('┌───────────────────────────────────┐'));
log(brand.bold('│                                   │'));
log(brand.bold('│   🏵  Preparing a new release!     │'));
log(brand.bold('│                                   │'));
log(brand.bold('└───────────────────────────────────┘'));
space();

step('🧼', 'Checking git status ...');
let branch = await $`git branch --show-current`;
if (trim(branch) !== 'main') {
  exit(
    `You are not on the main branch.`,
    `Please switch to the ${chalk.underline('main')} branch before releasing.`
  );
}
const clean = await $`git status --untracked-files=no --porcelain`;
if (trim(clean) !== '') {
  exit(
    'There are uncommitted changes.',
    'Please commit or stash them before releasing.'
  );
}

step('🔒', 'Checking npm status ...');
try {
  await $`pnpm whoami`;
} catch {
  exit(
    'You are not logged in to npm.',
    'Please log via "pnpm login" in before releasing.'
  );
}

step('📱', 'Checking 2FA status ...');
const mode = await $`npm profile get "two-factor auth"`;
if (trim(mode) !== 'auth-and-writes') {
  exit(
    'You have not set 2FA to the correct mode.',
    `Please set 2FA to "auth-and-writes" via ${chalk.underline(
      'npm profile enable-2fa auth-and-writes'
    )}.`
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
await $`pnpm changeset status`.pipe(process.stdout);

space();
log(chalk.bold('Please review the changeset.'));
await option('Do you want to continue?');

step('🍾', 'Bumping versions & generating changelog...');
await $`pnpm changeset version`.pipe(process.stdout);

step('👷', 'Building packages...');
await $`pnpm install`.pipe(process.stdout);
await $`pnpm build`.pipe(process.stdout);
log('✓  Packages built.');

step('🔼', 'Pushing changes to main branch...');
// We use "@marigold/components" as leading version
const { version } = require('../packages/components/package.json');
await $`git add -A`;
await $`git commit -am "release: v${version}"`;
await $`git push`;
await $`git push --tags`;

step('🌟', 'Publishing to npm...');
await option(
  'Do you want to continue? (you will be prompted for your 2FA token)'
);
await $`pnpm changeset publish --access public`.pipe(process.stdout);
log(brand.bold('🥳  Release complete!'));

await option(
  `Do you want to release new docs to ${chalk.underline(
    'https://marigold-ui.io/'
  )}?`
);
await $`pnpm --filter @marigold/docs clean`;
await $`pnpm --filter @marigold/docs deploy`.pipe(process.stdout);

step('🛎', 'inform Slack Channel ...');
await $`pnpm slack`;

space();
log(brand.bold('🥳  Deployment complete!'));
