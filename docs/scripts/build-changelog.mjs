import { mkdir } from 'fs';
import path from 'path';
import { fs, globby } from 'zx';

// only take the changelogs of the packages
let changelogPath = await globby([
  '../{**,*}/CHANGELOG.md',
  '!../**/node_modules/**',
  '!../docs/{**,*}/**/CHANGELOG.md',
]);

changelogPath.forEach(file => {
  const data = fs.readFileSync(file, 'utf8');
  const packages = path.dirname(file.replace('../', '@'));
  const changelogDir = `content/changelog/${packages}`;
  fs.mkdirSync(changelogDir, {
    recursive: true,
  });
  fs.writeFileSync(
    path.join('content/changelog/', file.replace('../', '@')),
    data
  );
});
