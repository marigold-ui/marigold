---
name: vrt
description: Trigger the Visual-Regression-Tests (Chromatic) GitHub Actions workflow on the current or a given branch. Use ONLY when the user explicitly asks to run visual regression tests, run Chromatic, or types `/vrt`. Dispatching consumes Chromatic snapshot quota, so never invoke this proactively, never as a follow-up to unrelated work, and never to "verify" a change nobody asked to verify.
allowed-tools: Bash(gh workflow run *), Bash(gh run list *), Bash(gh run view *), Bash(gh run watch *), Bash(git branch --show-current), Bash(git rev-list *)
---

# Trigger Visual Regression Tests

Dispatch the `Visual-Regression-Tests` workflow (`.github/workflows/visual-regression-tests.yml`) via `workflow_dispatch`, then report the run so the user can follow it.

This skill spends money. The `allowed-tools` list above is deliberately narrow, and step 1 is a hard gate — treat both as part of the skill, not as boilerplate.

## Usage

```
/vrt              # current branch
/vrt <branch>     # named branch
```

## Workflow

### 1. Resolve the branch, then ask

If `$ARGUMENTS` names a branch, use it. Otherwise take the current branch and check that it is pushed:

```bash
git branch --show-current
git rev-list --count @{u}..HEAD
```

Non-zero: say so before asking, because the workflow runs against what is on the remote, not the local tree. The second command fails when the branch has no upstream, which means it was never pushed and the dispatch in step 2 would fail anyway: say that instead of asking.

A branch named in `$ARGUMENTS` gets no such check, since there is nothing local to compare it against. If the ref does not exist on the remote, step 2 fails with a clear error.

State the branch back and wait for the user to confirm.

Do this **every time**, including when the user typed `/vrt`: the confirmation is about *which branch* is about to burn snapshots, which is the part that goes wrong. Never dispatch on an inferred intent, and never fold a dispatch into a larger task the user asked for.

### 2. Dispatch the workflow

```bash
gh workflow run "Visual-Regression-Tests" --ref <branch>
```

### 3. Confirm the run started

Wait a few seconds, then:

```bash
gh run list --workflow="Visual-Regression-Tests" --limit=1
```

Report the run URL.

### 4. If no run appears

The job is gated on a repository variable and will be skipped silently when visual regression is switched off:

```
vars.VRT_ENABLED != 'false'
```

A dispatch can therefore succeed while no job runs. If nothing is queued, check that variable (Settings → Secrets and variables → Actions → Variables) before assuming the dispatch failed.

## Alternative trigger

On an open PR, commenting `/run-chromatic` starts the same workflow against the PR's head branch. It only works for users whose author association is `OWNER`, `MEMBER`, or `COLLABORATOR`. Prefer this when the goal is to attach a run to a specific PR — the `review-pr` skill suggests it for exactly that reason.

The workflow also runs automatically when a PR is merged into `main`, unless the PR only touches `docs/**`, `**/*.md`, `**/*.mdx`, or `.changeset/**`.
