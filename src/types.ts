export type Case = 'none' | 'camel' | 'snake' | 'pascal'

export type Config = {
	suggestion: SuggestionConfig
}

export type SuggestionConfig = {
	json: TagSuggestionConfig
	bson: TagSuggestionConfig
	binding: TagSuggestionNonVariableConfig
}

export type TagSuggestionConfig = {
	enabled: boolean
	case: Case
	options: string[]
}

export type TagSuggestionNonVariableConfig = {
	enabled: boolean
	choices: string[]
}
