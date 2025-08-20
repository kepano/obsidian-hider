## Overview

This plugin enables you to hide certain parts of the Obsidian UI. Note that your CSS theme may override Hider.

- Hide app ribbon (can be bound to a hotkey)
- Hide tab bar (can be bound to a hotkey)
- Hide status bar (can be bound to a hotkey)
- Hide vault name
- Hide scrollbars
- Hide search suggestions
- Hide count of search term matches
- Hide tooltips
- Hide instructions in prompts
- Hide metadata in Reading view

## Making your theme compatible with Hider

Hider injects the following classes on the `body` element when features are toggled on.

| Toggle | Class |
| ------ | ----- |
| App ribbon | `.hider-ribbon` |
| Status bar | `.hider-status` |
| Tab bar | `.hider-tabs` |
| Vault name | `.hider-vault` |
| Scrollbars | `.hider-scroll` |
| Search suggestions | `.hider-search-suggestions` |
| Search term counts | `.hider-search-counts` |
| Tooltips | `.hider-tooltips` |
| Instructions | `.hider-instructions` |
| Metadata | `.hider-meta` |

