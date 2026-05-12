# Contributing to Hider

Hider is considered feature complete. The main goal going forward is keeping it up to date with new Obsidian releases, so the most useful contributions are bug fixes and compatibility patches for new Obsidian versions. New features are unlikely to be merged.

## Reporting issues

Before opening an issue, please search [existing issues](https://github.com/kepano/obsidian-hider/issues) to avoid duplicates. When reporting a bug, include:

- Obsidian version and operating system
- Hider version
- Steps to reproduce, and a screenshot if relevant
- Whether the issue occurs with other plugins disabled and the default theme

## Submitting pull requests

1. Fork the repo and create a branch from `master`.
2. Make your changes in `main.ts` and `styles.css`. Never edit `main.js` directly, as it is generated.
3. Build locally with `npm run build` and test the plugin in Obsidian.
4. Open a pull request with a short description of what changed and why.

Keep PRs focused. One fix or feature per PR makes review easier.

## Theme compatibility

Hider toggles classes on the `body` element rather than injecting styles directly, so themes can override or extend its behavior. See the [README](README.md#making-your-theme-compatible-with-hider) for the list of classes.

## Questions

Join the [Obsidian Discord](https://discord.gg/veuWUTm) for general questions about plugin development.
