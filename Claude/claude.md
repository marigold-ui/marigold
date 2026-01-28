# Marigold Design System - Development Guide

See @README.md for project overview and @package.json for available pnpm commands.

## Quick Start

- **Documentation**: `pnpm start` → [localhost:3000](http://localhost:3000)
- **Storybook**: `pnpm sb` → [localhost:6006](http://localhost:6006)

## Build System

- This is a **pnpm workspace monorepo** managed by Turbo
- Always use `pnpm` (not npm or yarn) - required by `packageManager` field
- Run `pnpm install` after pulling changes (postinstall builds packages)
- Build components before testing: `pnpm build` or `turbo run build`
- Use `pnpm --filter <package>` to run commands in specific packages

## Code Style

- **TypeScript**: Required for all new code (strict mode enabled)
- **Imports**: Use ES modules syntax, destructure when possible
- **React**: Use React 19 with functional components and hooks
- **Components**: Built on react-aria for accessibility
- **Styling**: Tailwind CSS utility classes (Tailwind v4)
- **Formatting**: Prettier (run `pnpm format` before committing)

## Testing

- **Test runner**: Vitest (not Jest)
- **Run tests**: `pnpm test` (all), `pnpm test:unit` (unit), `pnpm test:sb` (Storybook)
- **Browser tests**: Playwright integration via `@vitest/browser-playwright`
- **Coverage**: `pnpm test:coverage` (requires 90% statements, functions, lines; 85% branches)
- Always add tests for new components using Testing Library patterns

## Workflow

- **Typecheck**: Run `pnpm typecheck:only` after code changes
- **Lint**: Run `pnpm lint` to check code style
- **Branch from**: `main` (use GitHub Flow)
- **Changesets**: Use `pnpm changeset` for version management
- **Storybook**: Run `pnpm sb` to preview components locally

## Monorepo Structure

- `packages/components` - Core React components
- `packages/system` - Design system utilities
- `packages/icons` - Icon components
- `packages/types` - Shared TypeScript types
- `themes/*` - Theme packages
- `docs` - Documentation site (Next.js)

## Common Gotchas

- Components depend on `@marigold/system` - rebuild system package if making system changes
- Docs depend on `@marigold/theme-rui` - rebuild theme package for changes to be visible in docs
- Storybook uses source folders directly (not dist) - no build needed for stories
- Git hooks run lint-staged on commit via Husky
- Node.js 22.x required (check `.node-version`)
