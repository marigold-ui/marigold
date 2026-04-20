---
description: Trigger Visual Regression Tests (Chromatic) on the current or a given branch
allowed-tools: Bash(gh workflow run *), Bash(gh run list *), Bash(gh run watch *), Bash(git branch --show-current), Bash(git rev-parse *), Bash(gh run view *)
---

# Trigger Visual Regression Tests

Trigger the "Visual-Regression-Tests" GitHub Actions workflow via `workflow_dispatch`.

## Arguments

Parse `$ARGUMENTS`:
- If a branch name is provided, use it as the target branch.
- If no arguments are provided, use the **current git branch**.

## Workflow

### Step 1: Determine the branch

If `$ARGUMENTS` is empty, run:
```
git branch --show-current
```
Otherwise, use the provided branch name.

### Step 2: Trigger the workflow

Run:
```
gh workflow run "Visual-Regression-Tests" --ref <branch>
```

Report the branch name to the user.

### Step 3: Confirm the run started

Wait a few seconds, then list recent runs to confirm it was queued:
```
gh run list --workflow="Visual-Regression-Tests" --limit=1
```

Share the run URL with the user so they can monitor progress.
