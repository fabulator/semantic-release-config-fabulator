import fabulator from 'eslint-config-fabulator';

export default [
  { ignores: ['node_modules/', 'package-lock.json', 'CHANGELOG.md'] },
  ...fabulator,
  {
    // eslint-plugin-import parses dependencies with these options
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  },
  {
    // semantic-release loads custom plugins through their default export
    files: ['src/**/*.js', 'docker/**/*.js'],
    rules: { 'import/no-default-export': 'off' },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: { sourceType: 'commonjs' },
  },
];
