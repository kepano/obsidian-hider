import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class Hider extends Plugin {
  settings: HiderSettings;

  async onload() {
    // load settings
    await this.loadSettings();

    // add the settings tab
    this.addSettingTab(new HiderSettingTab(this.app, this));
    // add the toggle on/off command

    this.addCommand({
      id: 'toggle-app-ribbon',
      name: 'Toggle App Ribbon',
      callback: () => {
        // switch the setting, save and refresh
        this.settings.hideRibbon = !this.settings.hideRibbon;
        this.saveData(this.settings);
        this.refresh();
      }
    });
    this.addCommand({
      id: 'toggle-hider-status',
      name: 'Toggle Status Bar',
      callback: () => {
        // switch the setting, save and refresh
        this.settings.hideStatus = !this.settings.hideStatus;
        this.saveData(this.settings);
        this.refresh();
      }
    });
    this.refresh()
  }

  onunload() {
    console.log('Unloading Hider plugin');
  }

  async loadSettings() {
    this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());
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
    document.body.classList.toggle('hider-ribbon', this.settings.hideRibbon);
    document.body.classList.toggle('hider-ribbon-left', this.settings.hideLeftRibbon);
    document.body.classList.toggle('hider-status', this.settings.hideStatus);
    document.body.classList.toggle('hider-frameless', this.settings.frameless);
    document.body.classList.toggle('hider-scroll', this.settings.hideScroll);
    document.body.classList.toggle('hider-tooltips', this.settings.hideTooltips);
    document.body.classList.toggle('hider-search-suggestions', this.settings.hideSearchSuggestions);
    document.body.classList.toggle('hider-instructions', this.settings.hideInstructions);
    document.body.classList.toggle('hider-meta', this.settings.hideMeta);

  }


}


interface HiderSettings {
  frameless: boolean;
  hideRibbon: boolean;
  hideStatus: boolean;
  hideScroll: boolean;
  hideTooltips: boolean;
  hideSearchSuggestions: boolean;
  hideInstructions: boolean;
  hideMeta: boolean;
  hideLeftRibbon: boolean;
}
const DEFAULT_SETTINGS: HiderSettings = {
  frameless: false,
  hideRibbon: false,
  hideStatus: false,
  hideScroll: false,
  hideTooltips: false,
  hideSearchSuggestions: false,
  hideInstructions: false,
  hideMeta: false,
  hideLeftRibbon: false,
}

class HiderSettingTab extends PluginSettingTab {


  plugin: Hider;
  constructor(app: App, plugin: Hider) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let {containerEl} = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName('Hide title bar (frameless mode)')
      .setDesc('Hides the title bar (best on macOS)')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.frameless)
          .onChange((value) => {
            this.plugin.settings.frameless = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            })
          );
      
    new Setting(containerEl)
      .setName('Hide app ribbon')
      .setDesc('Hides the Obsidian menu. Warning: to open Settings you will need use the hotkey (default is CMD + ,)')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.hideRibbon)
          .onChange((value) => {
            this.plugin.settings.hideRibbon = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            })
          );

    new Setting(containerEl)
      .setName('Hide status bar')
      .setDesc('Hides word count, character count and backlink count')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.hideStatus)
          .onChange((value) => {
            this.plugin.settings.hideStatus = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            })
          );

    new Setting(containerEl)
      .setName('Hide scroll bars')
      .setDesc('Hides all scroll bars')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.hideScroll)
          .onChange((value) => {
            this.plugin.settings.hideScroll = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            })
          );

    new Setting(containerEl)
      .setName('Hide tooltips')
      .setDesc('Hides all tooltips')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.hideTooltips)
          .onChange((value) => {
            this.plugin.settings.hideTooltips = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            })
          );

    new Setting(containerEl)
      .setName('Hide instructions')
      .setDesc('Hides instructional tips in modals')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.hideInstructions)
          .onChange((value) => {
            this.plugin.settings.hideInstructions = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            })
          );

    new Setting(containerEl)
      .setName('Hide search suggestions')
      .setDesc('Hides suggestions in search pane')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.hideSearchSuggestions)
          .onChange((value) => {
            this.plugin.settings.hideSearchSuggestions = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            })
          );

    new Setting(containerEl)
      .setName('Hide metadata block in Preview mode')
      .setDesc('When front matter is turned off in your Editor settings this hides the metadata block')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.hideMeta)
          .onChange((value) => {
            this.plugin.settings.hideMeta = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            })
          );

    new Setting(containerEl)
    .setName('Only hide left ribbon')
    .setDesc('Hides the Obsidian menu. Warning: to open Settings you will need use the hotkey (default is CMD + ,)')
    .addToggle(toggle => toggle.setValue(this.plugin.settings.hideLeftRibbon)
        .onChange((value) => {
          this.plugin.settings.hideLeftRibbon = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
          })
        );

  }
}
