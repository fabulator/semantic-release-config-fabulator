import { analyzeCommits } from '@semantic-release/commit-analyzer';
import processCommits from './process-commits.cjs';
import pcg from 'commitlint-config-fabulator/src/types.cjs';
const { CHANGED, FIXED, REMOVED, ADDED, DEPRECIATED, DOCS, REFACTORED } = pcg;

export default (settings, { commits, logger }) => {
    // do no release anything of there are not commits
    if (commits.length === 0) {
        return null;
    }

    // if last commit is set as NO_RELEASE, do not release
    if (commits[0].subject.includes('NO_RELEASE')) {
        return null;
    }

    // if there is work BREAKING in any commits, make major release
    if (commits.some((commit) => commit.subject.includes('BREAKING'))) {
        return 'major';
    }

    return analyzeCommits(
        {
            releaseRules: [
                { type: CHANGED, release: 'minor' },
                { type: FIXED, release: 'patch' },
                { type: REMOVED, release: 'major' },
                { type: ADDED, release: 'minor' },
                { type: DEPRECIATED, release: 'minor' },
                { type: REFACTORED, release: 'minor' },
                { type: DOCS, release: 'patch' },
            ],
        },
        { commits: processCommits(commits), logger },
    );
};
