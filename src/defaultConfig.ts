import { Config } from './types'

export const defaultConfig: Config = {
    suggestion: {
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
        binding: {
            enabled: true,
            choices: ["required"]
        }
    },
    generation: {
        tags: "json:\"{{camel}}\" bson:\"{{snake}}\""
    }
}
