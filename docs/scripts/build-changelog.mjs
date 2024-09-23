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
    .map(release => ({
      version: release.refs.match(version)[0],
      date: release.date,
    }));

  console.log(releases);
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
  changelogModified = addFrontmatter(changelogModified, file);
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
