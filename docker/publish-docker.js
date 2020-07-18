const execa = require('execa');
const semver = require('semver');

module.exports = async ({ name }, { nextRelease: { version }, logger }) => {
    function publish(dockerVersion) {
        logger.log(`Pushing version ${name}:${dockerVersion} to docker hub`);
        execa('docker', ['tag', `${name}:latest`, `${name}:${dockerVersion}`], { stdio: 'inherit' });
        execa('docker', ['push', `${name}:${dockerVersion}`], { stdio: 'inherit' });
    }

    const { major, minor, patch, prerelease } = semver(version);

    const isProdRelease = prerelease.length === 0;

    publish(version);

    if (isProdRelease) {
        publish(`${major}.${minor}`);
        publish(`${major}`);
        publish('latest');
        return;
    }

    const [channel] = prerelease;

    publish(channel);
    publish(`${major}.${minor}.${patch}-${channel}`);
};
