const CracoLessPlugin = require('craco-less');
const postcss = require('./postcss.config');

module.exports = {
  style: {
    postcss
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#FFC94A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
