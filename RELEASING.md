# Releasing

Two release tracks:

| Track      | Branch         | How it publishes                                                                                  |
| ---------- | -------------- | ------------------------------------------------------------------------------------------------- |
| **Stable** | `main`         | Automated in CI via `.github/workflows/release.yml` (OIDC trusted publishing — no token, no OTP). |
| **Beta**   | `beta-release` | Two helper scripts + a manual `npm publish` in between. Steps below.                              |

This guide covers the **beta release**. Stable releases happen automatically when a `release: version packages` PR is merged to `main`; you normally don't run anything by hand for those.

## Beta releases

Beta versions are published to the npm `beta` dist-tag from the `beta-release` branch while Changesets is in **pre mode** (`.changeset/pre.json`, `tag: beta`).

The flow is three steps: **prepare** (scripted) → **publish** (manual) → **finish** (scripted).

### Prerequisites

- You must be a maintainer of the `@marigold` npm scope with publish rights.
- Log in to npm so you have an interactive session with 2FA:
  ```bash
  npm login
  ```
  The `@marigold/*` packages **require 2FA on publish** — you'll enter a one-time password (OTP) from your authenticator during the manual publish.
- Land the changes you want to release on `beta-release` first, each with a changeset (`pnpm changeset`).

### 1. Prepare (scripted)

```bash
pnpm release:beta:prepare
```

This handles steps 1–3 of the manual flow:

- switches to a synced `beta-release` (creating it from `origin/main` if it doesn't exist yet),
- enters changeset pre mode (`tag: beta`) if not already active,
- runs `pnpm install` → `pnpm changeset version` → `pnpm install --lockfile-only` → `pnpm build`,
- commits the version bump as `release: version packages (beta)`.

It finishes by printing the exact publish command for the next step.

### 2. Publish (manual)

Publishing requires your interactive 2FA OTP, so it's intentionally **not** scripted. Run it in your **normal shell** (no `CI=true`) with a fresh code — TOTP codes expire in ~30s, so generate it right before:

```bash
npm whoami                            # if this errors, run: npm login
pnpm changeset publish --otp=123456
```

- Passing `--otp` forwards the code to pnpm **and** skips changesets' `npm profile get` preflight.
- Changesets reads the `beta` dist-tag from `.changeset/pre.json`, so packages go to `beta`, not `latest`.
- Do **not** set `CI=true`: changesets only forwards `--otp` when it doesn't think it's in CI, so `CI=true` drops the OTP and the publish fails with `ERR_PNPM_OTP_NON_INTERACTIVE`.

### 3. Finish (scripted)

```bash
pnpm release:beta:finish
```

This handles step 5 — pushing the version-bump commit and the new version tags to `origin/beta-release`.

#### End of the beta cycle (step 6)

When the beta is ready to become a real `X.0.0`, run finish with the finalize flag:

```bash
pnpm release:beta:finish --finalize
```

This exits changeset pre mode, commits `chore: exit changeset pre mode`, and pushes. Then open a PR from `beta-release` → `main`; merging it lets the normal CI release roll all the accumulated `-beta` changesets into the stable `X.0.0`.

> ⚠️ Don't merge `beta-release` → `main` until the pre-exit commit has landed on `beta-release`.

## Troubleshooting

| Symptom                                                                    | Cause                                                                                          | Fix                                                                                                              |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `ERR_PNPM_OTP_NON_INTERACTIVE`                                             | `CI=true` (or another CI env var) is set, so changesets drops `--otp`.                         | Publish in a normal shell with `pnpm changeset publish --otp=<code>`.                                            |
| `E404 ... PUT ... Not found` on publish                                    | Not authenticated / not authorized for the `@marigold` scope. npm hides 403 as 404 on publish. | `npm login`, confirm scope write access.                                                                         |
| `whoami` returns **401**                                                   | Token/session invalid, expired, or revoked.                                                    | `npm login` again. (A working granular token returns **403** on whoami, not 401 — that's expected.)              |
| `the option is protected` from `npm config get ...:_authToken`             | npm ≥ 11 protects auth tokens from `config get`.                                               | Read `~/.npmrc` directly; don't rely on `npm config get` for the token.                                          |
| Re-running a release that already versioned/committed fails the sync guard | The version bump is committed but unpublished.                                                 | Don't restart from scratch — just finish: `pnpm changeset publish --otp=<code>` then `pnpm release:beta:finish`. |

## Why beta is manual but stable is not

Stable releases run in GitHub Actions with **OIDC trusted publishing** (`id-token: write`, `NPM_CONFIG_PROVENANCE: true`) — npm authenticates the CI job via a short-lived OIDC token, so there's no long-lived token or OTP involved. OIDC can't run from a laptop (there's no OIDC provider locally), which is why local beta publishing still uses a logged-in npm session + OTP. Moving beta releases into CI/OIDC as well would retire the manual publish; until then, follow the steps above.
