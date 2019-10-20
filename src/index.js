const path = require('path');

module.exports = {
    generateNotes: path.resolve(__dirname, './generate-notes.js'),
    prepare: [
        // update changelog file
        path.resolve(__dirname, './update-changelog.js'),
        // set version to npm files
        '@semantic-release/npm',
        // commit changed files and push them to GitHub
        {
            path: '@semantic-release/git',
            assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
            // eslint-disable-next-line no-template-curly-in-string
            message: 'Added: Changelog for version ${nextRelease.version}\n\n${nextRelease.notes}',
        },
    ],
    success: ['@semantic-release/github'],
    verifyConditions: [],
    analyzeCommits: path.resolve(__dirname, './analyze-commits.js'),
    branches: [{ name: 'beta', prerelease: true }, 'master'],
};
