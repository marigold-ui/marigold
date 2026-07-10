/**
 * Marks dynamically imported modules as external so the measured size is the
 * code a consumer ships up front. Marigold splits heavy, on-demand machinery
 * behind dynamic imports (the motion feature bundle, the calendar preset UI);
 * consumers' bundlers turn those into lazily fetched chunks, so counting them
 * against the import cost would charge every consumer for code only some of
 * them ever load.
 */
const externalizeLazyChunks = {
  name: 'externalize-lazy-chunks',
  setup(build) {
    build.onResolve({ filter: /./ }, args =>
      args.kind === 'dynamic-import'
        ? { external: true, path: args.path }
        : null
    );
  },
};

const measureUpfrontCost = config => {
  config.plugins = [...(config.plugins ?? []), externalizeLazyChunks];
  return config;
};

const check = {
  path: 'dist/index.mjs',
  ignore: ['react', 'react-dom', 'react/jsx-runtime'],
  modifyEsbuildConfig: measureUpfrontCost,
};

export default [
  {
    ...check,
    name: 'Leaf components (Stack + Text + Card)',
    import: '{ Stack, Text, Card }',
    limit: '13 kB',
  },
  {
    ...check,
    name: 'Button',
    import: '{ Button }',
    limit: '27 kB',
  },
  {
    ...check,
    name: 'Calendar',
    import: '{ Calendar }',
    limit: '72 kB',
  },
  {
    ...check,
    name: 'Full barrel (all components)',
    import: '*',
    limit: '325 kB',
  },
];
