import path from 'path';
import { fs, globby } from 'zx';

// only take the changelogs of the packages
let changelogPath = await globby([
  '../{**,*}/CHANGELOG.md',
  '!../**/node_modules/**',
  '!../docs/{**,*}/**/CHANGELOG.md',
]);

const replacePageTitle = sourceText => {
  const regex = /^# (.*)$/m;

  //const regex = RegExp('#\\s@marigold\\/');
  let matches = regex.exec(sourceText);

  let replacementText = '';
  if (matches) {
    const packageName = matches[1];
    const replacementText = `## What's new for ${packageName}\n`;
    return sourceText.replace(regex, replacementText);
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
  changelogModified = replacePageTitle(changelogModified);
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
