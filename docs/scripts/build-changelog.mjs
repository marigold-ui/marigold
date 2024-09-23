import path from 'path';
import { simpleGit } from 'simple-git';
import { fs, globby } from 'zx';

const git = simpleGit();

// only take the changelogs of the packages
let changelogPath = await globby([
  '../docs/CHANGELOG.md',
  '../{**,*}/CHANGELOG.md',
  '!../**/node_modules/**',
  '!../docs/{**,*}/**/CHANGELOG.md',
]);

const getVersion = async file => {
  const newFile = path.resolve(file);
  const log = await git.log({ file: newFile });

  const releases = log.all
    .filter(release => release.author_name === 'github-actions[bot]')
    .map(release => {
      const releaseDate = new Date(release.date);
      const today = new Date();

      // to get the difference in days we need to calculate
      // the difference between time and divide it into miliseconds a day has
      const timeDifference = today.getTime() - releaseDate.getTime();
      const aDayInMs = 24 * 60 * 60 * 1000;
      const daysDifference = Math.round(timeDifference / aDayInMs);

      const badge = daysDifference < 30 ? 'new' : undefined;

      return badge;
    });

  return releases;
};

const addFrontmatter = (sourceText, versions) => {
  const regex = /^# (.*)$/m;
  let matches = regex.exec(sourceText);
  const hasBadge = versions.includes('new');

  let frontmatter = '';
  if (matches) {
    const packageName = matches[1];
    frontmatter += '---\n';
    frontmatter += `title: "${packageName}"\n`;
    frontmatter += `caption: "Have a look on the latest changes regarding ${packageName}"\n`;

    if (hasBadge) {
      frontmatter += `badge: ${versions[0]}\n`;
    }
    frontmatter += '---\n';
    return sourceText.replace(regex, frontmatter);
  }
  return sourceText;
};

// generate folder structure for changelogs
changelogPath.forEach(async file => {
  const data = fs.readFileSync(file, 'utf8');
  let packages = path.dirname(file.replace('../', ''));

  const changelogDir = `content/changelog/${packages}`;
  let changelogModified = data;
  const versions = await getVersion(file);

  changelogModified = addFrontmatter(changelogModified, versions);
  fs.mkdirSync(changelogDir, {
    recursive: true,
  });

  // Write the modified changelog to the new directory
  fs.writeFileSync(
    path.join(changelogDir, path.basename(file)),
    changelogModified,
    'utf-8'
  );
});
