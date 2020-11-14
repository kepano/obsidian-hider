import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class Hider extends Plugin {
	settings: HiderSettings;

	async onload() {
		// load settings
    this.settings = await this.loadData() || new HiderSettings();

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

	// refresh function for when we change settings
  refresh = () => {
    // re-load the style
    this.updateStyle()
  }

  // add the styling elements we need
  addStyle = () => {
    // add a css block for our settings-dependent styles
    const css = document.createElement('style');
    css.id = 'hider-theme';
    document.getElementsByTagName("head")[0].appendChild(css);
    // add the main class
    document.body.classList.add('hider-theme');
    // update the style with the settings-dependent styles
    this.updateStyle();
  }

  // update the styles (at the start, or as the result of a settings change)
  updateStyle = () => {
    document.body.classList.toggle('hider-ribbon', this.settings.hideRibbon);
    document.body.classList.toggle('hider-status', this.settings.hideStatus);
    document.body.classList.toggle('hider-frameless', this.settings.frameless);
    document.body.classList.toggle('hider-scroll', this.settings.hideScroll);
    document.body.classList.toggle('hider-tooltips', this.settings.hideTooltips);

    // get the custom css element
    const el = document.getElementById('hider');
    if (!el) throw "hider element not found!";
    else {
      // set the settings-dependent css
      el.innerText = `
        body.hider
      `;
    }
  }


}

class HiderSettings {
	frameless: boolean = false;
	hideRibbon: boolean = false;
	hideStatus: boolean = false;
	hideScroll: boolean = false;
  hideTooltips: boolean = false;
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


	}
}
