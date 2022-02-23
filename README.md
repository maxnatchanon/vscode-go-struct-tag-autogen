# VSCODE-GO-STRUCT-TAG-AUTOGEN

## Customizable Go struct tags autocomplete & generator

<br/>

## Features

**Struct tag autocomplete**  
Variable cases and options are customizable (see the config below)  

TODO

Currently supported tags: `json` | `bson` | `binding`  
Currently supported cases: `camel` | `snake`, `pascal`, `none`

TODO


**Generate struct tags command**  
Generated tags are configurable (see the config below)  

TODO

Can be activate by command palette, context menu, or shortcut (⌃ + ⇧ + T)

TODO

<br/>

## Note
If the autocomplete suggestion doesn't work, try adding this config in your `settings.json`  
Open `Command Palette` (⌘ + ⇧ + P) then `Preferences: Open Settings (JSON)`

```json
"editor.quickSuggestions": {
    "strings": true
}
```

<br/>

## Config
### **Autocomplete config**
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

    > Supported cases: `camel`, `snake`, `pascal`, `none`  
    > When multiple cases are set, every combinations of cases and options will appear in the autocomplete suggestion.

    > Any string can be put in the `options` array. The only special case is `-` (dash).  
    > Instead of appending after variable name like `omitempty` ( `json:"field,omitempty"` ),it will replace the variable name ( `json:"-"` ).
- **Default Value**
    ```json
    "goStructTagAutogen.suggestion.json": {
        "enabled": true,
        "cases": ["camel"],
        "options": ["-", "omitempty"]
    },
    "goStructTagAutogen.suggestion.bson": {
        "enabled": true,
        "cases": ["snake"],
        "options": ["-", "omitempty"]
    }
    ```
    > The extension will fallback to the default above when no config provided or missing some fields in the config object.  
    > eg. If only `goStructTagAutogen.suggestion.bson.options` is set in the config file, the default `case` (`snake`) will be used.

<br/>

#### **Tag without Variable Name (`binding`)**
- **Config Key**  
    `goStructTagAutogen.suggestion.binding`  
- **Config Object**  
    |Key|Description|Type|Default|
    |---|-----------|----|-------|
    |enabled|Enable autocomplete for this tag|Boolean|`true`|
    |choices|Value choices|String[]|*See below*

    > Any string can be put in the `choices` array. These texts will be put in the tag value.  
    > `binding:"{{choice}}"` — eg. `binding:"required"`
- **Default Value**
    ```json
    "goStructTagAutogen.suggestion.binding": {
        "enabled": true,
        "choices": ["required"]
    }
    ```
    > The extension will fallback to the default above when no config provided or missing some fields in the config object.

<br/>

### **Generate tags command config**
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
    > Double quote needed to be escaped (`\"`)
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

<br/>

## Release Notes

TODO
