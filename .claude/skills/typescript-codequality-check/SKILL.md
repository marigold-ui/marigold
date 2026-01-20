---
name: typescript-codequality-check
description: Guidance on how to ensure code quality after implementing changes in Typescript files (*.ts, *.tsx). Use this skill after changing Typescript files, to ensure that your code is well formatted and follows the best practices.
allowed-tools: Read, Bash(pnpm lint:*), Bash(pnpm format:*), Bash(pnpm typecheck)
---

# Typescript Code Quality Checks Skill

This skill provides guidance on how to ensure code quality after implementing changes in Typescript files.

## Overview

To ensure consistent code quality in Typescript projects, it is essential to to run code quality checks after implementing changes and new features.
The checks performed by this skill are:

1. Eslint
2. Prettier
3. Tsc

It is critical that all checks pass before changes are committed to the git branch.

## Workflow

<instructions>
1. **Identify Changed Typescript Files**: Determine which Typescript files have been modified in the current git branch. Relevant files include *ts and *.tsx
2. Run the checks only on those files.
3. If any of those checks fail, fix the issues and start over from step 1.
</instructions>

## How to run the tools

All tools must be run via `pnpm` commands from the project root directory.

<examples>
<example name="code-linting">
pnpm lint
</example>
<example name="code-format">
pnpm format:fix
</example>
<example name="type-checking">
pnpm typecheck
</example>
</examples>