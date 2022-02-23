import * as vscode from 'vscode'
import config from "./config"
import { formatField } from './formatter'
import { supportedCases } from './constant'

export function executeGenerateTagCommand(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
    const document = textEditor.document
    for (let selection of textEditor.selections) {
        const start = selection.start.line
        const end = selection.end.line
        try {
            const fieldLines = getFieldLines(start, end, document)
            for (let line of fieldLines) {
                const field = getField(document.lineAt(line).text)
                const tags = generateTags(field)
                edit.insert(new vscode.Position(line, document.lineAt(line).range.end.character), ` \`${tags}\``)
            }
        } catch (err: any) {
            vscode.window.showErrorMessage(`${err.toString()} (line ${start + 1})`)
        }
    }
}

function getField(text: string): string {
	const field = /^\s*([a-zA-Z_][a-zA-Z_\d]*)\s+[a-zA-Z_][a-zA-Z_\d]*/
	const list = field.exec(text)
	if (!list) {
		throw new Error('not matched')
	}
	return list[1]
}

function getFieldLines(start: number, end: number, document: vscode.TextDocument): number[] {
	let scope: { start: number, end: number }
	try {
		scope = getStructScope(start, document)
	} catch (err) {
		if (start === end) throw err
		scope = getStructScope(end, document)
	}
	
	if (scope.start + 1 > scope.end - 1) {
		throw new Error('invalid struct format')
	}

	let res: number[] = []
	for (let line = scope.start + 1; line <= scope.end - 1; line++) {
		res.push(line)
	}

	res = res.filter((line) => {
		const text = document.lineAt(line).text
		const field = /^\s*([a-zA-Z_][a-zA-Z_\d]*)\s+[a-zA-Z_][a-zA-Z_\d]*/
		return field.exec(text) !== null
	})
	return res
}

function getStructScope(line: number, document: vscode.TextDocument): { start: number, end: number } {
	const head = /type\s+\w\s+struct\s+{/
	const tail = /}/

	let headLine = -1
	let tailLine = -1
	for (let l = line; l >= 0; l--) {
		if (head.exec(document.lineAt(l).text)) {
			headLine = l
			break
		}
		if (tail.exec(document.lineAt(l).text)) {
			throw new Error('outside struct')
		}
	}
	for (let l = line; l < document.lineCount; l++) {
		if (tail.exec(document.lineAt(l).text)) {
			tailLine = l
			break
		}
		if (head.exec(document.lineAt(l).text)) {
			throw new Error('outside struct')
		}
	}

	if ((headLine === -1 && tailLine !== -1) || (headLine !== -1 && tailLine === -1)) {
		throw new Error('invalid struct format')
	}

	if (headLine === -1 && tailLine === -1) {
		throw new Error('no struct to generate')
	}

	return { start: headLine, end: tailLine }
}

function generateTags(field: string): string {
	const cfg = config.getGenerationConfig()
	
	let tags = cfg.tags
	for (let c of supportedCases) {
		tags = tags.replace(`{{${c}}}`, formatField(field, c))
	}
	return tags
}
