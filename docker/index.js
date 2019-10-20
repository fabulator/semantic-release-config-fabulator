const path = require('path');
const config = require('../src');

const dockerPackage = `fabulator/${process.env.npm_package_name}`;

module.exports = {
    ...config,
    verifyConditions: ['semantic-release-docker'],
    prepare: [
        ...config.prepare,
        {
            path: '@semantic-release/exec',
            cmd: `docker build -t ${dockerPackage} .`,
        }
    ],
    publish: [
        '@semantic-release/github',
        {
            path: path.resolve(__dirname, './publish-docker.js'),
            name: `${dockerPackage}`,
        },
    ],
    addChannel: ['@semantic-release/github'],
    plugins: [
        '@semantic-release/npm', {
            npmPublish: false,
        },
    ],
};
