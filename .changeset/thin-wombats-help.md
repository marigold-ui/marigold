---
"@marigold/eslint-config": major
"@marigold/storybook-config": major
"@marigold/docs": major
"@marigold/theme-b2b": major
"@marigold/theme-core": major
---

chore[DST-648] upgrade tailwindcss to v4

**BREAKING CHANGE**: We upgrade the TailwindCSS version from 3 to 4. This means the setup to for using Marigold changed, now you don't need to use a `tailwind.config.ts` file with all the configurations anymore. We updated our installation documentation page according to the changes.
With this new version the build process is speeded up, the CSS output will be smaller and more readable class names provide a better developer experience. 
