const path = require('path');
const config = require('../src/index.cjs');

const dockerPackage = `fabulator/${process.env.npm_package_name}`;

module.exports = {
    ...config,
    plugins: [
        [
            '@semantic-release/github',
            {
                assignees: 'fabulator',
            },
        ],
    ],
    prepare: [
        ...config.prepare.map((plugin) => {
            if (plugin !== '@semantic-release/npm') {
                return plugin;
            }

            return [
                '@semantic-release/npm',
                {
                    npmPublish: false,
                },
            ];
        }),
        {
            path: '@semantic-release/exec',
            cmd: `docker build -t ${dockerPackage} .`,
        },
    ],
    publish: [
        '@semantic-release/github',
        {
            path: path.resolve(__dirname, './publish-docker.js'),
            name: `${dockerPackage}`,
        },
    ],
    addChannel: ['@semantic-release/github'],
};
