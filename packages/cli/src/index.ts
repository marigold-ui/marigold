export { getPageDocs, type PageDocs } from './lib/docs.js';
export {
  loadManifest,
  resolveComponent,
  resolvePage,
  type Manifest,
  type ManifestComponent,
  type ManifestCategory,
  type ManifestPage,
} from './lib/manifest.js';
export {
  listExamples,
  getExample,
  loadExamplesManifest,
  resolveExample,
  type ExamplesManifest,
  type ExampleSummary,
  type ExampleDetail,
  type ExampleMockData,
  type ExampleFile,
} from './lib/examples.js';
export { runDocs } from './commands/docs.js';
export { runList } from './commands/list.js';
export { runExamples } from './commands/examples.js';
export { runInit } from './commands/init.js';
export { runTelemetry } from './commands/telemetry.js';
export { runCompletion, runCompleteSuggest } from './commands/completion.js';
export { runValidate } from './commands/validate.js';
export type { ValidateChecks, ValidateFormat } from './commands/validate.js';
