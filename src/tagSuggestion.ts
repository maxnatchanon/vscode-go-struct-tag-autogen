import * as vscode from 'vscode'
import config from './config'
import { formatField } from './formatter'
import { supportedTags } from './constant'

export function getTagSuggestions(text: string): vscode.CompletionItem[] {
    let field: string
    let partialTag: string
    try {
        const res = getFieldAndTag(text)
        field = res.field
        partialTag = res.partialTag
    } catch {
        return []
    }

    const tags = getMatchedTags(partialTag)
    if (tags.length === 0) {
        return []
    }

    let result: vscode.CompletionItem[] = [];
    for (let tag of tags) {
        result.push(...generateCompletionItems(tag, field))
    }
    return result
}

function getFieldAndTag(text: string): { field: string, partialTag: string } {
	const regex = /^\s*([a-zA-Z_][a-zA-Z_\d]*)\s+[a-zA-Z_][a-zA-Z_\d]*\s+`(.*)/
	const list = regex.exec(text)
	if (!list) {
		throw new Error('not matched')
	}
	if ((text.split('`').length - 1) % 2 === 0) {
		throw new Error('not in tag')
	}
	const tagList = list[2].split(/\s/)
	return {
		field: list[1],
		partialTag: tagList[tagList.length - 1],
	}
}



function getMatchedTags(partialTag: string): string[] {
	let matched: string[] = []
	for (let tag of supportedTags) {
		if (!tag.startsWith(partialTag)) continue
		matched.push(tag)
	}
	return matched
}

function generateCompletionItems(tag: string, field: string): vscode.CompletionItem[] {
	switch (tag) {
		case 'json':
		case 'bson':
			return getCompletion(field, tag)
		case 'binding':
			return getNonVariableCompletion(tag)
		default:
			return []
	}
}

function getCompletion(field: string, tag: string): vscode.CompletionItem[] {
	const cfg = config.getTagSuggestionConfig(tag)
	if (!cfg) {
		return []
	}

	const formattedFields = cfg.cases.map((c) => formatField(field, c))
	
	var completions: vscode.CompletionItem[] = []
	for (let formattedField of formattedFields) {
		completions.push(new vscode.CompletionItem(`${tag}:"${formattedField}"`, vscode.CompletionItemKind.Text))
		for (let option of cfg.options) {
			if (option === '-') {
				completions.push(new vscode.CompletionItem(`${tag}:"-"`, vscode.CompletionItemKind.Text))
				continue
			}
			completions.push(new vscode.CompletionItem(`${tag}:"${formattedField},${option}"`, vscode.CompletionItemKind.Text))
		}
	}
	return completions
}

function getNonVariableCompletion(tag: string): vscode.CompletionItem[] {
	const cfg = config.getNonVariableTagSuggestionConfig(tag)
	if (!cfg) {
		return []
	}

	var completions: vscode.CompletionItem[] = []
	for (let choice of cfg.choices) {
		completions.push(new vscode.CompletionItem(`${tag}:"${choice}"`, vscode.CompletionItemKind.Text))
	}
	return completions
}
