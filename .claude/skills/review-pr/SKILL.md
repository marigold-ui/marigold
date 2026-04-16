---
name: review-pr
description: Review a GitHub PR for Marigold Design System code quality, TypeScript standards, React best practices, and accessibility compliance. Optionally links Jira tickets for context. Use when asked to "review PR", "check PR", or "review pull request".
---

# PR Review Skill for Marigold Design System

Review GitHub pull requests against Marigold's coding standards, best practices, and accessibility requirements. Automatically extracts and links Jira context when DST-XXXX ticket patterns are found.

## Usage

```
/review-pr <pr-number>
```

## Workflow

### 1. Parse Arguments

Extract the PR number from `$ARGUMENTS`. The argument should be a numeric PR number or a PR URL.

### 2. Fetch PR Details

Use GitHub CLI to fetch PR information:

```bash
gh pr view <number> --json number,title,body,author,baseRefName,headRefName,files,additions,deletions,changedFiles
```

### 3. Get PR Diff

Fetch the full diff for code review:

```bash
gh pr diff <number>
```

### 4. Check CI Status (Optional)

```bash
gh pr checks <number>
```

### 5. Check Visual Regression Test Necessity

Determine whether the PR changes files that could affect visual output and whether the `Visual-Regression-Tests` workflow has already run for this branch.

#### 5a. Detect UI-affecting changes

From the PR's changed files list (fetched in step 2), check if **any** file matches these patterns:

- `packages/components/src/**` — component source
- `packages/system/src/**` — design system utilities/hooks
- `themes/**` — theme packages
- `.storybook/**` — Storybook configuration
- Any `*.stories.tsx` file
- Any `*.styles.ts` file

If **none** of the changed files match, skip the rest of this step — visual regression tests are not needed.

#### 5b. Check if the workflow already ran

Use the GitHub CLI to fetch recent runs of the `Visual-Regression-Tests` workflow on the PR's head branch, **including the head SHA each run was triggered on**:

```bash
gh run list --workflow=visual-regression-tests.yml --branch=<headRefName> --json status,conclusion,createdAt,headSha,url --limit 5
```

Also fetch the PR's current head commit SHA (from step 2's `headRefOid`, or via `gh pr view <number> --json headRefOid -q .headRefOid`).

#### 5c. Classify the result

Compare the most recent workflow run against the PR's current head SHA:

| Condition | Status | Inline comment? |
|-----------|--------|-----------------|
| A run is `in_progress` or `queued` | **running** | No |
| A run with `conclusion: "success"` exists **and** its `headSha` matches the current PR head | **passed (up to date)** | No |
| A run with `conclusion: "success"` exists but its `headSha` does **not** match the current PR head (new commits since last run) | **stale** | Yes — suggest re-running |
| Most recent run has `conclusion: "failure"` (no later success) | **failed** | Yes — mention failure |
| No runs found at all | **not started** | Yes — suggest running |

#### 5d. Record finding

Only record a visual regression inline comment when the status from 5c requires one (**stale**, **failed**, or **not started**). Target the comment at the **first changed file** that matched the UI patterns in 5a.

Missing or outdated VRT is a **Critical (Must Fix)** issue — it must appear in the "Critical" section of the review report and factor into the recommendation (i.e., **Request Changes** rather than Approve).

**Not started:**

```
🔴 **Visual Regression Tests — not run**

This PR changes UI-affecting files but the `Visual-Regression-Tests` workflow has not run for this branch.

Please trigger it by commenting `/run-chromatic` on this PR, or by manually dispatching the workflow.
```

**Stale** (new commits since last successful run):

```
🔴 **Visual Regression Tests — stale**

The last successful `Visual-Regression-Tests` run was on commit `<short sha>`, but the branch has since moved to `<current short sha>`.

Please re-run visual regression tests to cover the latest changes by commenting `/run-chromatic` on this PR.
```

**Failed:**

```
🔴 **Visual Regression Tests — failed**

The `Visual-Regression-Tests` workflow [failed](<run url>) on this branch. Please check the run and re-trigger if needed.

You can re-trigger by commenting `/run-chromatic` on this PR.
```

