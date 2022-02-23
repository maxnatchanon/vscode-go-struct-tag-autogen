import * as vscode from 'vscode'
import config from './config'
import { executeGenerateTagCommand } from './generation'
import { supportedTags } from './constant'
import { getSuggestions } from './suggestion'

export async function activate(context: vscode.ExtensionContext) {
	const configDisposable = config.init()
	
	const suggestionDisposable = vscode.languages.registerCompletionItemProvider(
		'go',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
				const text = document.lineAt(position).text.slice(0, position.character)
				return getSuggestions(text)
			}
		},
		...(new Set(supportedTags.join('').split('')))
	)

	const generationDisposable = vscode.commands.registerTextEditorCommand(
		'goStructTagAutogen.generateStructTags',
		executeGenerateTagCommand,
	)

	context.subscriptions.push(...[configDisposable, suggestionDisposable, generationDisposable])
}
