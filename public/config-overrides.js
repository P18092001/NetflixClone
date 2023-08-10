// craco.config.js or config-overrides.js
// config-overrides.js
module.exports = function override(config, env) {
    // Modify webpack configuration here
module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.resolve.fallback = {
          "https": require.resolve("https-browserify"),
        };
        return webpackConfig;
      },
    },
  };
  return config;
};
