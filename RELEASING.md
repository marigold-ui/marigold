# Releasing

Two release tracks:

| Track      | Branch         | How it publishes                                                                                  |
| ---------- | -------------- | ------------------------------------------------------------------------------------------------- |
| **Stable** | `main`         | Automated in CI via `.github/workflows/release.yml` (OIDC trusted publishing — no token, no OTP). |
| **Beta**   | `beta-release` | **Manual**, from your machine. Steps below.                                                       |

This guide covers the **manual beta release**. Stable releases happen automatically when a `release: version packages` PR is merged to `main`; you normally don't run anything by hand for those.

## Beta releases

Beta versions are published to the npm `beta` dist-tag from the `beta-release` branch while Changesets is in **pre mode** (`.changeset/pre.json`, `tag: beta`).

### Prerequisites

- You must be a maintainer of the `@marigold` npm scope with publish rights.
- Log in to npm so you have an interactive session with 2FA:
  ```bash
  npm login
  ```
  The `@marigold/*` packages **require 2FA on publish**. You will enter a one-time password (OTP) from your authenticator during publishing.
- Be on the `beta-release` branch with a clean working tree, in sync with `origin/beta-release`.

### 1. Enter pre mode (once per beta cycle)

Only needed if `.changeset/pre.json` does **not** already exist:

```bash
pnpm release:beta:enter
```

This switches to `beta-release` (creating it from `origin/main` if needed) and runs `changeset pre enter beta`. Commit the resulting `.changeset/pre.json` (follow the next-steps it prints).

### 2. Land your changes on `beta-release`

Merge your feature PRs into `beta-release`, each with a changeset (`pnpm changeset`). Make sure the branch is up to date before releasing:

```bash
git switch beta-release
git pull --ff-only
```

### 3. Version the packages

```bash
pnpm install
pnpm changeset version        # bumps to the next -beta.N, updates changelogs
pnpm install --lockfile-only  # sync the lockfile to the new versions
pnpm build                    # build components + themes
```

Review the diff, then commit:

```bash
git add -A
git commit -m "release: version packages (beta)"
```

### 4. Publish to npm

Run the publish **in your normal shell** (no `CI=true`) and pass a fresh OTP. TOTP codes expire in ~30s, so generate the code right before running:

```bash
pnpm changeset publish --otp=123456
```

- Passing `--otp` forwards the code to pnpm **and** skips changesets' `npm profile get` preflight.
- Changesets reads the `beta` dist-tag from `.changeset/pre.json`, so the packages go to `beta`, not `latest`.
- Do **not** set `CI=true`: changesets only forwards `--otp` when it does not think it is in CI, so `CI=true` drops the OTP and the publish fails with `ERR_PNPM_OTP_NON_INTERACTIVE`.

### 5. Push

```bash
git push --follow-tags
```

This pushes the version-bump commit and the new version tags to `origin/beta-release`.

### 6. Roll beta back into stable (end of the cycle)

When the beta is ready to become a real `X.0.0`:

```bash
pnpm release:beta:exit        # changeset pre exit
git add -A
git commit -m "chore: exit changeset pre mode"
git push
```

Then open a PR from `beta-release` → `main`. Merging it lets the normal CI release roll all the accumulated `-beta` changesets into the stable `X.0.0`.

> ⚠️ Don't merge `beta-release` → `main` until the pre-exit commit has landed on `beta-release`.

## Troubleshooting

| Symptom                                                                    | Cause                                                                                          | Fix                                                                                                            |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `ERR_PNPM_OTP_NON_INTERACTIVE`                                             | `CI=true` (or another CI env var) is set, so changesets drops `--otp`.                         | Publish in a normal shell with `pnpm changeset publish --otp=<code>`.                                          |
| `E404 ... PUT ... Not found` on publish                                    | Not authenticated / not authorized for the `@marigold` scope. npm hides 403 as 404 on publish. | `npm login`, confirm scope write access.                                                                       |
| `whoami` returns **401**                                                   | Token/session invalid, expired, or revoked.                                                    | `npm login` again. (A working granular token returns **403** on whoami, not 401 — that's expected.)            |
| `the option is protected` from `npm config get ...:_authToken`             | npm ≥ 11 protects auth tokens from `config get`.                                               | Read `~/.npmrc` directly; don't rely on `npm config get` for the token.                                        |
| Re-running a release that already versioned/committed fails the sync guard | The version bump is committed but unpublished.                                                 | Don't restart from scratch — just finish: `pnpm changeset publish --otp=<code>` then `git push --follow-tags`. |

## Why beta is manual but stable is not

Stable releases run in GitHub Actions with **OIDC trusted publishing** (`id-token: write`, `NPM_CONFIG_PROVENANCE: true`) — npm authenticates the CI job via a short-lived OIDC token, so there's no long-lived token or OTP involved. OIDC can't run from a laptop (there's no OIDC provider locally), which is why local beta publishing still uses a logged-in npm session + OTP. Moving beta releases into CI/OIDC as well would retire the manual flow; until then, follow the steps above.
