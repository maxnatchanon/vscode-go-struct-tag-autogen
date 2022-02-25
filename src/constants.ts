import { Tag, Case } from "./types"

export const supportedVariableTags: Tag[] = ['json', 'bson', 'form']
export const supportedNonVariableTags: Tag[] = ['binding']

export const supportedTags: Tag[] = [...supportedVariableTags, ...supportedNonVariableTags]
export const supportedCases: Case[] = ['none', 'camel', 'snake', 'pascal']
