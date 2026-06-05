# Contributing to 🏵 Marigold

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features

## We develop with Github

We use github to host code, to track issues and feature requests, as well as accept pull requests.

## We use [Github Flow](https://docs.github.com/en/get-started/quickstart/github-flow), So all Code Changes happen through Pull Requests

Pull requests are the best way to propose changes to the codebase (we use [Github Flow](https://docs.github.com/en/get-started/quickstart/github-flow)). We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints and typechecks.
6. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issues](https://github.com/marigold-ui/marigold/issues/new?assignees=&labels=bug&template=2.bug.md&title=)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/marigold-ui/marigold/issues/new?assignees=&labels=bug&template=2.bug.md&title=).

## Deployment (Vercel)

The docs and Storybook projects deploy on Vercel. Each Vercel project (docs and
storybook, in both **Production** and **Preview** environments) **must** have the
environment variable `ENABLE_EXPERIMENTAL_COREPACK=1` set.

Without it, Vercel ignores the pinned `packageManager` (`pnpm@11.1.2`) and falls
back to pnpm 9, which reads `overrides` from `package.json` instead of
`pnpm-workspace.yaml`. That mismatch causes `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH`
and the deploy fails. With Corepack enabled, Vercel uses the pinned pnpm version,
matching local and CI.

If you create a new Vercel project (or a new environment on an existing one),
set this variable before the first deploy.

## Code of Conduct

We take our open source community seriously and hold ourselves and other contributors to high standards of communication. By participating and contributing to this project, you agree to uphold our [Code of Conduct](https://github.com/marigold-ui/marigold/blob/main/CODE-OF-CONDUCT.md).
