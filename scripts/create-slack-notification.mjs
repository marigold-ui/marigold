#!/usr/bin/env node
import { getPackagesSync } from '@manypkg/get-packages';

/** @type {Array<{ name: string, version: string }>} */
const published = JSON.parse(process.argv[2] || '[]');

if (!published.length) {
  console.warn('No released packages found!');
  process.exit(0);
}

const { packages } = getPackagesSync(process.cwd());

const releaseInfos = published
  .map(({ name, version }) => {
    const { packageJson: pkg } = packages.find(
      ({ packageJson }) => packageJson.name === name
    );
    const changelog = `${pkg.repository.url}/blob/main/${pkg.repository.directory}/CHANGELOG.md`;
    return { name, version, changelog };
  })
  .map(({ name, version, changelog }) => {
    const anchor = version.replace(/\./g, '');
    return `• \`${name}\` (v${version}, <${changelog}#${anchor}|view changelog>)`;
  })
  .join('\n');

// Get current date formatted in "YYYY-MM-DD"
const currentDate = new Date().toISOString().split('T')[0];

// Slack Message (to edit copy/paste to https://app.slack.com/block-kit-builder/)
const message = {
  blocks: [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: ':tada:  New Marigold Release',
      },
    },
    {
      type: 'context',
      elements: [
        {
          text: `*${currentDate}* | Design System Team`,
          type: 'mrkdwn',
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'We updated the following packages. For a detailed list of updates, fixes and additions see the latest changelog of the respective package.',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `${releaseInfos}`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'If you find any bugs or have suggestions how we can improve Marigold, please <https://github.com/marigold-ui/marigold/issues/new/choose|let us know>!',
      },
    },
  ],
};

console.log(JSON.stringify(message));
