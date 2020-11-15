## Obsidian Hider Plugin

This plugin enables you to hide certain parts of the Obsidian UI. Note that your CSS theme may override Hider.

- Hide app ribbon (can be bound to a hotkey)
- Hide status bar (can be bound to a hotkey)
- Hide title bar
- Hide scrollbars
- Hide tooltips

## Making your theme compatible with Hider

Hider injects the following classes on the `body` element when features are toggled on.

| Toggle | Class |
| ------ | ----- |
| Title bar | `.hider-frameless` |
| App ribbon | `.hider-ribbon` |
| Status bar | `.hider-status` |
| Scrollbars | `.hider-scroll` |
| Tooltips | `.hider-tooltips` |
