import { App, Plugin, PluginSettingTab, SettingDefinitionItem } from 'obsidian';

export default class Hider extends Plugin {
  settings: HiderSettings;

  async onload() {
    // load settings
    await this.loadSettings();

    // add the settings tab
    this.addSettingTab(new HiderSettingTab(this.app, this));
    // add the toggle on/off command

    this.addCommand({
      id: 'toggle-tab-containers',
      name: 'Toggle tab bar',
      callback: () => {
        this.settings.hideTabs = !this.settings.hideTabs;
        void this.saveData(this.settings);
        this.refresh();
      }
    });
    this.addCommand({
      id: 'toggle-hider-status',
      name: 'Toggle status bar',
      callback: () => {
        this.settings.hideStatus = !this.settings.hideStatus;
        void this.saveData(this.settings);
        this.refresh();
      }
    });
    this.refresh()
  }

  onunload() {
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  // refresh function for when we change settings
  refresh = () => {
    // re-load the style
    this.updateStyle()
  }

  // update the styles (at the start, or as the result of a settings change)
  updateStyle = () => {
    document.body.classList.toggle('hider-status', this.settings.hideStatus);
    document.body.classList.toggle('hider-tabs', this.settings.hideTabs);
    document.body.classList.toggle('hider-scroll', this.settings.hideScroll);
    document.body.classList.toggle('hider-sidebar-buttons', this.settings.hideSidebarButtons);
    document.body.classList.toggle('hider-tooltips', this.settings.hideTooltips);
    document.body.classList.toggle('hider-search-suggestions', this.settings.hideSearchSuggestions);
    document.body.classList.toggle('hider-file-nav-header', this.settings.hideFileNavButtons);
    document.body.classList.toggle('hider-search-counts', this.settings.hideSearchCounts);
    document.body.classList.toggle('hider-instructions', this.settings.hideInstructions);
    document.body.classList.toggle('hider-meta', this.settings.hidePropertiesReading);
    document.body.classList.toggle('hider-vault', this.settings.hideVault);
  }

}

interface HiderSettings {
  hideStatus: boolean;
  hideTabs: boolean;
  hideScroll: boolean;
  hideSidebarButtons: boolean;
  hideTooltips: boolean;
  hideFileNavButtons: boolean;
  hideSearchSuggestions: boolean;
  hideSearchCounts: boolean;
  hideInstructions: boolean;
  hidePropertiesReading: boolean;
  hideVault: boolean;
}
const DEFAULT_SETTINGS: HiderSettings = {
  hideStatus: false,
  hideTabs: false,
  hideScroll: false,
  hideSidebarButtons: false,
  hideTooltips: false,
  hideFileNavButtons: false,
  hideSearchSuggestions: false,
  hideSearchCounts: false,
  hideInstructions: false,
  hidePropertiesReading: false,
  hideVault: false
}

class HiderSettingTab extends PluginSettingTab {


  plugin: Hider;
  constructor(app: App, plugin: Hider) {
    super(app, plugin);
    this.plugin = plugin;
  }

  getSettingDefinitions(): SettingDefinitionItem[] {
    return [
      {
        type: 'group',
        heading: 'Interface',
        items: [
          {
            name: 'Hide tab bar',
            desc: 'Hides the tab container at the top of the window.',
            control: { type: 'toggle', key: 'hideTabs' },
          },
          {
            name: 'Hide status bar',
            desc: 'Hides word count, character count and backlink count.',
            control: { type: 'toggle', key: 'hideStatus' },
          },
          {
            name: 'Hide vault name',
            desc: 'Hides your vault profile. Warning: this also hides access to the Settings and vault switcher icons. You can use hotkeys or the command palette to open them.',
            control: { type: 'toggle', key: 'hideVault' },
          },
          {
            name: 'Hide scroll bars',
            desc: 'Hides all scroll bars.',
            control: { type: 'toggle', key: 'hideScroll' },
          },
          {
            name: 'Hide sidebar toggle buttons',
            desc: 'Hides both sidebar buttons.',
            control: { type: 'toggle', key: 'hideSidebarButtons' },
          },
          {
            name: 'Hide tooltips',
            desc: 'Hides all tooltips.',
            control: { type: 'toggle', key: 'hideTooltips' },
          },
        ],
      },
      {
        type: 'group',
        heading: 'File explorer',
        items: [
          {
            name: 'Hide file explorer buttons',
            desc: 'Hides buttons at the top of file explorer (new file, new folder, etc).',
            control: { type: 'toggle', key: 'hideFileNavButtons' },
          },
        ],
      },
      {
        type: 'group',
        heading: 'Search',
        items: [
          {
            name: 'Hide search suggestions',
            desc: 'Hides suggestions in search pane.',
            control: { type: 'toggle', key: 'hideSearchSuggestions' },
          },
          {
            name: 'Hide count of search term matches',
            desc: 'Hides the number of matches within each search result.',
            control: { type: 'toggle', key: 'hideSearchCounts' },
          },
        ],
      },
      {
        type: 'group',
        heading: 'Other',
        items: [
          {
            name: 'Hide instructions',
            desc: 'Hides instructional tips in quick switcher and command palette.',
            control: { type: 'toggle', key: 'hideInstructions' },
          },
          {
            name: 'Hide properties in Reading view',
            desc: 'Hides the properties section in Reading view.',
            control: { type: 'toggle', key: 'hidePropertiesReading' },
          },
        ],
      },
    ];
  }

  async setControlValue(key: string, value: unknown): Promise<void> {
    await super.setControlValue(key, value);
    // Every toggle re-applies the body classes.
    this.plugin.refresh();
  }
}
