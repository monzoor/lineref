const path = require('path');
const CracoAlias = require('craco-alias');

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'options',
        baseUrl: './',
        aliases: {
          '@components': resolve('src/components'),
          '@assets': resolve('src/assets'),
          '@actions': resolve('src/actions'),
          '@utils': resolve('src/utils'),
          '@validations': resolve('src/validations'),
          '@helpers': resolve('src/helpers'),
          '@constants': resolve('src/constants'),
          '@containers': resolve('src/containers'),
          '@hooks': resolve('src/hooks'),
          '@dictionaries': resolve('src/dictionaries'),
          '@pages': resolve('src/pages'),
        },
      },
    },
  ],
};
