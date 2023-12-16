const path = require('path');

module.exports = {
    plugins: [
        [
            '@semantic-release/github',
            {
                assignees: 'fabulator',
            },
        ],
    ],
    generateNotes: path.resolve(__dirname, './generate-notes.js'),
    prepare: [
        // update changelog file
        path.resolve(__dirname, './update-changelog.cjs'),
        // set version to npm files
        '@semantic-release/npm',
        // commit changed files and push them to GitHub
        {
            path: '@semantic-release/git',
            assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
            // eslint-disable-next-line no-template-curly-in-string
            message: 'Added: Changelog for version ${nextRelease.version} NO_RELEASE EXCLUDE\n\n${nextRelease.notes}',
        },
    ],
    publish: ['@semantic-release/github', '@semantic-release/npm'],
    success: ['@semantic-release/github'],
    analyzeCommits: path.resolve(__dirname, './analyze-commits.js'),
    branches: [{ name: 'beta', prerelease: true }, 'master'],
};
