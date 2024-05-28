const fs = require('fs-extra');
const path = require('path');
const reactDocgenTypescript = require('react-docgen-typescript');

console.log('📑 Getting props table...');

const parser = reactDocgenTypescript.withCustomConfig('./tsconfig.json');

const componentsDir = path.resolve(__dirname, '../packages/components/src');
const outputFilePath = path.resolve(__dirname, 'combinedProps.json');

fs.ensureDirSync(path.dirname(outputFilePath));

const generatePropsTables = () => {
  // getting all directories
  const componentDirs = fs
    .readdirSync(componentsDir)
    .filter(dir => fs.lstatSync(path.join(componentsDir, dir)).isDirectory());
  console.log(componentDirs);
  // intialize props value
  const allDocs = {};

  componentDirs.forEach(dir => {
    const componentFiles = fs
      .readdirSync(path.join(componentsDir, dir))
      .filter(file => file.endsWith('.tsx'));
    console.log('componentDirs', componentDirs);
    componentFiles.forEach(file => {
      const filePath = path.join(componentsDir, dir, file);
      const docs = parser.parse(filePath);
      if (docs.length > 0) {
        allDocs[dir] = docs;
      }
    });
  });

  fs.writeJsonSync(outputFilePath, allDocs, { spaces: 2 });
};

generatePropsTables();
