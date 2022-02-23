# VSCODE-GO-STRUCT-TAG-AUTOGEN

#### Customizable Go struct tags autocomplete & generator

## Features

**Struct tag autocomplete**  
Variable cases and options are customizable ([view config](#tag-autocomplete-config))  

TODO

Currently supported tags: `json` | `bson` | `binding`  
Currently supported cases: `camel` | `snake`, `pascal`, `none`

TODO

**Struct tag value autocomplete**  
Suggestion list for each tag can be configured ([view config](#tag-value-autocomplete-config))  
Any tag can be added for value suggestion (doesn't need to be supported by tag autocomplete above)

TODO


**Generate struct tags command**  
Generated tags are configurable ([view config](#generate-tags-command-config))  

TODO

Can be activated by command palette, context menu, or shortcut (⌃ + ⇧ + T)

TODO

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
There are two types of tags — with and without variable name  

**Tag with Variable Name (`json`, `bson`)**
- **Config Key**  
    `goStructTagAutogen.suggestion.json`  
    `goStructTagAutogen.suggestion.bson`
- **Config Object**  
    |Key|Description|Type|Default|
    |---|-----------|----|-------|
    |enabled|Enable autocomplete for this tag|Boolean|`true`|
    |cases|Variable formatting for this tag|Case[]|["`camel`"] (json), ["`snake`"] (bson)|
    |options|Options after variable name|String[]|*See below*

    Supported cases: `camel`, `snake`, `pascal`, `none`  
    When multiple cases are set, every combinations of cases and options will appear in the autocomplete suggestion.

    Any string can be put in the `options` array. The only special case is `-` (dash).  
    Instead of appending after variable name like `omitempty` ( `json:"field,omitempty"` ),it will replace the variable name ( `json:"-"` ).
- **Default Value**
    ```json
    "goStructTagAutogen.tagSuggestion.json": {
        "enabled": true,
        "cases": ["camel"],
        "options": ["-", "omitempty"]
    },
    "goStructTagAutogen.tagSuggestion.bson": {
        "enabled": true,
        "cases": ["snake"],
        "options": ["-", "omitempty"]
    }
    ```
    The extension will fallback to the default above when no config provided or missing some fields in the config object.  
    eg. If only `goStructTagAutogen.tagSuggestion.bson.options` is set in the config file, the default `case` (`snake`) will be used.

#### **Tag without Variable Name (`binding`)**
- **Config Key**  
    `goStructTagAutogen.tagSuggestion.binding`  
- **Config Object**  
    |Key|Description|Type|Default|
    |---|-----------|----|-------|
    |enabled|Enable autocomplete for this tag|Boolean|`true`|
    |choices|Value choices|String[]|*See below*

    Any string can be put in the `choices` array. These texts will be put in the tag value.  
    `binding:"{{choice}}"` — eg. `binding:"required"`
- **Default Value**
    ```json
    "goStructTagAutogen.tagSuggestion.binding": {
        "enabled": true,
        "choices": ["required"]
    }
    ```
    The extension will fallback to the default above when no config provided or missing some fields in the config object.

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
    Tag name can be anything (doesn't need to be supported by the tag autocomplete).

    When typing a value for a tag in the config, the texts in the array will be used to build the suggestion list.  
    Any string can be put in the array. No special case or character that has to be escaped.    

    Tag value autocomplete will be triggered by every suggestions of this config (also `"` and `,`).

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
    |Key|Description|Type|Default|
    |---|-----------|----|-------|
    |tags|Struct tag template for the command|String|*See below*|
    
- **Default value**
    ```json
    "goStructTagAutogen.generation": {
        "tags": "json:\"{{camel}}\" bson:\"{{snake}}\""
    }
    ```
    Double quotes need to be escaped (`\"`)
- **Available Placeholders**
    - `{{camel}}`  for the camel cased version of the field name
    - `{{snake}}` for the snake cased version of the field name
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

TODO

## Contibuting

If you want to add new tags, new cases, or new features, you can follow the guide in [CONTRIBUTING.md](CONTRIBUTING.md)
