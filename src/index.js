const path = require('path');

module.exports = {
    plugins: [
        ['@semantic-release/github', {
            assignees: 'fabulator',
            assets: [
                { path: 'src/**/*.*', name: 'source-code', label: 'Source code (${nextRelease.gitTag})' },
                { path: 'dist/**/*.*', name: 'compiled-code', label: 'Compiled source code (${nextRelease.gitTag})' },
            ],
        }],
    ],
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
            message: 'Added: Changelog for version ${nextRelease.version} NO_RELEASE EXCLUDE\n\n${nextRelease.notes}',
        },
    ],
    success: ['@semantic-release/github'],
    analyzeCommits: path.resolve(__dirname, './analyze-commits.js'),
    branches: [{ name: 'beta', prerelease: true }, 'master'],
};
