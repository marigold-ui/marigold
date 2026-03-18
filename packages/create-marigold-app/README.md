# create-marigold-app

A [Claude Code](https://claude.com/claude-code) skill that scaffolds a new app with the [Marigold Design System](https://github.com/marigold-ui/marigold).

## Install

```bash
npx create-marigold-app
```

This installs the `/create-marigold-app` skill into your Claude Code environment (`~/.claude/skills/`).

## Usage

In any Claude Code session:

```
/create-marigold-app my-app
```

Claude will scaffold a Vite + React project pre-configured with Marigold components and theming from the [marigold-ui/starter](https://github.com/marigold-ui/starter) template, install dependencies, and help you start prototyping.

## Uninstall

```bash
npx create-marigold-app --uninstall
```

## Options

| Flag              | Description       |
| ----------------- | ----------------- |
| `-h`, `--help`    | Show help message |
| `-v`, `--version` | Show version      |
| `--uninstall`     | Remove the skill  |

## License

MIT
