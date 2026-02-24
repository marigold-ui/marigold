import { Octokit } from '@octokit/core';
import path from 'path';
import { fileURLToPath } from 'url';
import { fs, globby } from 'zx';

require('dotenv').config({ path: ['.env.local', '.env'] });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '../..');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: GITHUB_TOKEN });

// only take the changelogs of the packages
// docs/scripts: ../.. is repo root
let changelogPath = await globby(
  ['{**,*}/CHANGELOG.md', '!**/node_modules/**'],
  {
    cwd: rootDir,
  }
);

console.log('📑 Generating changelogs...');

const calculateDaysSince = date => {
  const today = new Date();
  const timeDifference = today - date;
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  return Math.round(timeDifference / millisecondsInADay);
};

const getReleaseData = async () => {
  try {
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
      // Try multiple patterns to match version
      // Pattern 1: @package@version (e.g., @marigold/components@16.1.0)
      let versionMatch = release.name.match(/@([^@]+)$/);
      let version = versionMatch ? versionMatch[1] : null;

      // Pattern 2: Just version number (e.g., 16.1.0)
      if (!version) {
        versionMatch = release.name.match(/(\d{1,2}\.\d{1,2}\.\d{1,2})/);
        version = versionMatch ? versionMatch[1] : null;
      }

      if (!version) return;

      if (!releaseDates.has(version)) {
        const releaseDate = new Date(release.published_at);
        const daysSinceRelease = calculateDaysSince(releaseDate);
        const badge = daysSinceRelease < 30 ? 'new' : undefined;

        releaseDates.set(version, {
          releaseDate,
          badge,
        });
      }
    });

    console.log(`📦 Found ${releaseDates.size} release versions from GitHub`);
    return releaseDates;
  } catch (error) {
    console.warn(
      '⚠️  Could not fetch release data from GitHub:',
      error.message
    );
    console.warn(
      '   Release dates will not be added. Set GITHUB_TOKEN to enable.'
    );
    return new Map();
  }
};

const getReleaseInformation = async (sourceText, releaseDates) => {
  const versionRegex = /## (\d{1,2}\.\d{1,2}\.\d{1,2})/gm;
  const matches = [...sourceText.matchAll(versionRegex)];

  if (!matches || matches.length === 0) {
    console.log('No versions found in the source text.');
    return [];
  }

  const versionReleaseDates = matches.map(match => {
    const version = match[1];
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
    frontmatter += '---\n\n';
    // Add import for DateFormat component
    frontmatter += 'import { DateFormat } from "@/ui";\n\n';

    return sourceText.replace(regex, frontmatter);
  }
};

const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const adjustContent = (sourceText, releases) => {
  const regex = /## (\d{1,2}\.\d{1,2}\.\d{1,2})/gm;
  let match;
  const replacements = [];

  // Find all version matches and their positions
  while ((match = regex.exec(sourceText)) !== null) {
    const version = match[1];
    const fullMatch = match[0];
    const release = releases.find(r => r.version === version);

    if (release && release.releaseDate) {
      // Format the date as ISO string for the Date constructor
      const dateISO = release.releaseDate.toISOString();
      const newContent = `${fullMatch} (Released on <DateFormat value={new Date("${dateISO}")} dateStyle="medium" />)`;
      replacements.push({
        version,
        fullMatch,
        newContent,
      });
    }
  }

  // Apply replacements - replace from end to start to maintain positions
  replacements.reverse().forEach(({ version, newContent }) => {
    // Replace with regex that handles both \n and \r\n
    const pattern = new RegExp(`## ${escapeRegExp(version)}(\\r?\\n)`, 'g');
    sourceText = sourceText.replace(pattern, `${newContent}$1`);
  });

  if (replacements.length > 0) {
    console.log(`   Added dates for ${replacements.length} versions`);
  }

  return sourceText;
};

// Fetch release data once for all changelogs
const releaseDates = await getReleaseData();

// generate folder structure for changelogs
for (const file of changelogPath) {
  // Ensure we have an absolute path
  const absolutePath = path.isAbsolute(file) ? file : path.join(rootDir, file);
  const data = fs.readFileSync(absolutePath, 'utf8');
  // Get relative path from root directory
  const relativePath = path.relative(rootDir, absolutePath);
  let packages = path.dirname(relativePath);

  const changelogDir = path.join(__dirname, '../content/releases', packages);
  let changelogModified = data;
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
}
