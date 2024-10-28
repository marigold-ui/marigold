import { Octokit } from '@octokit/core';
import path from 'path';
import { fs, globby } from 'zx';

require('dotenv').config();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// only take the changelogs of the packages
let changelogPath = await globby([
  '../{**,*}/CHANGELOG.md',
  '!../**/node_modules/**',
]);

console.log('📑 Generating changelogs...');

const getReleaseData = async () => {
  const octokit = new Octokit({ auth: GITHUB_TOKEN });
  const response = await octokit.request(
    'GET /repos/marigold-ui/marigold/releases',
    {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  );

  const releases = response.data;
  const releaseDates = new Map();

  releases.forEach(release => {
    const [, version] = release.name.match(/@([^@]+)$/) || [];
    if (!version) return;

    const badge = undefined;
    // Check if the version already exists to avoid duplicates and get date
    if (!releaseDates.has(version)) {
      const releaseDate = new Date(release.published_at);

      const today = new Date();
      const timeDifference = today.getTime() - releaseDate.getTime();
      const aDayInMs = 24 * 60 * 60 * 1000;
      const daysDifference = Math.round(timeDifference / aDayInMs);

      releaseDates.set(version, {
        releaseDate: releaseDate,
        badge: !badge && daysDifference < 30 ? 'new' : undefined,
      });
    }
  });

  return releaseDates;
};

const getReleaseInformation = async (sourceText, releaseDates) => {
  const versionRegex = /## (\d{1,2}\.\d{1,2}\.\d{1,2})/gm;
  const versions = sourceText.match(versionRegex);

  if (!versions) {
    console.log('No versions found in the source text.');
    return [];
  }

  const normalizedVersions = versions.map(version =>
    version.replace('## ', '')
  );

  const versionReleaseDates = normalizedVersions.map(version => {
    const releaseInfo = releaseDates.get(version);

    return {
      version,
      releaseDate: releaseInfo ? releaseInfo.releaseDate : null,
      badge: releaseInfo ? releaseInfo.badge : undefined,
    };
  });

  return versionReleaseDates;
};

const addFrontmatter = (sourceText, releases) => {
  const regex = /^# (.*)$/m;
  let matches = regex.exec(sourceText);

  if (!matches) return sourceText;

  if (matches) {
    let frontmatter = '';
    const packageName = matches[1];
    frontmatter += '---\n';
    frontmatter += `title: '${packageName}'\n`;
    frontmatter += `caption: 'Have a look on the latest changes regarding ${packageName}'\n`;
    const hasBadge = releases.some(release => release.badge);
    if (hasBadge) {
      frontmatter += `badge: new\n`;
    }
    frontmatter += 'toc: false\n';
    frontmatter += '---';

    return sourceText.replace(regex, frontmatter);
  }
};

const adjustContent = (sourceText, releases) => {
  const regex = /## \d{1,2}\.\d{1,2}\.\d{1,2}/gm;
  const versions = sourceText.match(regex);

  if (!versions) return sourceText;

  releases.forEach((release, index) => {
    const version = versions[index];
    if (version && release.releaseDate) {
      const newContent = `${version} (Released on <DateFormat value={new Date("${release.releaseDate}")} dateStyle="medium" />)`;
      sourceText = sourceText.replace(
        new RegExp(`${version}(?=\\n)`),
        newContent
      );
    }
  });

  return sourceText;
};

// generate folder structure for changelogs
changelogPath.forEach(async file => {
  const data = fs.readFileSync(file, 'utf8');
  let packages = path.dirname(file.replace(/^\.\.\//, ''));

  const changelogDir = `content/releases/${packages}`;
  let changelogModified = data;
  const releaseDates = await getReleaseData();
  const releases = await getReleaseInformation(changelogModified, releaseDates);

  changelogModified = addFrontmatter(changelogModified, releases);
  changelogModified = adjustContent(changelogModified, releases);
  fs.mkdirSync(changelogDir, {
    recursive: true,
  });

  // Write the modified changelog to the new directory
  fs.writeFileSync(
    path.join(changelogDir, 'release.mdx'),
    changelogModified,
    'utf-8'
  );
  console.log(`✅ Successfully built ${path.join(packages, 'release.mdx')}`);
});
