/**
 * Creates a `File` for use in tests and stories.
 *
 * Lives in its own module (not `test.utils.tsx`) so story files can import it
 * without pulling in `vitest` — a bare `vitest` import in a story's graph
 * breaks the Storybook dev preview (`expect` realm / `customEqualityTesters`).
 */
export const makeFile = (name: string, type: string, size = 1024) =>
  new File([new Uint8Array(size)], name, { type });
