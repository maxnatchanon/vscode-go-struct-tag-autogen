import { Config } from './types'

export const defaultConfig: Config = {
    suggestion: {
        json: {
            enabled: true,
            case: "camel",
            options: ["-", "omitempty"]
        },
        bson: {
            enabled: true,
            case: "snake",
            options: ["-", "omitempty"]
        },
        binding: {
            enabled: true,
            choices: ["required"]
        }
    },
    generation: {
        enabled: true,
        tags: "json:\"{{camel}}\" bson:\"{{snake}}\""
    }
}
