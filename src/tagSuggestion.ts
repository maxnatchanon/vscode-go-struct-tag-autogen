import * as vscode from 'vscode'
import config from './config'
import { formatField } from './formatter'

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
	const regex = /^\s*([a-zA-Z_][a-zA-Z_\d]*)\s+[a-zA-Z_\d\.\[\]{}\*]*\s+`(.*)/
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
	for (let tag of config.getTagSuggestionSupportedTags()) {
		if (!tag.startsWith(partialTag)) continue
		matched.push(tag)
	}
	return matched
}

function generateCompletionItems(tag: string, field: string): vscode.CompletionItem[] {
	const cfg = config.getTagSuggestionConfig(tag)
	if (!cfg) return []

	// cases available - generate with field name
	if (cfg.cases) {
		var completions: vscode.CompletionItem[] = []
		const formattedFields = cfg.cases.map((c) => formatField(field, c))
	
		for (let formattedField of formattedFields) {
			completions.push(new vscode.CompletionItem(`${tag}:"${formattedField}"`, vscode.CompletionItemKind.Text))
			if (cfg.options) {
				for (let option of cfg.options) {
					if (option === '-') {
						completions.push(new vscode.CompletionItem(`${tag}:"-"`, vscode.CompletionItemKind.Text))
						continue
					}
					completions.push(new vscode.CompletionItem(`${tag}:"${formattedField},${option}"`, vscode.CompletionItemKind.Text))
				}
			}
		}
		return completions
	}
	
	// only options available - generate without field name
	if (cfg.options) {
		var completions: vscode.CompletionItem[] = []
		for (let option of cfg.options) {
			completions.push(new vscode.CompletionItem(`${tag}:"${option}"`, vscode.CompletionItemKind.Text))
		}
		return completions
	}

	return []
}
