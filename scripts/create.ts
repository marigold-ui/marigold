const shell = require('shelljs');

const component = process.argv[2];
const path = `packages/components/src/` + component;

// create component directory and copy template files to it
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
shell
  .ShellString(`export * from './${component}';\n`)
  .toEnd('packages/components/src/index.ts');

// replace COMP with component name
shell.sed('-i', /COMP/, `${component}`, `${path}/index.ts`);
shell.sed('-i', /COMP/, `${component}`, `${path}/${component}.tsx`);
shell.sed('-i', /COMPProps/, `${component}Props`, `${path}/${component}.tsx`);
shell.sed('-i', /COMP/, `${component}`, `${path}/${component}.test.tsx`);
shell.sed('-i', /COMP/, `${component}`, `${path}/${component}.stories.mdx`);
