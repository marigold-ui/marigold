import path from 'path';
import { fs, globby } from 'zx';

// only take the changelogs of the packages
let changelogPath = await globby([
  '../{**,*}/CHANGELOG.md',
  '!../**/node_modules/**',
  '!../docs/{**,*}/**/CHANGELOG.md',
]);

const addFrontmatter = sourceText => {
  const regex = /^# (.*)$/m;

  let matches = regex.exec(sourceText);

  let frontmatter = '';
  if (matches) {
    const packageName = matches[1];
    frontmatter += '---\n';
    frontmatter += `title: "${packageName}"\n`;
    frontmatter += `caption: "Have a look on the latest changes regarding ${packageName}"\n`;
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

  fs.mkdirSync(changelogDir, {
    recursive: true,
  });
  fs.writeFileSync(
    path.join(changelogDir, path.basename(file)),
    changelogModified,
    'utf-8'
  );
});
