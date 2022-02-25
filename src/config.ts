import * as vscode from 'vscode'
import { Config, GenerationConfig, TagSuggestionWithVariableConfig, TagSuggestionNonVariableConfig, ValueSuggestionConfig } from './types'
import { defaultConfig } from './defaultConfig'

let currentConfig: Config = defaultConfig

let workspaceSettings: vscode.WorkspaceConfiguration

let valueSuggestionChangeCallback: (() => void) | undefined

function init(): vscode.Disposable {
	loadConfig()
	return vscode.workspace.onDidChangeConfiguration(() => {
		const prevConfig = JSON.parse(JSON.stringify(currentConfig)) as Config
		loadConfig()
		if (valueSuggestionChangeCallback && Object.keys(currentConfig.valueSuggestion) !== Object.keys(prevConfig.valueSuggestion)) {
			valueSuggestionChangeCallback()
		}
	})
}

function loadConfig() {
	workspaceSettings = vscode.workspace.getConfiguration('goStructTagAutogen')

	currentConfig.tagSuggestion.json = workspaceSettings.get<TagSuggestionWithVariableConfig>('tagSuggestion.json') || defaultConfig.tagSuggestion.json
	currentConfig.tagSuggestion.bson = workspaceSettings.get<TagSuggestionWithVariableConfig>('tagSuggestion.bson') || defaultConfig.tagSuggestion.bson
	currentConfig.tagSuggestion.binding = workspaceSettings.get<TagSuggestionNonVariableConfig>('tagSuggestion.binding') || defaultConfig.tagSuggestion.binding

	currentConfig.valueSuggestion = workspaceSettings.get<ValueSuggestionConfig>('valueSuggestion') || defaultConfig.valueSuggestion

	currentConfig.generation = workspaceSettings.get<GenerationConfig>('generation') || defaultConfig.generation
}

function onValueSuggestionConfigChange(callback: () => void) {
	valueSuggestionChangeCallback = callback
}

function getTagSuggestionConfig(tag: string): (TagSuggestionWithVariableConfig | undefined) {
	switch (tag) {
		case 'json':
			return currentConfig.tagSuggestion.json
		case 'bson':
			return currentConfig.tagSuggestion.bson
		case 'form':
			return currentConfig.tagSuggestion.form
	}
	return undefined
}

function getNonVariableTagSuggestionConfig(tag: string): (TagSuggestionNonVariableConfig | undefined) {
	switch (tag) {
		case 'binding':
			return currentConfig.tagSuggestion.binding
	}
	return undefined
}

function getValueSuggestionConfig(): (ValueSuggestionConfig) {
	return currentConfig.valueSuggestion
}

function getGenerationConfig(): GenerationConfig {
	return currentConfig.generation
}

export default {
	init,
	onValueSuggestionConfigChange,
	getTagSuggestionConfig,
	getNonVariableTagSuggestionConfig,
	getValueSuggestionConfig,
	getGenerationConfig,
}
