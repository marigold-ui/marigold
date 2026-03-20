# create-marigold-app

A [Claude Code](https://claude.com/claude-code) plugin that scaffolds a new app with the [Marigold Design System](https://github.com/marigold-ui/marigold).

## Install

```bash
claude plugin add npm:create-marigold-app
```

## Usage

In any Claude Code session:

```
/create-marigold-app my-app
```

Claude will scaffold a Vite + React project pre-configured with Marigold components and theming from the [marigold-ui/starter](https://github.com/marigold-ui/starter) template, install dependencies, and help you start prototyping.

On first run, Claude Code may ask you to approve some commands (like cloning the template and installing dependencies). Select "Always allow" so future runs are seamless.

## Uninstall

```bash
claude plugin remove create-marigold-app
```

## License

MIT
