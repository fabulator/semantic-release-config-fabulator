const fs = require('fs');

const changelogFile = 'CHANGELOG.md';

module.exports = (settings, { nextRelease }) => {
    const [title, ...messages] = fs.readFileSync(changelogFile, 'utf8').split('##');
    fs.writeFileSync(changelogFile, `${title}${nextRelease.notes}\n##${messages.join('##')}`);
};
