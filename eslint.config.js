import fabulator from 'eslint-config-fabulator';

export default [
  { ignores: ['node_modules/', 'package-lock.json', 'CHANGELOG.md'] },
  ...fabulator,
  {
    // semantic-release loads custom plugins through their default export
    files: ['src/**/*.js', 'docker/**/*.js'],
    rules: { 'import-x/no-default-export': 'off' },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: { sourceType: 'commonjs' },
  },
];
