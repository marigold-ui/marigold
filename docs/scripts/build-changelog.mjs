import path from 'path';
import { simpleGit } from 'simple-git';
import { fs, globby } from 'zx';

const git = simpleGit();

// only take the changelogs of the packages
let changelogPath = await globby([
  '../{**,*}/CHANGELOG.md',
  '!../**/node_modules/**',
]);

console.log('📑 Generating changelogs...');

const getReleaseInformation = async file => {
  const log = await git.log({ file: path.resolve(file) });

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

  if (!matches) return sourceText;

  if (matches) {
    let frontmatter = '';
    const packageName = matches[1];
    frontmatter += '---\n';
    frontmatter += `title: "${packageName}"\n`;
    frontmatter += `caption: "Have a look on the latest changes regarding ${packageName}"\n`;
    releases.filter(release => {
      release.badge === 'new'
        ? (frontmatter += `badge: ${release.badge}\n`)
        : '';
    });
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
    if (version) {
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
  const releases = await getReleaseInformation(file);

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
