import { View, Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, VIEW_TYPE_OB_WORLD_MAP } from './constants'
import { WorldMapSettings } from './types'
import { WorldMapView } from './view'
import MapSettingTab from './settings'

export default class WorldMapPlugin extends Plugin {
    settings: WorldMapSettings;
    view: View;
    containerEl: HTMLElement;

    async onload() {
        // Load message		
        await this.loadSettings();
        console.log('Loaded World Map Plugin');
        this.addSettingTab(new MapSettingTab(this.app, this));

        this.registerView(VIEW_TYPE_OB_WORLD_MAP, (leaf) => this.view = new WorldMapView(leaf, this));

        this.addCommand({
            id: "show-world-map-panel",
            name: "Open World Map Control Panel",
            callback: () => this.showPanel()
        });
    }

    showPanel = function () {
        this.app.workspace.getLeaf().setViewState({ type: VIEW_TYPE_OB_WORLD_MAP })
    }

    onunload() {
        console.log('unloading plugin');
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}