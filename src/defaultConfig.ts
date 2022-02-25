import { Config } from './types'

export const defaultConfig: Config = {
    tagSuggestion: {
        json: {
            enabled: true,
            cases: ["camel"],
            options: ["-", "omitempty"]
        },
        bson: {
            enabled: true,
            cases: ["snake"],
            options: ["-", "omitempty"]
        },
        form: {
            enabled: true,
            cases: ["camel"],
            options: ["-", "omitempty"]
        },
        binding: {
            enabled: true,
            choices: ["required"]
        }
    },
    valueSuggestion: {
        "json": ["omitempty"],
        "bson": ["omitempty"],
        "binding": ["required"]
    },
    generation: {
        tags: "json:\"{{camel}}\" bson:\"{{snake}}\""
    }
}
