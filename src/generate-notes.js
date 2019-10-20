const { DateTime } = require('luxon');
const {
    TEST,
    IN_PROGRESS,
} = require('@socifi/commitlint-config/src/types');
const processCommits = require('./process-commits.js');

module.exports = (settings, { commits, nextRelease }) => {
    const changes = {};

    // convert commit messages to universal format
    processCommits(commits).map((commit) => {
        const [type, ...message] = commit.message.split(':');
        if (message.length === 0) {
            return {
                type: 'Other',
                message: commit.message,
            };
        }

        return {
            type: type.trim(),
            message: message.join(':').trim(),
        };
    })
        // remove all commits that should not be in changelog
        .filter(item => ![TEST, IN_PROGRESS].includes(item.type))
        .filter(item => !item.message.includes('Merge branch'))
        .filter(item => !item.message.includes('EXCLUDE'))
        .filter(item => !item.message.includes('Commit changelog of'))
        // put commits to object with summed messages by types
        .forEach(({ type, message }) => {
            changes[type] = [
                ...(changes[type] || []),
                message.replace('NO_RELEASE', ''),
            ];
        });

    // generate changelog messages
    const changesMessage = Object.keys(changes).map((key) => {
        return `### ${key}\n${changes[key].map((message) => {
            return `- ${message.replace(/([A-Z]{2,3}-\d*)/g, '[$1](https://socifi.atlassian.net/browse/$1)')}`;
        }).join('\n')}\n`;
    }).join('\n');

    // return update of changelog
    return `## [${nextRelease.version}] ${DateTime.local().toFormat('yyyy-MM-dd')}\n${changesMessage}`;
};
