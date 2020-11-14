## Obsidian Hider Plugin

This plugin enable you to hide certain parts of the Obsidian UI. Note that your CSS theme may override Hider.

- Hide title bar
- Hide app ribbon
- Hide status bar
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