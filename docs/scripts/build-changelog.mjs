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

  //const regex = RegExp('#\\s@marigold\\/');
  let matches = regex.exec(sourceText);

  let frontmatter = '';
  if (matches) {
    const packageName = matches[1];
    frontmatter += '---\n';
    frontmatter += `title: "${packageName}"\n`;
    frontmatter += '---\n';
    return sourceText.replace(regex, frontmatter);
  }
  return sourceText;
};

const keepOnlySubsetOfEntries = (sourceText, regex, count) => {
  const lines = sourceText.split(/\r?\n/);
  let entriesCounter = 0;
  let subsetText = '';

  lines.forEach(line => {
    if (line.match(regex)) {
      entriesCounter++;
    }
    // configure here how many entries we want to keep
    if (entriesCounter > count) {
      return;
    } else {
      subsetText += `${line}\n`;
    }
  });
  return subsetText;
};

// generate folder structure for changelogs
changelogPath.forEach(file => {
  const data = fs.readFileSync(file, 'utf8');
  let packages = path.dirname(file.replace('../', ''));

  const changelogDir = `content/changelog/${packages}`;
  let changelogModified = data;
  changelogModified = addFrontmatter(changelogModified);
  //changelogModified += keepOnlySubsetOfEntries(changelogModified, /^## /, 20);

  fs.mkdirSync(changelogDir, {
    recursive: true,
  });
  fs.writeFileSync(
    path.join(changelogDir, path.basename(file)),
    changelogModified,
    'utf-8'
  );
});
