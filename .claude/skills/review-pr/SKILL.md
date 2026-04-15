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

### 5. Extract Jira Ticket

Search for DST-XXXX pattern in:
- PR title
- PR body/description

If found, fetch Jira context using:
- `mcp__plugin_atlassian_atlassian__getAccessibleAtlassianResources` to get cloud ID
- `mcp__plugin_atlassian_atlassian__getJiraIssue` to fetch ticket details

### 6. Review Code Against Checklist

Load and apply the review checklist from [references/review-checklist.md](references/review-checklist.md).

For each changed file:
- Read the file content
- Analyze against relevant checklist items
- Note issues by category and severity

### 7. Apply Vercel React Best Practices

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

### 8. Optional: Run Automated Checks

Ask user before running:
- `pnpm typecheck:only` - TypeScript type checking
- `pnpm lint` - ESLint checks

### 9. Generate Report

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

### 10. Ask to Post Review to GitHub

After displaying the review report, ask the user if they want to post the review as a comment on the PR.

Use `AskUserQuestion` with options:
- **Post inline comments** - Post issues as inline comments directly on the code lines where they occur
- **Post as comment** - Post the full review as a PR comment
- **Post both** - Post the full review as a PR comment AND inline comments on the code
- **Skip** - Don't post anything to GitHub

#### Option A: Post as PR comment

Use `gh pr review` to post the full review:

```bash
gh pr review <number> --comment --body "<review content>"
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
  "event": "COMMENT",
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

#### Option C: Post both

Combine both options: post the full review as a PR comment for the overview, and add inline comments for each specific issue found in the code.

## Tools Required

The following tools are needed for this skill:

- `Read` - Read file contents for review
- `Bash(gh pr view *)` - Fetch PR details
- `Bash(gh pr diff *)` - Get PR diff
- `Bash(gh pr checks *)` - Check CI status
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