# Semantic Release Config

Shared [semantic-release](https://github.com/semantic-release/semantic-release) config for Fabulator's projects.

## Usage

```bash
npm install --save-dev semantic-release-config-fabulator
```

`release.config.cjs`:

```js
module.exports = {
  extends: 'semantic-release-config-fabulator',
};
```

For Docker projects use `semantic-release-config-fabulator/docker/index.cjs`.

Requires Node.js 26.13.1 or newer.

## Commit messages

Releases are driven by commit message prefixes from
[commitlint-config-fabulator](https://github.com/fabulator/commitlint-config-fabulator):

| Prefix                                          | Release |
| ----------------------------------------------- | ------- |
| `Fixed:`, `Docs:`                               | patch   |
| `Added:`, `Changed:`, `Refactored:`, `Depreciated:` | minor   |
| `Removed:`                                      | major   |

- `BREAKING` anywhere in a commit subject triggers a major release.
- `NO_RELEASE` in the latest commit skips the release.
- `EXCLUDE` hides the commit from the changelog and ignores it when deciding the release type.
- `;` splits one commit into several changelog entries, e.g. `Added: X; Fixed: Y`.
