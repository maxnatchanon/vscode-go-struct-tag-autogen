import * as vscode from 'vscode'
import { Config, GenerationConfig, TagSuggestionConfig, TagSuggestion, ValueSuggestionConfig } from './types'

let currentConfig: Config = {
	tagSuggestion: {},
	valueSuggestion: {},
	generation: {
		template: '',
	},
}

let workspaceSettings: vscode.WorkspaceConfiguration

let tagSuggestionChangeCallback: (() => void) | undefined
let valueSuggestionChangeCallback: (() => void) | undefined

function init(): vscode.Disposable {
	loadConfig()
	return vscode.workspace.onDidChangeConfiguration(() => {
		const prevConfig = JSON.parse(JSON.stringify(currentConfig)) as Config
		loadConfig()
		if (tagSuggestionChangeCallback && JSON.stringify(currentConfig.tagSuggestion) !== JSON.stringify(prevConfig.tagSuggestion)) {
			tagSuggestionChangeCallback()
		}
		if (valueSuggestionChangeCallback && JSON.stringify(currentConfig.valueSuggestion) !== JSON.stringify(prevConfig.valueSuggestion)) {
			valueSuggestionChangeCallback()
		}
	})
}

function loadConfig() {
	workspaceSettings = vscode.workspace.getConfiguration('goStructTagAutogen')

	var err: string[] = []
	const tagSuggestion = workspaceSettings.get<any>('tagSuggestion')
	if (tagSuggestion && typeof(tagSuggestion) === 'object') {
		Object.keys(tagSuggestion).forEach(k => {
			if (!tagSuggestion[k].cases && !tagSuggestion[k].options) {
				err.push(k)
				return
			}
			if (tagSuggestion[k].cases && !Array.isArray(tagSuggestion[k].cases)) {
				err.push(k)
				return
			}
			if (tagSuggestion[k].options && !Array.isArray(tagSuggestion[k].options)) {
				err.push(k)
				return
			}
			currentConfig.tagSuggestion[k] = tagSuggestion[k] as TagSuggestion
		})
	}

	const valueSuggestion = workspaceSettings.get<any>('valueSuggestion')
	if (valueSuggestion && typeof(valueSuggestion) === 'object') {
		Object.keys(valueSuggestion).forEach(k => {
			if (!Array.isArray(valueSuggestion[k])) {
				err.push(k)
				return
			}
			const list = (valueSuggestion[k] as any[]).filter(v => typeof(v) === 'string') as string[]
			currentConfig.valueSuggestion[k] = list
		})
	}

	const generation = workspaceSettings.get<any>('generation')
	if (generation && generation.template && typeof(generation.template) === 'string') {
		currentConfig.generation.template = generation.template
	} else {
		err.push('template')
	}

	if (err.length > 0) {
		vscode.window
			.showInformationMessage(`GoStructTagAutogen: Please check the formatting of these configs — ${err.map(e => `"${e}"`).join(',')}`, 'Open Config')
			.then(option => {
				if (option === 'Open Config') {
					vscode.commands.executeCommand('workbench.action.openSettingsJson');
				}
			})
	}
}

function onTagSuggestionConfigChange(callback: () => void) {
	tagSuggestionChangeCallback = callback
}

function onValueSuggestionConfigChange(callback: () => void) {
	valueSuggestionChangeCallback = callback
}

function getTagSuggestionSupportedTags(): string[] {
	return Object.keys(currentConfig.tagSuggestion)
}

function getTagSuggestionConfig(tag: string): (TagSuggestion | undefined) {
	const supportedTags = Object.keys(currentConfig.tagSuggestion)
	if (!supportedTags.includes(tag)) return undefined
	return currentConfig.tagSuggestion[tag]
}

function getValueSuggestionConfig(): (ValueSuggestionConfig) {
	return currentConfig.valueSuggestion
}

function getGenerationConfig(): GenerationConfig {
	return currentConfig.generation
}

export default {
	init,
	onTagSuggestionConfigChange,
	onValueSuggestionConfigChange,
	getTagSuggestionSupportedTags,
	getTagSuggestionConfig,
	getValueSuggestionConfig,
	getGenerationConfig,
}
