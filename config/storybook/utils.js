const findUp = require('find-up').sync;
const loadJsonFile = require('load-json-file').sync;
const { dirname } = require('path');
const {} = require('tsconfig-paths');

const getProjectRoot = ({ cwd }) => {
  const pkg = findUp('package.json', { cwd });

  if (!pkg) {
    throw Error('Could not find a project root!');
  }

  return dirname(pkg);
};

const getTSConfig = ({ cwd }) => {
  const config = findUp('tsconfig.json', { cwd });

  if (!config) {
    throw Error('Could not find tsconfig file!');
  }

  return config;
};

const getAliasesFromTSConfig = ({ cwd }) => {
  const { paths, baseUrl } = loadJsonFile(getTSConfig({ cwd })).compilerOptions;
  return compilerOptions;
};

// Exports
// ---------------
module.exports = {
  getProjectRoot,
  getTSConfig,
  getAliasesFromTSConfig,
};
