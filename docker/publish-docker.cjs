const { execa } = require('execa');
const semver = require('semver');

module.exports = async ({ name }, { nextRelease: { version }, logger }) => {
  async function publish(dockerVersion) {
    logger.log(`Pushing version ${name}:${dockerVersion} to docker hub`);
    await execa(
      'docker',
      ['tag', `${name}:latest`, `${name}:${dockerVersion}`],
      { stdio: 'inherit' },
    );
    await execa('docker', ['push', `${name}:${dockerVersion}`], {
      stdio: 'inherit',
    });
  }

  const { major, minor, patch, prerelease } = semver.parse(version);

  const isProdRelease = prerelease.length === 0;

  await publish(version);

  if (isProdRelease) {
    await publish(`${major}.${minor}`);
    await publish(`${major}`);
    await publish('latest');
    return;
  }

  const [channel] = prerelease;

  await publish(channel);
  await publish(`${major}.${minor}.${patch}-${channel}`);
};
