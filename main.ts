import { App, Plugin, PluginSettingTab, Setting, SettingGroup } from 'obsidian';

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

  display(): void {
    const {containerEl} = this;

    containerEl.empty();

    new SettingGroup(containerEl)
      .setHeading('Interface')
      .addSetting((setting: Setting) => {
        setting
          .setName('Hide tab bar')
          .setDesc('Hides the tab container at the top of the window.')
          .addToggle(toggle => toggle.setValue(this.plugin.settings.hideTabs)
            .onChange((value) => {
              this.plugin.settings.hideTabs = value;
              void this.plugin.saveData(this.plugin.settings);
              this.plugin.refresh();
            })
          );
      })
      .addSetting((setting: Setting) => {
        setting
          .setName('Hide status bar')
          .setDesc('Hides word count, character count and backlink count.')
          .addToggle(toggle => toggle.setValue(this.plugin.settings.hideStatus)
            .onChange((value) => {
              this.plugin.settings.hideStatus = value;
              void this.plugin.saveData(this.plugin.settings);
              this.plugin.refresh();
            })
          );
      })
      .addSetting((setting: Setting) => {
        setting
          .setName('Hide vault name')
          .setDesc('Hides your vault profile. Warning: this also hides access to the Settings and vault switcher icons. You can use hotkeys or the command palette to open them.')
          .addToggle(toggle => toggle.setValue(this.plugin.settings.hideVault)
            .onChange((value) => {
              this.plugin.settings.hideVault = value;
              void this.plugin.saveData(this.plugin.settings);
              this.plugin.refresh();
            })
          );
      })
      .addSetting((setting: Setting) => {
        setting
          .setName('Hide scroll bars')
          .setDesc('Hides all scroll bars.')
          .addToggle(toggle => toggle.setValue(this.plugin.settings.hideScroll)
            .onChange((value) => {
              this.plugin.settings.hideScroll = value;
              void this.plugin.saveData(this.plugin.settings);
              this.plugin.refresh();
            })
          );
      })
      .addSetting((setting: Setting) => {
        setting
          .setName('Hide sidebar toggle buttons')
          .setDesc('Hides both sidebar buttons.')
          .addToggle(toggle => toggle.setValue(this.plugin.settings.hideSidebarButtons)
            .onChange((value) => {
              this.plugin.settings.hideSidebarButtons = value;
              void this.plugin.saveData(this.plugin.settings);
              this.plugin.refresh();
            })
          );
      })
      .addSetting((setting: Setting) => {
        setting
          .setName('Hide tooltips')
          .setDesc('Hides all tooltips.')
          .addToggle(toggle => toggle.setValue(this.plugin.settings.hideTooltips)
            .onChange((value) => {
              this.plugin.settings.hideTooltips = value;
              void this.plugin.saveData(this.plugin.settings);
              this.plugin.refresh();
            })
          );
      });

    // File explorer
    new SettingGroup(containerEl)
      .setHeading('File explorer')
      .addSetting((setting: Setting) => {
        setting
          .setName('Hide file explorer buttons')
          .setDesc('Hides buttons at the top of file explorer (new file, new folder, etc).')
          .addToggle(toggle => toggle.setValue(this.plugin.settings.hideFileNavButtons)
            .onChange((value) => {
              this.plugin.settings.hideFileNavButtons = value;
              void this.plugin.saveData(this.plugin.settings);
              this.plugin.refresh();
            })
          );
      });

    // Search
    new SettingGroup(containerEl)
      .setHeading('Search')
      .addSetting((setting: Setting) => {
        setting
          .setName('Hide search suggestions')
          .setDesc('Hides suggestions in search pane.')
          .addToggle(toggle => toggle.setValue(this.plugin.settings.hideSearchSuggestions)
            .onChange((value) => {
              this.plugin.settings.hideSearchSuggestions = value;
              void this.plugin.saveData(this.plugin.settings);
              this.plugin.refresh();
            })
          );
      })
      .addSetting((setting: Setting) => {
        setting
          .setName('Hide count of search term matches')
          .setDesc('Hides the number of matches within each search result.')
          .addToggle(toggle => toggle.setValue(this.plugin.settings.hideSearchCounts)
            .onChange((value) => {
              this.plugin.settings.hideSearchCounts = value;
              void this.plugin.saveData(this.plugin.settings);
              this.plugin.refresh();
            })
          );
      });

    // Other
    new SettingGroup(containerEl)
      .setHeading('Other')
      .addSetting((setting: Setting) => {
        setting
          .setName('Hide instructions')
          .setDesc('Hides instructional tips in quick switcher and command palette.')
          .addToggle(toggle => toggle.setValue(this.plugin.settings.hideInstructions)
            .onChange((value) => {
              this.plugin.settings.hideInstructions = value;
              void this.plugin.saveData(this.plugin.settings);
              this.plugin.refresh();
            })
          );
      })
      .addSetting((setting: Setting) => {
        setting
          .setName('Hide properties in Reading view')
          .setDesc('Hides the properties section in Reading view.')
          .addToggle(toggle => toggle.setValue(this.plugin.settings.hidePropertiesReading)
            .onChange((value) => {
              this.plugin.settings.hidePropertiesReading = value;
              void this.plugin.saveData(this.plugin.settings);
              this.plugin.refresh();
            })
          );
      });

  }
}