If the workflow is **running** or **passed (up to date)**, no inline comment is needed — just report the status in the review report's overview table (e.g., "Visual Regression | Passed" or "Visual Regression | Running").

### 6. Extract Jira Ticket

Search for DST-XXXX pattern in:
- PR title
- PR body/description

If found, fetch Jira context using:
- `mcp__plugin_atlassian_atlassian__getAccessibleAtlassianResources` to get cloud ID
- `mcp__plugin_atlassian_atlassian__getJiraIssue` to fetch ticket details

### 7. Review Code Against Checklist

Load and apply the review checklist from [references/review-checklist.md](references/review-checklist.md).

For each changed file:
- Read the file content
- Analyze against relevant checklist items
- Note issues by category and severity

### 8. Apply Vercel React Best Practices

Invoke the `vercel-react-best-practices` skill to check for React/Next.js performance patterns:

```
Skill(vercel-react-best-practices)
```

This skill checks for:
- Component rendering optimization (memo, useMemo, useCallback)
- Proper data fetching patterns
- Bundle size optimization
- Image and font optimization
- Avoiding common performance anti-patterns

Include any findings in the "React Performance" section of the review checklist.

### 9. Optional: Run Automated Checks

Ask user before running:
- `pnpm typecheck:only` - TypeScript type checking
- `pnpm lint` - ESLint checks

### 10. Generate Report

Output a structured review report in this format:

```markdown
## PR Review: #<number> - <title>

### Overview
| Field | Value |
|-------|-------|
| Author | @username |
| Branch | feature-branch → main |
| Files Changed | X |
| Additions | +Y |
| Deletions | -Z |
| Visual Regression | Passed / Running / Failed / Not started / Not needed |

### Linked Ticket
**DST-XXXX**: <ticket summary>
- Status: <status>
- Acceptance Criteria: <if available>

### Code Review Checklist

#### TypeScript Standards
- [ ] No `any` types
- [ ] Uses `import type` for type-only imports
- [ ] Proper interface definitions

#### Component Patterns
- [ ] Uses `forwardRef` for DOM-wrapping components
- [ ] Renames `isDisabled` → `disabled`, `isPending` → `loading`
- [ ] Does not expose `className` or `style` props
- [ ] Uses `useClassNames` hook for theming

#### React Best Practices
- [ ] Functional components only
- [ ] Proper hook usage (no conditionals)
- [ ] Early returns for error handling

#### React Performance (from vercel-react-best-practices)
- [ ] Appropriate use of memo/useMemo/useCallback
- [ ] No unnecessary re-renders
- [ ] Proper data fetching patterns
- [ ] Bundle size considerations

#### Testing Standards
- [ ] Uses Vitest (not Jest)
- [ ] Uses `userEvent` (not `fireEvent`)
- [ ] Uses accessible queries (`getByRole`, not `getByTestId`)
- [ ] Story tests have `tags: ['component-test']`

#### Accessibility
- [ ] ARIA attributes properly used
- [ ] Keyboard navigation supported

### Issues Found

#### Critical (Must Fix)
- File:line - Description

#### Warnings (Should Fix)
- File:line - Description

#### Suggestions (Nice to Have)
- File:line - Description

### Recommendation
**[Approve / Request Changes / Comment]**

<summary of recommendation>
```

### 11. Collect User Feedback on Findings

After displaying the review report, ask the user if they want to post the review as a comment on the PR.

Use `AskUserQuestion` with options:
- **Post inline comments** - Post issues as inline comments directly on the code lines where they occur
- **Post as comment** - Post the full review as a PR comment
- **Post both** - Post the full review as a PR comment AND inline comments on the code
- **Skip** - Don't post anything to GitHub

If the user requests changes to the findings (e.g., "remove finding #4", "drop the warning about X", "change the severity of Y"), apply those edits and proceed to step 11a.

#### 11a. Show Final Review and Confirm Before Posting

**Before posting anything to GitHub**, always:

