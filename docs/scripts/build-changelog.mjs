import path from 'path';
import { simpleGit } from 'simple-git';
import { fs, globby } from 'zx';

const git = simpleGit();

// only take the changelogs of the packages
let changelogPath = await globby([
  '../{**,*}/CHANGELOG.md',
  '!../**/node_modules/**',
  '!../docs/{**,*}/**/CHANGELOG.md',
]);

const getBadge = async file => {
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

      return { badge, releaseDate };
    });

  return releases;
};

const addFrontmatter = (sourceText, releases) => {
  const regex = /^# (.*)$/m;
  let matches = regex.exec(sourceText);

  let frontmatter = '';
  if (matches) {
    const packageName = matches[1];
    frontmatter += '---\n';
    frontmatter += `title: "${packageName}"\n`;
    frontmatter += `caption: "Have a look on the latest changes regarding ${packageName}"\n`;
    releases.filter(release => {
      release.badge === 'new'
        ? (frontmatter += `badge: ${release.badge}\n`)
        : '';
    });
    frontmatter += '---\n';
    return sourceText.replace(regex, frontmatter);
  }
  return sourceText;
};

const appendExternalLinks = (sourceText, path) => {
  const regex = /^## .*/m;
  let externalLinks = '';
  externalLinks += `_[Read the full changelog](https://github.com/marigold-ui/marigold/blob/main/${path}/CHANGELOG.md)_`;
  return sourceText.replace(regex, match => `${externalLinks}\n${match}`);
};

// generate folder structure for changelogs
changelogPath.forEach(async file => {
  const data = fs.readFileSync(file, 'utf8');
  let packages = path.dirname(file.replace('../', ''));

  const changelogDir = `content/changelog/${packages}`;
  let changelogModified = data;
  const releases = await getBadge(file);

  changelogModified = addFrontmatter(changelogModified, releases);
  changelogModified = appendExternalLinks(changelogModified, packages);
  fs.mkdirSync(changelogDir, {
    recursive: true,
  });

  // Write the modified changelog to the new directory
  fs.writeFileSync(
    path.join(changelogDir, 'changelog.mdx'),
    changelogModified,
    'utf-8'
  );
});
