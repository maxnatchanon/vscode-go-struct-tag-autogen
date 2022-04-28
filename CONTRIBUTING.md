# Contributing

If this extension is missing something that you needs, feel free to fork this repository and customize this extension to suit your usages.  
If you also want to merge that change into this repository, please update the file below and open a pull request.  

## Pull Request
1. Update the [`README.md`](README.md) file if needed.
2. No need to bump the extension version or edit the release note. Those will be done before merging into `main` branch.
3. Open a pull request into `develop` branch.

## Guide
For changes like adding case formats, you can follow the guide here.  
But feel free to make other changes / add other features as you like.
### Adding New Case Formatting
1. Add the new case name in [`constant.ts`](src/constants.ts) and [`types.ts`](src/types.ts)
2. Create a new function in [`formatter.ts`](src/formatter.ts)
    - `function formatNewCaseType(field: string): string`
    - This function receive a field name and return formatted version
    - There is `splitWords()` function that you can use
        - This function splits Go struct field name into an array of words
3. Add the new case name in `formatField()`'s switch case and call your new function
- Generate command should also support the placeholder for the new case after the changes above
    - You can test it by using `{{NEW_CASE_NAME}}` placeholder in the command config

## Project Structure
Main logic files
- [`src/extension.ts`](src/extension.ts) — extension's acivation and deactivation logic
- Feature logic files
    - [`src/tagSuggestion.ts`](src/tagSuggestion.ts) — tag suggestion logic
    - [`src/valueSuggestion.ts`](src/valueSuggestion.ts) — tag value suggestion logic
    - [`src/generation.ts`](src/generation.ts) — tag generation command logic

Config & util files
- [`src/formatter.ts`](src/formatter.ts) — field name formatter helper function logic
- [`src/config.ts`](src/config.ts) — extension config service
- [`src/types.ts`](src/types.ts)
- [`src/constant.ts`](src/constant.ts)

VSCode extension config file
- [`package.json`](package.json)
