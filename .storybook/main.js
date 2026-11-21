module.exports = {
  stories: ['../examples/**/*.stories.@(tsx)'],
  addons: ['@storybook/addon-links'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal(config) {
    // Compile TypeScript stories with the project's existing Babel presets.
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: require.resolve('babel-loader'),
    });
    return config;
  },
};
