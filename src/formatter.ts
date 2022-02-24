import { Case } from "./types";

export function formatField(field: string, format: Case): string {
    switch (format) {
        case 'none':
            return field
        case 'camel':
            return formatCamel(field)
        case 'snake':
            return formatSnake(field)
        case 'pascal':
            return formatPascal(field)
        default:
            return field
    }
}

function splitWords(field: string): string[] {
    let words = field.replace(/([A-Z][a-z])/g, '!!!$&').split('!!!')
    if (words.length >= 2 && /^[A-Z]s$/.exec(words[words.length - 1])) {
        words = [...words.slice(0, words.length - 2), words.slice(words.length - 2, words.length).join('')]
    }
    words = words.join('!!!').replace(/([A-Z]{2,})/g, '!!!$&').replace(/^!!!/, '').split('!!!')
    return words
}

function formatCamel(field: string): string {
    const words = splitWords(field)
    let result = words.reduce((prev, curr, index) => {
        if (index === 0) {
            return curr.toLowerCase()
        }
        return `${prev}${curr.slice(0, 1).toUpperCase()}${curr.slice(1).toLowerCase()}`
    }, '')
    return result
}

function formatSnake(field: string): string {
    const words = splitWords(field)
    let result = words.reduce((prev, curr, index) => {
        if (index === 0) {
            return curr.toLowerCase()
        }
        return `${prev}_${curr.toLowerCase()}`
    }, '')
    return result
}

function formatPascal(field: string): string {
    const words = splitWords(field)
    let result = words.reduce((prev, curr, index) => {
        if (index === 0) {
            return `${curr.slice(0, 1).toUpperCase()}${curr.slice(1).toLowerCase()}`
        }
        return `${prev}${curr.slice(0, 1).toUpperCase()}${curr.slice(1).toLowerCase()}`
    }, '')
    return result
}
