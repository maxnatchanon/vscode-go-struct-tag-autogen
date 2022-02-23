import * as vscode from 'vscode'
import { Config, GenerationConfig, TagSuggestionConfig, TagSuggestionNonVariableConfig } from './types'
import { defaultConfig } from './defaultConfig'

let userConfig: Config = defaultConfig

let workspaceSettings: vscode.WorkspaceConfiguration

function init(): vscode.Disposable {
	loadConfig()
	return vscode.workspace.onDidChangeConfiguration(() => loadConfig())
}

function loadConfig() {
	workspaceSettings = vscode.workspace.getConfiguration('goStructTagAutogen')

	userConfig.suggestion.json = workspaceSettings.get<TagSuggestionConfig>('suggestion.json') || defaultConfig.suggestion.json
	userConfig.suggestion.bson = workspaceSettings.get<TagSuggestionConfig>('suggestion.bson') || defaultConfig.suggestion.bson
	userConfig.suggestion.binding = workspaceSettings.get<TagSuggestionNonVariableConfig>('suggestion.binding') || defaultConfig.suggestion.binding

	userConfig.generation = workspaceSettings.get<GenerationConfig>('generation') || defaultConfig.generation
}

function getSuggestionConfig(tag: string): (TagSuggestionConfig | undefined) {
	switch (tag) {
		case 'json':
			return userConfig.suggestion.json
		case 'bson':
			return userConfig.suggestion.bson
	}
	return undefined
}

function getNonVariableSuggestionConfig(tag: string): (TagSuggestionNonVariableConfig | undefined) {
	switch (tag) {
		case 'binding':
			return userConfig.suggestion.binding
	}
	return undefined
}

function getGenerationConfig(): GenerationConfig {
	return userConfig.generation
}

export default {
	init,
	getSuggestionConfig,
	getNonVariableSuggestionConfig,
	getGenerationConfig,
}
