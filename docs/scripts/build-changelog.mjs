import { release } from 'os';
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

const getVersion = async (sourceText, file) => {
  const newFile = path.resolve(file);
  const version = /@[0-9]+\.[0-9]+\.[0-9]+/;
  //const version = /##\s([0-9]+(\.[0-9]+)+).*$/;
  const log = await git.log({ file: newFile });

  const tag = await git.tag();
  let versionMatches = version.exec(sourceText);

  const releases = log.all
    .filter(release => release.author_name === 'github-actions[bot]')
    .map(release => {
      const matchedVersion = release.refs.match(version);
      const versionValue = matchedVersion ? matchedVersion[0] : undefined;

      const releaseDate = new Date(release.date);
      const today = new Date();

      const timeDifference = today.getTime() - releaseDate.getTime();
      const aDayInMs = 24 * 60 * 60 * 1000;
      // to get the difference in days we need to calculate the difference between time and divide it into miliseconds a day has
      const daysDifference = Math.round(timeDifference / aDayInMs);

      console.log(daysDifference);

      return {
        version: versionValue,
        date: release.date,
      };
    });

  return releases;
};

const addFrontmatter = sourceText => {
  const regex = /^# (.*)$/m;

  let matches = regex.exec(sourceText);

  // const version = /##\s([0-9]+(\.[0-9]+)+)/;
  // let versionMatches = version.exec(sourceText);

  let frontmatter = '';
  if (matches) {
    const packageName = matches[1];
    frontmatter += '---\n';
    frontmatter += `title: "${packageName}"\n`;
    frontmatter += `caption: "Have a look on the latest changes regarding ${packageName}"\n`;
    //frontmatter += `badge: `;
    frontmatter += '---\n';
    return sourceText.replace(regex, frontmatter);
  }
  return sourceText;
};

// generate folder structure for changelogs
changelogPath.forEach(file => {
  const data = fs.readFileSync(file, 'utf8');
  let packages = path.dirname(file.replace('../', ''));

  const changelogDir = `content/changelog/${packages}`;
  let changelogModified = data;
  changelogModified = addFrontmatter(changelogModified);

  getVersion(changelogModified, file);

  fs.mkdirSync(changelogDir, {
    recursive: true,
  });
  fs.writeFileSync(
    path.join(changelogDir, path.basename(file)),
    changelogModified,
    'utf-8'
  );
});
