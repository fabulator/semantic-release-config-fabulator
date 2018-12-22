const { analyzeCommits } = require('@semantic-release/commit-analyzer');
const {
    CHANGED,
    FIXED,
    REMOVED,
    ADDED,
    DEPRECIATED,
    DOCS,
    REFACTORED,
} = require('@socifi/commitlint-config/src/types');

module.exports = (settings, { commits, logger }) => {
    // do no release anything of there are not commits
    if (commits.length === 0) {
        return null;
    }

    // if last commit is set as NO_RELEASE, do not release
    if (commits[0].subject.indexOf('NO_RELEASE') >= 0) {
        return null;
    }

    // if there is work BREAKING in any commits, make major release
    if (commits.some(commit => commit.subject.includes('BREAKING'))) {
        return 'major';
    }

    return analyzeCommits({
        releaseRules: [
            { type: CHANGED, release: 'minor' },
            { type: FIXED, release: 'patch' },
            { type: REMOVED, release: 'major' },
            { type: ADDED, release: 'minor' },
            { type: DEPRECIATED, release: 'minor' },
            { type: REFACTORED, release: 'minor' },
            { type: DOCS, release: 'patch' },
        ],
    }, { commits, logger });
};
