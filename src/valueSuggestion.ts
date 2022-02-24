import * as vscode from 'vscode'
import { workerData } from 'worker_threads'
import config from './config'

export function getValueSuggestions(text: string): vscode.CompletionItem[] {
    try {
        const tagInfo = getTag(text)
        const suggestionList = getSuggestionList(tagInfo.currentTag)
        const completions = suggestionList
            .filter((word) => !tagInfo.prev.includes(word) && word.startsWith(tagInfo.partial))
            .map((word) => new vscode.CompletionItem(word, vscode.CompletionItemKind.Text))
        return completions
    } catch {
        return []
    }
}

function getTag(text: string): { currentTag: string, partial: string, prev: string[] } {
    const re = /\s*\w+\s+\w+\s+(`.*:".*)/
    const list = re.exec(text)
    if (!list) {
        throw new Error('not matched')
    }

    const tags = list[1].split(/\s/)
    const edittingTag = tags[tags.length - 1]
    if (edittingTag.split('"').length !== 2) {
        throw('not matched')
    }
    const values = edittingTag.split('"')[1].split(',')
    return {
        currentTag: edittingTag.split(':')[0].replace('`', ''),
        partial: values[values.length - 1],
        prev: values.slice(0, values.length - 1),
    }
}

function getSuggestionList(tag: string): string[] {
    const cfg = config.getValueSuggestionConfig()
    const list = cfg[tag]
    if (!list) {
        throw new Error('no config')
    }
    return list
}

// UserID string `json:"userId,
