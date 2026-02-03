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
- **Post issues only** - Post only the "Issues Found" section
- **Post as comment** - Post the full review as a PR comment
- **Skip** - Don't post anything to GitHub

If the user chooses to post, use:

```bash
gh pr review <number> --comment --body "<review content>"
```

For the comment, format it nicely for GitHub with a header indicating it's an automated review:

```markdown
## Automated Code Review

<review content>

---
*Generated with Claude Code review-pr skill*
```

## Tools Required

The following tools are needed for this skill:

- `Read` - Read file contents for review
- `Bash(gh pr view *)` - Fetch PR details
- `Bash(gh pr diff *)` - Get PR diff
- `Bash(gh pr checks *)` - Check CI status
- `Bash(gh pr comment *)` - Post review comment to PR
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
- GitHub posting is opt-in and supports posting full review or issues only