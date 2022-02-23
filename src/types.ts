export type Tag = 'json' | 'bson' | 'binding'
export type Case = 'none' | 'camel' | 'snake' | 'pascal'

export type Config = {
	suggestion: SuggestionConfig
	generation: GenerationConfig
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

export type GenerationConfig = {
	enabled: boolean
	tags: string
}
