import * as vscode from 'vscode'
import { Config, TagSuggestionConfig, TagSuggestionNonVariableConfig } from './types'
import { defaultConfig } from './defaultConfig'

let userConfig: Config = defaultConfig

let workspaceSettings: vscode.WorkspaceConfiguration

function init(context: vscode.ExtensionContext) {
	loadConfig()
	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration(() => loadConfig())
	)
}

function loadConfig() {
	workspaceSettings = vscode.workspace.getConfiguration('goStructTagAutoGen')

	userConfig.suggestion.json = workspaceSettings.get<TagSuggestionConfig>('suggestion.json') || defaultConfig.suggestion.json
	userConfig.suggestion.bson = workspaceSettings.get<TagSuggestionConfig>('suggestion.bson') || defaultConfig.suggestion.bson
	userConfig.suggestion.binding = workspaceSettings.get<TagSuggestionNonVariableConfig>('suggestion.binding') || defaultConfig.suggestion.binding
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

export default {
	init,
	getSuggestionConfig,
	getNonVariableSuggestionConfig,
}
