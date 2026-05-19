---
'@marigold/system': patch
---

fix(DSTSUP-253): make `cva` results assignable to `ComponentStyleFunction` under default strict TypeScript. `@marigold/system@17.5.0` shipped `cva@1.0.0-beta.4`, whose narrowed return type stopped satisfying `ComponentStyleFunction<Variants, Sizes>` once consumers enabled `strictFunctionTypes` (implied by `strict: true`). Function-parameter contravariance rejected both the dead `variant?: Variants | null` slot and the wider-vs-narrower variant union, breaking every consumer theme that followed the documented `cva(...) as ThemeComponent<'Foo'>` pattern. The type now uses a method-shorthand call signature so parameter checking stays bivariant, restoring assignability under strict mode without changing runtime behavior. A dedicated `pnpm typecheck:strict` script compiles a focused regression test under `strictFunctionTypes: true`, so the monorepo's loose base config no longer hides similar regressions.