1. **Display the final review** exactly as it will be posted — with all user-requested edits applied. Show the full updated report (or the list of inline comments that will be posted).
2. **Ask for confirmation** using `AskUserQuestion` with options:
   - **Request Changes** - Post as a formal "Request Changes" review (blocks merge)
   - **Comment** - Post as a regular comment (does not block merge)
   - **Skip** - Cancel posting entirely

This step ensures the user sees the exact content before it goes to GitHub and has a final say on the review event type. Use the selected event (`REQUEST_CHANGES` or `COMMENT`) as the `event` field in the GitHub API call.

If the user requests further edits at this stage, apply them and repeat step 11a (show final version + confirm) until the user is satisfied.

#### Option A: Post as PR comment

Use `gh pr review` to post the full review. Use the event type confirmed in step 11a:

```bash
# If "Comment" was selected in step 11a:
gh pr review <number> --comment --body "<review content>"

# If "Request Changes" was selected in step 11a:
gh pr review <number> --request-changes --body "<review content>"
```

Format with a header indicating it's an automated review:

```markdown
## Automated Code Review

<review content>

---
*Generated with Claude Code review-pr skill*
```

#### Option B: Post inline comments on code

Use the GitHub API to create a review with inline comments placed directly on the relevant lines in the diff. This is the most actionable format for the PR author.

First, get the latest commit SHA:

```bash
gh pr view <number> --json headRefOid -q .headRefOid
```

Then post a review with inline comments using `gh api`. Each comment targets a specific file and line from the "Issues Found" section:

```bash
gh api repos/<owner>/<repo>/pulls/<number>/reviews --method POST \
  --input - <<'EOF'
{
  "commit_id": "<commit_sha>",
  "event": "<COMMENT or REQUEST_CHANGES — from step 11a>",
  "body": "",
  "comments": [
    {
      "path": "path/to/file.tsx",
      "line": 33,
      "side": "RIGHT",
      "body": "<issue description with severity emoji prefix>"
    }
  ]
}
EOF
```

**Formatting rules for inline comments:**
- Prefix critical issues with the red circle emoji, warnings with the warning emoji, suggestions with the bulb emoji
- Include a GitHub suggestion block (` ```suggestion `) when a concrete fix is available
- Keep each comment focused on a single issue
- Reference related comments (e.g., "Same issue as in `OtherFile.tsx`") to avoid repeating full explanations

**Visual regression test comment:**

If step 5 recorded a visual regression issue (status is "not started", "stale", or "failed"), include it as an additional inline comment targeting the first UI-affecting file in the diff. This is a **critical** issue — use the red circle emoji prefix. This comment is **always** included when posting inline comments — it does not require a separate user opt-in.

#### Option C: Post both

Combine both options: post the full review as a PR comment for the overview, and add inline comments for each specific issue found in the code.

## Tools Required

The following tools are needed for this skill:

- `Read` - Read file contents for review
- `Bash(gh pr view *)` - Fetch PR details
- `Bash(gh pr diff *)` - Get PR diff
- `Bash(gh pr checks *)` - Check CI status
- `Bash(gh run list *)` - Check Visual-Regression-Tests workflow runs for the branch
- `Bash(gh pr review *)` - Post review comment to PR
- `Bash(gh api repos/*/pulls/*/reviews *)` - Post inline comments on specific code lines
- `Bash(pnpm typecheck:only)` - TypeScript checking (user opt-in)
- `Bash(pnpm lint)` - Lint checking (user opt-in)
- `Skill(vercel-react-best-practices)` - React performance best practices
- `mcp__plugin_atlassian_atlassian__getAccessibleAtlassianResources` - Get Jira cloud ID
- `mcp__plugin_atlassian_atlassian__getJiraIssue` - Fetch Jira ticket details
- `AskUserQuestion` - Ask user whether to post review to GitHub

## Notes

- Review is displayed locally first, then user is asked if they want to post to GitHub
- The skill focuses on Marigold-specific patterns documented in CLAUDE.md
- Integrates `vercel-react-best-practices` skill for React performance checks
- Jira integration is optional and gracefully handles missing tickets
- Automated checks (typecheck, lint) require user confirmation before running
- GitHub posting is opt-in and supports full review comments, inline code comments, or both