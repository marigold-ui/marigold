const shell = require('shelljs');

const component = process.argv[2];

const path = `packages/components/src/` + component;

shell.mkdir('-p', path);
shell.cp('-n', 'scripts/template/index.ts', `${path}/index.ts`);
shell.cp('-n', 'scripts/template/Component.tsx', `${path}/${component}.tsx`);
shell.cp(
  '-n',
  'scripts/template/Component.test.tsx',
  `${path}/${component}.test.tsx`
);
shell.cp(
  '-n',
  'scripts/template/Component.stories.mdx',
  `${path}/${component}.stories.mdx`
);
