Support the development of my plugins and themes **@kepano** on [Twitter](https://www.twitter.com/kepano), [Patreon](https://www.patreon.com/kepano) or [Buy me a coffee](https://www.buymeacoffee.com/kepano).

<a href="https://www.buymeacoffee.com/kepano"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=kepano&button_colour=6a8695&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00"></a>

## Overview

This plugin enables you to hide certain parts of the Obsidian UI. Note that your CSS theme may override Hider.

- Hide app ribbon (can be bound to a hotkey)
- Hide status bar (can be bound to a hotkey)
- Hide vault name
- Hide title bar
- Hide scrollbars
- Hide search suggestions
- Hide tooltips
- Hide instructions in prompts
- Hide metadata in Reading view

## Making your theme compatible with Hider

Hider injects the following classes on the `body` element when features are toggled on.

| Toggle | Class |
| ------ | ----- |
| Title bar | `.hider-frameless` |
| App ribbon | `.hider-ribbon` |
| Vault name | `.hider-vault` |
| Status bar | `.hider-status` |
| Scrollbars | `.hider-scroll` |
| Search suggestions | `.hider-search-suggestions` |
| Tooltips | `.hider-tooltips` |
| Instructions | `.hider-instructions` |
| Metadata | `.hider-meta` |
