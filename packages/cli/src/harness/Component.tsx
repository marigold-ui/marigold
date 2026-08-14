// Typecheck-only stub. At runtime, renderer.ts::stageHarnessFiles copies the
// file under validation over this exact path — entry.tsx's `./Component.js`
// import always resolves to that copy, never to this file. This stub exists
// so `import * as ComponentModule from './Component.js'` in entry.tsx has
// something real to resolve against when this directory is typechecked.
import type { ComponentType } from 'react';

const Component: ComponentType = () => null;
export default Component;
export const App: ComponentType = () => null;
