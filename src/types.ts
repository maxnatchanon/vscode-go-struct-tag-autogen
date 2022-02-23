export type Tag = 'json' | 'bson' | 'binding'
export type Case = 'none' | 'camel' | 'snake' | 'pascal'

export type Config = {
	tagSuggestion: TagSuggestionConfig
	valueSuggestion: ValueSuggestionConfig
	generation: GenerationConfig
}

export type TagSuggestionConfig = {
	json: TagSuggestionWithVariableConfig
	bson: TagSuggestionWithVariableConfig
	binding: TagSuggestionNonVariableConfig
}

export type TagSuggestionWithVariableConfig = {
	enabled: boolean
	cases: Case[]
	options: string[]
}

export type TagSuggestionNonVariableConfig = {
	enabled: boolean
	choices: string[]
}

export type ValueSuggestionConfig = {
	[name: string]: string[]
}

export type GenerationConfig = {
	tags: string
}
