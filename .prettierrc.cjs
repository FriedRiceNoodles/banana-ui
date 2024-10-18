module.exports = {
  pluginSearchDirs: false,
  plugins: [require.resolve('prettier-plugin-organize-imports'), require.resolve('prettier-plugin-packagejson')],
  printWidth: 120,
  proseWrap: 'preserve',
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
      },
    },
  ],
};
