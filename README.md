# VSCODE-GO-STRUCT-TAG-AUTOGEN

#### Customizable Go struct tags autocomplete & generator

## Features

**Struct tag autocomplete**  
Variable cases and options are customizable ([view config](#tag-autocomplete-config))  

Currently supported cases: `camel` | `snake` | `uppersnake` | `pascal` | `none`

![Tag Suggestion Preview 1](https://raw.githubusercontent.com/maxnatchanon/vscode-go-struct-tag-autogen/main/assets/gif/tag-suggestion-0.gif)

**Struct tag value autocomplete**  
Suggestion list for each tag can be configured ([view config](#tag-value-autocomplete-config))  
Any tag can be added for value suggestion (doesn't need to be supported by tag autocomplete above)

![Tag Value Suggestion Preview 1](https://raw.githubusercontent.com/maxnatchanon/vscode-go-struct-tag-autogen/main/assets/gif/value-suggestion-0.gif)


**Generate struct tags command**  
Generated tags are configurable ([view config](#generate-tags-command-config))  
Can be activated by command palette, context menu, or shortcut (⌃ + ⇧ + T)  

![Generate Struct Tag Preview 1](https://raw.githubusercontent.com/maxnatchanon/vscode-go-struct-tag-autogen/main/assets/gif/generate-0.gif)

Multiple cursors support  
![Generate Struct Tag Preview 2](https://raw.githubusercontent.com/maxnatchanon/vscode-go-struct-tag-autogen/main/assets/gif/generate-1.gif)

## Note
If the autocomplete suggestion doesn't work, try adding this config in your `settings.json`  
Open `Command Palette` (⌘ + ⇧ + P) then `Preferences: Open Settings (JSON)`

```json
"editor.quickSuggestions": {
    "strings": true
}
```

## Configs
### **Tag Autocomplete Config**

- **Config Key**  
    `goStructTagAutogen.tagSuggestion`
- **Config Object**  
    ```
    {
        "TAG_NAME_1": {
            "cases": ["CASE_1", "CASE_2", ...]
            "options": ["OPTION_1", "OPTION_2", ...]
        },
        ...
    }
    ```
    |Key|Description|Type|
    |---|-----------|----|
    |cases|Field name formatting for this tag|Case[]|
    |options|Options after the field name|String[]|

    Supported cases: `camel`, `snake`, `uppersnake`, `pascal`, `none`  
    When multiple cases are set, every cases (and every combinations of cases and options) will appear in the autocomplete suggestion.  

    Any string can be put in the `options` array.  
    The only special case is `-` (dash). Instead of appending after variable name like `omitempty` ( `json:"field,omitempty"` ), it will replace the variable name ( `json:"-"` ).  

    Each tag needs at least one config, either `cases` or `options`.  
    - Config only `cases` — suggest a list of tags with the formatted field name as the value
    - Config only `options` — suggest a list of tags with each option as the value
    - Config both `cases` and `options`
        - Example: The default `json` config below will suggest `json:"fieldName"`, `json:"fieldName,omitempty"` and `json:"-"`

- **Default Value**
    ```json
    "goStructTagAutogen.tagSuggestion": {
        "json": {
            "cases": ["camel"],
            "options": ["omitempty", "-"]
        },
        "bson": {
            "cases": ["snake"],
            "options": ["omitempty", "-"]
        },
        "binding": {
            "options": ["required"]
        }
    }
    ```
    The extension will fallback to the default above when no config  provided.

### **Tag Value Autocomplete Config**
- **Config Key**  
    `goStructTagAutogen.valueSuggestion`
- **Config Object**  
    An object with tag names as keys and arrays of string as values  
    ```
    {
        "TAG_NAME_1": ["SUGGESTION_1", "SUGGESTION_2", ...],
        "TAG_NAME_2": ["SUGGESTION_1", "SUGGESTION_2", ...],
        ...
    }
    ```
    Tag name can be anything.

    When typing a value for a tag in the config, the texts in the array will be used to build the suggestion list.  
    Any string can be put in the array. No special case or character that need to be escaped.    

    Tag value autocomplete will be triggered when the typing value matched the pattern in this config. (also when typing `"` or `,`)

- **Default Value**
    ```json
    "goStructTagAutogen.valueSuggestion": {
        "json": ["omitempty"],
        "bson": ["omitempty"],
        "binding": ["required"]
    }
    ```

### **Generate Tags Command Config**
- **Config key**  
    `goStructTagAutogen.generation`  
- **Config object**
    ```
    {
        "template": "GEN_TEMPLATE"
    }
    ```
    |Key|Description|Type|Default|
    |---|-----------|----|-------|
    |template|Struct tag template for the command|String|*See below*|
    
- **Default value**
    ```json
    "goStructTagAutogen.generation": {
        "template": "json:\"{{camel}}\" bson:\"{{snake}}\""
    }
    ```
    Double quotes need to be escaped (`\"`)
- **Available Placeholders**
    - `{{camel}}`  for the camel cased version of the field name
    - `{{snake}}` for the snake cased version of the field name
    - `{{uppersnake}}` for the upper snake cased version of the field name
    - `{{pascal}}` for the pascal cased version of the field name
    - `{{none}}` for the field name
- **Example**
    ```go
    Config:
    {
        "tags": "json:\"{{camel}},omitempty\" bson:\"{{snake}}\" binding:\"required,gte=10\""
    }

    Generated tags:
    {
        TotalAmount int `json:"totalAmount,omitempty" bson:"total_amount" binding:"required,gte=10"`
    }
    ```

## Release Notes

[CHANGELOG.md](https://github.com/maxnatchanon/vscode-go-struct-tag-autogen/blob/main/CHANGELOG.md)

## Contibuting

If you want to add new cases, or new features, you can follow the guide in [CONTRIBUTING.md](https://github.com/maxnatchanon/vscode-go-struct-tag-autogen/blob/main/CONTRIBUTING.md).
