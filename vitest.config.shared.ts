import { defineConfig } from 'vitest/config';

/**
 * Deps that must be pre-bundled for browser-mode vitest projects.
 *
 * Without pre-bundling, Vite discovers these deps at runtime and triggers
 * on-demand optimization, which races with concurrent browser test execution
 * in CI (cold cache, constrained resources) and produces:
 *   `TypeError: error loading dynamically imported module`
 *
 * Keep this list next to the coverage config so adding a provider
 * doesn't silently break projects that override `optimizeDeps`.
 *
 * @see https://github.com/storybookjs/storybook/issues/33067
 * @see https://github.com/vitest-dev/vitest/issues/9509
 */
export const browserDeps = [
  // Coverage provider (loads dynamically after tests complete)
  '@vitest/coverage-istanbul',
  // Storybook addons (loaded via storybook preview/decorators)
  '@storybook/addon-a11y',
  '@storybook/addon-docs',
  'storybook-addon-test-codegen/preview',
  'storybook/viewport',
  // App deps used in decorators/stories
  '@tanstack/react-query',
  'react-select',
  // SSR-hydration test (TableEditableCell.ssr.test.tsx) imports these as bare
  // specifiers — the first explicit `react-dom/server` + `react-dom/client`
  // entry points in the suite. Without pre-bundling, Vite optimizes them
  // mid-run, pulling a second copy of React into the server bundle and
  // surfacing as `resolveDispatcher() is null` during renderToString/hydrateRoot.
  'react-dom/server',
  'react-dom/client',
  // react-aria-components subpath imports (DST-1512 "RAC-first" principle).
  // Each subpath is a SEPARATE optimizer entry — pre-bundling the meta-package
  // does NOT cover `react-aria-components/<Subpath>`. Any subpath not listed
  // here is discovered at runtime by browser-mode projects, which re-optimizes
  // mid-run and cascades "error loading dynamically imported module" (the
  // DateField/`useButton` CI flake). This list mirrors every subpath imported
  // across packages/*/src — keep it in sync when adding new RAC subpaths.
  'react-aria-components/Autocomplete',
  'react-aria-components/Breadcrumbs',
  'react-aria-components/Button',
  'react-aria-components/Calendar',
  'react-aria-components/Checkbox',
  'react-aria-components/CheckboxGroup',
  'react-aria-components/Collection',
  'react-aria-components/ComboBox',
  'react-aria-components/DateField',
  'react-aria-components/DatePicker',
  'react-aria-components/Dialog',
  'react-aria-components/Disclosure',
  'react-aria-components/DisclosureGroup',
  'react-aria-components/DropZone',
  'react-aria-components/FieldError',
  'react-aria-components/FileTrigger',
  'react-aria-components/Form',
  'react-aria-components/GridList',
  'react-aria-components/Group',
  'react-aria-components/Header',
  'react-aria-components/Heading',
  'react-aria-components/I18nProvider',
  'react-aria-components/Input',
  'react-aria-components/Label',
  'react-aria-components/Link',
  'react-aria-components/ListBox',
  'react-aria-components/Menu',
  'react-aria-components/Modal',
  'react-aria-components/NumberField',
  'react-aria-components/Popover',
  'react-aria-components/Pressable',
  'react-aria-components/ProgressBar',
  'react-aria-components/RadioGroup',
  'react-aria-components/RangeCalendar',
  'react-aria-components/SearchField',
  'react-aria-components/Select',
  'react-aria-components/Separator',
  'react-aria-components/Slider',
  'react-aria-components/slots',
  'react-aria-components/Switch',
  'react-aria-components/Table',
  'react-aria-components/Tabs',
  'react-aria-components/TagGroup',
  'react-aria-components/Text',
  'react-aria-components/TextArea',
  'react-aria-components/TextField',
  'react-aria-components/TimeField',
  'react-aria-components/Toast',
  'react-aria-components/ToggleButton',
  'react-aria-components/ToggleButtonGroup',
  'react-aria-components/Toolbar',
  'react-aria-components/Tooltip',
  'react-aria-components/useAsyncList',
  'react-aria-components/useDragAndDrop',
  'react-aria-components/useListData',
  'react-aria-components/useRenderProps',
  'react-aria-components/Virtualizer',
  'react-aria-components/VisuallyHidden',
  // Bare @react-aria/* packages imported directly in src. These are split into
  // shared optimizer chunks (e.g. @react-aria/button -> `useButton-*.js`) that
  // are pulled in transitively by RAC subpaths; pre-bundle them so the chunk
  // exists before the first test loads instead of being created mid-run.
  '@react-aria/button',
  '@react-aria/collections',
  '@react-aria/focus',
  '@react-aria/form',
  '@react-aria/interactions',
  '@react-aria/landmark',
  '@react-aria/overlays',
  '@react-aria/ssr',
  '@react-aria/table',
  '@react-aria/utils',
  // Virtualizer deps (reference process.env in source)
  '@react-aria/virtualizer',
  '@react-stately/layout',
  // Test setup (extends expect at module load time)
  '@testing-library/jest-dom/vitest',
];

const exclude = [
  '**/node_modules/**',
  '**/dist/**',
  '**/cypress/**',
  '**/.{idea,git,cache,output,temp}/**',
  '**/*.config.*',
  '**/config/**',
  '**/docs*/**',
  '**/themes/**',
  '**/packages/types/**',
  // @marigold/cli runs node-mode tests from its own vitest config.
  '**/packages/cli/**',
  '**/theme-plugins/**',
  '**/scripts/**',
  '**/storybook-static/**',
  '**/.storybook/**',
  '**/test.utils.*',
];

export default defineConfig({
  test: {
    exclude,
    testTimeout: 30000,
    coverage: {
      provider: 'istanbul',
      exclude: [
        ...exclude,
        '**/*.stories.tsx',
        '**/index.*',
        'packages/components/src/hooks.ts',
        'packages/components/src/types.ts',
        'packages/system/src/defaultTheme.ts',
        'packages/system/src/style-props.tsx',
        'packages/system/src/types/theme.ts',
      ],
      thresholds: {
        statements: 90,
        branches: 85,
        functions: 90,
        lines: 90,
      },
      reporter: ['text', 'json', 'html', 'json-summary'],
    },
  },
});
